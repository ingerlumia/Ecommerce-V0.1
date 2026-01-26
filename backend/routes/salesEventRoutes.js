import express from 'express';
import { createSalesEvent, deleteSalesEvent, getSalesEvents,
    responedToEvent, salesEventRequest, toggleSalesEvent, updateSalesEvent } from '../Controllers/salesEventController.js';
import { isAuth, rolecheck } from '../Middlewar/isAuth.js';

const router = express.Router();


router.post('/salesEvent/new/',isAuth,rolecheck('admin'),createSalesEvent);
router.get('/salesEvent/get/',isAuth,rolecheck('admin'),getSalesEvents);
router.put('/salesEvent/toggle/',isAuth,rolecheck('admin'),toggleSalesEvent);
router.put('/salesEvent/update/:id',isAuth,rolecheck('admin'),updateSalesEvent);
router.delete('/salesEvent/delete/:id',isAuth,rolecheck('admin'),deleteSalesEvent);
router.post('/salesEvent/request/',isAuth,rolecheck('admin'),salesEventRequest);

router.post('/salesEvent/response/',isAuth,responedToEvent);


export default router;