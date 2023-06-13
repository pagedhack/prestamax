import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Components:
import PrestamoItem from "./PrestamoItem";

import * as PrestamoServer from "./PrestamoServer";

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);

  const listPrestamos = async () => {
    try {
      const res = await PrestamoServer.listPrestamos();
      const data = await res.json();
      setPrestamos(data.prestamos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPrestamos();
  }, []);

  return (
    <>
      <EstilosPresta>
        <div id="contenedor">
          <div className="row">
            {prestamos ? (
              prestamos.map((prestamo) => (
                <PrestamoItem key={prestamo.id} prestamo={prestamo} listPrestamos={listPrestamos} />
              ))
            ) : (
              <p>No Hay existe un prestamo aun Registrado</p>
            )}
          </div>
          <Link to={"/prestamoForm"}>
            <button className="btn btn-success my-2">Registrar Prestamo</button>
          </Link>
        </div>
      </EstilosPresta>
    </>
  );
};

export default PrestamoList;

const EstilosPresta = styled.body`
#contenedor{
    margin-top: 2rem;
    margin-bottom: 5rem;
    margin-left: 2rem;
}
`