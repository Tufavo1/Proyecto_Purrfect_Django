#este es para convertir los objetos del modelo en JSON
from rest_framework import serializers
from .models import Producto

#este convertira los objetos osea los "producto" en respuestas de la api y asi sucesivamente
class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'
