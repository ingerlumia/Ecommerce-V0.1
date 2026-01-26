import axios from "axios";
import { createSaleEventFail,createSaleEventSuccess, createSaleEventRequest,
    getSaleEventFail, getSaleEventRequest, getSaleEventSuccess,
    updateSaleEventRequest, updateSaleEventSuccess, updateSaleEventFail,
    saleEventRequest,saleEventSuccess,saleEventFail,
    toResponceSaleEventRequest, toResponceSaleEventSuccess, toResponceSaleEventFail,
    toggleSaleEventRequest, toggleSaleEventSuccess, toggleSaleEventFail,
    SaleEventDeleteSuccess,SaleEventDeleteFail, SaleEventDeleteRequest
} from "../slices/saleEventSlice";

export const createSaleEvent = formData => async (dispatch) => {
    try {
        dispatch(createSaleEventRequest());
        const {data} = await axios.post('/api/salesEvent/new/',formData,{
  headers: { "Content-Type": "application/json" }
});
        dispatch(createSaleEventSuccess(data));
    } catch (error) {
        dispatch(createSaleEventFail(error.response.data.message));
    }
}


export const getSalesEvent = () => async (dispatch) => {
    try {
        dispatch(getSaleEventRequest());
        const { data } = await axios.get(`/api/salesEvent/get/`);
        dispatch(getSaleEventSuccess(data));
    } catch (error) {
        dispatch(getSaleEventFail(error.response.data.message));
    }
}

export const sendSaleEventRequest = (idData) => async (dispatch) => {
    try {
        dispatch(saleEventRequest());
        const { data } = await axios.post(`/api/salesEvent/request/`,idData);
        dispatch(saleEventSuccess(data));
    } catch (error) {
        dispatch(saleEventFail(error.response.data.message));
    }
}

export const responceSaleEvent = (payload) => async (dispatch) => {
    try {
        dispatch(toResponceSaleEventRequest());
        const { data } = await axios.post(`/api/salesEvent/response/`,payload);
        dispatch(toResponceSaleEventSuccess(data));
    } catch (error) {
        dispatch(toResponceSaleEventFail(error.response.data.message));
    }
}

export const updateSaleEvent = (id,updateData) => async (dispatch) => {
    try {
        dispatch(updateSaleEventRequest());
        const {data} = await axios.put(`/api/salesEvent/update/${id}`,updateData);
        dispatch(updateSaleEventSuccess(data));
    } catch (error) {
        dispatch(updateSaleEventFail(error.response.data.message));
    }
}
export const deleteSaleEvent = (id) => async (dispatch) => {
    try {
        dispatch(SaleEventDeleteRequest());
        const {data} = await axios.delete(`/api/salesEvent/delete/${id}`);
        dispatch(SaleEventDeleteSuccess(data));
    } catch (error) {
        dispatch(SaleEventDeleteFail(error.response.data.message));
    }
}

export const toggleSaleEvent = (id) => async (dispatch) => {
    try {
        dispatch(toggleSaleEventRequest());
        await axios.put(`/api/salesEvent/toggle/`,id);
        dispatch(toggleSaleEventSuccess());
    } catch (error) {
        dispatch(toggleSaleEventFail(error.response.data.message));
    }
}
