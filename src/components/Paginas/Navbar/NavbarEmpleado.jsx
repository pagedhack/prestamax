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
    cookies.remove('name', { path: "/" });
    cookies.remove('rol', { path: "/" });
    window.location.href = './home';
}

  render() {
    return (
      <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand href="/PerfilE">PrestaMax</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/PerfilE"><i className="fa fa-fw fa-home"></i> Home</Nav.Link>
                <Nav.Link href='/empleadoList'><i className="fa fa-list"></i> Empleados</Nav.Link>
                <Nav.Link href='/clienteList'><i className="fa fa-list"></i> Clientes</Nav.Link>
                <Nav.Link href='/prestamoList'><i className="fa fa-money"></i> Prestamos</Nav.Link>
              </Nav>


              <div className='logueado'>
                <Nav>
                  <Navbar.Collapse className="justify-content-end">
                    <NavDropdown title={cookies.get('name')} id="basic-nav-dropdown">
                      <NavDropdown.Item href="/PerfilE">Perfil</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="./Home" onClick={() => this.cerrarSesion()}>Cerrar sesion</NavDropdown.Item>
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