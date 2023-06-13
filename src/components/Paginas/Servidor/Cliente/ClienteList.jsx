import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Components:
import ClienteItem from "./ClienteItem";

import * as ClienteServer from "./ClienteServer";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);

  const listClientes = async () => {
    try {
      const res = await ClienteServer.listClientes();
      const data = await res.json();
      setClientes(data.clientes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listClientes();
  }, []);

  return (
    <>
      <EstiloCliente>
        <div id="contenedor">
          <div className="row">
            {clientes.map((cliente) => (
              <ClienteItem key={cliente.id} cliente={cliente} listClientes={listClientes} />
            ))}
          </div>
          <div id="boton">
            <Link to={"/clienteForm"}><button className="btn btn-success my-2" >Registrar Cliente</button></Link>
          </div>
        </div>
      </EstiloCliente>
    </>
  );
};

export default ClienteList;

const EstiloCliente = styled.body`
#contenedor{
    margin: 3rem;
}
#boton{
  margin-top: 3rem;
  margin-bottom: 9rem;
}
`