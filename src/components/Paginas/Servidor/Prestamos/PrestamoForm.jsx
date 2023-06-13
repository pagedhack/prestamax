import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert2";

import * as PrestamoServer from "./PrestamoServer";
import PrestamoItem2 from "./PrestamoItem2";
import * as ClienteServer from "../Cliente/ClienteServer"


const PrestamoForm = () => {
  const params = useParams();
  const history = useHistory();

  const [cliente, setCliente] = useState([]);

  const initialState = { id: 0, status: "", monto: "", cliente_id: "" };

  const [prestamo, setPrestamo] = useState(initialState);

  const getPrestamo = async (prestamoId) => {
    try {
      const res = await PrestamoServer.getPrestamo(prestamoId);
      const data = await res.json();
      const { status, monto, cliente_id } = data.prestamos;
      setPrestamo({ status, monto, cliente_id });
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

  const [prestamos, setPrestamos] = useState([]);


  const listPrestamos = async () => {
    const res = await PrestamoServer.listPrestamos();
    const data = await res.json();
    try {
      setPrestamos(data.prestamos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPrestamos();
  }, []);

  const handleNom = async () => {
    const data =  (await ClienteServer.getCliente(prestamo.cliente_id)).json();
    console.log(data);
   
    // console.log(data + "hola nuevo dato");
    
    // for (const property in data) {
    //   for (const p in property){
    //     console.log(`${p}: ${property[property]}`);
    //   }
    // }
    
  };

  useEffect(() => {
    handleNom();
  }, []);

  return (
    <div className="row">

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#CECECE',
        zIndex: -1,
      }}></div>

      <div className="col-md-4">
        <div className="card card-body">
          <h3 className="card-title">{prestamos.name}</h3>
          <p className="card-text">Status: <strong>{prestamos.status}</strong></p>
          <p className="card-text">Monto: <strong>{prestamos.monto}</strong></p>
          <p className="card-text">No. cliente: <strong>{prestamo.cliente_id}</strong></p>
          {/* <p className="card-text">Nombre cliente: <strong>{cliente.name + " " + cliente.apellidos}</strong></p> */}
          <p className="card-text">Nombre Cliente: <strong>{cliente.name + " " + cliente.apellidos}</strong></p>
          {prestamo.status === "Terminado" || prestamo.status === "Activo" ? (
            <p className="factibilidad-factible">Factible Para Renovar</p>
          ) : (
            <p className="factibilidad-no-factible">No Factible Para Renovar</p>
          )}

          {prestamo.monto >= 1000 ? (
            <p>No Disponible Para Renovacion</p>
          ) : (
            prestamo.status === "Terminado" || prestamo.status === "Activo" ? (
              <div>
                <p>Candidato Para Renovacion</p>
                <button
                  onClick={() => history.push(`/updatePrestamo/${prestamo.id}`)}
                  className="ms-2 btn btn-sm btn-info"
                  style={{ backgroundColor: "#FFCC00", border: "2px solid #FFCC00" }}>
                  Renovar
                </button>
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>

  );

};


export default PrestamoForm;

{/* <maiu> */}
//   <div className="col-md-3 mx-auto">
//     <h2 className="mb-3 text-center">Prestamo</h2>
//     {/* <form onSubmit={handleSubmit}> */}
//       {/* <div className="mb-3">
//         <label className="form-label">Status</label>
//         <input type="text" name="status" value={prestamo.status} onChange={handleInputChange} className="form-control" minLength="5" maxLength="15" required />
//       </div>
//       <div className="mb-3">
//         <label className="form-label">Monto</label>
//         <input type="text" name="monto" value={prestamo.monto} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Id Cliente</label>
//         <input type="text" name="cliente_id" value={prestamo.cliente_id} onChange={handleInputChange} className="form-control" maxLength="100" required />
//       </div>
//       <div className="d-grid gap-2">
//         {params.id ? (
//           <button type="submit" className="btn btn-block btn-primary">
//             Modificar
//           </button>
//         ) : (
//           <button type="submit" className="btn btn-block btn-success">
//             Registrar
//           </button>
//         )}

//       </div>
//       <script type="text/javascript">
//       </script> */}
//     {/* </form> */}
//   </div>
// </maiu>



// // const handleInputChange = (e) => {
// //   setPrestamo({ ...prestamo, [e.target.name]: e.target.value });
// // };

// // const mostrarAlerta = () => {
// //   swal("Error", "Error en la conexión con la base de datos");
// // }
// // const mostrarAlerta2 = () => {
// //   swal("Error", "Cliente con préstamo activo!");
// // }




// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   try {
// //     let res;
// //     if (!params.id) {
// //       res = await PrestamoServer.registerPrestamo(prestamo);
// //       const data = await res.json();
// //       if (data.message === "Success") {
// //         setPrestamo(initialState);
// //         swal("Seccess", "Prestamo registrado!");
// //       } else {
// //         mostrarAlerta2();
// //         history.push("/");
// //       }
// //     } else {
// //       await PrestamoServer.updatePrestamo(params.id, prestamo);
// //       swal("Seccess", "Préstamo actualizado!");
// //     }
// //     history.push("/prestamoList2");
// //   } catch (error) {
// //     //console.log(error);
// //     mostrarAlerta();
// //     history.push("/prestamoList2");
// //   }
// // };

