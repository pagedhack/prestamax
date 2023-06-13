from django.contrib import admin
from .models import Cliente, Empleado, Prestamo, Porcentaje, Referencia, Pago

# Register your models here.

admin.site.register(Cliente)
admin.site.register(Empleado)
admin.site.register(Prestamo)
admin.site.register(Porcentaje)
admin.site.register(Referencia)
admin.site.register(Pago)