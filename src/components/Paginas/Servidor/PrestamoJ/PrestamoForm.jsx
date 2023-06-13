import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert2";
import styled from "styled-components";


import * as PrestamoServer from "./PrestamoServer";
import * as ClienteServer from "../Cliente/ClienteServer";

const PrestamoForm = () => {
  const history = useHistory();
  const params = useParams();

  const initialState = { id: 0, status: "", monto: "", pagos: "", adeudo: "", cliente_id: "" };

  const [prestamo, setPrestamo] = useState(initialState);
  const [clientes, setClientes] = useState([]);

  // const handleInputChange = (e) => {
  //   setPrestamo({ ...prestamo, [e.target.name]: e.target.value });
  // };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Si el campo modificado es "monto", actualizar también el campo "adeudo"
    if (name === "monto") {
      setPrestamo((prevState) => ({
        ...prevState,
        [name]: value,
        adeudo: value // Actualizar el campo "adeudo" con el mismo valor
      }));
    } else {
      setPrestamo((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  const obtenerClientes = async () => {
    try {
      const response = await ClienteServer.listClientes();
      const data = await response.json();
      setClientes(data.clientes);
    } catch (error) {
      console.log(error);
      mostrarAlerta();
      history.push("/prestamoList");
    }
  };

  const mostrarAlerta = () => {
    swal.fire("Error", "Error en la conexión con la base de datos");
  };

  const mostrarAlerta2 = () => {
    swal.fire("Error", "Cliente con préstamo activo!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (!params.id) {
        res = await PrestamoServer.registerPrestamo(prestamo);
        const data = await res.json();
        if (data.message === "Success") {
          setPrestamo(initialState);
          swal.fire("Success", "Prestamo registrado!");
        } else {
          mostrarAlerta2();
          history.push("/");
        }
      } else {
        await PrestamoServer.updatePrestamo(params.id, prestamo);
        swal.fire("Success", "Préstamo actualizado!");
      }
      history.push("/prestamoList");
    } catch (error) {
      mostrarAlerta();
      history.push("/prestamoList");
    }
  };

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

  useEffect(() => {
    obtenerClientes();
  }, []);

  return (
    <>
      <EstilosForm>
        <div id="contenido">
          <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Prestamo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={prestamo.status}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <input
                  type="number"
                  name="monto"
                  value={prestamo.monto}
                  onChange={handleInputChange}
                  className="form-control"
                  min="0.01"
                  max="99999.99"
                  step="0.01"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tipo de pago</label>
                <select
                  name="pagos"
                  value={prestamo.pagos}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Seleccione</option>
                  <option value="Semanal">Semanal</option>
                  <option value="Quincenal">Quincenal</option>
                  <option value="Mensual">Mensual</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Adeudo</label>
                <input
                  type="number"
                  name="adeudo"
                  value={prestamo.adeudo}
                  className="form-control"
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nombre Cliente</label>
                <select
                  name="cliente_id"
                  value={prestamo.cliente_id}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">Seleccione un cliente</option>
                  {clientes.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid gap-2">
                {params.id ? (
                  <button type="submit" className="btn btn-block btn-primary">
                    Modificar
                  </button>
                ) : (
                  <button type="submit" className="btn btn-block btn-success">
                    Registrar
                  </button>
                )}
                <button
                  onClick={() => history.push(`/prestamoList`)}
                  className="d-grid gap-2 btn-info"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </EstilosForm>
    </>

  );
};

export default PrestamoForm;

const EstilosForm = styled.body`
#contenido{
  margin-top: 3rem;
  margin-bottom: 9rem;
  margin-left: 2rem;
}
`