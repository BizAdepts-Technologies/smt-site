"""
Persistent Indexer for SMT Knowledge Base.
Supports Google Gemini text-embedding-004, with automatic local TF-IDF fallback.
"""
import os
import json
import pickle
import numpy as np
from pathlib import Path
from dotenv import load_dotenv

from .extractor import extract_all_documents

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

INDEX_DIR = Path(__file__).resolve().parent / "index_data"


def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    if not api_key:
        return None
    try:
        from google import genai
        return genai.Client(api_key=api_key)
    except Exception as e:
        print(f"Warning: Could not initialize Gemini client: {e}")
        return None


def build_index():
    """
    Builds the vector index from all platform documents and writes it to disk.
    """
    INDEX_DIR.mkdir(parents=True, exist_ok=True)
    documents = extract_all_documents()

    if not documents:
        print("No documents found to index.")
        return False

    texts = [doc["text"] for doc in documents]
    metadata_list = [
        {
            "id": doc["id"],
            "type": doc["type"],
            "metadata": doc["metadata"],
            "text": doc["text"]
        }
        for doc in documents
    ]

    from .gemini_client import embed_batch, get_api_key
    api_key = get_api_key()
    embedding_type = "tfidf"
    embed_model = "gemini-embedding-001"

    if api_key:
        print(f"Generating Gemini {embed_model} embeddings for {len(texts)} documents...")
        try:
            all_embeddings = []
            chunk_size = 10
            success = True
            for i in range(0, len(texts), chunk_size):
                batch = texts[i:i + chunk_size]
                batch_res = embed_batch(batch, model=embed_model)
                if batch_res and len(batch_res) == len(batch):
                    all_embeddings.extend(batch_res)
                else:
                    success = False
                    break

            if success and len(all_embeddings) == len(texts):
                embeddings = np.array(all_embeddings, dtype=np.float32)
                norms = np.linalg.norm(embeddings, axis=1, keepdims=True)
                norms[norms == 0] = 1.0
                embeddings = embeddings / norms
                embedding_type = "gemini"
                print(f"Successfully generated Gemini embeddings of shape {embeddings.shape}!")
            else:
                print("Gemini batch embedding incomplete. Falling back to local TF-IDF.")
        except Exception as e:
            print(f"Gemini embedding generation failed ({e}). Falling back to local TF-IDF vectorizer.")

    if embedding_type != "gemini":
        print(f"Building local TF-IDF vector index for {len(texts)} documents...")
        from sklearn.feature_extraction.text import TfidfVectorizer
        vectorizer = TfidfVectorizer(max_features=1500, stop_words='english', ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform(texts).toarray().astype(np.float32)
        # Normalize
        norms = np.linalg.norm(tfidf_matrix, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        embeddings = tfidf_matrix / norms
        embedding_type = "tfidf"
        with open(INDEX_DIR / "vectorizer.pkl", "wb") as f:
            pickle.dump(vectorizer, f)
        print(f"Local TF-IDF vector index built successfully! Shape: {embeddings.shape}")

    # Save embeddings and metadata
    np.save(INDEX_DIR / "embeddings.npy", embeddings)
    with open(INDEX_DIR / "metadata.json", "w", encoding="utf-8") as f:
        json.dump(metadata_list, f, ensure_ascii=False, indent=2)

    index_info = {
        "embedding_type": embedding_type,
        "model_name": embed_model if embedding_type == "gemini" else None,
        "count": len(documents),
        "dimension": int(embeddings.shape[1]),
    }
    with open(INDEX_DIR / "index_info.json", "w", encoding="utf-8") as f:
        json.dump(index_info, f, indent=2)

    print(f"Vector index saved to {INDEX_DIR} (Type: {embedding_type.upper()}). Ready for instant retrieval!")
    return True
