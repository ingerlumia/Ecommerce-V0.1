import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors';
import connectdb from "./Database/DB.js";
import cookieparser from 'cookie-parser';

//Configuration's
dotenv.config();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy',true);
//Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieparser());
app.use('/uploads',express.static('uploads'));

const allowedOrigins = [
  "http://localhost:3000",
  "https://ecommercev01-parvins-projects-aef319f0.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.includes(origin) ||
      origin.includes(".vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());



//Router
import userRoutes from './routes/userRoute.js';
import productRoutes from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js'
import paymentRoute from './routes/paymentRoute.js';
import websiteRoute from './routes/websiteRoute.js';
import CatagoryRoute from './routes/catagoryRoutes.js';
import SalesEventRoute from './routes/salesEventRoutes.js';
import { fileURLToPath } from "url";

//Useing Routes
app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',orderRoute);
app.use('/api',paymentRoute);
app.use('/api',websiteRoute);
app.use('/api',CatagoryRoute);
app.use('/api',SalesEventRoute);

/*
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname,'../frontend/build')));
    app.get('*',(req, res)=>{
      res.sendFile(path.resolve(path.join(__dirname,'../frontend/build/index.html')));
    })
  }
*/
app.listen(port,() =>{
    console.log(`Server Running on http://localhost:${port}`);
    connectdb();
})
















