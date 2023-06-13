import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as ClienteServer from "../Cliente/ClienteServer"

const PrestamoItem2 = ({ prestamo }) => {
  const history = useHistory();
  const [cliente, setCliente] = useState([]);

  const handleNom = async () =>  { 
    const data = await (await ClienteServer.getCliente(prestamo.cliente_id)).json();
    console.log(data);
  };

  useEffect(async () => {
    await handleNom();
  }, []);

  return (
    <div className="col-md-4">
      <div className="card card-body">
        <h3 className="card-title">{prestamo.name}</h3>
        <p className="card-text">Status: <strong>{prestamo.status}</strong></p>
        <p className="card-text">Monto: <strong>{prestamo.monto}</strong></p>
        <p className="card-text">No. cliente: <strong>{prestamo.cliente_id}</strong></p>
        {/* <p className="card-text">Nombre cliente: <strong>{cliente.name + " " + cliente.apellidos}</strong></p> */}
        <p className="card-text">Nombre Cliente: <strong>{cliente.name+" " + cliente.apellidos}</strong></p>
        {prestamo.status === "Terminado" || prestamo.status === "Activo" ? (
          <p className="factibilidad-factible">Factible Para Renovar</p>
        ) : (
          <p className="factibilidad-no-factible">No Factible Para Renovar</p>
        )}

        {prestamo.monto >= 1000 ? (
          <p>No Disponible Para Renovacion</p>
        ) : (
          prestamo.status === "Terminado" || prestamo.status === "Activo" ? (
            <div>
              <p>Candidato Para Renovacion</p>
              <button
                onClick={() => history.push(`/updatePrestamo/${prestamo.id}`)}  
                className="ms-2 btn btn-sm btn-info"
                style={{ backgroundColor: "#FFCC00", border: "2px solid #FFCC00" }}>
                Renovar
              </button>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default PrestamoItem2;
