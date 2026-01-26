import { thunk } from 'redux-thunk';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import websiteReducer from './slices/websiteSlice';
import featuresReducer from './slices/featuresSlice';
import saleEventReducer from './slices/saleEventSlice';

const reducer = combineReducers({
    productsState: productsReducer,
    authState: authReducer,
    cartState: cartReducer,
    orderState: orderReducer,
    userState: userReducer,
    websiteState: websiteReducer,
    featuresState: featuresReducer,
    saleEventState: saleEventReducer
})


const store = configureStore({
    reducer,
    devTools: true,
    middleware: ()=>[thunk],
})


export default store;