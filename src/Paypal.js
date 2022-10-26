import React ,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { PayPalScriptProvider, 
         PayPalButtons, } from "@paypal/react-paypal-js";
import axios from 'axios';
// import PaypalHostedFields from './PaypalHostedFields';



const Paypal = () => {
    let Navigate = useNavigate()
    const [cred,setCred] = useState({
        clientId:'e',
        clientToken:'',
    })

    useEffect(() => {
        // axios.get('http://localhost:8000').then((res) => {
        //     const {clientId,clientToken} = res.data
        //     setCred({clientId,clientToken})
        // })
    },[])
    console.log(cred);

    const order_obj={
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: 5.2,
                    breakdown:{
                        item_total:{
                            currency_code:'USD',
                            value: 4
                        },
                        handling:{
                            currency_code:'USD',
                            value: 1.2
                        }
                    }
                },
                items:[{
                        name:'react js course',
                        quantity:1,
                        unit_amount:{
                            currency_code:'USD',
                            value: 4
                        }
                    }]
                                                         
            },
        ],
    }

    const createOrder = (data,actions) => {
         // return axios.post('http://localhost:8000/api/orders')
                    // .then(res => res.data.id)
                    // .catch(err => console.log(err))
        return actions.order
                                .create(order_obj)
                                .then((orderId) => {
                                    // Your code here after create the order
                                    return orderId;
                                }).catch(err => console.log(err));
    }
    // const approvePayment = (data,actions) => {
    //                 console.log(actions)
    //                 const {orderID} = data
    //                 console.log(orderID)
    //                 return actions.order.capture().then(res => {
    //                                                 Navigate('/success')
    //                                                 console.log(res)})
    //                                             .catch(err => console.log(err));
                    // return axios.post(
                    //     `http://localhost:8000/api/orders/${orderID}/capture`
                    //  )
                    //      .then((response) => response)
                    //      .then((data) => {
                    //          console.log(data);
                    //      })
                    //      .catch((err) => {
                    //          console.log(err);
                    //      });
    // }
    const button_style = { layout: "vertical" }

    const options = { 
            // "client-id": cred.clientId,
            // "client-id" : 'AaxBlhkOanUtkDdwaqG1B11LMjHLqstu1hSgEywZpcokqmTa_fWElkfkVqW5Xm88GKUihevGNyH9rxVW',
            "client-id" : 'test',
            "currency": "USD",
            components:"buttons,hosted-fields",
            intent : 'capture',
            // "data-client-token" : cred.clientToken
             }

    return (
        <>
        {cred.clientId &&
        <PayPalScriptProvider options={{"client-id" : 'test'}}>
            <PayPalButtons
                disabled={false}
                createOrder={createOrder}
                // onApprove = {approvePayment}
                style={button_style}
            />
            <div className='wrapper'>
               <div className='separator hr'>or</div>
            </div>
            {/* <PaypalHostedFields /> */}
        </PayPalScriptProvider> }
        </>
    );
}

export default Paypal