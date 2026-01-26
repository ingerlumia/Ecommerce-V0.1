import express from 'express';
import { isAuth, rolecheck } from '../Middlewar/isAuth.js';
import { uploadFie } from '../Middlewar/multer.js';
import { createCatagory, getCatagory, getSingleCatagory, updateCatagory } from '../Controllers/categoryController.js';

const router = express.Router();

router.post('/admin/catagory/new', isAuth,rolecheck('admin'),createCatagory);
router.get('/catagory/view', getCatagory);
router.get('/catagory/one/view', isAuth, getSingleCatagory);
router.put('/catagory/one/update/:id', isAuth, updateCatagory);
/*router.delete('/catagory/delete/:id', isAuth,rolecheck('admin'), deletesingleproduct);
router.put('/catagory/update/:id', isAuth,rolecheck('admin'),updatesingleproduct);
*/
export default router;

