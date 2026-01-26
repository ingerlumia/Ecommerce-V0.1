import express from 'express';
import { addNewImage, deleteImages, getAllImages, getNotifications, getShippingData, 
    shippingData, visiters, updateImage, updateNotifications, addCountryWithCouriers, 
    getCountryById ,updateCountryAndCouriers} from '../Controllers/websiteController.js';
import { upload, uploadFie } from '../Middlewar/multer.js';
import { isAuth, rolecheck } from '../Middlewar/isAuth.js';

const router = express.Router();

router.get('/website/visite',visiters);
router.post('/website/new/image',isAuth,rolecheck('admin'),uploadFie,addNewImage);
router.get('/website/view/images',getAllImages);
router.delete('/website/delete/images/:id',isAuth,rolecheck('admin'),deleteImages);
router.put('/website/update/images/:id',isAuth,rolecheck('admin'),upload,updateImage);

router.post('/website/new/ShippingData',isAuth,rolecheck('admin'),addCountryWithCouriers);
router.put('/website/update/ShippingData',isAuth,rolecheck('admin'),updateCountryAndCouriers);
router.get('/website/get/ShippingData',isAuth,rolecheck('admin'),getShippingData);
router.get('/website/get/ShippingData/:id',isAuth,rolecheck('admin'),getCountryById);

router.get('/website/get/Notifications',isAuth,getNotifications);
router.put('/website/update/Notifications',isAuth,updateNotifications);

export default router;