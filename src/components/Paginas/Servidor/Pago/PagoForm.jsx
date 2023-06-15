import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert2";
import styled from "styled-components";

import * as PrestamoServer from '../PrestamoJ/PrestamoServer';
import * as PagoServer from "./PagoServer";
import * as ClienteServer from "../Cliente/ClienteServer";
import Cookies from "universal-cookie";


const cookies = new Cookies();

const PagoForm = ({ pago, listPagos }) => {
  const history = useHistory();
  const params = useParams();

  const [cliente, setCliente] = useState([]);

  const handleNom = async () => {
    const data = await (await ClienteServer.getCliente(pago.cliente_id)).json();
    setCliente(data.clientes);
  }
  useEffect(() => { handleNom() }, []);

  //registar el pago
  const initialStatePago = { id: 0, monto: "", tarjeta: "", fecha: "", prestamo_id: parseInt(pago.id), cliente_id: parseInt(pago.cliente_id) };
  const initialState = { id: 0, status: "Activo", monto: "", pagos: "", adeudo: "", cliente_id: parseInt(cookies.get('id')) };

  const [pagare, setPagare] = useState(initialStatePago);
  const [prestamo, setPrestamo] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let pag;
      const res = await PrestamoServer.listPrestamos();
      const data = await res.json();
      console.log(data);
  
      pag = await PagoServer.registerPago(pagare);
      const dato = await pag.json();
      if (dato.message === "Success") {
        setPagare(initialStatePago);
        swal.fire("Success", "Pago registrado correctamente");
        
        // Subtract pago.monto from adeudo
        const updatedAdeudo = parseInt(pago.adeudo) - parseInt(pagare.monto);
        setPrestamo({ ...prestamo, adeudo: updatedAdeudo.toString() });
      } else {
        swal.fire("Error", "No se pudo Realizar El Pago");
        history.push("/");
      }
  
      history.push("/prestamosCliente")
    } catch (error) {
      swal.fire("Error", "Error con el sistema");
      history.push("/prestamosCliente");
    }
  }
  


  const cambio = (e) => {
    setPagare({ ...pagare, [e.target.monto]: e.target.value });
  }

  //console.log(prestamo);

  const getPrestamo = async (prestamoId) => {
    try {
      const res = await PrestamoServer.getPrestamo(prestamoId);
      const data = await res.json();
      console.log(data);
      const { status, monto, pagos, adeudo, cliente_id } = data.prestamos;
      setPrestamo({ status, monto, pagos, adeudo, cliente_id });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPrestamo(params.id);
    }
    // eslint-disable-next-line
  }, []);

  //tarjeta de 16 dijitos
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value.length <= 16) {
      setInputValue(value);
    }
  };

  //fecha automatica
  const [selectedDate, setSelectedDate] = useState('');
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    // Asegurarse de que el mes y el día tengan siempre dos dígitos
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  //console.log(pago);

  return (
    <>

      <EstilosPago>
        <div id="contenido">
          <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Pago</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <input type="number"
                  name="monto"
                  placeholder={pago.adeudo}
                  className="form-control"
                  max={pago.adeudo}
                  required
                  //onChange={cambio}
                  value={pagare.monto} onChange={(e) => setPagare({...pagare, monto: e.target.value})} 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Tarjeta</label>
                <input type="number"
                  name="tarjeta"
                  className="form-control"
                  // value={inputValue}
                  // onChange={handleInputChange}
                  minLength={16}
                  maxLength={16}
                  required
                  //onChange={cambio}
                  value={pagare.tarjeta} onChange={(e) => setPagare({...pagare, tarjeta: e.target.value})}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input type="date"
                  name="fechaNacimiento"
                  data-date-format="yyyy-mm-dd"
                  className="form-control"
                  maxLength="100"
                  required
                  // disabled
                  // value={selectedDate || getCurrentDate()}
                  // onChange={handleDateChange}
                  //onChange={cambio}
                  value={pagare.fecha} onChange={(e) => setPagare({...pagare, fecha: e.target.value})}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">prestamo</label>
                <input type="number"
                  name="fechaNacimiento"
                  className="form-control"
                  value={pago.monto}
                  maxLength="100"
                  required
                  // disabled
                  onChange={cambio}
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-block btn-primary">
                  Pagar
                </button>
              </div>
            </form>
          </div>
        </div>
      </EstilosPago>
    </>

  );
};


export default PagoForm;

const EstilosPago = styled.body`

#contenido{
  margin-top: 3rem;
  margin-bottom: 5rem;
  margin-left: 2rem;
}
`