const API_URL = "http://127.0.0.1:8000/api/empleados";

export const listEmpleados = async () => {
    return await fetch(API_URL);
};

export const getEmpleado = async (empleadoId) => {
    return await fetch(`${API_URL}/${empleadoId}`);
};

export const getEmpleadoByCorreo = async (correo) => {
    return await fetch(`${API_URL}//${correo}`);
};


export const registerEmpleado= async (newEmpleado) => {
    return await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/jason'
        },
        body:JSON.stringify({
            "name":String(newEmpleado.name).trim(),
            "apellidos":String(newEmpleado.apellidos).trim(),
            "fechaNacimiento":String(newEmpleado.fechaNacimiento).trim(),
            "rfc":String(newEmpleado.rfc).trim(),
            "correo":String(newEmpleado.correo).trim(),
            "telefono":String(newEmpleado.telefono).trim(),
            "password":String(newEmpleado.password).trim(),
            "rol":String(newEmpleado.rol).trim(),
        })
    });
};

export const updateEmpleado = async (empleadoId, updatedEmpleado) => {
    return await fetch(`${API_URL}/${empleadoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": String(updatedEmpleado.name).trim(),
            "apellidos": String(updatedEmpleado.apellidos).trim(),
            "fechaNacimiento": String(updatedEmpleado.fechaNacimiento).trim(),
            "rfc": String(updatedEmpleado.rfc).trim(),
            "correo": String(updatedEmpleado.correo).trim(),
            "telefono": String(updatedEmpleado.telefono).trim(),
            "password": String(updatedEmpleado.password).trim(),
            "rol": String(updatedEmpleado.rol).trim(),
        })
    });
};

export const deleteEmpleado = async (empleadoId) => {
    return await fetch (`${API_URL}/${empleadoId}`, {
        method: 'DELETE'
    });
};