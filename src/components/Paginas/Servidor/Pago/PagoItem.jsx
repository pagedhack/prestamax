import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import * as PagoServer from "./PagoServer";
import * as ClienteServer from "../Cliente/ClienteServer"


const PagoItem=({ pago, listPagos })=>{
    const history = useHistory();

const [cliente,setCliente]=useState([])

console.log(pago);

const handleNom = async () =>  { 
    const data = await (await ClienteServer.getCliente()).json();
    setCliente(data.clientes);
    console.log(data + "mla");
};

    useEffect(()=>{ handleNom()},[]);

    return (
        <div className="col-md-4">
            <div className="card card-body">
                <h3 className="card-title">
                <button onClick={() => history.push(`/updatePago/${pago.id}`)} className="ms-2 btn btn-sm btn-info">
                    Modificar
                </button>
                </h3>
                {/* <p className="card-text">Status: <strong>{pago.status}</strong></p>
                <p className="card-text">Monto: <strong>{pago.monto}</strong></p>
                <p className="card-text">Tipo de pago: <strong>{pago.pagos}</strong></p>
                <p className="card-text">Adeudo del pago:  <strong>{pago.adeudo}</strong></p>
                <p className="card-text">No. cliente: <strong>{pago.cliente_id}</strong></p> */}
                {/* <p className="card-text">Nombre cliente: <strong>{cliente.name + " " + cliente.apellidos}</strong></p> */}
                {/* <button onClick={() =>pago.id && handleDelete(pago.id)} className="btn btn-danger my-2" >Eliminar</button> */}
            
            </div>
        </div>
    );
};

export default PagoItem;