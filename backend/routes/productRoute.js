import express from 'express';
import { isAuth, rolecheck } from '../Middlewar/isAuth.js';
import { uploadFie, uploadNone } from '../Middlewar/multer.js';
import {
    createProduct,
    createReview,
    deleteReview,
    deletesingleproduct,
    filterProducts,
    getDashboardSummary,
    getProducts,
    getReviews,
    productStatusUpdate,
    stockUpdate,
    updateAllProductsCategory,
    updateAllProductsStatus,
    updateProductSeo,
    updatesingleproduct,
    viewallProducts,
    viewsingleProduct } from '../Controllers/productController.js';

const router = express.Router();

router.get('/product/allProducts', viewallProducts);
router.get('/product/singleProduct/:id', viewsingleProduct);
router.get('/product/viewallProducts',isAuth, getProducts);
router.put('/product/review/', isAuth,createReview);

//Admin
router.put('/admin/product/update/status/allProduct/', isAuth,rolecheck('admin'),updateAllProductsStatus);
router.put('/admin/product/update/AllProduct/catagoy', isAuth,rolecheck('admin'),updateAllProductsCategory);
router.put('/admin/product/update/product/Seo/:id', isAuth,rolecheck('admin'),uploadNone,updateProductSeo);


router.put('/product/updatesingleProduct/:id',isAuth,rolecheck('admin','manager','seller'),uploadNone,updatesingleproduct);
router.delete('/product/deletesingleProduct/:id',isAuth,rolecheck('admin','manager','seller'),deletesingleproduct);
router.get('/data/get/summary', isAuth, rolecheck('admin','manager','seller'), getDashboardSummary);

router.post('/product/new', isAuth,rolecheck('admin','seller'),uploadFie,createProduct);
router.get('/product/filteredProducts', filterProducts);
router.get('/product/getproducts/', isAuth ,rolecheck('seller','manager'), getProducts);
router.put('/product/updateStatus/:id',isAuth,rolecheck('manager','admin'),productStatusUpdate);
router.get('/product/get/reviews/', isAuth ,rolecheck('manager','admin','seller'), getReviews);
router.put('/product/updateProductstock/:id',isAuth,rolecheck('seller'),stockUpdate);

router.delete('/product/reviews', isAuth ,rolecheck('admin','manager'), deleteReview);

export default router;



