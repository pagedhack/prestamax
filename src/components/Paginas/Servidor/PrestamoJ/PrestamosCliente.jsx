import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import styled from "styled-components";


// Components:
import PrestamoItem2 from "./PrestamoItem2";

import * as PrestamoServer from "./PrestamoServer";

const cookies = new Cookies();

const PrestamosCliente = () => {
    const [prestamos, setPrestamos] = useState([]);
    const clienteId = cookies.get('id');

    const listPrestamos = async () => {
      try {
        const res = await PrestamoServer.listPrestamos();
        const data = await res.json();
        const prestamosCliente = data.prestamos.filter(prestamo => prestamo.cliente_id === parseInt(clienteId));
        // console.log(prestamosCliente);
        setPrestamos(prestamosCliente);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    listPrestamos();
  }, []);

  return (
    <>
      <EstiloPrestamo>
        <div id="contenedor">
          <div className="row">
            {prestamos ? (
              prestamos.map((prestamo) => (
                <PrestamoItem2 key={prestamo.id} prestamo={prestamo} listPrestamos={listPrestamos} />
              ))
            ) : (
              <p>No Se Encuentra un prestamo Activo</p>
            )}
          </div>
        </div>
        <div id="boton">
          <Link to={"/simulacion"}>
            <button className="btn btn-success my-2">Simular un Prestamo</button>
          </Link>
        </div>
      </EstiloPrestamo>
    </>
  );
};

export default PrestamosCliente;


const EstiloPrestamo = styled.body`

#contenedor{
  margin-top: 3rem;
  margin-bottom: 5rem;
  margin-left: 2rem;
}

#boton{
  margin-left: 1.5rem;
  margin-bottom: 5rem;
}
`
