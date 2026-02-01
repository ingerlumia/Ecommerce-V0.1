import { 
    productsRequest, productsSuccess, productsFail, 
    rawProductsRequest, rawProductsSuccess, rawProductsFail, 
    updateProductStatusRequest, updateProductStatusSuccess, updateProductStatusFail,
    createReviewFail, createReviewRequest, createReviewSuccess, productFail, productRequest, productSuccess,
    deleteProductFail, deleteProductRequest, deleteProductSuccess, 
    newProductFail, newProductRequest, newProductSuccess, reviewDeleteFail,
    reviewDeleteRequest, reviewDeleteSuccess, 
    reviewFail, reviewProductsFail, reviewProductsRequest, 
    reviewProductsSuccess, reviewRequest, reviewSuccess,
    updateProductFail, updateProductRequest, updateProductSuccess,
    viewProductFail,viewProductRequest,viewProductSuccess,
    updateStockRequest, updateStockSuccess,updateStockFail
} from "../slices/productsSlice";
import api from "./api";


export const getProducts = (keyword, price, catagory, rating, currentPage) => async (dispatch) => {

    try {
        dispatch(productsRequest());

        let link = `/api/product/allProducts?page=${currentPage}`;

        if (keyword) {
            console.log('keyword link');
            link += `&keyword=${keyword}`;
        }
        if (price && Array.isArray(price)) {
            console.log('price link');
            link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
        }
        if (catagory) {
            console.log('catagory link');
            link += `&category=${catagory}`;
        }
        if (rating) {
            console.log('rating link');
            link += `&ratings=${rating}`;
        }

        const { data } = await api.get(link);
        dispatch(productsSuccess(data));

    } catch (error) {
        dispatch(productsFail(error.response.data.message));
    }
}

export const getProduct = id => async(dispatch) => {
    try {
        dispatch(productRequest());
        const { data } = await api.get(`/api/product/singleProduct/${id}`);
        dispatch(productSuccess(data));
    } catch (error) {
        dispatch(productFail(error.response.data.message));
    }
}

export const allProducts = () => async (dispatch) => {
    try {
        dispatch(rawProductsRequest());

        const { data } = await api.get('/api/product/viewallProducts');
        dispatch(rawProductsSuccess(data));
    } catch (error) {
        dispatch(rawProductsFail(error?.response.data.message))
    }
}

export const createNewProduct = productData => async (dispatch) => {
    try {
        dispatch(newProductRequest());

        const { data } = await api.post('/api/product/new',productData);
        dispatch(newProductSuccess(data));
    } catch (error) {
        dispatch(newProductFail(error.response.data.message))
    }
}

export const deleteProduct = id => async (dispatch) => {
    try {
        dispatch(deleteProductRequest());

        await api.delete(`/api/product/deletesingleProduct/${id}`);
        dispatch(deleteProductSuccess());
    } catch (error) {
        dispatch(deleteProductFail(error.response.data.message))
    }
}

export const updateProduct = (productData, id) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());

        const { data } = await api.put(`/api/product/updatesingleProduct/${id}`, productData);
        dispatch(updateProductSuccess(data));
    } catch (error) {
        dispatch(updateProductFail(error.response.data.message))
    }
}

export const updateProductSeo = (id,formData) => async (dispatch) => {
    try {
        dispatch(updateProductRequest());
        const { data } = await api.put(`/api/admin/product/update/product/Seo/${id}`, formData);
        dispatch(updateProductSuccess(data));
    } catch (error) {
  const message = error.response && error.response.data.message
    ? error.response.data.message
    : error.message; // Fallback to "Network Error" or "Server not reachable"

  dispatch(updateProductFail(message))
}
}


export const createReview = reviewData => async(dispatch) => {
    try {
        dispatch(createReviewRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const { data } = await api.put(`/api/product/review`,reviewData,config);
        dispatch(createReviewSuccess(data));
    } catch (error) {
        dispatch(createReviewFail(error.response.data.message));
    }
}

export const getReviews = (id) => async (dispatch) => {
    try {
        dispatch(reviewRequest());
        const { data } = await api.get(`/api/product/get/reviews/`, { params: { id } });
        dispatch(reviewSuccess(data));
    } catch (error) {
        dispatch(reviewFail(error.response.data.message))
    }
}

export const deleteReviews = (id, productId) => async (dispatch) => {
    try {
        dispatch(reviewDeleteRequest());
        await api.delete(`/api/product/reviews`, { params: { id, productId } });
        dispatch(reviewDeleteSuccess());
    } catch (error) {
        dispatch(reviewDeleteFail(error.response.data.message))
    }
}

export const reviewGetProducts = (keyword) => async (dispatch) => {

    try {
        dispatch(reviewProductsRequest());

        let link = `/api/product/allProducts?`;

        if (keyword) {
            link += `&keyword=${keyword}`;
        }
        const { data } = await api.get(link);
        dispatch(reviewProductsSuccess(data));

    } catch (error) {
        dispatch(reviewProductsFail(error.response.data.message));
    }
}

export const viewProducts = (keyword, price, category, rating,attributes={}) => async (dispatch) => {

    try {
        dispatch(viewProductRequest());
        let link = `/api/product/filteredProducts?`;

        if (keyword) {
            link += `keyword=${keyword}&`;
        }
        if (price && Array.isArray(price)) {
            link += `minPrice=${price[0]}&maxPrice=${price[1]}&`;
        }
        if (category) {
            link += `category=${category}&`;
        }
        Object.keys(attributes).forEach((key) => {
        if (attributes[key]) {
            link += `${key}=${attributes[key]}&`;
        }
        });
        if (rating) {
            link += `ratings=${rating}`;
        }

        const { data } = await api.get(link);
        dispatch(viewProductSuccess(data));

    } catch (error) {
        dispatch(viewProductFail(error.response.data.message));
    }
}

export const updateProductStatus = (id ,status, sellerEmail, sellerName) => async (dispatch) => {
    try {
        dispatch(updateProductStatusRequest());
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await api.put(`/api/product/updateStatus/${id}`, {status:status,sellerEmail,sellerName},config);
        dispatch(updateProductStatusSuccess(data));
    } catch (error) {
        dispatch(updateProductStatusFail(error.response.data.message))
    }
}

export const stockUpdate = (id,stock) => async(dispatch) =>{
    try {
        dispatch(updateStockRequest());
        await api.put(`/api/product/updateProductstock/${id}`,
        { stock: stock },
        { headers: { 'Content-Type': 'application/json' } });
        dispatch(updateStockSuccess());
    } catch (error) {
        //const message = error.response?.data?.message || error.message || "Server Error";
        dispatch(updateStockFail(error.response.data.message));
    }
}
