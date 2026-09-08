from django.db import models

class AboutParagraph(models.Model):
    text = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Paragraph {self.order}"
