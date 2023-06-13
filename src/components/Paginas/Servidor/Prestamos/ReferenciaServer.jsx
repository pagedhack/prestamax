const API_URL = "http://localhost:8000/api/referencias";

export const listReferencias = async () => {
    return await fetch(API_URL);
};

export const getReferencia = async (referenciaId) => {
    return await fetch(`${API_URL}/${referenciaId}`);
};

export const registerReferencia = async (newReferencia) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/jason'
        },
        body: JSON.stringify({
            "personales_exists": String(newReferencia.personales_exists).trim(),
            "crediticias_exists": String(newReferencia.crediticias_exists).trim(),
            "bancarias_exists": String(newReferencia.bancarias_exists).trim(),
            "laborales_exists": String(newReferencia.laborales_exists).trim(),
            "cliente_id":String(newReferencia.cliente_id).trim(),
        })
    });
};

export const updateReferencia = async (referenciaId, updatedReferencia) => {
    return await fetch(`${API_URL}/${referenciaId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "personales_exists": String(updatedReferencia.personales_exists).trim(),
            "crediticias_exists": String(updatedReferencia.crediticias_exists).trim(),
            "bancarias_exists": String(updatedReferencia.bancarias_exists).trim(),
            "laborales_exists": String(updatedReferencia.laborales_exists).trim(),
        })
    });
};

export const deleteReferencia = async (referenciaId) => {
    return await fetch (`${API_URL}/${referenciaId}`, {
        method: 'DELETE'
    });
};
