import express from 'express';
import { isAuth, rolecheck } from '../Middlewar/isAuth.js';
import { deleteOrder, filterProducts, getAllOrder, getMonthlyTopProducts, getSingleOrder, getTopSellingProducts,
     getTrendingProducts, myorders, newOrder, updateOrder } from '../Controllers/orderController.js';

const router = express.Router();

//router.post('/order/new',createOrder)

//User Order Route
router.post('/order/neworder',isAuth,newOrder);
router.get('/order/myorders/',isAuth,myorders);
router.get('/order/:id',isAuth,getSingleOrder);

//Admin Order CRUD
router.get('/order/get/orders/',isAuth,rolecheck('admin','manager','seller'),getAllOrder);
router.put('/order/update/:id',isAuth,rolecheck('admin','manager','seller'),updateOrder);
router.delete('/order/delete/:id',isAuth,rolecheck('admin','manager'),deleteOrder);

//seller Order CRUD
router.get('/seller/order/',isAuth,rolecheck('seller'),getAllOrder);
router.put('/seller/order/:id',isAuth,rolecheck('seller'),updateOrder);

//Features
router.get('/features/getTopSellingProducts/',getTopSellingProducts);
router.get("/features/monthlyproducts", getMonthlyTopProducts);
router.get("/features/trending", getTrendingProducts);
router.get('/features/filter/Products',isAuth,filterProducts);

export default router;