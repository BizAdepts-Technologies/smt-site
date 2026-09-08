from django.db import models

class CompanyInfo(models.Model):
    name = models.CharField(max_length=255, default="Sahab Al Mabelah")
    full_name = models.CharField(max_length=255, default="Sahab Al Mabelah Trading LLC")
    tagline = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, default="Muscat, Sultanate of Oman")
    email = models.EmailField(default="info@sahabalmabelah.com")
    phone = models.CharField(max_length=50, default="+968 2412 3456")
    address = models.TextField(blank=True, null=True)
    founded_year = models.CharField(max_length=4, default="2007")
    founder = models.CharField(max_length=255, default="Mr. Shameem Shah")
    employees_count = models.IntegerField(default=25)
    branches_count = models.IntegerField(default=6)

    class Meta:
        verbose_name_plural = "Company Information"

    def __str__(self):
        return f"{self.name} Info"
