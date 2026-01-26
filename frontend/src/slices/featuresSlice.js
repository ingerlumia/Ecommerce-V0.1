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
                loading: true
            }
        },
        getTopSellingProductsSuccess(state, action) {
            console.log('get Top Selling products Success')
            return {
                loading: false,
                topSelling: action.payload.topSelling
            }
        },
        getTopSellingProductsFail(state, action) {
            console.log('get Top Selling products Fail')
            return {
                loading: false,
                error: action.payload
            }
        },
        monthlyProductsRequest(state, action) {
            console.log('monthly products Request')
            return {
                loading: true
            }
        },
        monthlyProductsSuccess(state, action) {
            console.log('monthly products Success')
            return {
                loading: false,
                productsofmonth: action.payload.products
            }
        },
        monthlyProductsFail(state, action) {
            console.log('monthly products Fail')
            return {
                loading: false,
                error: action.payload
            }
        },
        trendingProductsRequest(state, action) {
            console.log('trending products Request')
            return {
                loading: true
            }
        },
        trendingProductsSuccess(state, action) {
            console.log('trending products Success')
            return {
                loading: false,
                trending: action.payload.trending
            }
        },
        trendingProductsFail(state, action) {
            console.log('trending products Fail')
            return {
                loading: false,
                error: action.payload
            }
        },

        getCatagoryRequest(state, action) {
            console.log('get Catagory Request')
            return {
                loading: true
            }
        },
        getCatagorySuccess(state, action) {
            console.log('get Catagory Success')
            return {
                loading: false,
                catagory: action.payload.catagory
            }
        },
        getCatagoryFail(state, action) {
            console.log('get Catagory Fail')
            return {
                loading: false,
                error: action.payload
            }
        },
        newCatagoryRequest(state, action) {
            console.log('New Catagory Request')
            return {
                loading: true
            }
        },
        newCatagorySuccess(state, action) {
            console.log('New Catagory Success')
            return {
                loading: false,
                isCatagoryCreated: true,
                catagory: action.payload.catagory
            }
        },
        newCatagoryFail(state, action) {
            console.log('New Catagory Fail')
            return {
                loading: false,
                isCatagoryCreated: false,
                error: action.payload
            }
        },
        clearisCatagoryCreated(state, action) {
            console.log('clear Created catagory');
            return {
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