import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
    MDBCol, MDBCard, MDBCardText,
    MDBCardBody, MDBProgress, MDBProgressBar,
    MDBListGroup, MDBListGroupItem, MDBBadge
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";


import * as ClienteServer from "../Cliente/ClienteServer"


const PrestamoItem2 = ({ prestamo, listPrestamos }) => {
    const history = useHistory();

    const [cliente, setCliente] = useState([])

    const handleNom = async () => {
        const data = await (await ClienteServer.getCliente(prestamo.cliente_id)).json();
        setCliente(data.clientes);
        // console.log(data);
    };

    // const handleDelete = async (prestamoId) => {
    //     await PrestamoServer.deletePrestamo(prestamoId);
    //     listPrestamos();
    // };

    useEffect(() => { handleNom() }, []);

    return (
        <>
            <MDBCol md="4">
                <MDBListGroup light numbered style={{ minWidth: '22rem' }}>
                    <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                        <div className='ms-2 me-auto'>
                            {
                                prestamo.status === "Activo" ? (
                                    <div className='fw-bold'>Prestamo <strong>{prestamo.status}</strong></div>
                                ) : (
                                    <div className='fw-bold'>Prestamo <strong> Pagado</strong></div>
                                )
                            }
                        </div>
                        <MDBBadge pill light>
                            <strong>{prestamo.monto}</strong>
                        </MDBBadge>
                    </MDBListGroupItem>
                </MDBListGroup>
                <MDBCard className="mb-4 mb-md-0">
                    <MDBCardBody>
                        <MDBCardText className="mb-2"><span className="text-primary font-italic me-1">Cliente:  <strong>{cliente.name + " " + cliente.apellidos}</strong></span></MDBCardText>
                        <MDBCardText className="mb-2"><span className="text-primary font-italic me-1">Prestamo:  <strong>{prestamo.status}</strong></span></MDBCardText>
                        <MDBCardText className="mb-2"><span className="text-secundary font-italic me-1">Monto:  <strong>{prestamo.monto}</strong></span></MDBCardText>
                        <MDBCardText className="mb-2"><span className="text-secundary font-italic me-1">Tipo de Pago:  <strong>{prestamo.pagos}</strong></span></MDBCardText>

                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Adeudo del Prestamo:  <strong>{prestamo.adeudo}</strong></MDBCardText>
                        <MDBProgress height='20' className="rounded">
                            <MDBProgressBar width={((prestamo.adeudo) * 100) / prestamo.monto} valuemin={0} valuemax={prestamo.monto}>
                                {prestamo.adeudo}
                            </MDBProgressBar>
                        </MDBProgress>
                        {
                            prestamo.status === "Activo" ? (
                                <Link to={"/pagoForm"}>
                                    <button type="button" class="btn btn-outline-primary">Pagar</button>
                                </Link>
                            ) : (
                                <Link to={"/renobarFrom"}>
                                    <button type="button" class="btn btn-outline-primary">Renovar</button>
                                </Link>
                            )
                        }
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>


        </>

    );
};

export default PrestamoItem2;