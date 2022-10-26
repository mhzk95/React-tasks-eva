import {useState,useRef, useEffect} from 'react'
import {
    PayPalHostedFieldsProvider,
    PayPalHostedField,
    usePayPalHostedFields } from "@paypal/react-paypal-js";
import axios from 'axios'
import {rejection_codes} from './error-response'

const PaypalHostedFields = () => {
    const [cardNumber, setCardNumber] = useState({isEmpty:false,isValid:true})
    const [cvv, setCvv] = useState({isEmpty:false,isValid:true})
    const [expiry, setExpiry] = useState({isEmpty:false,isValid:true})
    const [name,setName] = useState(true)
    const cardHolderName = useRef(null);
    const [paying, setPaying] = useState(false);
    const [rejectionErr,setRejectionErr] = useState('')

    useEffect(() => {
        // console.log(Object.keys(rejection_codes).includes(`${1330}`))
        // let err_code_exist = Object.values(rejection_codes).includes('5180')
        //                     console.log(err_code_exist);
    },[])

    const SubmitPayment = () => {
        
        const hostedFields = usePayPalHostedFields();

        const submitHandler = () => {
            const {cvv,number,expirationDate} = hostedFields.cardFields.getState().fields

            const isFormInvalid =
                Object.values(hostedFields.cardFields.getState().fields).some(
                    (field) => !field.isValid
                ) || !cardHolderName?.current?.value;
            
            if (isFormInvalid) {
                setCardNumber({isEmpty:number.isEmpty,isValid:number.isValid})
                setCvv({isEmpty:cvv.isEmpty,isValid:cvv.isValid})
                setExpiry({isEmpty:expirationDate.isEmpty,isValid:expirationDate.isValid})
                setName(Boolean(cardHolderName?.current?.value))
                return 
            }
            setPaying(true);
            setCardNumber({isEmpty:false,isValid:true});
            setCvv({isEmpty:false,isValid:true});
            setExpiry({isEmpty:false,isValid:true});
            setName(true);
            setRejectionErr('')
            hostedFields
                .cardFields
                .submit({
                    cardholderName: cardHolderName?.current?.value
                })
                .then((order) => {
                    const {orderId} = order;
                    axios.post(
                       `http://localhost:8000/api/orders/${orderId}/capture`
                    )
                        .then((response) => response)
                        .then((data) => {
                            console.log(data);
                            let err_code = data?.data?.purchase_units[0]?.payments?.captures[0]?.processor_response?.response_code
                            let err_code_exist = Object.keys(rejection_codes).includes(err_code)
                            setPaying(false)
                            
                            (err_code === '0000') ? console.log('0000') :
                            (err_code_exist) ? setRejectionErr(rejection_codes[err_code]) :
                            setRejectionErr('Something went wrong')
                        })
                        .catch((err) => {
                            console.log(err);
                            setRejectionErr('Something Went Wrong')
                        })
                        .finally(()=> {
                            setPaying(false)
                        });
                }).catch((err) => {
                    console.log(err);
                    setPaying(false)
                });
        };
    
        return <>
                <button
                    className={`btn ${paying ? "" : "btn-primary"}`}
                    onClick={submitHandler}
                >
                    {paying ? <div className="spinner tiny" /> : "Place Order"}
                </button>
            </>;
    };

    return (
        <>
        <span className={rejectionErr && 'rejection_err'} >{rejectionErr}</span>
        <PayPalHostedFieldsProvider
            createOrder={() => {
                return axios.get('https://api-65-0-106-20.cormentor.com/api/v1/order/paypal-create-order')
                    .then(res => {
                        console.log(res.data.data.id);
                        return res.data.data.id})
                // return axios.post('http://localhost:8000/api/orders')
                //     .then(res => res.data.id)
                //     .catch(err => console.log(err))
            }}
        >
            <span className='error_message'>{
            (cardNumber.isEmpty && '*Card Number is Required.') 
            || (!cardNumber.isValid && '*The card number is not valid.')
             }</span>
            <PayPalHostedField
                id="card-number"
                className={`card-field ${(cardNumber.isEmpty || !cardNumber.isValid) && 'formError'}`}
                hostedFieldType="number"
                options={{
                    selector: "#card-number",
                    placeholder: 'Card Number'
                }}
            />
            <div className='w-50'>
                <div className='row'>
            <span className='error_message'>{
            (cvv.isEmpty && '*CVV is Required.') || (!cvv.isValid && '*CVV is not Valid.')
            }</span>
                <PayPalHostedField
                    id="cvv"
                    className={`card-field ${(cvv.isEmpty || !cvv.isValid) && 'formError' }`}
                    hostedFieldType="cvv"
                    
                    options={{
                        selector: "#cvv",
                        placeholder: 'CVV'
                    }}
                />
                </div>
                <div className='row'>
                <span className='error_message'>{
            (expiry.isEmpty && '*Expiry is Required.') || (!expiry.isValid && '*Expiry not valid.')
             }</span>
                <PayPalHostedField
                    id="expiration-date"
                    className={`card-field ${(expiry.isEmpty || !expiry.isValid) && 'formError'}`}
                    hostedFieldType="expirationDate"
                    options={{
                        selector: "#expiration-date",
                        placeholder: "MM/YY",
                    }}
                />
                </div>
            </div>
            <span className='error_message'>{ 
                (!name && '*Cardholder Name is Required')}</span>
                <input
                    id="card-holder"
                    className={`card-field ${!name && 'formError'}`}
                    ref={cardHolderName}
                    // style={{ ...customStyle, outline: "none" }}
                    type="text"
                    placeholder="Full Name"
                />
            <SubmitPayment />
        </PayPalHostedFieldsProvider>
        </>
    )
}

export default PaypalHostedFields