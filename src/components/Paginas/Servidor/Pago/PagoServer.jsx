const API_URL = "http://localhost:8000/api/pagos";

export const listPagos = async () => {
    return await fetch(API_URL);
};

export const getPago = async (pagoId) => {
    return await fetch(`${API_URL}/${pagoId}`);
};


export const registerPago = async (newPago) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/jason'
        },
        body: JSON.stringify({
            "monto": String(newPago.monto).trim(),
            "tarjeta": String(newPago.tarjeta).trim(),
            "fecha": String(newPago.fecha).trim(),
            "prestamo_id": String(newPago.prestamo_id).trim(),
            "cliente_id": String(newPago.cliente_id).trim(),
        })
    });
};

export const updatePago = async (pagoId, updatedPago) => {
    return await fetch(`${API_URL}/${pagoId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "status": String(updatedPago.status).trim(),
            "monto": String(updatedPago.monto).trim(),
            "pagos": String(updatedPago.pagos).trim(),
            "adeudo": String(updatedPago.adeudo).trim(),
            "cliente_id": String(updatedPago.cliente_id).trim(),
        })
    });
};

export const deletePago = async (pagoId) => {
    return await fetch(`${API_URL}/${pagoId}`, {
        method: 'DELETE'
    });
};