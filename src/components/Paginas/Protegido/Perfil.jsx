
import React from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBListGroup,
  MDBListGroupItem,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBadge
} from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import * as ClienteServer from '../Servidor/Cliente/ClienteServer';


const cookies = new Cookies();

export default function ProfilePage() {

  const [basicActive, setActive] = useState('rPerfil');

  const subir = () => {
    window.scrollTo(0, 0);
  }

  const handleBasicClick = (value: string) => {
    if (value === basicActive) return;
    window.scrollTo(0, 0)
    setActive(value);
  }

  const history = useHistory();
  const params = useParams();

  const initialState = { id: 0, name: "", apellidos: "", fechaNacimiento: "", rfc: "", correo: "", telefono: "", password: "", rol: 2 };

  const [cliente, setCliente] = useState(initialState);

  const handleInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const mostrarAlerta = () => {
    Swal.fire("Error", "Contraseña invalida", 'error');
  }
  const mostrarAlerta2 = () => {
    Swal.fire("Error", "Usuario ya registrado!", 'error');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (params.id) {
        res = await ClienteServer.updateCliente(params.id, cliente);
        const data = await res.json();
        console.log(data);
        if (data.message === "Success") {
          Swal.fire("Seccess", "Cliente actualizado!");
        }
        if (data.message === "Correo") {
          Swal.fire("Error", "Correo ya en uso");
        }
        if (data.message === "Clientes not found") {
          mostrarAlerta();
        }
      }
      history.push("/");
    } catch (error) {
      mostrarAlerta2();
      history.push("/");
    }
  };

  const getCliente = async (clienteId) => {
    try {
      const res = await ClienteServer.getCliente(clienteId);
      const data = await res.json();
      console.log(data);
      const { name, apellidos, fechaNacimiento, rfc, correo, telefono, password, rol } = data.clientes;
      setCliente({ name, apellidos, fechaNacimiento, rfc, correo, telefono, password, rol });
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getCliente(params.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>Empleado Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>

          {/* opciones */}

          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <br></br>
                <MDBCardImage
                  src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p></p>
                <p className="text-muted mb-1">{cookies.get('correo')}</p>
                <p className="text-muted mb-4"></p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">

                <MDBListGroup style={{ minWidth: '22rem' }} light>

                  {/* opcion de perfil */}
                  <MDBTabs>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Perfil</MDBCardText>
                    </MDBListGroupItem>

                    <MDBListGroupItem action active={basicActive === 'rPerfil'} noBorders className='px-3'>
                      <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('rPerfil')}>Revisar Perfil</MDBTabsLink>
                      </MDBTabsItem>
                    </MDBListGroupItem>


                    
                  </MDBTabs>

                </MDBListGroup>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>

          {/* contenido */}
          <MDBCol lg="8">
            {/* contenido perfil */}
            <MDBTabsContent>
              <MDBTabsPane show={basicActive === 'rPerfil'}>
                <MDBCard className="mb-4">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>Perfil</MDBCardText>
                  </MDBListGroupItem>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Nombre</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{cookies.get('name')}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Apellidos</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{cookies.get('apellidos')}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Fecha de Nacimiento</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{cookies.get('fechaNacimiento')}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>RFC</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{cookies.get('rfc')}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Correo</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{cookies.get('correo')}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Telefono</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{cookies.get('telefono')}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </MDBCardBody>
                </MDBCard>

              </MDBTabsPane>

              

            </MDBTabsContent>


          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section >
  );
}