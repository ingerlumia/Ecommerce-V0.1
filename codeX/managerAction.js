import axios from "axios";
import {
    managerProductFail, managerProductRequest, managerProductSuccess,
    managerProductsFail, managerProductsRequest, managerProductsSuccess,
    managerReviewFail, managerReviewRequest, managerReviewSuccess,
    managerUpdateProductFail, managerUpdateProductRequest, managerUpdateProductSuccess,
    managerUserDeleteFail, managerUserDeleteRequest,
    managerUserDeleteSuccess, managerUserFail, managerUserOrdersFail,
    managerUserOrdersRequest, managerUserOrdersSucess, managerUserRequest, managerUserSuccess,
    managerUserUpdateRequest,
    managerUserUpdateSuccess,
    managerUsersListFail, managerUsersListRequest, managerUsersListSuccess
} from "../slices/managerSlice";
const api = axios.create({ baseURL: "http://localhost:3000" });

// Users based Actions
export const managerGetUsers = () => async (dispatch) => {
    try {
        dispatch(managerUsersListRequest());
        const { data } = await api.get("/api/users/get/AllUsers");
        dispatch(managerUsersListSuccess(data));
    } catch (error) {
        dispatch(managerUsersListFail(error.response.data.message));
    }
}

export const managerGetUser = (id) => async (dispatch) => {
    try {
        dispatch(managerUserRequest());
        const { data } = await api.get(`/api/users/get/user/${id}`);
        dispatch(managerUserSuccess(data));
    } catch (error) {
        dispatch(managerUserFail(error.response.data.message));
    }
}

export const managerUserDelete = (id) => async (dispatch) => {
    try {
        dispatch(managerUserDeleteRequest());
        await api.delete(`/api/users/delete/user/${id}`);
        dispatch(managerUserDeleteSuccess());
    } catch (error) {
        dispatch(managerUserDeleteFail(error.response.data.message));
    }
}

export const managerUserUpdate = (id, formData) => async (dispatch) => {
    try {
        dispatch(managerUserUpdateRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        const { data } = await api.put(`/api/users/update/user/${id}`, formData, config);
        dispatch(managerUserUpdateSuccess(data));
    } catch (error) {
        dispatch(managerUserDeleteFail(error.response.data.message));
    }
}

// Orders based Actions
export const managerOrderList = () => async (dispatch) => {
    try {
        dispatch(managerUserOrdersRequest());
        const { data } = await axios.get(`/api/order/get/orders/`);
        dispatch(managerUserOrdersSucess(data));
    } catch (error) {
        dispatch(managerUserOrdersFail(error.response.data.message));
    }
}

// products based Actions
export const managerGetProduct = id => async (dispatch) => {
    try {
        dispatch(managerProductRequest());
        const { data } = await axios.get(`/api/product/singleProduct/${id}`);
        dispatch(managerProductSuccess(data));
    } catch (error) {
        dispatch(managerProductFail(error.response.data.message));
    }
}

export const managerGetProducts = (keyword) => async (dispatch) => {

    try {
        dispatch(managerProductsRequest());

        let link = `/api/product/allProducts?`;

        if (keyword) {
            link += `&keyword=${keyword}`;
        }
        const { data } = await axios.get(link);
        dispatch(managerProductsSuccess(data));

    } catch (error) {
        dispatch(managerProductsFail(error.response.data.message));
    }
}
export const managerGetProductsFil = (keyword) => async (dispatch) => {

    try {
        dispatch(managerProductsRequest());

        let link = `/api/product/viewallProducts/`;

        const { data } = await axios.get(link);
        dispatch(managerProductsSuccess(data));

    } catch (error) {
        dispatch(managerProductsFail(error.response.data.message));
    }
}

export const managerGetReviews = (id) => async (dispatch) => {
    try {
        dispatch(managerReviewRequest());
        const { data } = await axios.get(`/api/product/get/reviews/`, { params: { id } });
        dispatch(managerReviewSuccess(data));
    } catch (error) {
        dispatch(managerReviewFail(error.response.data.message))
    }
}

export const managerUpdateProduct = (id ,status, sellerEmail, sellerName) => async (dispatch) => {
    try {
        dispatch(managerUpdateProductRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/product/updateStatus/${id}`, {status:status,sellerEmail,sellerName},config);
        dispatch(managerUpdateProductSuccess(data));
    } catch (error) {
        dispatch(managerUpdateProductFail(error.response.data.message))
    }
}
