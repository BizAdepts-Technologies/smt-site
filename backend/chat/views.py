from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rag.chat_service import answer_query


class ChatAPIView(APIView):
    """
    Public Chat API for SMT Furniture Solutions.
    Accepts: { "message": "user question", "history": [...] }
    Returns grounded answers strictly from the SMT platform knowledge base.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            message = request.data.get('message', '')
            if not message or not isinstance(message, str):
                return Response(
                    {"error": "Please provide a valid question in the 'message' field."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            history = request.data.get('history', [])
            result = answer_query(message, history)
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": f"Error processing query: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
