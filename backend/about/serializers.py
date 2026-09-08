from rest_framework import serializers
from .models import AboutParagraph

class AboutParagraphSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutParagraph
        fields = '__all__'
