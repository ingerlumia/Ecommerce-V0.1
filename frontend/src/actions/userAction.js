import axios from "axios";
import { clearError, loadUserFail, loadUserRequest, loadUserSuccess, 
    loginFail, loginRequest, loginSuccess, 
    otpFail, otpRequest, otpSuccess, registerFail,
    registerRequest, registerSuccess,
    logoutFail,logoutSuccess,
    updateProfileRequest, updateProfileSuccess, updateProfileFail, 
    changePasswordRequest, changePasswordSuccess, changePasswordFail, 
    forgotPasswordRequest, forgotPasswordFail, forgotPasswordSuccess, 
    resetPasswordRequest, resetPasswordSuccess, resetPasswordFail
} from "../slices/authSlice";
import { userDeleteFail, userDeleteRequest, userDeleteSuccess,
     userFail, userRequest, userSuccess, 
     userUpdateFail, userUpdateRequest, userUpdateSuccess,  
     usersListFail, usersListRequest, usersListSuccess } from "../slices/userSlice";
    
//const api = axios.create({ baseURL: "http://localhost:3000" });
// Use the variable from Vercel, or fall back to localhost for testing


export const login = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/user/login`, { email, password });
        dispatch(loginRequest());
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFail(error.response.data.message));
    }
}

export const register = (userData) => async(dispatch) =>{
    try {
        dispatch(registerRequest);

        const config = {
            headers:{
                'Content-type': 'multipart/form-data'
            }
        };
        const { data } = await axios.post(`api/user/register`,userData,config);
        dispatch(registerSuccess(data));

    } catch (error) {
        dispatch(registerFail(error.response.data.message));
    }
}

export const otpVerify = (otp) => async(dispatch) =>{
    try {
        dispatch(otpRequest);
        const { data } = await axios.post(`api/user/verify`,{otp},{
            withCredentials:true
        });
        
        dispatch(otpSuccess(data));

    } catch (error) {
        dispatch(otpFail(error.response.data.message));
    }
}

export const loadUser = async(dispatch) =>{
    try {
        dispatch(loadUserRequest);

        // Always call with absolute API path:
        const { data } = await axios.get("/api/user/profile");

       // const { data } = await axios.get(`api/user/profile`);
        dispatch(loadUserSuccess(data));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
}

export const updateProfile = (userData) => async(dispatch) =>{
    try {
        dispatch(updateProfileRequest);

        const config = {
            headers:{
                'Content-type': 'multipart/form-data'
            }
        };

        const { data } = await axios.put(`api/user/updateprofile`,userData,config);
        dispatch(updateProfileSuccess(data));

    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message));
    }
}

export const changePassword = (formData) => async(dispatch) =>{
    try {
        dispatch(changePasswordRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        await axios.put(`api/user/changepassword`,formData,config);
        dispatch(changePasswordSuccess());

    } catch (error) {
        dispatch(changePasswordFail(error.response.data.message));
    }
}

export const forgotPassword = (formData) => async(dispatch) =>{
    try {
        dispatch(forgotPasswordRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const { data } = await axios.post(`api/user/forgotPassword`,formData,config);
        dispatch(forgotPasswordSuccess(data));

    } catch (error) {
        dispatch(forgotPasswordFail(error.response.data.message));
    }
}

export const resetPassword = (formData, token) => async(dispatch) =>{
    try {
        dispatch(resetPasswordRequest());
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const { data } = await axios.post(`http://127.0.0.1:2005/api/user/resetpassword/${token}`,formData,config);
        dispatch(resetPasswordSuccess(data));

    } catch (error) {
        dispatch(resetPasswordFail(error.response.data.message));
    }
}

export const logoutUser = async(dispatch) =>{
    try {

        const { data } = await axios.get(`api/user/logoutUser`);
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail(error.response.data.message));
    }
}

export const clearAuthError = dispatch => {
    dispatch(clearError());
}

export const getUsers = ()=>async(dispatch) =>{
    try {
        dispatch(usersListRequest());
        const { data } = await axios.get("/api/users/get/AllUsers");
        dispatch(usersListSuccess(data));
    } catch (error) {
        dispatch(usersListFail(error.response.data.message));
    }
}

export const getUser = (id) => async(dispatch) =>{
    try {
        dispatch(userRequest());
        const { data } = await axios.get(`/api/users/get/user/${id}`);
        dispatch(userSuccess(data));
    } catch (error) {
        dispatch(userFail(error.response.data.message));
    }
}

export const userDelete = (id) => async(dispatch) =>{
    try {
        dispatch(userDeleteRequest());
        await axios.delete(`/api/users/delete/user/${id}`);
        dispatch(userDeleteSuccess());
    } catch (error) {
        dispatch(userDeleteFail(error.response.data.message));
    }
}

export const userUpdate = (id,formData) => async(dispatch) =>{
    try {
        dispatch(userUpdateRequest());
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        };
        const { data } = await axios.put(`/api/users/update/user/${id}`,formData,config);
        dispatch(userUpdateSuccess(data));
    } catch (error) {
        dispatch(userUpdateFail(error.response.data.message));
    }
}


