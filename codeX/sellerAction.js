
import axios from "axios";
import { sellerDeleteProductRequest, sellerDeleteProductSuccess, sellerNewProductFail, sellerNewProductRequest, sellerNewProductSuccess, 
    sellerOrderDetailFail, sellerOrderDetailRequest, sellerOrderDetailSucess, 
    sellerOrderUpdateFail, sellerOrderUpdateRequest, sellerOrderUpdateSucess, 
    sellerProductRequest, sellerProductSuccess, sellerProductsFail, 
    sellerProductsRequest, sellerProductsSuccess, 
    sellerReviewRequest, sellerReviewSuccess, sellerReviewFail, 
    sellerReviewProductsFail, sellerReviewProductsRequest, sellerReviewProductsSuccess, 
    sellerUpdateProductFail, sellerUpdateProductRequest, sellerUpdateProductSuccess, 
    sellerUserOrdersFail, sellerUserOrdersRequest, sellerUserOrdersSucess, 
    updateStockRequest,updateStockSuccess,updateStockFail,
    summaryFail,summarySuccess,summaryRequest
 } from "../slices/sellerSlice";

 export const getSummary = () => async(dispatch) => {
    try {
        dispatch(summaryRequest());
        const { data } = await axios.get(`/api/data/get/summary`);
        dispatch(summarySuccess(data));
    } catch (error) {
        dispatch(summaryFail(error.response.data.message));
    }
}

 export const sellerGetProduct = id => async(dispatch) => {
    try {
        dispatch(sellerProductRequest());
        const { data } = await axios.get(`/api/product/singleProduct/${id}`);
        dispatch(sellerProductSuccess(data));
    } catch (error) {
        dispatch(sellerNewProductFail(error.response.data.message));
    }
}

export const sellerGetProducts = (keyword) => async (dispatch) => {

    try {
        dispatch(sellerProductsRequest());

        const { data } = await axios.get('/api/seller/product/viewproducts');
        dispatch(sellerProductsSuccess(data));

    } catch (error) {
        dispatch(sellerProductsFail(error.response.data.message));
    }
}


export const sellerCreateProduct = productData => async (dispatch) => {
    try {
        dispatch(sellerNewProductRequest());
        
        const { data } = await axios.post('/api/seller/product/new', productData);
        dispatch(sellerNewProductSuccess(data));
    } catch (error) {
        dispatch(sellerNewProductFail(error.response.data.message))
    }
}

export const sellerDeleteProduct = id => async (dispatch) => {
    try {
        dispatch(sellerDeleteProductRequest());
       
        await axios.delete(`/api/seller/product/deletesingleProduct/${id}`);
        dispatch(sellerDeleteProductSuccess());
    } catch (error) {
        dispatch(sellerDeleteProductSuccess(error.response.data.message))
    }
}

export const sellerUpdateProduct = (productData,id) => async (dispatch) => {
    try {
        dispatch(sellerUpdateProductRequest());
        
        const { data } = await axios.put(`/api/seller/product/updatesingleProduct/${id}`, productData);
        dispatch(sellerUpdateProductSuccess(data));
    } catch (error) {
        dispatch(sellerUpdateProductFail(error.response.data.message))
    }
}

export const sellerOrdersList = () => async(dispatch) =>{
    try {
        dispatch(sellerUserOrdersRequest());
        const { data } = await axios.get(`/api/seller/order/`);
        dispatch(sellerUserOrdersSucess(data));
    } catch (error) {
        dispatch(sellerUserOrdersFail(error.response.data.message));
    }
}

export const sellerUpdateOrder = (id,orderData) => async(dispatch) =>{
    try {
        dispatch(sellerOrderUpdateRequest());
        const { data } = await axios.put(`/api/seller/order/${id}`,orderData);
        dispatch(sellerOrderUpdateSucess(data));
    } catch (error) {
        //const message = error.response?.data?.message || error.message || "Server Error";
        console.log(error);
        dispatch(sellerOrderUpdateFail(error.response.data.message));
    }
}
export const sellerOrderDetail  = id => async(dispatch) =>{
    try {
        dispatch(sellerOrderDetailRequest());
        const { data } = await axios.get(`/api/order/${id}`);
        dispatch(sellerOrderDetailSucess(data));
    } catch (error) {
        dispatch(sellerOrderDetailFail(error.response.data.message));
    }
}

export const sellerGetReviews = (id) => async (dispatch) => {
    try {
        dispatch(sellerReviewRequest());
        const { data } = await axios.get(`/api/seller/product/reviews/`,{params:{id}} );
        dispatch(sellerReviewSuccess(data));
    } catch (error) {
        dispatch(sellerReviewFail(error.response.data.message))
    }
}

export const sellerReviewGetProducts = (keyword) => async (dispatch) => {

    try {
        dispatch(sellerReviewProductsRequest());

        let link = `/api/product/viewallProducts?`;

        if (keyword) {
            console.log('keyword link');
            link += `&keyword=${keyword}`;
        }
        const { data } = await axios.get(link);
        dispatch(sellerReviewProductsSuccess(data));

    } catch (error) {
        dispatch(sellerReviewProductsFail(error.response.data.message));
    }
}

export const sellerStockUpdated = (id,stock) => async(dispatch) =>{
    try {
        dispatch(updateStockRequest());
        await axios.put(`/api/seller/product/updateProductstock/${id}`,
        { stock: stock },
        { headers: { 'Content-Type': 'application/json' } });
        dispatch(updateStockSuccess());
    } catch (error) {
        //const message = error.response?.data?.message || error.message || "Server Error";
        dispatch(updateStockFail(error.response.data.message));
    }
}
