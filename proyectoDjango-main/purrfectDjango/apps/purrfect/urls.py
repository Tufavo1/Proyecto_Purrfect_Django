from django.urls import path
from . import views

urlpatterns = [
    path('',views.cargarIndex),
    path('index',views.cargarIndex),#pagina inicio o "index"
    path('caninos',views.cargarCaninos),#pagina caninos
    path('mininos',views.cargarMininos),#pagina mininos
    path('alados',views.cargarAlados),#pagina alados
    path('acuaticos',views.cargarAcuaticos),#pagina acuaticos
    path('carrito',views.cargarCarrito),#carrito de compras
    path('login',views.cargarLogin),#iniciar sesion
    path('perfil',views.cargarPerfil),#perfil usuario o admin
    path('editUser',views.editUser),#editar usuario
    path('addSub', views.addSub),#agregar subscripcion
    path('delSub', views.delSub),#borrar subscripcion
    path('pago',views.pago),#pago en linea
    path('success',views.cargarSuccess),#
    path('admin', views.cargarAdmin),#administrador
    path('addProd',views.addProd),#agregar producto
    path('editProd',views.editProd),#editar producto
    path('delProd/<sku>',views.delProd),#borrar pedido id
    path('sendPed/<idB>',views.sendPed),#enviar pedido id
    path('deliverPed/<idB>',views.deliverPed),
    path('loginForm',views.logIn),#formulario login
    path('regForm',views.regForm),#formulario registro
    path('closeSession',views.closeSession),#cerrar sesion
    #api
    path('api/productos/', views.ProductoListAPIView.as_view(), name='producto-list'),#vista
    path('api/productos/Crear/', views.ProductoCreateAPIView.as_view(), name='producto-Crear'),#crear
    path('api/productos/<int:pk>/', views.ProductoRetrieveUpdateDestroyAPIView.as_view(), name='producto-detail'),#ver o modificar o eliminar o actualizar y colocar en el link el sku definido del producto
]