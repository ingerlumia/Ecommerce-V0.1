import { adminDeleteOrderFail, adminDeleteOrderRequest, adminDeleteOrderSucess, adminOrderUpdateFail, adminOrderUpdateRequest, adminOrderUpdateSucess, adminOrdersFail, adminOrdersRequest, adminOrdersSucess, createOrderFail, createOrderRequest, createOrderSucess, orderDetailFail, orderDetailRequest, orderDetailSucess, userOrdersFail, userOrdersRequest, userOrdersSucess } from "../slices/orderSlice"
import api from "./api";

export const createOrder = order => async(dispatch)=>{
    try {
        dispatch(createOrderRequest());
        const { data } = await api.post('/api/order/neworder',order);
        dispatch(createOrderSucess(data));
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message));
    }
};

export const userorders = async(dispatch) =>{
    try {
        dispatch(userOrdersRequest());
        const { data } = await api.get('/api/order/myorders/');
        dispatch(userOrdersSucess(data));
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message));
    }
}

export const orderDetail  = id => async(dispatch) =>{
    try {
        dispatch(orderDetailRequest());
        const { data } = await api.get(`/api/order/${id}`);
        dispatch(orderDetailSucess(data));
    } catch (error) {
        dispatch(orderDetailFail(error.response.data.message));
    }
}

export const ordersList = () => async(dispatch) =>{
    try {
        dispatch(adminOrdersRequest());
        const { data } = await api.get(`/api/order/get/orders/`);
        dispatch(adminOrdersSucess(data));
    } catch (error) {
        dispatch(adminOrdersFail(error.response.data.message));
    }
}

export const deleteOrder = id => async(dispatch) =>{
    try {
        dispatch(adminDeleteOrderRequest());
        await api.delete(`/api/order/delete/${id}`);
        dispatch(adminDeleteOrderSucess());
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Server Error";
        dispatch(adminDeleteOrderFail(error.response?.data?.message));
    }
}

export const adminUpdateOrder = (id,orderData) => async(dispatch) =>{
    try {
        dispatch(adminOrderUpdateRequest());
        const { data } = await api.put(`/api/order/update/:id${id}`,orderData);
        dispatch(adminOrderUpdateSucess(data));
    } catch (error) {
        const message = error.response?.data?.message || error.message || "Server Error";
        console.log(error);
        dispatch(adminOrderUpdateFail(error.response.data.message));
    }
}

