import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert2";
import styled from "styled-components";

import * as PrestamoServer from '../PrestamoJ/PrestamoServer';
import * as ClienteServer from "../Cliente/ClienteServer";


const PagoForm = ({ pago, listPagos }) => {
  // const history = useHistory();
  // const params = useParams();

  // const initialState = { id: 0, status: "", monto: "", pagos: "", adeudo: "", cliente_id: "" };
  // const initialState1 = { id: 0, monto: "", tarjeta: "", prestamo: "", cliente: "" };

  // const [prestamo, setPrestamo] = useState(initialState);
  // const [pago, setPago] = useState(initialState1);
  // const [clientes, setClientes] = useState([]);


  // const handleInputChange = (e) => {
  //   setPago({ ...pago, [e.target.fecha]: e.target.value });
  // };

  // const obtenerClientes = async () => {
  //   try {
  //     const response = await ClienteServer.listClientes();
  //     const data = await response.json();
  //     setClientes(data.clientes);
  //   } catch (error) {
  //     console.log(error);
  //     mostrarAlerta();
  //     history.push("/prestamoList");
  //   }
  // };

  // const mostrarAlerta = () => {
  //   swal.fire("Error", "Error en la conexión con la base de datos");
  // }
  // const mostrarAlerta2 = () => {
  //   swal("Error", "Pago ya registrado!");
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let res;
  //     if (!params.id) {
  //       res = await PagoServer.registerPago(pago);
  //       const data = await res.json();
  //       if (data.message === "Success") {
  //         setPago(initialState1);
  //         swal("Seccess", "Pago registrado!");
  //       } else {
  //         mostrarAlerta2();
  //         history.push("/");
  //       }
  //     }
  //   } catch (error) {
  //     //console.log(error);
  //     mostrarAlerta();
  //     history.push("/pagoList");
  //   }
  // };

  // const getPrestamo = async (prestamoId) => {
  //   try {
  //     const res = await PrestamoServer.getPrestamo(prestamoId);
  //     const data = await res.json();
  //     console.log(data);
  //     const { status, monto, pagos, adeudo, cliente_id } = data.prestamos;
  //     setPrestamo({ status, monto, pagos, adeudo, cliente_id });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getPago = async (prestamoId) => {
  //   try {
  //     const res = await PrestamoServer.getPrestamo(prestamoId);
  //     const data = await res.json();
  //     console.log(data);
  //     const { status, monto, pagos, adeudo, cliente_id } = data.prestamos;
  //     setPago({ status, monto, pagos, adeudo, cliente_id });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (params.id) {
  //     getPago(params.id);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  // useEffect(() => {
  //   obtenerClientes();
  // }, []);

  // console.log(prestamo.monto);

  const history = useHistory();
  const params = useParams();

  const initialState = { id: 0, status: "", monto: "", pagos: "", adeudo: "", cliente_id: "" };

  const [prestamo, setPrestamo] = useState(initialState);
  const [clientes, setClientes] = useState([]);

  // const handleInputChange = (e) => {
  //   setPrestamo({ ...prestamo, [e.target.name]: e.target.value });
  // };

  const handleNom = async () => {
    const data = await (await ClienteServer.getCliente())
  };

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

  useEffect(()=>{ handleNom()},[]);

  console.log(prestamo.monto);

  return (
    <>

      <EstilosPago>
        <div id="contenido">
          <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Pago</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <input type="number" name="name" value={prestamo.monto} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Tarjeta</label>
                <input type="number" name="apellidos" onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input type="date" name="fechaNacimiento" data-date-format="yyyy-mm-dd" onChange={handleInputChange} className="form-control" maxLength="100" required />
              </div>
              <div className="mb-3">
                <label className="form-label">prestamo</label>
                <input type="number" name="fechaNacimiento" data-date-format="yyyy-mm-dd" onChange={handleInputChange} className="form-control" maxLength="100" required />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-block btn-primary">
                  Pagar
                </button>
              </div>
              <script type="text/javascript">
              </script>
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