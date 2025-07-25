from rest_framework.decorators import api_view
from rest_framework.response import Response
from PIL import Image
from .model_utils import generate_caption

@api_view(['POST'])
def caption_view(request):
    image_file = request.FILES.get('image')
    if not image_file:
        return Response({"error": "No image provided"}, status=400)
    image = Image.open(image_file)
    caption = generate_caption(image)
    return Response({"caption": caption})
