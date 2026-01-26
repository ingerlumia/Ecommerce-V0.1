import connectdb from '../Database/DB.js'
import { Product } from "../Model/productModel.js";
//import productData from '../data/product.json' assert{type:'json'} 
import dotenv from 'dotenv';
import {readFileSync} from 'fs';

const productData = JSON.parse(
    readFileSync(new URL('../data/product.json',import.meta.url))
)

dotenv.config({path: '../.env'})
connectdb();

const seedproducts = async()=>{
    try{
        await Product.deleteMany();
        console.log('Products Deleted!');
        await Product.insertMany(productData);
        console.log('Products Added!');

    }catch(error){
        console.log(error);
        
    }
    process.exit();
}

seedproducts(); 