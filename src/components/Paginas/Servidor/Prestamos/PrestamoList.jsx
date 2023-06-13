import React, { useEffect, useState } from "react";

// Components:
import PrestamoItem from "./PrestamoItem";

import * as PrestamoServer from "./PrestamoServer";

const PrestamoList = () => {
  const [prestamos, setPrestamos] = useState([]);

  const listPrestamos = async () => {
    try {
      const res = await PrestamoServer.listPrestamos();
      const data = await res.json();
      setPrestamos(data.prestamos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listPrestamos();
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


      {prestamos.map((prestamo) => (
        <PrestamoItem key={prestamo.id} prestamo={prestamo} listPrestamos={listPrestamos} />
      ))}
    </div>
  );
};

export default PrestamoList;