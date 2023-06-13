import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import * as EmpleadoServer from "./EmpleadoServer";

const EmpleadoItem = ({ empleado, listEmpleados }) => {
    const history = useHistory();

    const handleDelete = async (empleadoId) => {
        await EmpleadoServer.deleteEmpleado(empleadoId);
        listEmpleados();
    };

    return (
        <>
            <div className="col-md-4">
                <div className="card card-body">
                    <h3 className="card-title">{empleado.name}
                        <button onClick={() => history.push(`/updateEmpleado/${empleado.id}`)} className="ms-2 btn btn-sm btn-info">
                            Modificar
                        </button>
                    </h3>
                    <p className="card-text">Apellidos: <strong>{empleado.apellidos}</strong></p>
                    <p className="card-text">Fecha de Nacimiento: <strong>{empleado.fechaNacimiento}</strong></p>
                    <p className="card-text">RFC: <strong>{empleado.rfc}</strong></p>
                    <p className="card-email">Correo:: <strong>{empleado.correo}</strong></p>
                    <p className="card-text">Telefono: <strong>{empleado.telefono}</strong></p>
                    <button onClick={() => empleado.id && handleDelete(empleado.id)} className="btn btn-danger my-2" >Eliminar</button>

                </div>
            </div>
        </>
    );
};

export default EmpleadoItem;