import React from 'react';
import { MDBFooter, MDBContainer} from 'mdb-react-ui-kit';
// import styled from 'styled-components';

export default function App() {
    return (
            <MDBFooter className='text-center' color='white' bgColor='dark'>
                <MDBContainer className='p-4'>
                    <section className='mb-4'>

                        <a href='https://www.google.com' className='me-4 text-reset'>
                            <i className="fa fa-google" aria-hidden="true"></i>
                        </a>

                        <a href='https://www.github.com' className='me-4 text-reset'>
                            <i className="fa fa-github" aria-hidden="true"></i>
                        </a>


                    </section>

                    <section className='mb-4'>
                        <p>
                            Pagina de prestamos y simulacion de buros de credito con ingresos de login y validaciones de credito.<br/>
                            La pagina no tiene derecho ni permisos de laborar con elementos fiscales, solo es una practica de desarrollo.
                        </p>
                    </section>

                </MDBContainer>

                <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2023 Copyright:
                    <a className='text-white' href='https://localhost:3000'>
                        PrestaMax. localhost:3000/home
                    </a>
                </div>
            </MDBFooter>
    );
}

