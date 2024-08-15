import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './order.css'; // Include your CSS file here

const stripePromise = loadStripe('your-publishable-key'); // Replace with your Stripe publishable key

// PaymentForm component handles the payment form and payment processing
const PaymentForm = ({ cartItems, onOrderPlaced }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Get the payment details from the form
        const cardElement = elements.getElement(CardElement);

        // Create a token for the payment details
        const { token, error: stripeError } = await stripe.createToken(cardElement);

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        // Send the token and order details to your backend
        const response = await fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token.id, items: cartItems }),
        });

        const data = await response.json();

        if (response.ok) {
            // Payment was successful, handle order placement
            onOrderPlaced();
        } else {
            // Handle payment failure
            setError(data.message);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <p className="error">{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : 'Place Order'}
            </button>
        </form>
    );
};

// PaymentPage component renders the payment form
const Order = ({ cartItems, onOrderPlaced }) => {
    return (
        <div className="container1"> {/* Use your existing CSS class */}
            <h2>Payment</h2>
            <Elements stripe={stripePromise}>
                <PaymentForm cartItems={cartItems} onOrderPlaced={onOrderPlaced} />
            </Elements>
        </div>
    );
};

export default Order;
