import React from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import PaypalHostedFields from './PaypalHostedFields';

class PaypalClass extends React.Component {
    constructor() {
        super();
        this.state = {
            clientId: '',
            clientToken: ''
        }
    }

    componentDidMount() {
        axios.get('https://api-65-0-106-20.cormentor.com/api/v1/order/get-paypal-creds')
        // axios.get('http://localhost:8000/')
            .then(res => {
                // const {clientId,clientToken} = res.data
                // console.log(res.data);
                // this.setState({ clientId, clientToken })
                /***** api ******/
                console.log(res.data.data);
                const { client_id, client_token } = res.data.data
                console.log(client_id,client_token);
                this.setState({clientId:client_id,clientToken:client_token})
            }).catch(err => console.log(err))
    }

    // getOrderIdClient = (data, actions) => {
    //     return actions.order
    //         .create({
    //             purchase_units: [
    //                 {
    //                     amount: {
    //                         currency_code: "usd",
    //                         value: 2,
    //                     },
    //                 },
    //             ],
    //         })
    //         .then((orderId) => {
    //             // Your code here after create the order
    //             return orderId;
    //         });
    // }

    button_style = { layout: "vertical" }

    getOrderId() {
        // return axios.post('http://localhost:8000/api/orders')
        //             .then(res => res.data.id)
        //             .catch(err => console.log(err))
        return axios.get('https://api-65-0-106-20.cormentor.com/api/v1/order/paypal-create-order')
                    .then(res => {
                        console.log(res.data.data.id);
                        return res.data.data.id})
    }
    captureOrder(data,actions){
        const { orderID } = data
        console.log(orderID);
        // return axios.post(`http://localhost:8000/api/orders/${orderID}/capture`,{body:{orderID}})
        return axios.post('https://api-65-0-106-20.cormentor.com/api/v1/order/paypal-capture-payment',{order_id:orderID})
                    .then((response) => response)
                    .then((data) => {
                        console.log(data);
                                })
                    .catch((err) => {
                        console.log(err);
                                });
    }


    test_options = { "client-id": 'test' }
    render() {

        const options = {
            "client-id": this.state.clientId,
            "currency": "USD",
            components: "buttons,hosted-fields",
            intent: 'capture',
            "data-client-token": this.state.clientToken
        }
        console.log(this.state.clientId);
        return <>
            {this.state.clientId &&
            <PayPalScriptProvider options={options}>
                <PayPalButtons
                    disabled={false}
                    createOrder={this.getOrderId}
                    onApprove={this.captureOrder}
                    style={this.button_style}
                />
                <div className='wrapper'>
                    <div className='separator hr'>or</div>
                </div>
                <PaypalHostedFields />
            </PayPalScriptProvider>
    }
        </>
    }

}

export default PaypalClass

/**** dummy api to create client_token for hosted fields ******/
// 'https://braintree-sdk-demo.herokuapp.com/api/paypal/hosted-fields/auth'
// client id for dummy api
// 'AdOu-W3GPkrfuTbJNuW9dWVijxvhaXHFIRuKrLDwu14UDwTTHWMFkUwuu9D8I1MAQluERl9cFOd7Mfqe'