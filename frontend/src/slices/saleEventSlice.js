import { createSlice } from "@reduxjs/toolkit";

const saleEventSlice = createSlice({
    name: 'saleEvent',
    initialState: {
        loading: false,
        isEventCreated: false,
        isSaleEventDeleted: false,
        isSaleEventrequest: false,
        isToggleSaleEvent: false,
        isSaleEventUpdated: false,
        summary: {},
        saleevent: {},
        salesEvent: [],
        userOrders: [],
        orderDetails: {},
        reviews: []
    },
    reducers: {
        getSaleEventRequest(state, action) {
            console.log('Get Sales Event Request')
            return {
                ...state,
                loading: true
            }
        },
        getSaleEventSuccess(state, action) {
            console.log('Get Sales Event Success')
            return {
                ...state,
                loading: false,
                salesEvent: action.payload.salesEvent

            }
        },
        getSaleEventFail(state, action) {
            console.log('Get Sales Event Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createSaleEventRequest(state, action) {
            console.log('Create Sales Event Request')
            return {
                ...state,
                loading: true,
            }
        },
        createSaleEventSuccess(state, action) {
            console.log('Create Sales Event Success')
            return {
                ...state,
                loading: false,
                saleevent: action.payload.saleevent,
                isEventCreated: true
            }
        },
        createSaleEventFail(state, action) {
            console.log('Create Sales Event Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearCreatedSaleEvent(state, action) {
            console.log('create Sales Event Cleared')
            return {
                loading: false,
                isEventCreated: false
            }
        }, 
        updateSaleEventRequest(state, action) {
            console.log('Update Sales Event Request')
            return {
                ...state,
                loading: true
            }
        },
        updateSaleEventSuccess(state, action) {
            console.log('Update Sales Event Success')
            return {
                ...state,
                loading: false,
                isSaleEventUpdated: true

            }
        },
        updateSaleEventFail(state, action) {
            console.log('Update Sales Event Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateSaleEvent(state, action) {
            console.log('Update Sales Event Cleared')
            return {
                loading: false,
                isSaleEventUpdated: false
            }
        },
        toggleSaleEventRequest(state, action) {
            console.log('toggle Sales Event Request')
            return {
                ...state,
                loading: true
            }
        },
        toggleSaleEventSuccess(state, action) {
            console.log('toggle Sales Event Success')
            return {
                ...state,
                loading: false,
                isToggleSaleEvent: true

            }
        },
        toggleSaleEventFail(state, action) {
            console.log('toggle Sales Event Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearToggleSaleEvent(state, action) {
            console.log('toggle Sales Event Cleared')
            return {
                loading: false,
                isToggleSaleEvent: false
            }
        },
        saleEventRequest(state, action) {
            console.log('Sales Event Request Request')
            return {
                ...state,
                loading: true
            }
        },
        saleEventSuccess(state, action) {
            console.log('Sales Event Request Success')
            return {
                ...state,
                loading: false,
                isSaleEventrequest: true

            }
        },
        saleEventFail(state, action) {
            console.log('Sales Event Request Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearSaleEventRequest(state, action) {
            console.log('Sales Event Request Cleared')
            return {
                loading: false,
                isSaleEventrequest: false
            }
        },
        toResponceSaleEventRequest(state, action) {
            console.log('Responce Sales Event Request')
            return {
                ...state,
                loading: true
            }
        },
        toResponceSaleEventSuccess(state, action) {
            console.log('Responce Sales Event Success')
            return {
                ...state,
                loading: false,
                isRespondSaleEvent: true

            }
        },
        toResponceSaleEventFail(state, action) {
            console.log('Responce Sales Event Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        cleartoResponceSaleEvent(state, action) {
            console.log('Responce Sales Event Cleared')
            return {
                loading: false,
                isRespondSaleEvent: false
            }
        },
        SaleEventDeleteRequest(state, action) {
            console.log('Delete Sales Event Request')
            return {
                ...state,
                loading: true
            }
        },
        SaleEventDeleteSuccess(state, action) {
            console.log('Delete Sales Event Success')
            return {
                ...state,
                loading: false,
                isSaleEventDeleted: true

            }
        },
        SaleEventDeleteFail(state, action) {
            console.log('Delete Sales Event Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearSaleEventDelete(state, action) {
            console.log('Delete Sales Event Cleared')
            return {
                loading: false,
                isSaleEventDeleted: false
            }
        },
       

    }
})


const { actions, reducer } = saleEventSlice;

export const {
    getSaleEventRequest, getSaleEventSuccess, getSaleEventFail,
    createSaleEventRequest, createSaleEventSuccess, createSaleEventFail,
    updateSaleEventRequest, updateSaleEventSuccess, updateSaleEventFail,clearUpdateSaleEvent,
    saleEventRequest, saleEventSuccess, saleEventFail, clearSaleEventRequest,
    toResponceSaleEventRequest, toResponceSaleEventSuccess, toResponceSaleEventFail, cleartoResponceSaleEvent,
    toggleSaleEventRequest, toggleSaleEventSuccess, toggleSaleEventFail, clearToggleSaleEvent,
    clearCreatedSaleEvent,SaleEventDeleteRequest, SaleEventDeleteSuccess, SaleEventDeleteFail, clearSaleEventDelete
} = actions;
export default reducer;