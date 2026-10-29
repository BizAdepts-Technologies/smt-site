"""
Retriever Module for SMT RAG Chatbot.
Loads persistent vector index and performs fast cosine similarity search.
"""
import os
import json
import pickle
import numpy as np
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

INDEX_DIR = Path(__file__).resolve().parent / "index_data"

_CACHE = {
    "embeddings": None,
    "metadata": None,
    "index_info": None,
    "vectorizer": None,
    "client": None,
}


def load_index(force_reload=False):
    """
    Loads vector index from disk into memory cache.
    """
    if _CACHE["embeddings"] is not None and not force_reload:
        return True

    emb_file = INDEX_DIR / "embeddings.npy"
    meta_file = INDEX_DIR / "metadata.json"
    info_file = INDEX_DIR / "index_info.json"

    if not emb_file.exists() or not meta_file.exists():
        # Auto-build index if not yet built
        from .indexer import build_index
        build_index()

    if not emb_file.exists():
        return False

    _CACHE["embeddings"] = np.load(emb_file)
    with open(meta_file, "r", encoding="utf-8") as f:
        _CACHE["metadata"] = json.load(f)

    if info_file.exists():
        with open(info_file, "r", encoding="utf-8") as f:
            _CACHE["index_info"] = json.load(f)
    else:
        _CACHE["index_info"] = {"embedding_type": "tfidf"}

    vec_file = INDEX_DIR / "vectorizer.pkl"
    if vec_file.exists():
        with open(vec_file, "rb") as f:
            _CACHE["vectorizer"] = pickle.load(f)

    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if api_key:
        try:
            from google import genai
            _CACHE["client"] = genai.Client(api_key=api_key)
        except Exception:
            _CACHE["client"] = None

    return True


def retrieve(query: str, top_k: int = 5, min_score: float = 0.05):
    """
    Performs cosine similarity search against persistent SMT index.
    Returns:
        - results: list of matched items with score and metadata
        - matched_products: structured list of product dicts for frontend UI
        - context_str: assembled text context for LLM grounding
    """
    if not load_index():
        return [], [], ""

    embeddings = _CACHE["embeddings"]
    metadata_list = _CACHE["metadata"]
    index_info = _CACHE["index_info"]
    client = _CACHE["client"]
    vectorizer = _CACHE["vectorizer"]

    query_vec = None
    emb_type = index_info.get("embedding_type", "tfidf")

    # 1. Try Gemini embedding if index was built with Gemini
    if emb_type == "gemini":
        try:
            from .gemini_client import embed_single
            model_name = index_info.get("model_name", "gemini-embedding-001")
            val = embed_single(query, model=model_name)
            if val:
                query_vec = np.array(val, dtype=np.float32)
                norm = np.linalg.norm(query_vec)
                if norm > 0:
                    query_vec = query_vec / norm
        except Exception as e:
            print(f"Query embedding via Gemini failed ({e}), attempting vectorizer.")

    # 2. Fallback to TF-IDF vectorizer if Gemini not available or index is tfidf
    if query_vec is None and vectorizer:
        query_vec = vectorizer.transform([query]).toarray().astype(np.float32)[0]
        norm = np.linalg.norm(query_vec)
        if norm > 0:
            query_vec = query_vec / norm

    if query_vec is None or np.all(query_vec == 0):
        return [], [], ""

    scores = np.dot(embeddings, query_vec)

    # Rank indices
    ranked_indices = np.argsort(scores)[::-1][:top_k]

    results = []
    matched_products = []
    seen_products = set()
    context_chunks = []

    for idx in ranked_indices:
        score = float(scores[idx])
        doc = metadata_list[idx]
        
        # Keep items above minimum score
        if score < min_score and len(results) > 0:
            continue

        results.append({
            "score": round(score, 4),
            "id": doc["id"],
            "type": doc["type"],
            "metadata": doc["metadata"],
        })
        context_chunks.append(doc["text"])

        # Collect unique products for UI preview cards
        if doc["type"] == "product":
            prod_meta = doc["metadata"]
            prod_slug = prod_meta.get("slug")
            if prod_slug and prod_slug not in seen_products:
                seen_products.add(prod_slug)
                matched_products.append(prod_meta)

    context_str = "\n\n---\n\n".join(context_chunks)
    return results, matched_products[:3], context_str
