import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        product: {},
        item: {},
        products: [],
        reviews: [],
        isReviewSubmitted: false,
        isReviewDeleted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        isStockUpdated: false,
    },
    reducers: {
        productRequest(state, action) {
            console.log('product Request')
            return {
                ...state,
                loading: true
            }
        },
        productSuccess(state, action) {
            console.log('product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product

            }
        },
        productFail(state, action) {
            console.log('product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        itemRequest(state, action) {
            console.log('item Request')
            return {
                ...state,
                loading: true
            }
        },
        itemSuccess(state, action) {
            console.log('item Success')
            return {
                ...state,
                loading: false,
                item: action.payload.product

            }
        },
        itemFail(state, action) {
            console.log('item Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state, action) {
            console.log('create Review Request')
            return {
                ...state,
                loading: true
            }
        },
        createReviewSuccess(state, action) {
            console.log('create Review Success')
            return {
                ...state,
                loading: false,
                isReviewSubmitted: true
            }
        },
        createReviewFail(state, action) {
            console.log('create Review Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        newProductRequest(state, action) {
            console.log('New product Request')
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action) {
            console.log('New product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action) {
            console.log('New product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductCreated: false
            }
        },
        clearCreatedProduct(state, action) {
            console.log('clear Created Product');
            return {
                ...state,
                isProductCreated: false
            }
        },

        deleteProductRequest(state, action) {
            console.log('Delete product Request')
            return {
                ...state,
                loading: true
            }
        },
        deleteProductSuccess(state, action) {
            console.log('Delete product Success')
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        deleteProductFail(state, action) {
            console.log('Delete product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductDeleted: false
            }
        },
        clearDeletedProduct(state, action) {
            console.log('clear Deleted Product');
            return {
                ...state,
                isProductDeleted: false
            }
        },
        clearReviewSubmitted(state, action) {
            console.log('clear Review Submitted');
            return {
                ...state,
                isReviewSubmitted: false
            }
        },

        updateProductRequest(state, action) {
            console.log('Update product Request')
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action) {
            console.log('Update product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductFail(state, action) {
            console.log('Update product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductUpdated: false
            }
        },
        clearUpdatedProduct(state, action) {
            console.log('clear Updated Product');
            return {
                ...state,
                isProductUpdated: false
            }
        },
        reviewRequest(state, action) {
            console.log('Review Request')
            return {
                ...state,
                loading: true
            }
        },
        reviewSuccess(state, action) {
            console.log('Review Success')
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews

            }
        },
        reviewFail(state, action) {
            console.log('Review Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        reviewDeleteRequest(state, action) {
            console.log('Review Delete Request')
            return {
                ...state,
                loading: true
            }
        },
        reviewDeleteSuccess(state, action) {
            console.log('Review Delete Success')
            return {
                ...state,
                loading: false,
                isReviewDeleted: true

            }
        },
        reviewDeleteFail(state, action) {
            console.log('Review Delete Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        reviewProductsRequest(state, action) {
            console.log('Review products Request')
            return {
                ...state,
                loading: true
            }
        },
        reviewProductsSuccess(state, action) {
            console.log('Review products Success')
            return {
                ...state,
                loading: false,
                products: action.payload.products,
            }
        },
        reviewProductsFail(state, action) {
            console.log('Review products Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsReviewDeleted(state, action) {
            console.log('Clear Is Review Deleted');
            return {
                ...state,
                isReviewDeleted: false
            }
        },
        clearError(state, action) {
            console.log('clear Error');
            return {
                ...state,
                error: null
            }
        },
        clearProduct(state, action) {
            console.log('clear Product');
            return {
                ...state,
                product: {}
            }
        },
        viewProductRequest(state, action) {
            console.log('View product Request')
            return {
                ...state,
                loading: true
            }
        },
        viewProductSuccess(state, action) {
            console.log('View product Success')
            return {
                ...state,
                loading: false,
                products: action.payload.products

            }
        },
        viewProductFail(state, action) {
            console.log('View product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        productsRequest(state, action) {
            console.log('products Request')
            return {
                loading: true
            }
        },
        productsSuccess(state, action) {
            console.log('products Success')
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.count,
                resPerPage: action.payload.resPerPage
            }
        },
        productsFail(state, action) {
            console.log('products Fail')
            return {
                loading: false,
                error: action.payload
            }
        },
        rawProductsRequest(state, action) {
            console.log('products Request')
            return {
                loading: true
            }
        },
        rawProductsSuccess(state, action) {
            console.log('products Success')
            return {
                loading: false,
                products: action.payload.products
            }
        },
        rawProductsFail(state, action) {
            console.log('products Fail')
            return {
                loading: false,
                error: action.payload
            }

        },
        updateProductStatusRequest(state, action) {
            console.log(' Update product Status Request')
            return {
                ...state,
                loading: true
            }
        },
        updateProductStatusSuccess(state, action) {
            console.log(' Update product Status Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductStatusFail(state, action) {
            console.log(' Update product Status Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductUpdated: false
            }
        },
        updateStockRequest(state, action) {
            console.log('Stock Upadte Request')
            return {
                ...state,
                loading: false,
            }
        },
        updateStockSuccess(state, action) {
            console.log('Stock Upadte Success')
            return {
                ...state,
                loading: false,
                isStockUpdated: true
            }
        },
        updateStockFail(state, action) {
            console.log('Stock Upadte Fail')
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


const { actions, reducer } = productsSlice;

export const { productsRequest, productsSuccess, productsFail,
    rawProductsRequest, rawProductsSuccess, rawProductsFail,
    updateProductStatusRequest, updateProductStatusSuccess, updateProductStatusFail,
    productRequest, productSuccess, productFail, clearError,
    createReviewRequest, createReviewSuccess, createReviewFail, clearReviewSubmitted,
    clearProduct, newProductRequest, newProductSuccess, newProductFail, clearCreatedProduct,
    deleteProductRequest, deleteProductSuccess, deleteProductFail, clearDeletedProduct,
    updateProductRequest, updateProductSuccess, updateProductFail, clearUpdatedProduct,
    reviewDeleteRequest, reviewDeleteSuccess, reviewDeleteFail, clearIsReviewDeleted,
    reviewRequest, reviewSuccess, reviewFail,
    itemRequest, itemSuccess, itemFail,
    reviewProductsRequest, reviewProductsSuccess, reviewProductsFail,
    viewProductRequest, viewProductSuccess, viewProductFail,
    updateStockRequest, updateStockSuccess, updateStockFail,clearIsupdateStock
} = actions;
export default reducer;