import styled from "styled-components";


export default function Contacto() {
    return (
        <>
            <EstiloContacto>
                <div className="to">
                    <div id="formato">
                        <h1>Contactanos</h1>
                        <h2><b>Y haremos realidad con lo que te propongas</b></h2>
                        <h4>Cuentanos tus sugerencias o dudas que tengas sobre los prestamos</h4>
                    </div>

                    <div id="contenido">
                        <h1>Formato de Contacto</h1>
                        <form className='cf'>
                            <div className='half left cf'>
                                <input type='text' placeholder='Name' name='user_name' />
                                <input type='email' placeholder='Email address' name='user_email' />
                            </div>
                            <div className='half right cf'>
                                <textarea name='message' type='text' placeholder='Message'></textarea>
                            </div>
                            <input type='submit' value='Submit' id='input-submit' />
                        </form>
                    </div>
                </div>
            </EstiloContacto>
        </>
    );

}

const EstiloContacto = styled.body`
@import url(https://fonts.googleapis.com/css?family=Merriweather); 

.to{
    background-color: #f1f1f1;
}

#formato{
    margin: 5rem;
    text-align: center;
}

#contenido{
    margin-bottom: 5rem;
}

html, body { 
    background: #f1f1f1; 
    font-family: 'Merriweather', sans-serif; 
    padding: 1em; 
}
h1 { 
    text-align: center; 
    color: #a8a8a8; 
} 
form { 
    max-width: 600px; 
    text-align: center; 
    margin: 20px auto; 
} 
input, textarea { 
    border: 0; 
    outline: 0; 
    padding: 1em; 
    border-radius: 8px; 
    display: block; 
    width: 100%; 
    margin-top: 1em; 
    font-family: 'Merriweather', sans-serif; 
    resize: none; 
} 
#input-submit { 
    color: white; 
    background: #e74c3c; 
    cursor: pointer; 
} 
#input-submit:hover { 
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2); 
} 
textarea { 
    height: 126px; 
} 
.half { 
    float: left; 
    width: 48%; 
    margin-bottom: 1em; 
} 
.right { 
    width: 50%; 
} 
.left { margin-right: 2%; } 
@media (max-width: 480px) { 
    .half { width: 100%; float: none; margin-bottom: 0; } 
    } 
    .cf:before, 
    .cf:after { content: ' '; display: table; } 
    .cf:after { clear: both; }
`