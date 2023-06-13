from django.http.response import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from .models import Cliente, Empleado, Prestamo, Referencia, Pago
import json

# Create your views here.

# View Clientes


class ClienteView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0, correo=" "):
        if (id == 0 and correo != " "):
            clientes = list(Cliente.objects.filter(correo=correo).values())
            if len(clientes) > 0:
                cliente = clientes[0]
                datos = {'message': "Seccess", 'clientes': cliente}
            else:
                datos = {'message': "Clientes not found"}
            return JsonResponse(datos)
        elif (id > 0):
            clientes = list(Cliente.objects.filter(id=id).values())
            if len(clientes) > 0:
                cliente = clientes[0]
                datos = {'message': "Seccess", 'clientes': cliente}
            else:
                datos = {'message': "Clientes not found"}
            return JsonResponse(datos)
        else:
            clientes = list(Cliente.objects.values())
            if len(clientes) > 0:
                datos = {'message': "Seccess", 'clientes': clientes}
            else:
                datos = {'message': "Clientes not found"}
            return JsonResponse(datos)

    def post(self, request):
        # print(request.body)
        clientes = list(Cliente.objects.values())
        jd = json.loads(request.body)
        x = 0
        for cliente in clientes:
            if jd['correo'] == cliente['correo']:
                x = 1
        if (x == 0):
            # jd = json.loads(request.body)
            Cliente.objects.create(name=jd['name'], apellidos=jd['apellidos'],
                                   fechaNacimiento=jd['fechaNacimiento'], rfc=jd['rfc'],
                                   correo=jd['correo'], telefono=jd['telefono'], password=jd['password'],
                                   rol=jd['rol'])
            datos = {'message': "Success"}
        else:
            datos = {'message': "clientes not found"}
        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        x = 0
        clientes1 = list(Cliente.objects.values())
        for cliente1 in clientes1:
                    if jd['correo'] == cliente1['correo']:
                        x = 1
                        print(1)
        clientes = list(Cliente.objects.filter(id=id).values())
        for cliente in clientes:
                    if jd['correo'] == cliente['correo']:
                        x = 0
                        print(2)
        if len(clientes) > 0 and x == 0:
            cliente = Cliente.objects.get(id=id)
            cliente.name = jd['name']
            cliente.apellidos = jd['apellidos']
            cliente.fechaNacimiento = jd['fechaNacimiento']
            cliente.rfc = jd['rfc']
            cliente.correo = jd['correo']
            cliente.telefono = jd['telefono']
            cliente.password = jd['password']
            cliente.rol = jd['rol']
            cliente.save()
            datos = {'message': "Success"}
        elif x == 1:
            datos = {'message': "Correo"}
            print(3)
        else:
            datos = {'message': "clientes not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        clientes = list(Cliente.objects.filter(id=id).values())
        if len(clientes) > 0:
            Cliente.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Clientes not found"}
        return JsonResponse(datos)

# View Empleados


class EmpleadoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0, correo=" "):
        if (id == 0 and correo != " "):
            empleados = list(Empleado.objects.filter(correo=correo).values())
            if len(empleados) > 0:
                empleado = empleados[0]
                datos = {'message': "Seccess", 'empleados': empleado}
            else:
                datos = {'message': "Empleados not found"}
            return JsonResponse(datos)
        elif (id > 0):
            empleados = list(Empleado.objects.filter(id=id).values())
            if len(empleados) > 0:
                empleado = empleados[0]
                datos = {'message': "Seccess", 'empleados': empleado}
            else:
                datos = {'message': "Empleados not found"}
            return JsonResponse(datos)        
        else:
            empleados = list(Empleado.objects.values())
            if len(empleados) > 0:
                datos = {'message': "Seccess", 'empleados': empleados}
            else:
                datos = {'message': "Empleados not found"}
            return JsonResponse(datos)

    def post(self, request):
        # print(request.body)
        empleados = list(Empleado.objects.values())
        jd = json.loads(request.body)
        x = 0
        for empleado in empleados:
            if jd['correo'] == empleado['correo']:
                x = 1
        if (x == 0):
            # jd = json.loads(request.body)
            Empleado.objects.create(name=jd['name'], apellidos=jd['apellidos'],
                                    fechaNacimiento=jd['fechaNacimiento'], rfc=jd['rfc'],
                                    correo=jd['correo'], telefono=jd['telefono'], password=jd['password'],
                                    rol=jd['rol'])
            datos = {'message': "Success"}
        else:
            datos = {'message': "Empleados not found"}
        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        x = 0
        empleados1 = list(Empleado.objects.values())
        for empleado1 in empleados1:
                    if jd['correo'] == empleado1['correo']:
                        x = 1
                        print(1)
        empleados = list(Empleado.objects.filter(id=id).values())
        for empleado in empleados:
                    if jd['correo'] == empleado['correo']:
                        x = 0
                        print(2)
        
        print(jd['correo'])
        if len(empleados) > 0 and x == 0:
            empleado = Empleado.objects.get(id=id)
            empleado.name = jd['name']
            empleado.apellidos = jd['apellidos']
            empleado.fechaNacimiento = jd['fechaNacimiento']
            empleado.rfc = jd['rfc']
            empleado.correo = jd['correo']
            empleado.telefono = jd['telefono']
            empleado.password = jd['password']
            empleado.rol = jd['rol']
            empleado.save()
            datos = {'message': "Success"}
        elif x == 1:
            datos = {'message': "Correo"}
            print(3)
        else:
            datos = {'message': "Empleados not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        empleados = list(Empleado.objects.filter(id=id).values())
        if len(empleados) > 0:
            Empleado.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Empleados not found"}
        return JsonResponse(datos)


# View Prestamos


class PrestamoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            prestamos = list(Prestamo.objects.filter(id=id).values())
            if len(prestamos) > 0:
                prestamo = prestamos[0]
                datos = {'message': "Seccess", 'prestamos': prestamo}
            else:
                datos = {'message': "Prestamos not found"}
            return JsonResponse(datos)
        else:
            prestamos = list(Prestamo.objects.values())
            if len(prestamos) > 0:
                datos = {'message': "Seccess", 'prestamos': prestamos}
            else:
                datos = {'message': "Prestamos not found"}
            return JsonResponse(datos)

    def post(self, request):
        # print(request.body)
        prestamos = list(Prestamo.objects.values())
        jd = json.loads(request.body)
        x = 0
        for prestamo in prestamos:
            # print(prestamo['cliente_id'])
            # print(jd['cliente_id'])
            int_ClienteId = int(jd['cliente_id'])
            if int_ClienteId == prestamo['cliente_id']:
                print("Son iguales")
                if prestamo['status'] == "Activo":
                    print("Activo")
                    x = 1
        if (x == 0):
            Prestamo.objects.create(status=jd['status'], monto=jd['monto'],
                                    pagos=jd['pagos'], adeudo=jd['adeudo'], cliente_id=jd['cliente_id'])
            datos = {'message': "Success"}
        else:
            datos = {'message': "Cliente con un prestamo activo"}
        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        prestamos = list(Prestamo.objects.filter(id=id).values())
        if len(prestamos) > 0:
            prestamo = Prestamo.objects.get(id=id)
            prestamo.status = jd['status']
            prestamo.monto = jd['monto']
            prestamo.pagos = jd['pagos']
            prestamo.adeudo = jd['adeudo']
            prestamo.cliente_id = jd['cliente_id']
            prestamo.save()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Prestamos not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        prestamos = list(Prestamo.objects.filter(id=id).values())
        if len(prestamos) > 0:
            Prestamo.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Prestamos not found"}
        return JsonResponse(datos)
    
# view Referencias

class ReferenciaView(View):
    
    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
    def get(self, request, id=0):
        if (id > 0):
            referencias = list(Referencia.objects.filter(id=id).values())
            if len(referencias) > 0:
                referencia = referencias[0]
                datos = {'message': "Success", 'referencias': referencia}
            else:
                datos = {'message': "Referencia not found"}
        else:
            referencias = list(Referencia.objects.values())
            if len(referencias) > 0:
                datos = {'message': "Success", 'referencias': referencias}
            else:
                datos = {'message': "Referencia not found"}
        return JsonResponse(datos)

    def post(self, request):
        pagos = list(Pago.objects.values())
        jd = json.loads(request.body)
        Pago.objects.create(monto = jd['monto'], tarjeta=jd['tarjeta'],
                                    fecha=jd['fecha'], prestamo_id = jd['prestamo_id'], cliente_id=jd['cliente_id'])
        datos = {'message': "Success"}
        return JsonResponse(datos)
        print(datos)

    def post(self, request):
        referencias = list(Referencia.objects.values())
        jd = json.loads(request.body)
        Referencia.objects.create(personales_exists=jd['personales_exists'], crediticias_exists=jd['crediticias_exists'],
                                bancarias_exists=jd['bancarias_exists'], laborales_exists = jd['laborales_exists'], cliente_id=jd['cliente_id'])
        datos = {'message': "Success"}
        return JsonResponse(datos)
        print(datos)
    
    def put(self, request, id):
        jd = json.loads(request.body)
        referencias = list(Referencia.objects.filter(id=id).values())
        if len(referencias) > 0:
            referencia = Referencia.objects.get(id=id)
            referencia.personales_exists = jd['personales_exists']
            referencia.crediticias_exists = jd['crediticias_exists']
            referencia.bancarias_exists = jd['bancarias_exists']
            referencia.laborales_exists = jd['laborales_exists']
            referencia.cliente_id = jd['cliente_id']
            referencia.save()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Referencia not found"}
        return JsonResponse(datos)

    def delete(self, request, id):
        referencias = list(Referencia.objects.filter(id=id).values())
        if len(referencias) > 0:
            Referencia.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Referencia not found"}
        return JsonResponse(datos)


# View Pago

class PagoView(View):

    @method_decorator(csrf_exempt)
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def get(self, request, id=0):
        if (id > 0):
            pagos = list(Pago.objects.filter(id=id).values())
            if len(pagos) > 0:
                pago = pagos[0]
                datos = {'message': "Seccess", 'pagos': pago}
            else:
                datos = {'message': "Pagos not found"}
            return JsonResponse(datos)
        else:
            pagos = list(Pago.objects.values())
            if len(pagos) > 0:
                datos = {'message': "Seccess", 'pagos': pagos}
            else:
                datos = {'message': "Pagos not found"}
            return JsonResponse(datos)
    
    def post(self, request):
        pagos = list(Pago.objects.values())
        jd = json.loads(request.body)
        Pago.objects.create(monto = jd['monto'], tarjeta=jd['tarjeta'],
                                    fecha=jd['fecha'], prestamo_id = jd['prestamo_id'], cliente_id=jd['cliente_id'])
        datos = {'message': "Success"}
        return JsonResponse(datos)
        print(datos)

    def put(self, request, id):
        jd = json.loads(request.body)
        try:
            pago = Pago.objects.get(id=id)
            pago.monto = jd.get('monto', pago.monto)
            pago.tarjeta = jd.get('tarjeta', pago.tarjeta)
            pago.fecha = jd.get('fecha', pago.fecha)
            pago.prestamo_id = jd.get('prestamo_id', pago.prestamo_id)
            pago.cliente_id = jd.get('cliente_id', pago.cliente_id)
            pago.save()
            datos = {'message': "Success"}
        except Pago.DoesNotExist:
            datos = {'message': "Pagos not found"}
        return JsonResponse(datos)


    def delete(self, request, id):
        pagos = list(Pago.objects.filter(id=id).values())
        if len(pagos) > 0:
            Pago.objects.filter(id=id).delete()
            datos = {'message': "Success"}
        else:
            datos = {'message': "Pagos not found"}
        return JsonResponse(datos)
