import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Cookies from 'universal-cookie';

// Componentes
import Navbar from './components/Paginas/Navbar/Navbar';
import NavbarCliente from './components/Paginas/Navbar/NavbarCliente';
import NavbarEmpleado from './components/Paginas/Navbar/NavbarEmpleado';
// import NavbarEmpleado from './components/Paginas/Navbar/NavbarEmpleado';
import Footer from './components/Paginas/Publico/Footer';
import Error from './components/Paginas/Publico/Error';


//publicas
import Landing from './components/Paginas/Publico/index'
import SimulacionPrestamo from './components/Paginas/Publico/SimulacionPrestamo';
import Contacto from './components/Paginas/Publico/Contacto';
import Registro from './components/Paginas/Publico/Registro';
import Login from './components/Paginas/Publico/Login';

//privadas
import Perfil from './components/Paginas/Privado/Perfil';


//prestamo
// import PrestamoList from './components/Paginas/Servidor/Prestamos/PrestamoList';
// import PrestamoForm from './components/Paginas/Servidor/Prestamos/PrestamoForm';
// import RenobarForm from './components/Paginas/Servidor/Prestamos/RenobarForm';

//referencias
// import ReferenciasList from './components/Paginas/Servidor/Prestamos/ReferenciaList';
import ReferenciaForm from './components/Paginas/Servidor/Prestamos/ReferenciaForm';

//pagos

// import Pago from './components/Paginas/Privado/Pago'
import ClienteForm from './components/Paginas/Servidor/Cliente/ClienteForm';
import ClienteList from './components/Paginas/Servidor/Cliente/ClienteList';

//protegidas
import PerfilE from './components/Paginas/Protegido/Perfil';
import EmpleadoList from './components/Paginas/Servidor/Empleado/EmpleadoList';
import EmpleadoForm from './components/Paginas/Servidor/Empleado/EmpleadoForm';

// Prestamos
import PrestamoListj from './components/Paginas/Servidor/PrestamoJ/PrestamoList';
import PrestamoFormj from './components/Paginas/Servidor/PrestamoJ/PrestamoForm';
import PrestamosCliente from './components/Paginas/Servidor/PrestamoJ/PrestamosCliente';

import PrestamoFormCliente from './components/Paginas/Servidor/PrestamoJ/PrestamoFormCliente';

//Pagos
import PagoList from './components/Paginas/Servidor/Pago/PagoList';


function App() {


  const cookies = new Cookies();

  const userRole = parseInt(cookies.get('rol')); // OBTÉN EL ROL DE USUARIO DE TU LÓGICA

  console.log(userRole);

  const renderNavbar = () => {
    if (userRole === 2) {
      return <NavbarCliente />;
    } else if (userRole === 1) {
      return <NavbarEmpleado />;
    } else {
      return <Navbar />;
    }
  };




  return (
    <React.StrictMode>
      <BrowserRouter>
        {renderNavbar()}
       
          <Switch>
            {/* publicas */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Landing} />
            <Route exact path="/simulacion" component={SimulacionPrestamo} />
            <Route exact path="/contacto" component={Contacto} />
            <Route exact path="/registro" component={Registro} />
            <Route exact path="/login" component={Login} />

            {/* privadas-cliente */}
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/prestamos" component={PrestamoListj} />
            {/* <Route exact path="/referenciaList" component={ReferenciasList} /> */}
            <Route exact path="/referenciasForm" component={ReferenciaForm} />

            {/* privadas-empleado */}
            <Route exact path="/perfilE" component={PerfilE} />
            <Route exact path="/empleadoList" component={EmpleadoList} />
            <Route exact path="/empleadoForm" component={EmpleadoForm} />
            <Route exact path='/updateEmpleado/:id' component={EmpleadoForm} />
            <Route exact path='/clienteList' component={ClienteList} />
            <Route exact path='/clienteForm' component={ClienteForm} />
            <Route exact path='/updateCliente/:id' component={ClienteForm} />
            <Route exact path="/prestamoList" component={PrestamoListj} />
            <Route exact path="/prestamoForm" component={PrestamoFormj} />
            <Route exact path='/updatePrestamo/:id' component={PrestamoFormj} />
            <Route exact path='/prestamosCliente' component={PrestamosCliente} />

            <Route exact path='/prestamoFormCliente' component={PrestamoFormCliente} />


            {/* Pagos */}
            <Route exact path="/pagoForm" component={PagoList} />
            {/* <Route exact path="/pagoForm" component={PagoForm} /> */}


            {/* default */}
            <Route component={Error} />
          </Switch>
          <Footer />
       
      </BrowserRouter>
    </React.StrictMode>
  );
}


export default App;