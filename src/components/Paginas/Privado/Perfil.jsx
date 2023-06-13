import React from 'react';
import {
  MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText,
  MDBCardBody, MDBCardImage, MDBBreadcrumb, MDBBreadcrumbItem,
  MDBProgress, MDBProgressBar, MDBListGroup, MDBListGroupItem,
  MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent,
  MDBTabsPane, MDBBadge
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const ProfilePage = () => {

  const [basicActive, setActive] = useState('rPerfil');
  window.scrollTo(0, 0);

  const handleBasicClick = (value) => {
    if (value === basicActive) return;
    window.scrollTo(0, 0)
    setActive(value);
  }

  const initialState = {
    id: 0, name: cookies.get('name'), apellidos: cookies.get('apellidos'),
    fechaNacimiento: cookies.get('fechanacimiento'), rfc: cookies.get('rfc'),
    correo: cookies.get('correo'), telefono: cookies.get('telefono'),
    password: cookies.get('password'), rol: 2
  };


  const [cliente, setCliente] = useState(initialState);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
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

                  {/* opcion de cuenta */}
                  <MDBTabs>
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                      <MDBCardText>Cuenta</MDBCardText>
                    </MDBListGroupItem>

                    <MDBListGroupItem action active={basicActive === 'eBuro'} noBorders className='px-3'>
                      <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleBasicClick('eBuro')}>Estatus de Buro</MDBTabsLink>
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

                <MDBCard className="mb-4">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <MDBCardText>Cuenta</MDBCardText>
                  </MDBListGroupItem>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Numero de tarjeta</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">00000000</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Vencimiento</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">00000000</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </MDBCardBody>
                </MDBCard>

              </MDBTabsPane>


            </MDBTabsContent>

            {/* Contenido cuenta */}
            <MDBTabsContent>

              <MDBTabsPane show={basicActive === 'eBuro'}>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">Status de Buro</span></MDBCardText>

                        {
                          getRandomInt(2) === 0 ? (
                            <>
                              < MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Se Encuentra en Buro de credito</MDBCardText>
                              <MDBProgress height='40' className="rounded">
                                <MDBProgressBar width='0' valuemin={0} valuemax={100}>
                                  Con Buro
                                </MDBProgressBar>
                              </MDBProgress>
                            </>

                          ) : (
                            <>
                              <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>No se Encuentra en Buro de credito</MDBCardText>
                              <MDBProgress height='40' className="rounded">
                                <MDBProgressBar width='100' valuemin={0} valuemax={100}>
                                  Sin Buro
                                </MDBProgressBar>
                              </MDBProgress>
                            </>
                          )
                        }
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>

              </MDBTabsPane>

              <MDBTabsPane show={basicActive === 'sPrestamos'}>
                <MDBListGroup light numbered style={{ minWidth: '22rem' }}>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>Prestamo Pagado</div>Fecha
                    </div>
                    <MDBBadge pill light>
                      5000
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>Prestamo Pagado</div>Fecha
                    </div>
                    <MDBBadge pill light>
                      5000
                    </MDBBadge>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-start'>
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>Prestamo Pagado</div>Fecha
                    </div>
                    <MDBBadge pill light>
                      5000
                    </MDBBadge>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBTabsPane>

            </MDBTabsContent>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section >
  );
};

export default ProfilePage;