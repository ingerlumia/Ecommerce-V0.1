import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        isOrderUpdate: false,
        isStockUpdated: false,
        product: {},
        summary: {},
        products:[],
        userOrders: [],
        orderDetails:{},
        reviews:[]
    },
    reducers: {
         summaryRequest(state, action){
            console.log('summary Request')
            return {
                ...state,
                loading: true
            }
        },
        summarySuccess(state, action){
            console.log('summary Success')
            return {
                ...state,
                loading: false,
                summary: action.payload.summary

            }
        },
        summaryFail(state, action){
            console.log('summary Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        sellerProductRequest(state, action){
            console.log('Seller Product Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerProductSuccess(state, action){
            console.log('Seller Product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product

            }
        },
        sellerProductFail(state, action){
            console.log('Seller Product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        sellerProductsRequest(state, action){
            console.log('seller products Request')
            return {
                loading: true
            }
        },
        sellerProductsSuccess(state, action){
            console.log('seller products Success')
            return {
                loading: false,
                products: action.payload.products
            }
        },
        sellerProductsFail(state, action){
            console.log('seller products Fail')
            return {
                loading: false,
                error: action.payload
            }
            
        },
        sellerNewProductRequest(state, action){
            console.log('Seller New product Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerNewProductSuccess(state, action){
            console.log('Seller New product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        sellerNewProductFail(state, action){
            console.log('Seller New product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },
        clearCreatedProduct(state,action){
            console.log('Seller : clear Created Product');
            return {
                ...state,
                isProductCreated: false
            }
        },
        
        sellerDeleteProductRequest(state, action){
            console.log('Delete product Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerDeleteProductSuccess(state, action){
            console.log('Delete product Success')
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        sellerDeleteProductFail(state, action){
            console.log('Delete product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductDeleted: false
            }
        },
        clearDeletedProduct(state,action){
            console.log('Seller clear Deleted Product');
            return {
                ...state,
                isProductDeleted: false
            }
        },
        sellerUpdateProductRequest(state, action){
            console.log('Seller Update product Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerUpdateProductSuccess(state, action){
            console.log('Seller Update product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        sellerUpdateProductFail(state, action){
            console.log('Seller Update product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductUpdated: false
            }
        },
        clearUpdatedProduct(state,action){
            console.log('Seller : clear Updated Product');
            return {
                ...state,
                isProductUpdated: false
            }
        },
        sellerReviewRequest(state, action){
            console.log('Seller Review Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerReviewSuccess(state, action){
            console.log('Seller Review Success')
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews

            }
        },
        sellerReviewFail(state, action){
            console.log('Seller Review Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        sellerclearError(state,action){
            console.log('clear Error');
            return {
                ...state,
                error:null
            }
        },
        sellerclearProduct(state,action){
            console.log('clear Product');
            return {
                ...state,
                product:{}
            }
        },
        sellerUserOrdersRequest(state,action){
            console.log('Seller User Orders Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerUserOrdersSucess(state,action){
            console.log('Seller User Orders Sucess')
            return {
                ...state,
                loading: false,
                userOrders: action.payload.order
            }
        },
        sellerUserOrdersFail(state,action){
            console.log('Seller User Orders Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        sellerOrderUpdateRequest(state,action){
            console.log('seller Order Update Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerOrderUpdateSucess(state,action){
            console.log('seller Order Update Sucess')
            return {
                ...state,
                loading: false,
                isOrderUpdate: true
            }
        },
        sellerOrderUpdateFail(state,action){
            console.log('seller Order Update Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        sellerclearIsOrderUpdated(state,action){
            console.log('seller clear Is Order Update ')
            return {
                ...state,
                isOrderUpdate: false
            }
        },
        sellerOrderDetailRequest(state,action){
            console.log('Seller Order Detail Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerOrderDetailSucess(state,action){
            console.log('Seller Order Detail Sucess')
            return {
                ...state,
                loading: false,
                orderDetails: action.payload.order
            }
        },
        sellerOrderDetailFail(state,action){
            console.log('Seller Order Detail Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        sellerReviewProductsRequest(state, action){
            console.log('Seller Review products Request')
            return {
                ...state,
                loading: true
            }
        },
        sellerReviewProductsSuccess(state, action){
            console.log('Seller Review products Success')
            return {
                ...state,
                loading: false,
                products: action.payload.products,
            }
        },
        sellerReviewProductsFail(state, action){
            console.log('Seller Review products Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        updateStockRequest(state, action){
            console.log('Seller Stock Upadte Request')
            return {
                ...state,
                loading: false,                
            }
        },
        updateStockSuccess(state, action){
            console.log('Seller Stock Upadte Success')
            return {
                ...state,
                loading: false,
                isStockUpdated: true
            }
        },
        updateStockFail(state, action){
            console.log('Seller Stock Upadte Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsupdateStock(state, action){
            console.log('clear Seller Is Stock Upadte ')
            return {
                ...state,
                isStockUpdated: false
            }
        }
    }
})


const {actions, reducer} = sellerSlice;

export const { sellerProductsRequest, sellerProductsSuccess, sellerProductsFail, sellerclearError , sellerclearProduct, 
    sellerDeleteProductRequest, sellerDeleteProductSuccess, sellerDeleteProductFail,clearDeletedProduct,
    sellerNewProductRequest, sellerNewProductSuccess, sellerNewProductFail, clearCreatedProduct,
    sellerUpdateProductRequest,sellerUpdateProductSuccess,sellerUpdateProductFail,clearUpdatedProduct,
    sellerProductRequest,sellerProductSuccess,sellerProductFail,
    sellerUserOrdersRequest,sellerUserOrdersSucess,sellerUserOrdersFail,
    sellerOrderUpdateRequest,sellerOrderUpdateSucess, sellerOrderUpdateFail,sellerclearIsOrderUpdated,
    sellerOrderDetailRequest,sellerOrderDetailSucess,sellerOrderDetailFail,
    sellerReviewProductsRequest, sellerReviewProductsSuccess,sellerReviewProductsFail,
    sellerReviewFail,sellerReviewRequest,sellerReviewSuccess,
    updateStockRequest, updateStockSuccess, updateStockFail, clearIsupdateStock,
    summaryRequest, summarySuccess, summaryFail
} = actions;
export default reducer;