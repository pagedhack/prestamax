
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useState } from 'react';

const cookies = new Cookies();

export default function Simulador() {

  function simular() {

    let monto = document.getElementById('monto').value;
    let plazo = document.querySelector('#Plazo').value;
    let interes = 0.015;
    const tabla = document.querySelector("#lista-tabla tbody");
    const final = document.querySelector("#lista-tabla tfoot");
    const texto = document.getElementById("texto");

    calular();

    function calular() {
      let pagoInteres = 0, pagoCapital = 0, cuota = 0;

      if (!monto) {
        Swal.fire('', 'Va a Realizar alguna Operación?', 'question');
      } else {

        while (tabla.firstChild) {
          tabla.removeChild(tabla.firstChild);
        }
        while (final.firstChild) {
          final.removeChild(final.firstChild);
        }

        var tasaResultado = 1 + interes;
        var potencia = Math.pow(tasaResultado, plazo);
        var uno = potencia * interes;
        var dos = potencia - 1;
        var tres = uno / dos;
        cuota = monto * tres;

        let totalCuota = [];
        let totalCapital = [];
        let totalInteres = [];
        let totalMonto = [];

        for (let i = 1; i <= plazo; i++) {
          pagoInteres = parseFloat(monto * interes);
          pagoCapital = cuota - pagoInteres;
          monto = parseFloat(monto - pagoCapital);

          totalCuota.push(cuota);
          totalCapital.push(pagoCapital);
          totalInteres.push(pagoInteres);
          totalMonto.push(monto);

          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${i}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${pagoCapital.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
          `;
          tabla.appendChild(row);
        }
        var sumaCuota = 0;
        for (const value of totalCuota) {
          sumaCuota += value;
        }
        var sumaCapital = 0;
        for (const value of totalCapital) {
          sumaCapital += value;
        }
        var sumaInteres = 0;
        for (const value of totalInteres) {
          sumaInteres += value;
        }

        const pie = document.createElement('tr');
        pie.innerHTML = `
            <th>${"Total"}</th>
            <th>${sumaCuota.toFixed(2)}</th>
            <th>${sumaCapital.toFixed(2)}</th>
            <th>${sumaInteres.toFixed(2)}</th>
          `;
        final.appendChild(pie);

        texto.innerHTML = `
        <h5><b>${"Usted va a pagar " + cuota.toFixed(2)}</b></h5><br>
        <p>${" La cantidad a pagar es: " + sumaCuota.toFixed(1)}</p>
        `;
      }
    }

  }

  return (
    <>
      <SimuladorC>

        <div className='sim'>
          <div id="contenedor">
            <div className="header">
              <h2>Simulacion de préstamo</h2>
            </div>

            <div name="frmPrestamo" id="frmPrestamo">

              <div className="control">
                <label htmlFor="monto">Monto:
                  <input type="number" name="monto" id="monto" placeholder="monto" min="100" max="99999" step="5"></input>
                </label>
              </div>

              <div className="control">
                <label htmlFor="Plazo">Periodo (mensual):
                  <select name="Plazo" id="Plazo">
                    <option value={0}></option>
                    <option value={7}>Semanal</option>
                    <option value={15}>Quincenal</option>
                    <option value={30}>Mensual</option>
                  </select>
                </label>
              </div>

              <div className="control">
                <label htmlFor="interes">Interés (anual): 15.0 %</label><br></br>
                <label htmlFor="interes">Interés (mensual): 1.25 %</label>
              </div>

              <button id="simular" onClick={simular}>Simular préstamo</button>
              {
                !cookies.get('name') ? (
                  <Link to={"/Login"}><button id="pedir">Pedir préstamo</button></Link>
                ) : (
                  <Link to={"/prestamoFormCliente"}><button id="pedir">Pedir préstamo</button></Link>
                )
              }
            </div>
          </div>

          <div>
            <div id="contenedorTabla">
              <div className="header">
                <h2>Amortizacion</h2>
              </div>
              <div id="amortizaciones">
                <table id='lista-tabla' class="table table-bordered table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Periodo</th>
                      <th scope="col">Cuota</th>
                      <th scope="col">Interes</th>
                      <th scope="col">Capital</th>
                      <th scope='col'>Insoluto</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                  <tfoot>
                  </tfoot>
                </table>
                <p id='texto'></p>
              </div>
            </div>
          </div>

        </div>
      </SimuladorC>

    </>
  );
}


const SimuladorC = styled.body`
.sim{
  background: white;
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 2px 5px black;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 5rem;
    margin-bottom: 5rem;
    width: 95%;
    display: flex;
    vertical-align: top;
    flex-wrap: wrap;
    margin-bottom: 60px;
    flex-direction: row;
    background: rgb(0,0,0);
    background: linear-gradient(190deg, rgba(0,0,0,0.8) 0%, rgba(121,9,106,0.8) 35%, rgba(217,0,0,0.8) 100%);
}

body {
    margin: 0;
    padding: 0%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  @import url('https://fonts.googleapis.com/css?family=DM+Sans&display=swap');
  
  * {
    box-sizing: border-box;
  }
  
  body {
    background: linear-gradient(to right, royalblue, darkblue);
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
  }  
  
  #contenedor{
    background-color: #FFF;
    border-radius: 20px;
    box-shadow: 0 5px 5px rgba(195, 0, 0, 0.3);
    overflow: hidden;
    width: 500px;
    max-width: 150%;
    margin: 5rem 2rem 5rem 3rem;
  }

  #contenedorTabla {
    background: #FFF;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 5px 5px #980000;
    box-sizing: auto;
    width: 500px;
    max-width: 150%;
    max-height: 820px;
    margin: 5rem 2rem 5rem 3rem;
    overflow-y: auto;
  }

  #texto{
    text-align: center;
  }
  
  #frmPrestamo button {
    background: rgba(65, 105, 225, 90%);
    border: 2px solid royalblue;
    border-radius: 4px;
    color: #FFF;
    display: block;
    font-family: inherit;
    font-size: medium;
    padding: 10px;
    margin-top: 20px;
    width: 100%;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  
  ::-webkit-scrollbar-track {
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  .header, thead {
    border-bottom: 1px solid #F0F0F0;
    background-color: #F7F7F7;
    padding: 20px 5rem;
    text-align: center;
  }
  
  .header h2 {
    margin: 0;
  }
  
  #frmPrestamo {
    padding: 30px 40px;
  }
  
  #frmPrestamo .control, #amortizaciones .control, .radios {
    margin-bottom: 10px;
    padding-bottom: 20px;
    position: relative;
  }
  
  #frmPrestamo .control input, #frmPrestamo .control select {
    border: 2px solid #F0F0F0;
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    padding: 10px;
    width: 100%;
  }


`