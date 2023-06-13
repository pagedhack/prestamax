import React from "react";
import { useHistory } from "react-router-dom";

import * as ClienteServer from "./ClienteServer";

const ClienteItem = ({ cliente, listClientes }) => {
    const history = useHistory();

    const handleDelete = async (clienteId) => {
        await ClienteServer.deleteCliente(clienteId);
        listClientes();
    };

    return (
        <>
            <div className="col-md-4">
                <div className="card card-body">
                    <h3 className="card-title">{cliente.name}
                        <button onClick={() => history.push(`/updateCliente/${cliente.id}`)} className="ms-2 btn btn-sm btn-info">
                            Modificar
                        </button>
                    </h3>
                    <p className="card-text">Apellidos: <strong>{cliente.apellidos}</strong></p>
                    <p className="card-text">Fecha de Nacimiento: <strong>{cliente.fechaNacimiento}</strong></p>
                    <p className="card-text">RFC: <strong>{cliente.rfc}</strong></p>
                    <p className="card-email">Correo:: <strong>{cliente.correo}</strong></p>
                    <p className="card-text">Telefono: <strong>{cliente.telefono}</strong></p>

                    <button onClick={() => cliente.id && handleDelete(cliente.id)} className="btn btn-danger my-2" >Eliminar</button>

                </div>
            </div>
        </>
    );
};

export default ClienteItem;