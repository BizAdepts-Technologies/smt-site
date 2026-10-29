"""
Chat Service for SMT RAG Chatbot.
Combines strict semantic retrieval with Google Gemini 1.5 Flash grounded generation.
"""
import os
from pathlib import Path
from dotenv import load_dotenv

from .retriever import retrieve

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

SYSTEM_INSTRUCTION = """
You are the SMT Furniture Solutions AI Assistant, representing Sahab Al Mabelah Trading LLC in Oman.
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


def answer_query(message: str, history: list = None):
    """
    Answers a client query strictly using SMT platform content.
    Returns:
      {
        "answer": str,
        "matched_products": list,
        "suggested_questions": list,
        "powered_by": str
      }
    """
    cleaned_query = message.strip()
    if not cleaned_query:
        return {
            "answer": "How can I assist you with SMT's furniture fittings, aluminium profiles, or luxury handles today?",
            "matched_products": [],
            "suggested_questions": [
                "Show me Hettich Gola handleless profiles",
                "Where is your warehouse in Muscat?",
                "Do you have soft-close corner storage units?"
            ],
            "powered_by": "smt_rag"
        }

    # 1. Semantic Retrieval
    results, matched_products, context_str = retrieve(cleaned_query, top_k=5)

    # 2. Check if query is completely irrelevant / out of domain
    max_score = results[0]["score"] if results else 0.0
    if not results or max_score < 0.05:
        return {
            "answer": (
                "I am specifically trained on SMT Furniture Solutions' catalog and services. "
                "I don't have information regarding that topic, but I would be pleased to help you explore "
                "our authorized Hettich hardware, aluminium profiles, smart locks, or connect you with our "
                "Muscat showroom team at **+968 2412 3456**."
            ),
            "matched_products": [],
            "suggested_questions": [
                "Explore Aluminium Profiles",
                "Show Hettich Luxury Handles",
                "Kitchen Storage Solutions"
            ],
            "powered_by": "smt_grounding_filter"
        }

    # 3. Check for Gemini API key
    api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    
    if api_key:
        try:
            from .gemini_client import generate_response
            answer_text = generate_response(context_str, cleaned_query)

            if answer_text:
                # Formulate dynamic suggestions based on matched products
                suggestions = []
                for p in matched_products[:2]:
                    suggestions.append(f"Tell me more about {p['title']}")
                suggestions.append("Where is your warehouse in Muscat?")

                return {
                    "answer": answer_text,
                    "matched_products": matched_products,
                    "suggested_questions": suggestions[:3],
                    "powered_by": "gemini-2.5-flash"
                }
        except Exception as e:
            print(f"Gemini API call failed: {e}. Falling back to structured response.")

    # 4. Fallback if Gemini key is missing or failed (still delivers retrieved data)
    top_matches_text = []
    for r in results[:3]:
        meta = r["metadata"]
        title = meta.get("title") or "Item"
        top_matches_text.append(f"* **{title}**")

    matches_summary = "\n".join(top_matches_text)
    return {
        "answer": (
            f"Here are the most relevant solutions from the SMT Furniture Solutions catalog:\n\n"
            f"{matches_summary}\n\n"
            f"You can explore the product details below, or contact our Muscat team directly at **+968 2412 3456**."
        ),
        "matched_products": matched_products,
        "suggested_questions": [
            "Explore Aluminium Profiles",
            "Show Hettich Door Handles",
            "Where are your branches in Oman?"
        ],
        "powered_by": "smt_local_retriever"
    }
