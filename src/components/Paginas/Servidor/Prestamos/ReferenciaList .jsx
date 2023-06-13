import React, { useEffect, useState } from "react";
import styled from "styled-components";


// Components:
import ReferenciaItem from "./ReferenciaItem";

import * as ReferenciaServer from "./ReferenciaServer";

const ReferenciaList = () => {
  const [referencias, setReferencias] = useState([]);

  const listReferencias = async () => {
    try {
      const res = await ReferenciaServer.listReferencias();
      const data = await res.json();
      setReferencias(data.referencias);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listReferencias();
  }, []);

  return (
    <>
      <EstilosReferencia>
        <div id="contenedor">
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


            {referencias.map((referencia) => (
              <ReferenciaItem key={referencia.id} referencia={referencia} listReferencias={listReferencias} />
            ))}
          </div>
        </div>
      </EstilosReferencia>
    </>

  );
};

export default ReferenciaList;

const EstilosReferencia = styled.body`

#contenedor{
  margin-top: 3rem;
  margin-bottom: 5rem;
  margin-left: 2rem;
}
`