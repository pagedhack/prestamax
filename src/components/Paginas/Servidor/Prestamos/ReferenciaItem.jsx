import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import * as ReferenciaServer from "./ReferenciaServer";


const cookies = new Cookies();


const ReferenciaItem = () => {

  const clienteId = cookies.get('id');
  
  const initialState = {
    id: 0,
    personales_exists: "",
    crediticias_exists: "",
    bancarias_exists: "",
    laborales_exists: ""
  };
  const [referencia, setReferencia] = useState(initialState);

  const listReferencias = async () => {
    try {
      const res = await ReferenciaServer.listReferencias();
      const data = await res.json();

    const referenciasCliente = data.referencias.filter(referencia => referencia.cliente_id === parseInt(clienteId));
    referenciasCliente.sort((a, b) => b.id - a.id); // Ordena las referencias por el campo 'id' de forma descendente
    setReferencia(referenciasCliente[0]); // Establece la última referencia como el estado



    } catch (error) {
      console.log(error);
    }
  };

  //console.log(referencia.bancarias_exists);


  useEffect(() => {
    listReferencias();
  }, []);

  return (
    <div className="col-md-4">
      <div className="card card-body">
     <b> <h1>Situación de referencia </h1></b>
     <h3>{cookies.get("name")} {cookies.get("apellidos")}</h3>


        <ul>
          <li>
            Personales: <strong style={{ color: referencia.personales_exists.includes('s') ? 'green' : 'red' }}>{referencia.personales_exists}</strong>

          </li>
          <li>
            Bancarias: <strong style={{ color: referencia.bancarias_exists.includes('s') ? 'green' : 'red' }}>{referencia.bancarias_exists}</strong>

          </li>
          <li>
            Crediticias: <strong style={{ color: referencia.crediticias_exists.includes('s') ? 'green' : 'red' }}>{referencia.crediticias_exists}</strong>

          </li>
          <li>
            Laborales: <strong style={{ color: referencia.laborales_exists.includes('s') ? 'green' : 'red' }}>{referencia.laborales_exists}</strong>

          </li>
        </ul>
        {referencia.personales_exists === "s" &&  referencia.crediticias_exists === "s" && referencia.bancarias_exists === "s" && referencia.laborales_exists === "s" ? (
                   
                   
                   <h2 className="factibilidad-factible" style={{ color: 'green' }}><b>Aprobado</b></h2>   

                ) : (
                  <h2 className="factibilidad-no-factible" style={{ color: 'red' }}><b>En espera</b></h2>

                )}

      </div>
    </div>
  );
};

export default ReferenciaItem;




// import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

// import * as ReferenciaServer from "./ReferenciaServer";
// import * as ClienteServer from "../Cliente/ClienteServer";

// const ReferenciaItem = ({ referencia, listReferencias }) => {
//   const [cliente, setCliente] = useState([]);

//   const handleNom = async () => {
//     if (referencia && referencia.cliente_id) {
//       const data = await (await ClienteServer.getCliente(referencia.cliente_id)).json();
//       setCliente(data.clientes);
//       console.log(data);
//     }
//   };

//   useEffect(() => {
//     handleNom();
//   }, []);

//   console.log(referencia);

//   // Verificar si "referencia" está definido antes de acceder a sus propiedades
//   const personalesExists = referencia && referencia.personales_exists;
//   const bancariasExists = referencia && referencia.bancarias_exists;
//   const crediticiasExists = referencia && referencia.crediticias_exists;
//   const laboralesExists = referencia && referencia.laborales_exists;

//   // Verificar el valor de personalesExists
//   const personalesExistsText = personalesExists === 'S' ? 'Sí' : 'No';

//   return (
//     <div className="row">
//       <div className="card card-body">
//         <p className="card-text">Personales: <strong>{personalesExistsText}</strong></p>
//         <p className="card-text">Bancarias: <strong>{bancariasExists}</strong></p>
//         <p className="card-text">Crediticias: <strong>{crediticiasExists}</strong></p>
//         <p className="card-text">Laborales: <strong>{laboralesExists}</strong></p>
//         {referencia && referencia.cliente_id ? (
//           <p className="card-text">Referencias de cliente: <strong>{referencia.cliente_id}</strong></p>
//         ) : (
//           <p className="card-text">Referencias de cliente: <strong>No disponible</strong></p>
//         )}
//         {/* Resto del código */}
//       </div>
//     </div>
//   );
// };

// export default ReferenciaItem;
