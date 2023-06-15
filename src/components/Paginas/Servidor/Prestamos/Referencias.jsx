import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';


import * as ReferenciaServer from "./ReferenciaServer";

// Components:
const cookies = new Cookies();

const Referencia = () => {
  const [referecnia, setReferencia]=useState([]);
  const clienteId = cookies.get('id');

  const listReferencias = async () => {
    try {
      const res = await ReferenciaServer.listReferencias();
      const data = await res.json();
      const referenciasCliente = data.refe.filter(refe  => refe.cliente_id === parseInt(clienteId));
      console.log(referenciasCliente);
      setReferencia(referenciasCliente);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listReferencias();
  }, []);

  return (
    <div>
      <h1>Otra Página</h1>
      <p>¡Has llegado a otra página!</p>
      <Link to={"/prestamoFormCliente"}>
                                    <button type="button" class="btn btn-outline-primary">Renovar</button>
         </Link>
    </div>
  );
};

export default Referencia;

