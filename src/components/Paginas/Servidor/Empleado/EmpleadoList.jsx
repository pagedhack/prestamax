import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Components:
import EmpleadoItem from "./EmpleadoItem";

import * as EmpleadoServer from "./EmpleadoServer";

const EmpleadoList = () => {
  const [empleados, setEmpleados] = useState([]);

  const listEmpleados = async () => {
    try {
      const res = await EmpleadoServer.listEmpleados();
      const data = await res.json();
      setEmpleados(data.empleados);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listEmpleados();
  }, []);

  return (
    <>
      <EstiloEmpleado>
        <div id="contenedor">
          <div className="row">
            {empleados.map((empleado) => (
              <EmpleadoItem key={empleado.id} empleado={empleado} listEmpleados={listEmpleados} />
            ))}
          </div>
          <div id="boton">
            <Link to={"/empleadoForm"}><button className="btn btn-success my-2" >Registrar Empleado</button></Link>
          </div>
        </div>
      </EstiloEmpleado>
    </>
  );
};

export default EmpleadoList;

const EstiloEmpleado = styled.body`
#contenedor{
    margin: 3rem;
}
#boton{
  margin-top: 3rem;
  margin-bottom: 9rem;
}
`