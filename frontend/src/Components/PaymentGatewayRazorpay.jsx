import React, { useEffect, useState } from "react";
const PaymentGatewayRazorpay = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const paymentHandler = async (event) => {
        const amount = 500.0;
        const currency = 'INR';
        const receiptId = '1235823';
        const { email } = user;
        const response = await fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            })
        });

        const order = await response.json();
        console.log("order", order);

        var option = {
            key:"",
            amount,
            currency,
            name:"GDSC VNRVJIET",
            description: "Test Transaction",
            order_id: order.id,
            handler: async (response) => {
                const body = {...response, email}

                const validateResponse = await fetch('http://localhost:5000/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                const jsonResponse = await validateResponse.json();
                console.log('jsonResponse', jsonResponse);
            },
            prefill: {
                name: "Jakka Vignesh",
                email: "jakkavignesh2002@gmail.com",
                contact: "9502844394"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(option); // Note: Accessing Razorpay from the window object
        rzp1.on("payment.failed", (res) => {
            alert("Payment failed");
        });
        rzp1.open();
        event.preventDefault();
    };
    const [user, setUser] = useState({
        email:""
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]:value})
    }
    // const validateEmail = (email) => {
    //     // Basic email format validation using regular expression
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // }

    return (
        <>
            <div className="product">
                <h1>Razorpay Payment Gateway</h1>
                <button className="button" onClick={paymentHandler}>Pay Now</button>
                <input type="text" name = "email" className = 'username' placeholder="Enter Email" autoComplete='off' value = {user.email} onChange={handleInputs}/>
            </div>
        </>
    );
};

export default PaymentGatewayRazorpay;