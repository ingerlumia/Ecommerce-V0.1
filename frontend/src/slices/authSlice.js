import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        isAuthenticated: false,
        isRegistered: false
        
    },

    reducers: {
        loginRequest(state, action) {
            console.log('Login Auth Request');
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action) {
            console.log('Login Auth Success');
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            console.log('Login Auth Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action) {
            console.log('Clear Error')
            return {
                ...state,
                error: null
            }

        },
        registerRequest(state, action) {
            console.log('Register Auth Request');
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess(state, action) {
            console.log('Register Auth Success');
            return {
                loading: false,
                isRegistered: true,
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            console.log('Register Auth Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        otpRequest(state, action) {
            console.log(' OTP Auth Request');
            return {
                ...state,
                loading: true
            }
        },
        otpSuccess(state, action) {
            console.log('OTP Auth Success');
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        otpFail(state, action) {
            console.log('OTP Auth Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action){
            console.log(' Load User Request');
            return {
                ...state,
                loading: true
            }
        },
        loadUserSuccess(state, action){
            console.log('Load User Success');
            return{
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action){
            console.log('Load User Fail');
            return {
                ...state,
                loading: false
            }
        },
        logoutSuccess(state, action){
            console.log('LogOut User Success');
            return{
                loading: false,
                isAuthenticated: false,
            }
        },
        logoutFail(state, action){
            console.log('LogOut User Fail');
            return {
                ...state,
                error: action.payload
            }
        },
        updateProfileRequest(state, action) {
            console.log('update Profile Request');
            return {
                ...state,
                loading: true,
                isUpdated:false
            }
        },
        updateProfileSuccess(state, action) {
            console.log('update Profile Success');
            return {
                ...state,
                loading: false,
                isUpdated: true,
                user: action.payload.user
            }
        },
        updateProfileFail(state, action) {
            console.log('update Profile Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearupdateProfile(state, action) {
            console.log('clear update Profile');
            return {
                ...state,
                isUpdated : false
            }
        },
        changePasswordRequest(state, action) {
            console.log('change Password Request');
            return {
                ...state,
                loading: true,
                isUpdated:false
            }
        },
        changePasswordSuccess(state, action) {
            console.log('change Password Success');
            return {
                ...state,
                loading: false,
                isUpdated: true
            }
        },
        changePasswordFail(state, action) {
            console.log('change Password Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        forgotPasswordRequest(state, action) {
            console.log('forgot Password Request');
            return {
                ...state,
                loading: true,
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            console.log('forgot Password Success');
            return {
                ...state,
                loading: false,
                message: action.payload.message
            }
        },
        forgotPasswordFail(state, action) {
            console.log('forgot Password Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        resetPasswordRequest(state, action) {
            console.log('reset Password Request');
            return {
                ...state,
                loading: true
            }
        },
        resetPasswordSuccess(state, action) {
            console.log('reset Password Success');
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        resetPasswordFail(state, action) {
            console.log('reset Password Fail');
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
})

const { actions, reducer } = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    otpRequest,
    otpSuccess,
    otpFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearupdateProfile,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} = actions;
export default reducer;