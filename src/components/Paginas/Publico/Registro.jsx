import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

import * as ClienteServer from '../Servidor/Cliente/ClienteServer';

export default function Registro() {
    const history = useHistory();
    const params = useParams();

    const initialState = { id: 0, name: "", apellidos: "", fechaNacimiento: "", rfc: "", correo: "", telefono: "", rol: 2 };

    const [cliente, setCliente] = useState(initialState);

    const handleInputChange = (e) => {
        setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const mostrarAlerta = () => {
        Swal.fire("Error", "Error en la conexión con la base de datos", "error");
        window.scrollTo(0, 0)
    }
    const mostrarAlerta2 = () => {
        Swal.fire("Error", "Usuario ya registrado!", "error");
        window.scrollTo(0, 0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res;
            res = await ClienteServer.registerCliente(cliente);
            const data = await res.json();
            console.log(data);
            if (data.message === "Success") {
                Swal.fire("Success", "Usuario registrado!", "success");
                window.location.href = "../Login";
                setCliente(initialState);
            } else {
                mostrarAlerta2();
                history.push("/");
            }
            history.push("/Login");
        } catch (error) {
            mostrarAlerta();
            history.push("/")
        }
    }

    const getCliente = async (clienteId) => {
        try {
            const res = await ClienteServer.getCliente(clienteId);
            const data = await res.json();
            console.log(data);
            const { name, apellidos, fechaNacimiento, rfc, correo, telefono, password, rol } = data.clientes;
            setCliente({ name, apellidos, fechaNacimiento, rfc, correo, telefono, password, rol });

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
        <>
            <EstilosRegistro>
                <div id="principal">
                    <div className="col-md-3 mx-auto">
                        <h2 className="mb-3 text-center" id="textRegistro"><span>Registro</span></h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" id="name" name="name" value={cliente.name} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Apellidos</label>
                                <input type="text" name="apellidos" value={cliente.apellidos} onChange={handleInputChange} className="form-control" minLength="2" maxLength="50" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Fecha de Nacimiento</label>
                                <input type="date" name="fechaNacimiento" value={cliente.fechaNacimiento} onChange={handleInputChange} className="form-control" maxLength="100" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">RFC</label>
                                <input type="text" name="rfc" value={cliente.rfc} onChange={handleInputChange} className="form-control" minLength="13" maxLength="13" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Correo</label>
                                <input type="email" name="correo" value={cliente.correo} onChange={handleInputChange} className="form-control" maxLength="100" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Telefono</label>
                                <input type="text" name="telefono" value={cliente.telefono} onChange={handleInputChange} className="form-control" maxLength="100" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="text" name="password" value={cliente.paswword} onChange={handleInputChange} className="form-control" minLength="8" maxLength="8" required />
                            </div>

                            <div className="d-grid gap-2">

                                <button type="submit" className="btn btn-block btn-primary">
                                    Registrarse
                                </button>

                                <div id='login'>
                                    <div className='contenido'>
                                        <p>Ya dispone de una cuenta?</p>
                                        <Link to={"/Login"}><button className="btn btn-block btn-primary">Inicie Sesión</button></Link>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </EstilosRegistro>
        </>
    );

}

const EstilosRegistro = styled.body`

.textRegistro{
    color: black;
}


#principal{
    margin: 5rem;
    #login{
        box-shadow: 0 2px 5px black;
        border-radius: 10px;
        margin-top: 2rem;
        text-align: center;
    }
    .contenido{
        top: 10px;
            margin-top: 1rem;
            padding: 15px;
        }
}

`