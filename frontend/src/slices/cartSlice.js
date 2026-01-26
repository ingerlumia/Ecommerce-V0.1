import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        loading: false,
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {},
    },
    reducers: {
        addCartItemRequest(state, action) {
            console.log('add Cart Item Request');
            return {
                ...state,
                loading: true
            }
        },
        addCartItemSucess(state, action) {
            console.log('add Cart Item Sucess');
            const item = action.payload;
            const itemExist = state.items.find(i => i.product == item.product);
            if (itemExist) {
                state = {
                    ...state,
                    loading: false,
                }
            } else {
                state = {
                    items: [...state.items, item],
                    loading: false
                }
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
            return state
        },

        incresaeCartItem(state, action) {
            console.log('increase qty')
            state.items = state.items.map((item) => {
                if (item.product == action.payload) {
                    if(item.stock == item.qty){
                        return item;
                    }
                    item.qty = item.qty + 1;
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },

        decresaeCartItem(state, action) {
            console.log('Decrease qty')
            state.items = state.items.map((item) => {
                if (item.product == action.payload) {
                   if(item.qty > 1){
                    item.qty = item.qty - 1;
                   }
                   return item;
                }
                return item;
            })
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },

        removeCartItem(state, action){
            const filterItem = state.items.filter(item => {
                return item.product !== action.payload;
            })
            localStorage.setItem('cartItems', JSON.stringify(filterItem));
            return {
                ...state,
                items: filterItem
            }
        },

        saveShippingInfo(state, action){
            
            console.log('Save Shipping Info');
            localStorage.setItem('shippingInfo', JSON.stringify(action.payload));
            return {
                ...state,
                shippingInfo: action.payload
            }
        },
        orderCompleted(state, action){
            console.log('order Completed');
            localStorage.removeItem('cartItems')
            sessionStorage.removeItem('orderInfo')
            return{
                ...state,
                items: [],
                loading: false,

            }
        }

    }
}
);


const { actions, reducer } = cartSlice;
export const { 
    addCartItemRequest, 
    addCartItemSucess, 
    incresaeCartItem, 
    decresaeCartItem, 
    removeCartItem, 
    saveShippingInfo,
    orderCompleted } = actions;
export default reducer;
