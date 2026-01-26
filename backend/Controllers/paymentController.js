import Stripe from 'stripe';
const stripe= new Stripe(process.env.STRIPE_Secret_key)
import { statusCode } from '../Middlewar/statusCode.js';

export const processPayment = async(req, res)=>{
    try {
        
        const paymentindent = await stripe.paymentIntents.create({
            description: "test",
            amount: req.body.amount,
            currency: "usd",
            metadata: {integration_check: 'accept_payment'},
            shipping: req.body.shipping
        });
        res.status(statusCode.ok).json({
            sucess: true,
            client_secret: paymentindent.client_secret
        })

    } catch (error) {
        throw error;
    }
};

export const sendStripeApi = async(req, res)=>{
    return res.status(statusCode.ok).json({
        stripeApiKey: process.env.STRIPE_Publishable_key
    })
}

