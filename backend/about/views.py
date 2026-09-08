from rest_framework import viewsets, permissions
from .models import AboutParagraph
from .serializers import AboutParagraphSerializer

class AboutParagraphViewSet(viewsets.ModelViewSet):
    queryset = AboutParagraph.objects.all()
    serializer_class = AboutParagraphSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]
