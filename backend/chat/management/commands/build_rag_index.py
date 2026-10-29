from django.core.management.base import BaseCommand
from rag.indexer import build_index


class Command(BaseCommand):
    help = 'Builds or re-indexes the SMT knowledge base vector index'

    def handle(self, *args, **options):
        self.stdout.write("Starting SMT knowledge base indexing...")
        success = build_index()
        if success:
            self.stdout.write(self.style.SUCCESS("Vector index built successfully!"))
        else:
            self.stdout.write(self.style.ERROR("Failed to build vector index."))
