"""
Lightweight REST Client for Google Gemini API.
Uses standard Python requests to ensure 100% stability on Windows without httpx socket resets.
"""
import os
import requests
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

SYSTEM_INSTRUCTION = """
You are the SMT Furniture Solutions AI Specialist representing Sahab Al Mabelah Trading LLC in Oman.
You assist architects, interior designers, cabinet makers, contractors, and clients who visit our website.

STRICT GROUNDING RULES:
1. ONLY answer using the facts provided in the SMT PLATFORM CONTEXT below.
2. If the question asks about anything NOT covered in the context (such as unrelated topics, competitor brands, items we do not carry, or general knowledge), reply politely:
   "I am specifically trained on SMT Furniture Solutions' catalog and services. I don't have information on that topic, but I would be glad to help you explore our Hettich fittings, aluminium profiles, luxury door handles, or connect you with our Muscat team (+968 2412 3456)."
3. NEVER make up specifications, dimensions, materials, or pricing not explicitly stated in the context.
4. When mentioning products, refer to them accurately and highlight their key benefits.
5. If the user asks about branches or where to visit, mention our central 1,000 sqm warehouse in Ghala (Muscat) and branches in Salalah, Nizwa, Sohar, Barka, and Al Mabelah.
6. Keep your answers concise, refined, professional, and well-structured with markdown bullet points.
""".strip()


def get_api_key():
    return os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")


def embed_single(text: str, model: str = "gemini-embedding-001"):
    key = get_api_key()
    if not key:
        return None
    url = f"{API_BASE}/{model}:embedContent?key={key}"
    try:
        resp = requests.post(
            url,
            json={"content": {"parts": [{"text": text}]}},
            timeout=15
        )
        if resp.status_code == 200:
            return resp.json().get("embedding", {}).get("values")
        return None
    except Exception as e:
        print(f"Error in embed_single: {e}")
        return None


def embed_batch(texts: list, model: str = "gemini-embedding-001"):
    key = get_api_key()
    if not key:
        return None
    url = f"{API_BASE}/{model}:batchEmbedContents?key={key}"
    try:
        payload = {
            "requests": [
                {
                    "model": f"models/{model}",
                    "content": {"parts": [{"text": t}]}
                }
                for t in texts
            ]
        }
        resp = requests.post(url, json=payload, timeout=30)
        if resp.status_code == 200:
            embeddings_data = resp.json().get("embeddings", [])
            return [e.get("values") for e in embeddings_data]
        else:
            print(f"batchEmbedContents error ({resp.status_code}): {resp.text}")
            return None
    except Exception as e:
        print(f"Error in embed_batch: {e}")
        return None


def generate_response(context_str: str, user_query: str, model: str = "gemini-2.5-flash"):
    key = get_api_key()
    if not key:
        return None

    prompt = (
        f"SMT PLATFORM CONTEXT:\n{context_str}\n\n"
        f"CUSTOMER INQUIRY:\n{user_query}"
    )
    payload = {
        "system_instruction": {
            "parts": [{"text": SYSTEM_INSTRUCTION}]
        },
        "contents": [
            {
                "parts": [{"text": prompt}]
            }
        ],
        "generationConfig": {
            "temperature": 0.2,
            "maxOutputTokens": 500
        }
    }

    # Models to attempt in order
    candidate_models = [model]
    if model != "gemini-1.5-flash":
        candidate_models.append("gemini-1.5-flash")

    for current_model in candidate_models:
        url = f"{API_BASE}/{current_model}:generateContent?key={key}"
        try:
            # 5s connect timeout, 45s read timeout for slow connections
            resp = requests.post(url, json=payload, timeout=(5, 45))
            if resp.status_code == 200:
                candidates = resp.json().get("candidates", [])
                if candidates:
                    parts = candidates[0].get("content", {}).get("parts", [])
                    if parts:
                        return parts[0].get("text", "").strip()
            else:
                print(f"generateContent ({current_model}) returned {resp.status_code}, trying next model...")
        except requests.exceptions.Timeout:
            print(f"Request timed out on {current_model}, trying fast fallback...")
            continue
        except Exception as e:
            print(f"Error on {current_model}: {e}")
            continue

    return None
