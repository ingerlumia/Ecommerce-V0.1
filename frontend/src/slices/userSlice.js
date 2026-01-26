import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: {},
        users: [],
        isUserUpdated: false,
        isUserDeleted: false,
    },
    reducers: {
        usersListRequest(state, action){
            console.log('Users List Request')
            return {
                ...state,
                loading: true
            }
        },
        usersListSuccess(state, action){
            console.log('Users List Success')
            return {
                ...state,
                loading: false,
                users: action.payload.users,
            }
        },
        usersListFail(state, action){
            console.log('Users List Fail')
            return {
                loading: false,
                ...state,
                error: action.payload
            }
        },
        userRequest(state, action){
            console.log('User Request')
            return {
                ...state,
                loading: true
            }
        },
        userSuccess(state, action){
            console.log('User Success')
            return {
                ...state,
                loading: false,
                user: action.payload.user,
            }
        },
        userFail(state, action){
            console.log('User Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userDeleteRequest(state, action){
            console.log('User Delete Request')
            return {
                ...state,
                loading: true
            }
        },
        userDeleteSuccess(state, action){
            console.log('User Delete Success')
            return {
                ...state,
                loading: false,
                isUserDeleted: true
            }
        },
        userDeleteFail(state, action){
            console.log('User Delete Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        userUpdateRequest(state, action){
            console.log('User Update Request')
            return {
                ...state,
                loading: true
            }
        },
        userUpdateSuccess(state, action){
            console.log('User Update Success')
            return {
                ...state,
                loading: false,
                isUserUpdated: true
            }
        },
        userUpdateFail(state, action){
            console.log('User Update Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUserUpdated(state, action){
            console.log('Clear User Update')
            return {
                ...state,
                loading: false,
                isUserUpdated: false
            }
        },
        clearUserDeleted(state, action){
            console.log('Clear User Deleted')
            return {
                ...state,
                loading: false,
                isUserDeleted: false
            }
        },
        clearError(state,action){
            console.log('clear User Error');
            return {
                ...state,
                error:null
            }
        }
        
    }
})


const {actions, reducer} = userSlice;

export const {usersListRequest,usersListSuccess,usersListFail,
    userRequest,userSuccess,userFail,
    userDeleteRequest,userDeleteSuccess,userDeleteFail,clearUserDeleted,
    userUpdateRequest,userUpdateSuccess,userUpdateFail,clearUserUpdated,clearError
    } = actions;
export default reducer;