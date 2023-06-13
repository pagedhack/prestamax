import React from 'react';
import { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class NavbarHome extends Component {
  cerrarSesion = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('name', { path: "/" })
    cookies.remove('rol', { path: "/" });
    window.location.href= './home';
  }

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="/Home">PrestaMax</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/Home"><i className="fa fa-fw fa-home"></i> Home</Nav.Link>
                <Nav.Link href='/simulacion'><i className="fa fa-fw fa-calculator"></i> Simulacion</Nav.Link>
                <Nav.Link href='/Contacto'><i className="fa fa-envelope"></i> Contacto</Nav.Link>
                <Nav.Link href='/referenciasForm'><i className="fa fa-file"></i> Referencias</Nav.Link>
                <Nav.Link href='/prestamosCliente'><i className="fa fa-leanpub"></i> Prestamos</Nav.Link>
              </Nav>


              <div className='logueado'>
                <Nav>
                  <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title={cookies.get('name')} id="basic-nav-dropdown">
                      <NavDropdown.Item href="/Perfil">Perfil</NavDropdown.Item>
                      <NavDropdown.Item href="/prestamosCliente">Prestamos</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="./home" onClick={() => this.cerrarSesion()}>Cerrar sesion</NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
                </Nav>
              </div>

            </Navbar.Collapse>

          </Container>
        </Navbar>

      </>
    );
  }
}

export default NavbarHome;