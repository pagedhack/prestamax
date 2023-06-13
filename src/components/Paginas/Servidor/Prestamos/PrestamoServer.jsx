const API_URL = "http://127.0.0.1:8000/api/prestamos";

export const listPrestamos = async () => {
    return await fetch(API_URL);
};

export const getPrestamo = async (prestamoId) => {
    return await fetch(`${API_URL}${prestamoId}`);
};


export const registerPrestamo= async (newPrestamo) => {
    return await fetch(API_URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/jason'
        },
        body:JSON.stringify({
            "status":String(newPrestamo.status).trim(),
            "monto":String(newPrestamo.monto).trim(),
            "pagos":String(newPrestamo.pagos).trim(),
            "cliente_id":String(newPrestamo.cliente_id).trim(),
        })
    });
};

export const updatePrestamo = async (prestamoId, updatedPrestamo) => {
    return await fetch(`${API_URL}${prestamoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "status": String(updatedPrestamo.status).trim(),
            "monto": String(updatedPrestamo.monto).trim(),
            "pagos": String(updatedPrestamo.pagos).trim(),
            "cliente_id": String(updatedPrestamo.cliente_id).trim(),
        })
    });
};

export const deletePrestamo = async (prestamoId) => {
    return await fetch (`${API_URL}${prestamoId}`, {
        method: 'DELETE'
    });
};
