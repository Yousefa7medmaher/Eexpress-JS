import Stripe from 'stripe';
import { sendResponse } from '../utils/response.js';

// Initialize Stripe with the secret key from environment variables
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res, next) => {
    try {
        const { cartItems, totalPrice, paymentMethodId } = req.body;

        // Validate the required fields
        if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
            return sendResponse(res, 400, false, "Cart items are required.");
        }
        if (!totalPrice || totalPrice <= 0) {
            return sendResponse(res, 400, false, "Invalid total price.");
        }
        if (!paymentMethodId) {
            return sendResponse(res, 400, false, "Payment method ID is required.");
        }

        // Create a payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalPrice * 100,  // Stripe requires the amount in cents
            currency: 'usd',  // Make sure the currency is supported
            payment_method: paymentMethodId,
            confirm: true,
        });

        // Check if the payment was successful
        if (paymentIntent.status === 'succeeded') {
            sendResponse(res, 200, true, "Payment successful.", paymentIntent);
        } else {
            sendResponse(res, 500, false, "Payment failed, please try again.");
        }
    } catch (err) {
        // Handle errors from Stripe
        if (err.type === 'StripeCardError') {
            return sendResponse(res, 400, false, "Card error: " + err.message);
        }
        // Forward other errors for further handling
        next(err);
    }
};
