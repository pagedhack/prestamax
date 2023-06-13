import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as ReferenciaServer from "./ReferenciaServer";
import * as ClienteServer from "../Cliente/ClienteServer"


const ReferenciaItem=({ referencia, listReferencias })=>{
    const history = useHistory();

const [cliente,setCliente]=useState([])

const handleNom = async () =>  { 
    const data = await (await ClienteServer.getCliente(referencia.cliente_id)).json();
    setCliente(data.clientes);
    console.log(data);
};

    const handleDelete = async (referenciaId) =>  { 
        await ReferenciaServer.deleteReferencia(referenciaId);
        listReferencias();
    };

    useEffect(()=>{ handleNom()},[]);

    return (
        <div className="row">

            <div className="card card-body">
                {/* <h3 className="card-title">{referencia.name}</h3> */}
                <p className="card-text" style={{ color: referencia.personales_exists ? 'green' : 'red' }}>
                    Personales: <strong>{referencia.personales_exists.toString()}</strong>
                </p>
                <p className="card-text" style={{ color: referencia.bancarias_exists ? 'green' : 'red' }}>Bancarias: <strong>{referencia.bancarias_exists.toString()}</strong></p>
                <p className="card-text" style={{ color: referencia.crediticias_exists ? 'green' : 'red' }}>Crediticias: <strong>{referencia.crediticias_exists.toString()}</strong></p>
                <p className="card-text" style={{ color: referencia.laborales_exists ? 'green' : 'red' }}>Laborales: <strong>{referencia.laborales_exists.toString()}</strong></p>
                <p className="card-text">Referencias de cliente: <strong>{referencia.cliente_id}</strong></p>
                {/* <p className="card-text">Nombre cliente: <strong>{cliente.name + " " + cliente.apellidos}</strong></p> */}
                {referencia.personales_exists && referencia.crediticias_exists && referencia.bancarias_exists && referencia.laborales_exists ? (
                    <p className="factibilidad-factible">Aprobado</p>
                ) : (
                    <p className="factibilidad-no-factible">En espera</p>
                )}
            </div>

        </div>

    );


};

export default ReferenciaItem;