import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import styled from "styled-components";

// Components:
import PrestamoItem2 from "./PrestamoItem2";

import * as PrestamoServer from "./PrestamoServer";

const cookies = new Cookies();

const OtraPagina = () => {
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

export default OtraPagina;

