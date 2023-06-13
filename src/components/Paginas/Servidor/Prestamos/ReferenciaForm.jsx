import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
import swal from "sweetalert2";
import styled from "styled-components";

import * as ReferenciaServer from "./ReferenciaServer";


const cookies = new Cookies();

const ReferenciaForm = () => {
  const history = useHistory();
  const params = useParams();

  console.log('id:' + cookies.get('id'));

  const initialState = { id: 0, personales_exists: "", crediticias_exists: "", bancarias_exists: "", laborales_exists: "", cliente_id: parseInt(cookies.get('id')) };

  const [referencia, setReferencia] = useState(initialState);

  const handleInputChange = (e) => {
    setReferencia({ ...referencia, [e.target.name]: e.target.value });
    // setIsButtonDisabled(true);
  };

  const handleButtonClick = (value) => {
    setReferencia({
      ...referencia,
      personales_exists: value,
    })
  }

  const handleButtonClick1 = (value) => {
    setReferencia({
      ...referencia,
      crediticias_exists: value,
    })
  }

  const handleButtonClick2 = (value) => {
    setReferencia({
      ...referencia,
      bancarias_exists: value,
    })
  }

  const handleButtonClick3 = (value) => {
    setReferencia({
      ...referencia,
      laborales_exists: value,
    })
  }


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
        res = await ReferenciaServer.registerReferencia(referencia);
        const data = await res.json();
        if (data.message === "Success") {
          setReferencia(initialState);
          swal.fire("Success", "Referencia registrado!");
        } else {
          mostrarAlerta2();
          history.push("/");
        }
      } else {
        await ReferenciaServer.updateReferencia(params.id, referencia);
        swal.fire("Success", "Referencia actualizado!");
      }
      history.push("/referenciaList");
    } catch (error) {
      mostrarAlerta();
      history.push("/referenciaList");
    }
  };

  return (
    <>
      <EstiloReferencia>
        <div id="contenedor">
          <div className="col-md-3 mx-auto">
            <h2 className="mb-3 text-center">Referencias</h2>
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Personales</label>
                <input
                  type="text"
                  name="personales_exists"
                  value={referencia.personales_exists}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <div id="botones">
                  <button type="button" className="btn btn-block btn-success"
                    onClick={() => handleButtonClick("s")}>
                    Si
                  </button>
                  <button type="button" className="btn btn-block btn-danger"
                    onClick={() => handleButtonClick("n")}>
                    No
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Crediticias</label>
                <input
                  type="text"
                  name="crediticias_exists"
                  value={referencia.crediticias_exists}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <div id="botones">
                  <button type="button" className="btn btn-block btn-success"
                    onClick={() => handleButtonClick1("s")}>
                    Si
                  </button>
                  <button type="button" className="btn btn-block btn-danger"
                    onClick={() => handleButtonClick1("n")}>
                    No
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Bancarias</label>
                <input
                  type="text"
                  name="bancarias_exists"
                  value={referencia.bancarias_exists}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <div id="botones">
                  <button type="button" className="btn btn-block btn-success"
                    onClick={() => handleButtonClick2("s")}>
                    Si
                  </button>
                  <button type="button" className="btn btn-block btn-danger"
                    onClick={() => handleButtonClick2("n")}>
                    No
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Laborales</label>
                <input
                  type="text"
                  name="laborales_exists"
                  value={referencia.laborales_exists}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                />
                <div id="botones">
                  <button type="button" className="btn btn-block btn-success"
                    onClick={() => handleButtonClick3("s")}>
                    Si
                  </button>
                  <button type="button" className="btn btn-block btn-danger"
                    onClick={() => handleButtonClick3("n")}>
                    No
                  </button>
                </div>
              </div>

              <div className="d-grid gap-2">
                {params.id ? (
                  <button type="submit" className="btn btn-block btn-primary">
                    Modificar
                  </button>
                ) : (
                  <button type="submit" className="btn btn-block btn-success">
                    Enviar
                  </button>
                )}
                <button onClick={() => history.push(`/`)} className="d-grid gap-2 btn-info">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </EstiloReferencia>
    </>

  );
};

export default ReferenciaForm;

const EstiloReferencia = styled.body`
#contenedor{
  margin-top: 3rem;
  margin-bottom: 9rem;
  margin-left: 2rem;
}

#botones{
  margin-top: .5rem;
  margin-bottom: 1.5rem;
}
`