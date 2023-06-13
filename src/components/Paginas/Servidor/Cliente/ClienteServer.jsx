const API_URL = "http://127.0.0.1:8000/api/clientes";

export const listClientes = async () => {
    return await fetch(API_URL);
};

export const getCliente = async (clienteId) => {
    return await fetch(`${API_URL}/${clienteId}`);
};

export const getClienteByCorreo = async (correo) => {
    return await fetch(`${API_URL}//${correo}`);
};


export const registerCliente= async (newCliente) => {
    return await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            "name":String(newCliente.name).trim(),
            "apellidos":String(newCliente.apellidos).trim(),
            "fechaNacimiento":String(newCliente.fechaNacimiento).trim(),
            "rfc":String(newCliente.rfc).trim(),
            "correo":String(newCliente.correo).trim(),
            "telefono":String(newCliente.telefono).trim(),
            "password":String(newCliente.password).trim(),
            "rol":String(newCliente.rol).trim(),
        })
    });
};

export const updateCliente = async (clienteId, updatedCliente) => {
    return await fetch(`${API_URL}/${clienteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "name": String(updatedCliente.name).trim(),
            "apellidos": String(updatedCliente.apellidos).trim(),
            "fechaNacimiento": String(updatedCliente.fechaNacimiento).trim(),
            "rfc": String(updatedCliente.rfc).trim(),
            "correo": String(updatedCliente.correo).trim(),
            "telefono": String(updatedCliente.telefono).trim(),
            "password": String(updatedCliente.password).trim(),
            "rol": String(updatedCliente.rol).trim(),
        })
    });
};

export const deleteCliente = async (clienteId) => {
    return await fetch (`${API_URL}/${clienteId}`, {
        method: 'DELETE'
    });
};