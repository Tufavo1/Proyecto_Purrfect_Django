from django.shortcuts import render, redirect
from .models import *
from .serializers import ProductoSerializer
from rest_framework import generics
import os
from django.conf import settings

def cargarIndex(request):
    productos = Producto.objects.filter(stock__gt="0")
    categorias = Categoria.objects.all()
    marcas = Producto.objects.values('marca').distinct()
    return render(request, "index.html",{"prod":productos, "cate": categorias, "marc": marcas})

def cargarCaninos(request):
    prodCan = Producto.objects.filter(stock__gt="0", animal='1')
    categorias = Categoria.objects.all()
    marcas = Producto.objects.values('marca').distinct()
    return render(request, "caninos.html", {"prod": prodCan, "cate": categorias, "marc": marcas})

def cargarMininos(request):
    prodMin = Producto.objects.filter(stock__gt="0", animal='2')
    categorias = Categoria.objects.all()
    marcas = Producto.objects.values('marca').distinct()
    return render(request, "mininos.html", {"prod": prodMin, "cate": categorias, "marc": marcas})

def cargarAlados(request):
    prodAve = Producto.objects.filter(stock__gt="0", animal='3')
    categorias = Categoria.objects.all()
    marcas = Producto.objects.values('marca').distinct()
    return render(request, "alados.html", {"prod": prodAve, "cate": categorias, "marc": marcas})

def cargarAcuaticos(request):
    prodAcua = Producto.objects.filter(stock__gt="0", animal='4')
    categorias = Categoria.objects.all()
    marcas = Producto.objects.values('marca').distinct()
    return render(request, "acuaticos.html", {"prod": prodAcua, "cate": categorias, "marc": marcas})

def cargarAdmin(request):
    if "tipo" in request.session:
        if request.session['tipo'] == 2:
            productos = Producto.objects.all()
            categorias = Categoria.objects.all()
            animales = Animal.objects.all()
            boletas = Boleta.objects.all()
            detalles = []
            for boleta in boletas:
                detalles.append(DetalleBoleta.objects.filter(id_boleta = boleta))
            return render(request, "admin.html", {"prod": productos, "cate": categorias, "anim": animales, 'bol': boletas, "det": detalles})
    return redirect("/")

def addProd(request):
    sku = request.POST['nuevoSku']
    nombre = request.POST['nuevoNombre']
    marca = request.POST['nuevoMarca']
    precio = request.POST['nuevoPrecio']
    stock = request.POST['nuevoStock']
    animal = Animal.objects.get(id = request.POST['nuevoAnimal'])
    categoria = Categoria.objects.get(id = request.POST['nuevoCategoria'])
    imagen = request.FILES['nuevoImagen']
    if 'nuevoHasPeso' in request.POST:
        has_peso = True
    else:
        has_peso = False
    Producto.objects.create(sku = sku, nombre = nombre, marca = marca, precio = precio, stock = stock, animal = animal, categoria = categoria, imagen = imagen, has_peso = has_peso)
    return redirect('/admin')

def editProd(request):
    sku = request.POST['idProducto']
    prod = Producto.objects.get(sku = sku)
    prod.nombre = request.POST['nombreProducto']
    prod.marca = request.POST['marcaProducto']
    prod.precio = request.POST['precioProducto']
    prod.stock = request.POST['stockProducto']
    prod.animal = Animal.objects.get(id = request.POST['animalProducto'])
    prod.categoria = Categoria.objects.get(id = request.POST['categoriaProducto'])
    if 'hasPesoProducto' in request.POST:
        prod.has_peso = True
    else:
        prod.has_peso = False
    try:
        imagen = request.FILES['imagenProducto']
        os.remove(os.path.join(settings.MEDIA_ROOT, str(prod.imagen)))
    except:
        imagen = prod.imagen
    prod.imagen = imagen
    prod.save()
    return redirect('/admin')

def delProd(request,sku):
    prod = Producto.objects.get(sku = sku)
    os.remove(os.path.join(settings.MEDIA_ROOT, str(prod.imagen)))
    prod.delete()
    return redirect('/admin')

def sendPed(request, idB):
    ped = Boleta.objects.get(id = idB)
    ped.estado = "Enviado"
    ped.save()
    return redirect('/admin')

def deliverPed(request, idB):
    ped = Boleta.objects.get(id = idB)
    ped.estado = "Entregado"
    ped.save()
    return redirect('/admin')

def cargarCarrito(request):
    if 'username' in request.session:
        return render(request, "carrito.html")
    else:
        return redirect("/")
    
def pago(request):
    listaProd = request.POST.getlist('idProd')
    listaCant = request.POST.getlist('cantProd')
    total = request.POST['total']
    username = request.session['username']
    user = User.objects.get(username = username)
    boleta = Boleta.objects.create(comprador = user,total = total)
    for i in range(0, len(listaProd)):
        prod_sku = listaProd[i]
        prod = Producto.objects.get(sku = prod_sku)
        cant = listaCant[i]
        DetalleBoleta.objects.create(id_boleta = boleta, producto = prod, cantidad = cant)
        prod.stock -= int(cant)
        prod.save()
    detalle = DetalleBoleta.objects.filter(id_boleta = boleta)
    return render(request, "success.html", {"boleta": boleta, "detalle": detalle})

def cargarSuccess(request):
    return render(request, "success.html")

def cargarLogin(request):
    return render(request, "login.html")

def logIn(request):
    username = request.POST['username']
    password = request.POST['password']
    try:
        user = User.objects.get(username=username, password=password)
        request.session['username'] = user.username
        request.session['password'] = user.password
        request.session['email'] = user.email
        request.session['nombre'] = user.nombre
        request.session['direccion'] = user.direccion
        request.session['telefono'] = user.telefono
        request.session['subscribed'] = user.subscribed
        request.session['tipo'] = user.tipo.id
        return redirect("/perfil")
    except:
        return render(request, "login.html", {"error": "Las credenciales no son válidas"})
    
def regForm(request):
    username = request.POST['rUsername']
    password = request.POST['rContraseña']
    email = request.POST['rEmail']
    nombre = request.POST['rNombre']
    direccion = request.POST['rDireccion']
    telefono = request.POST['rTelefono']
    tipo = Cargo.objects.get(id = "1")
    User.objects.create(username = username, password = password, email = email, nombre = nombre, direccion = direccion, telefono = telefono, tipo = tipo)
    user = User.objects.get(username=username, password=password)
    request.session['username'] = user.username
    request.session['password'] = user.password
    request.session['email'] = user.email
    request.session['nombre'] = user.nombre
    request.session['direccion'] = user.direccion
    request.session['telefono'] = user.telefono
    request.session['subscribed'] = user.subscribed
    request.session['tipo'] = user.tipo.id
    return redirect('/perfil')

def closeSession(request):
    del request.session['username']
    del request.session['password']
    del request.session['email']
    del request.session['nombre']
    del request.session['direccion']
    del request.session['telefono']
    del request.session['subscribed']
    del request.session['tipo']
    return redirect("/")

def cargarPerfil(request):
    if 'username' in request.session:
        boletas = Boleta.objects.filter(comprador = request.session['username'])
        detalles = []
        for boleta in boletas:
            detalles.append(DetalleBoleta.objects.filter(id_boleta = boleta))
        return render(request, "perfil.html",{'bol': boletas, "det": detalles})
    else:
        return redirect("/")

def editUser(request):
    username = request.POST['eUsername']
    user = User.objects.get(username = username)
    user.password = request.POST['ePassword']
    user.email = request.POST['eEmail']
    user.nombre = request.POST['eNombre']
    user.direccion = request.POST['eDireccion']
    user.telefono = request.POST['eTelefono']
    user.save()
    request.session['password'] = user.password
    request.session['email'] = user.email
    request.session['nombre'] = user.nombre
    request.session['direccion'] = user.direccion
    request.session['telefono'] = user.telefono
    return redirect('/perfil')

def addSub(request):
    username = request.session['username']
    user = User.objects.get(username = username)
    user.subscribed = True
    user.save()
    request.session['subscribed'] = user.subscribed
    return redirect('/perfil')

def delSub(request):
    username = request.session['username']
    user = User.objects.get(username = username)
    user.subscribed = False
    user.save()
    request.session['subscribed'] = user.subscribed
    return redirect('/perfil')

#esta vista es para listar todos los productos en la api
class ProductoListAPIView(generics.ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

#en esta vista se utilizara para crear un producto en la api
class ProductoCreateAPIView(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

#esta vista se utilizara para obtener, actualizar o eliminar un producto especifico en la api
class ProductoRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer