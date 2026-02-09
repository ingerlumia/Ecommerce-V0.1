import { createSlice } from "@reduxjs/toolkit";

const featuresSlice = createSlice({
    name: 'products',
    initialState: {
        loading: false,
        topSelling: [],
        productsofmonth: [],
        trending: [],
        catagory: [],
        isCatagoryCreated: false

    },
    reducers: {
        getTopSellingProductsRequest(state, action) {
            console.log('get Top Selling products Request')
            return {
                ...state,
                loading: true
            }
        },
        getTopSellingProductsSuccess(state, action) {
            console.log('get Top Selling products Success')
            return {
                ...state,
                loading: false,
                topSelling: action.payload.topSelling
            }
        },
        getTopSellingProductsFail(state, action) {
            console.log('get Top Selling products Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        monthlyProductsRequest(state, action) {
            console.log('monthly products Request')
            return {
                ...state,
                loading: true
            }
        },
        monthlyProductsSuccess(state, action) {
            console.log('monthly products Success')
            return {
                ...state,
                loading: false,
                productsofmonth: action.payload.products
            }
        },
        monthlyProductsFail(state, action) {
            console.log('monthly products Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        trendingProductsRequest(state, action) {
            console.log('trending products Request')
            return {
                ...state,
                loading: true
            }
        },
        trendingProductsSuccess(state, action) {
            console.log('trending products Success')
            return {
                ...state,
                loading: false,
                trending: action.payload.trending
            }
        },
        trendingProductsFail(state, action) {
            console.log('trending products Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        getCatagoryRequest(state, action) {
            console.log('get Catagory Request')
            return {
                ...state,
                loading: true
            }
        },
        getCatagorySuccess(state, action) {
            console.log('get Catagory Success')
            return {
                ...state,
                loading: false,
                catagory: action.payload.catagory
            }
        },
        getCatagoryFail(state, action) {
            console.log('get Catagory Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        newCatagoryRequest(state, action) {
            console.log('New Catagory Request')
            return {
                ...state,
                loading: true
            }
        },
        newCatagorySuccess(state, action) {
            console.log('New Catagory Success')
            return {
                ...state,
                loading: false,
                isCatagoryCreated: true,
                catagory: action.payload.catagory
            }
        },
        newCatagoryFail(state, action) {
            console.log('New Catagory Fail')
            return {
                ...state,
                loading: false,
                isCatagoryCreated: false,
                error: action.payload
            }
        },
        clearisCatagoryCreated(state, action) {
            console.log('clear Created catagory');
            return {
                ...state,
                ...state,
                isCatagoryCreated: false,
            }
        },

    }
})


const { actions, reducer } = featuresSlice;

export const { getTopSellingProductsRequest, getTopSellingProductsSuccess, getTopSellingProductsFail,
    monthlyProductsRequest, monthlyProductsSuccess, monthlyProductsFail,
    trendingProductsRequest, trendingProductsSuccess, trendingProductsFail,
    getCatagoryRequest, getCatagorySuccess, getCatagoryFail,
    newCatagoryRequest, newCatagorySuccess, newCatagoryFail,clearisCatagoryCreated
} = actions;
export default reducer;