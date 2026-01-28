import {
    summaryFail, summarySuccess, summaryRequest,
    newImageRequest,newImageSuccess,newImageFail,
    getImagesRequest,getImagesSuccess,getImagesFail,
    getShippingDataRequest, getShippingDataSuccess, getShippingDataFail,
    getNotificationsRequest, getNotificationsSuccess, getNotificationsFail,
    imageDeleteRequest, imageDeleteSuccess, imageDeleteFail,
    updateShippingDataSuccess,updateShippingDataFail,updateShippingDataRequest,
    updateImageRequest,
    updateImageSuccess,
    updateImageFail,
    updateNotificationsRequest,
    updateNotificationsSuccess,
    updateNotificationsFail,
    getOneShippingDataRequest,
    getOneShippingDataSuccess,
    addShippingDataRequest,
    addShippingDataSuccess,
    addShippingDataFail

} from "../slices/websiteSlice";
import api from "./api";

export const getSummary = () => async (dispatch) => {
    try {
        dispatch(summaryRequest());
        const { data } = await api.get(`/api/data/get/summary`);
        dispatch(summarySuccess(data));
    } catch (error) {
        dispatch(summaryFail(error.response.data.message));
    }
}

export const addNewImage = formData => async (dispatch) => {
    try {
dispatch(newImageRequest());
        const {data} = await api.post('/api/website/new/image',formData);
        dispatch(newImageSuccess(data));
    } catch (error) {
        dispatch(newImageFail(error.response.data.message));
    }
}
export const updateImage = (id,formData) => async (dispatch) => {
    try {
        dispatch(updateImageRequest());
        const {data} = await api.put(`/api/website/update/images/${id}`,formData);
        dispatch(updateImageSuccess(data));
    } catch (error) {
        dispatch(updateImageFail(error.response.data.message));
    }
}


export const getImages = () => async (dispatch) => {
    try {
        dispatch(getImagesRequest());
        const { data } = await api.get(`/api/website/view/images`);
        dispatch(getImagesSuccess(data));
    } catch (error) {
        dispatch(getImagesFail(error.response.data.message));
    }
}

export const getShippingData = () => async (dispatch) => {
    try {
        dispatch(getShippingDataRequest());
        const { data } = await api.get(`/api/website/get/ShippingData`);
        dispatch(getShippingDataSuccess(data));
    } catch (error) {
        dispatch(getShippingDataFail(error.response.data.message));
    }
}

export const getOneShippingData = (id) => async (dispatch) => {
    try {
        dispatch(getOneShippingDataRequest());
        const { data } = await api.get(`/api/website/get/ShippingData/${id}`);
        dispatch(getOneShippingDataSuccess(data));
    } catch (error) {
        dispatch(getShippingDataFail(error.response.data.message));
    }
}

export const getNotification = () => async (dispatch) => {
    try {
        dispatch(getNotificationsRequest());
        const { data } = await api.get(`/api/website/get/Notifications`);
        dispatch(getNotificationsSuccess(data));
    } catch (error) {
        dispatch(getNotificationsFail(error.response.data.message));
    }
}

export const updateNotification = (payload) => async (dispatch) => {
    try {
        dispatch(updateNotificationsRequest());
        const { data } = await api.put(`/api/website/update/Notifications`,payload);
        dispatch(updateNotificationsSuccess(data));
    } catch (error) {
        dispatch(updateNotificationsFail(error.response.data.message));
    }
}

export const addShippingData = (payload) => async (dispatch) => {
    try {
        dispatch(addShippingDataRequest());
        const {data} = await api.post(`/api/website/new/ShippingData`,payload);
        dispatch(addShippingDataSuccess(data));
    } catch (error) {
        dispatch(addShippingDataFail(error.response.data.message));
    }
}
export const updateShippingData = (shippingData) => async (dispatch) => {
    try {
        dispatch(updateShippingDataRequest());
        const {data} = await api.put(`/api/website/update/ShippingData`,shippingData);
        dispatch(updateShippingDataSuccess(data));
    } catch (error) {
        dispatch(updateShippingDataFail(error.response.data.message));
    }
}

export const deleteImage = (id) => async (dispatch) => {
    try {
        dispatch(imageDeleteRequest());
        await api.delete(`/api/website/delete/images/${id}`);
        dispatch(imageDeleteSuccess());
    } catch (error) {
        dispatch(imageDeleteFail(error.response.data.message));
    }
}

