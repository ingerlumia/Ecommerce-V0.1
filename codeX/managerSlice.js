import { createSlice } from "@reduxjs/toolkit";

const managerSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        users: [],
        userOrders:[],
        isUserUpdated: false,
        isUserDeleted: false,
        isProductDeleted: false, 
        isProductUpdated: false, 
        product: {},
        products:[],
        orderDetails:{},
        reviews:[]
    },
    reducers: {
        managerUsersListRequest(state, action){
            console.log('Manager Users List Request')
            return {
                ...state,
                loading: true
            }
        },
        managerUsersListSuccess(state, action){
            console.log('Manager Users List Success')
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            }
        },
        managerUsersListFail(state, action){
            console.log('Manager Users List Fail')
            return {
                loading: false,
                ...state,
                error: action.payload
            }
        },
        managerUserRequest(state, action){
            console.log('Manager User Request')
            return {
                ...state,
                loading: true
            }
        },
        managerUserSuccess(state, action){
            console.log('Manager User Success')
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            }
        },
        managerUserFail(state, action){
            console.log('Manager User Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        managerUserDeleteRequest(state, action){
            console.log('Manager User Delete Request')
            return {
                ...state,
                loading: true
            }
        },
        managerUserDeleteSuccess(state, action){
            console.log('Manager User Delete Success')
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },
        managerUserDeleteFail(state, action){
            console.log('Manager User Delete Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        managerUserUpdateRequest(state, action){
            console.log('Manager User Update Request')
            return {
                ...state,
                loading: true
            }
        },
        managerUserUpdateSuccess(state, action){
            console.log('Manager User Update Success')
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },
        managerUserUpdateFail(state, action){
            console.log('Manager User Update Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        managerclearUserUpdated(state, action){
            console.log('Manager Clear User Update')
            return {
                ...state,
                loading: false,
                isUserUpdated: false
            }
        },
        managerclearUserDeleted(state, action){
            console.log('Manager Clear User Deleted')
            return {
                ...state,
                loading: false,
                isUserDeleted: false
            }
        },
        //Order Slice
        managerUserOrdersRequest(state,action){
            console.log('Manager User Orders Request')
            return {
                ...state,
                loading: true
            }
        },
        managerUserOrdersSucess(state,action){
            console.log('Manager User Orders Sucess')
            return {
                ...state,
                loading: false,
                userOrders: action.payload.order
            }
        },
        managerUserOrdersFail(state,action){
            console.log('Manager User Orders Fail')
            return {
                ...state,
                error: action.payload
            }
        },

        managerProductRequest(state, action){
            console.log('manager Product Request')
            return {
                ...state,
                loading: true
            }
        },
        managerProductSuccess(state, action){
            console.log('manager Product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product

            }
        },
        managerProductFail(state, action){
            console.log('manager Product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        managerProductsRequest(state, action){
            console.log('manager products Request')
            return {
                ...state,
                loading: true
            }
        },
        managerProductsSuccess(state, action){
            console.log('manager products Success')
            return {
                ...state,
                loading: false,
                products: action.payload.products
            }
        },
        managerProductsFail(state, action){
            console.log('manager products Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            
        },        
        managerReviewRequest(state, action){
            console.log('manager Review Request')
            return {
                ...state,
                loading: true
            }
        },
        managerReviewSuccess(state, action){
            console.log('manager Review Success')
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews

            }
        },
        managerReviewFail(state, action){
            console.log('manager Review Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        
        managerUpdateProductRequest(state, action){
            console.log('manager Update product Request')
            return {
                ...state,
                loading: true
            }
        },
        managerUpdateProductSuccess(state, action){
            console.log('manager Update product Success')
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        managerUpdateProductFail(state, action){
            console.log('manager Update product Fail')
            return {
                ...state,
                loading: false,
                error: action.payload,
                isProductUpdated: false
            }
        },
        clearUpdatedProduct(state,action){
            console.log('Manager : clear Updated Product');
            return {
                ...state,
                isProductUpdated: false
            }
        },
        clearError(state,action){
            console.log('Manager Clear Error in manger');
            return {
                ...state,
                error:null
            }
        }
        
    }
})


const {actions, reducer} = managerSlice;

export const { managerUsersListRequest, managerUsersListSuccess, managerUsersListFail,clearError,
                managerUserRequest,managerUserSuccess,managerUserFail,
                managerUserDeleteRequest,managerUserDeleteSuccess,managerUserDeleteFail,managerclearUserDeleted,
                managerUserUpdateRequest, managerUserUpdateSuccess, managerUserUpdateFail, managerclearUserUpdated,
                managerUserOrdersRequest, managerUserOrdersSucess, managerUserOrdersFail,
                managerProductRequest, managerProductSuccess, managerProductFail,
                managerProductsRequest,managerProductsSuccess, managerProductsFail,
                managerReviewRequest, managerReviewSuccess, managerReviewFail,
                managerUpdateProductRequest,managerUpdateProductSuccess,managerUpdateProductFail,clearUpdatedProduct} = actions;
export default reducer;