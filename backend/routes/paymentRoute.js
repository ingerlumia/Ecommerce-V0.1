import express  from "express";
import { isAuth } from "../Middlewar/isAuth.js";
import { processPayment, sendStripeApi } from "../Controllers/paymentController.js";

const router = express.Router();

router.post('/payment/process',isAuth,processPayment); 
router.get('/stripeapi',isAuth,sendStripeApi);

export default router;