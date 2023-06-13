import React from 'react';
import {loadStripe} from '@stripe/stripe-js'
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from "axios";
import { Button } from 'react-bootstrap';
import "bootswatch/dist/lux/bootstrap.min.css";


const stripePromise = loadStripe("pk_test_51NBcXdCt8ttw5vuTW8JDDrtm2KUmbwyHyGI02j8yOuTp9grGhmJ0EQDLywBpdbHexojLw4B8RbLYhPLWMBpHIPBZ00SKzsuVbq")
const CheckoutForm = ()=>{
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        const {error,  paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if(!error){
            
        const {id} = paymentMethod;

        const {data} = await axios.post('http://localhost:3000/api/checkout',{
            id,
            amount: 10000 
        });
        console.log(data);

        elements.getElement(CardElement).clear();
        } 
    };
    
    return( 
    <form onSubmit={handleSubmit} className='card card-body'>
        <img 
        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBOkiBbnNp5X8FRaJIzrYCoKCkWFu1HnQeHw&usqp=CAU'
        alt='pagar'
        className='img-fluid'
        />

        <div className='form-group'>
        <CardElement className='form-control'/>
        </div>
        
        <Button className='btn btn-success'>Pagar</Button>
    </form>
    );
};

export default function Pago() {

    return(
        <Elements stripe={stripePromise}>
             <div className='container p-4'>
                <div className='row '>
                    <div className='col-md-4 offset-md-4'>
                        <CheckoutForm/>
                    </div>
                </div>
             </div>
        </Elements>
    );
    
}