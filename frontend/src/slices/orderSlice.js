import { createSlice } from "@reduxjs/toolkit";


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetails: {},
        userOrders: [],
        adminOrders: [],
        isOrderDelete: false,
        isOrderUpdate: false,
        loading: false,
    },
    reducers: {
        createOrderRequest(state, action) {
            console.log('Create Order Request');
            return {
                ...state,
                loading: true
            }
        },
        createOrderSucess(state, action) {
            console.log('Create Order Sucess');
            return {
                ...state,
                loading: false,
                orderDetails: action.payload.order
            }
        },
        createOrderFail(state, action) {
            console.log('Create Order Fail');
            return {
                ...state,
                loading: false,
                orderDetails: action.payload
            }
        },
        clearOrderError(state,action){
            console.log('Clear Order Error')
            return {
                ...state,
                error: null
            }
        },
        userOrdersRequest(state,action){
            console.log('User Orders Request')
            return {
                ...state,
                loading: true
            }
        },
        userOrdersSucess(state,action){
            console.log('User Orders Sucess')
            return {
                ...state,
                loading: false,
                userOrders: action.payload.orders
            }
        },
        userOrdersFail(state,action){
            console.log('User Orders Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        orderDetailRequest(state,action){
            console.log('Order Detail Request')
            return {
                ...state,
                loading: true
            }
        },
        orderDetailSucess(state,action){
            console.log('Order Detail Sucess')
            return {
                ...state,
                loading: false,
                orderDetails: action.payload.order
            }
        },
        orderDetailFail(state,action){
            console.log('Order Detail Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        adminOrdersRequest(state,action){
            console.log('Admin Orders Request')
            return {
                ...state,
                loading: true
            }
        },
        adminOrdersSucess(state,action){
            console.log('Admin Orders Sucess')
            return {
                ...state,
                loading: false,
                adminOrders: action.payload.order
            }
        },
        adminOrdersFail(state,action){
            console.log('Admin Orders Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        adminDeleteOrderRequest(state,action){
            console.log('Admin Delete Order Request')
            return {
                ...state,
                loading: true
            }
        },
        adminDeleteOrderSucess(state,action){
            console.log('Admin Delete Order Sucess')
            return {
                ...state,
                loading: false,
                isOrderDelete: true
            }
        },
        adminDeleteOrderFail(state,action){
            console.log('Admin Delete Order Fail')
            return {
                ...state,
                error: action.payload
            }
        },        
        adminOrderUpdateRequest(state,action){
            console.log('Admin Order Update Request')
            return {
                ...state,
                loading: true
            }
        },
        adminOrderUpdateSucess(state,action){
            console.log('Admin Order Update Sucess')
            return {
                ...state,
                loading: false,
                isOrderUpdate: true
            }
        },
        adminOrderUpdateFail(state,action){
            console.log('Admin Order Update Fail')
            return {
                ...state,
                error: action.payload
            }
        },
        clearOrderDeleted(state,action){
            return {
                ...state,
                isOrderDelete: false
            }
        },
        clearAdminOrderUpdated(state,action){
            return {
                ...state,
                isOrderUpdate: false
            }
        }

    }
}
);


const { actions, reducer } = orderSlice;
export const { 
    createOrderRequest,createOrderSucess,createOrderFail,clearOrderError,
    userOrdersRequest,userOrdersSucess,userOrdersFail,
    orderDetailRequest,orderDetailSucess,orderDetailFail,
    adminOrdersRequest,adminOrdersSucess,adminOrdersFail,
    adminDeleteOrderRequest,adminDeleteOrderSucess,adminDeleteOrderFail,clearOrderDeleted,
    adminOrderUpdateRequest,adminOrderUpdateSucess,adminOrderUpdateFail,clearAdminOrderUpdated
 } = actions;
export default reducer;
