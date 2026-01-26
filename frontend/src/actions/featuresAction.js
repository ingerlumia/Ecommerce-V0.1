import axios from "axios"
import { getCatagoryFail, getCatagoryRequest, getCatagorySuccess, getTopSellingProductsFail, getTopSellingProductsRequest, getTopSellingProductsSuccess, monthlyProductsFail, monthlyProductsRequest, monthlyProductsSuccess, newCatagoryFail, newCatagoryRequest, newCatagorySuccess, trendingProductsFail, trendingProductsRequest, trendingProductsSuccess } from "../slices/featuresSlice";
import { itemFail, itemRequest, itemSuccess } from "../slices/productsSlice";

export const fgetProduct = id => async(dispatch) => {
    try {
        dispatch(itemRequest());
        const { data } = await axios.get(`/api/product/singleProduct/${id}`);
        dispatch(itemSuccess(data));
    } catch (error) {
        dispatch(itemFail(error.response.data.message));
    }
}

export const getTopSellingProducts = () => async (dispatch) => {
    try {
        dispatch(getTopSellingProductsRequest());

        const { data } = await axios.get('/api/features/getTopSellingProducts/');
        dispatch(getTopSellingProductsSuccess(data));
    } catch (error) {
        dispatch(getTopSellingProductsFail(error.response.data.message))
    }
}

export const monthlyProducts = () => async (dispatch) => {
    try {
        dispatch(monthlyProductsRequest());

        const { data } = await axios.get('/api/features/monthlyproducts');
        dispatch(monthlyProductsSuccess(data));
    } catch (error) {
        dispatch(monthlyProductsFail(error.response.data.message))
    }
}

export const trendingProducts = () => async (dispatch) => {
    try {
        dispatch(trendingProductsRequest());

        const { data } = await axios.get('/api/features/trending');
        dispatch(trendingProductsSuccess(data));
    } catch (error) {
        dispatch(trendingProductsFail(error.response.data.message))
    }
}


export const getCatagory = () => async (dispatch) => {
    try {
        dispatch(getCatagoryRequest());

        const { data } = await axios.get('/api/catagory/view');
        dispatch(getCatagorySuccess(data));
    } catch (error) {
        dispatch(getCatagoryFail(error.response.data.message))
    }
}

export const newCatagory = (catagoryData) => async(dispatch) =>{
    try {
        dispatch(newCatagoryRequest());

        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }

        const { data } = await axios.post(`/api/admin/catagory/new`,catagoryData,config);
        dispatch(newCatagorySuccess(data));

    } catch (error) {
        dispatch(newCatagoryFail(error.response.data.message));
    }
}