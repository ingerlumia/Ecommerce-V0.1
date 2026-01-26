import express from 'express';
const router = express.Router();
import multer from 'multer';
import {registerUser, verifyUser ,loginUser, profile, forgotPassword, resetpassword, changepassword, updateProfile, getAllUsers, getSingleUser, updateUser, deleteUser, getSpecificUser} from '../Controllers/userController.js';
import { isAuth, logoutUser, rolecheck } from '../Middlewar/isAuth.js';
import { singleFileUpload } from '../Middlewar/multer.js';

//new user
router.post('/user/register',singleFileUpload, registerUser);
router.post('/user/verify', verifyUser);

//login logout
router.post('/user/login', loginUser);
router.get('/user/logoutUser', logoutUser);

//password
router.post('/user/forgotPassword', forgotPassword);
router.post('/user/resetpassword/:token', resetpassword);
router.put('/user/changepassword/', isAuth,changepassword);

//profile
router.get('/user/profile',isAuth, profile);
router.put('/user/updateprofile/', isAuth, singleFileUpload, updateProfile);

//Admin Routes
router.get('/users/get/AllUsers',isAuth,rolecheck('admin','manager'),getAllUsers);
router.get('/users/get/user/:id',isAuth,rolecheck('admin','manager'),getSingleUser);
router.put('/users/update/user/:id',isAuth,rolecheck('admin','manager'),updateUser);
router.delete('/users/delete/user/:id',isAuth,rolecheck('admin','manager'),deleteUser);

router.get('/manager/specificuser/:id',isAuth,rolecheck('manager'),getSpecificUser);

export default router;