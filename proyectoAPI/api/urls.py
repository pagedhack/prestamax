from django.urls import path
from .views import ClienteView, EmpleadoView, PagoView, PrestamoView, ReferenciaView

urlpatterns = [
    path('clientes', ClienteView.as_view(), name='clientes_list'),
    path('clientes//<correo>', ClienteView.as_view(), name='clientes_list'),
    path('clientes/<int:id>', ClienteView.as_view(), name='clientes_process'),
    path('empleados', EmpleadoView.as_view(), name='empleados_list'),
    path('empleados//<correo>', EmpleadoView.as_view(), name='empleados_list'),
    path('empleados/<int:id>', EmpleadoView.as_view(), name='empleados_process'),
    path('prestamos', PrestamoView.as_view(), name='prestamos_list'),
    path('prestamos/<int:id>', PrestamoView.as_view(), name='prestamos_process'),
    path('referencias', ReferenciaView.as_view(), name='referencias_list'),
    path('referencias/<int:id>', ReferenciaView.as_view(), name='referencias_process'),
    path('pagos', PagoView.as_view(), name='pagos_list'),
    path('pagos/<int:id>', PagoView.as_view(), name='pagos_process'),
]