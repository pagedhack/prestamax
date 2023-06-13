import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
// Components:
import PagoForm from "./PagoForm";
import * as PrestamoServer from "../PrestamoJ/PrestamoServer";

const cookies = new Cookies();

const PagoList = () => {
  const [pagos, setPagos] = useState([]);

  const listPagos = async () => {
    try {
      const res = await PrestamoServer.listPrestamos();
      const data = await res.json();
      const prestamosCliente = data.prestamos.filter(prestamo => prestamo.cliente_id === parseInt(cookies.get('id')));
      console.log(prestamosCliente);
      setPagos(prestamosCliente);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPagos();
  }, []);

  return (
    <>
      <div className="row">
        {pagos.map((pago) => (
          <PagoForm key={pago.id} pago={pago} listPagos={listPagos} />
        ))}
      </div>
    </>
  );
};

export default PagoList;