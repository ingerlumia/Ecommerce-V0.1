import { createSlice } from "@reduxjs/toolkit";

const websiteSlice = createSlice({
    name: 'website',
    initialState: {
        loading: false,
        isnotificationsupdate: false,
        isImageDelete: false,
        isImageupdate: false,
        isShippingDataAddted: false,
        isShippingDataUpdated: false,
        isImageAdded: false,
        summary: {},
        notifications: [],
        images: [],        
        shipping: {},
        country: {},
    },
    reducers: {
        summaryRequest(state, action) {
            console.log('summary Request')
            return {
                ...state,
                loading: true
            }
        },
        summarySuccess(state, action) {
            console.log('summary Success')
            return {
                ...state,
                loading: false,
                summary: action.payload.summary

            }
        },
        summaryFail(state, action) {
            console.log('summary Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
       getImagesRequest(state, action) {
            console.log('Get Images Request')
            return {
                ...state,
                loading: true
            }
        },
        getImagesSuccess(state, action) {
            console.log('Get Images Success')
            return {
                ...state,
                loading: false,
                images: action.payload.images

            }
        },
        getImagesFail(state, action) {
            console.log('get Images Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
       getShippingDataRequest(state, action) {
            console.log('Get ShippingData Request')
            return {
                ...state,
                loading: true
            }
        },
        getShippingDataSuccess(state, action) {
            console.log('Get ShippingData Success')
            return {
                ...state,
                loading: false,
                shipping: action.payload.shipping
            }
        },
        getShippingDataFail(state, action) {
            console.log('get ShippingData Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
       getOneShippingDataRequest(state, action) {
            console.log('Get One ShippingData Request')
            return {
                ...state,
                loading: true
            }
        },
        getOneShippingDataSuccess(state, action) {
            console.log('Get One ShippingData Success')
            return {
                ...state,
                loading: false,
                country: action.payload.country
            }
        },
        getOneShippingDataFail(state, action) {
            console.log('get One ShippingData Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        newImageRequest(state, action) {
            console.log('New Image Request')
            return {
                ...state,
                loading: true
            }
        },
        newImageSuccess(state, action) {
            console.log('New Image Success')
            return {
                ...state,
                loading: false,
                images: action.payload.images,
                isImageAdded: true
            }
        },
        newImageFail(state, action) {
            console.log('New Image Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearNewImageCreated(state, action) {
            console.log('Cleared IsNew Image')
            return {
                loading: false,
                isImageAdded: false
            }
        },      
        updateImageRequest(state, action) {
            console.log('update Image Request')
            return {
                ...state,
                loading: true
            }
        },
        updateImageSuccess(state, action) {
            console.log('update Image Success')
            return {
                ...state,
                loading: false,
                images: action.payload.images,
                isImageupdate: true
            }
        },
        updateImageFail(state, action) {
            console.log('update Image Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearupdateImage(state, action) {
            console.log('Cleared Isupdate Image')
            return {
                loading: false,
                isImageupdate: false
            }
        },      
        addShippingDataRequest(state, action) {
            console.log('Add Shipping Data Request')
            return {
                ...state,
                loading: true
            }
        },
        addShippingDataSuccess(state, action) {
            console.log('Add ShippingData Success')
            return {
                ...state,
                loading: false,
                country: action.payload.country,
                isShippingDataAddted: true

            }
        },
        addShippingDataFail(state, action) {
            console.log('Add Shipping Data Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearAddShippingData(state, action) {
            console.log('Add Shipping Data Cleared')
            return {
                loading: false,
                isShippingDataAddted: false
            }
        },
        updateShippingDataRequest(state, action) {
            console.log('Update Shipping Data Request')
            return {
                ...state,
                loading: true
            }
        },
        updateShippingDataSuccess(state, action) {
            console.log('Update ShippingData Success')
            return {
                ...state,
                loading: false,
                country: action.payload.country,
                isShippingDataUpdated: true

            }
        },
        updateShippingDataFail(state, action) {
            console.log('Update Shipping Data Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateShippingData(state, action) {
            console.log('Update Shipping Data Cleared')
            return {
                loading: false,
                isShippingDataUpdated: false
            }
        },
        imageDeleteRequest(state, action) {
            console.log('Image Delete Request')
            return {
                ...state,
                loading: true
            }
        },
        imageDeleteSuccess(state, action) {
            console.log('Image Delete Success')
            return {
                ...state,
                loading: false,
                isImageDelete: true
            }
        },
        imageDeleteFail(state, action) {
            console.log('Image Delete Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearIsImageDelete(state, action) {
            console.log('IsImageDelete Cleared')
            return {
                loading: false,
                isImageDelete: false
            }
        },
        getNotificationsRequest(state, action) {
            console.log('get Notifications Request')
            return {
                ...state,
                loading: true
            }
        },
        getNotificationsSuccess(state, action) {
            console.log('get Notifications Success')
            return {
                ...state,
                loading: false,
                notifications: action.payload.notifications

            }
        },
        getNotificationsFail(state, action) {
            console.log('get Notifications Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },             
        updateNotificationsRequest(state, action) {
            console.log('update Notifications Request')
            return {
                ...state,
                loading: true
            }
        },
        updateNotificationsSuccess(state, action) {
            console.log('update Notifications Success')
            return {
                ...state,
                loading: false,
                notifications: action.payload.notifications,
                isnotificationsupdate: true
            }
        },
        updateNotificationsFail(state, action) {
            console.log('update Notifications Fail')
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearupdateNotifications(state, action) {
            console.log('Cleared Isupdate Notifications')
            return {
                
                isnotificationsupdate: false
            }
        },      
    }
})


const { actions, reducer } = websiteSlice;

export const {
    summaryRequest, summarySuccess, summaryFail,
    getImagesRequest, getImagesSuccess, getImagesFail,
    getShippingDataRequest, getShippingDataSuccess, getShippingDataFail,
    updateShippingDataRequest, updateShippingDataSuccess, updateShippingDataFail,clearUpdateShippingData,
    newImageRequest, newImageSuccess, newImageFail,
    imageDeleteRequest, imageDeleteSuccess, imageDeleteFail,clearIsImageDelete,
    getNotificationsRequest, getNotificationsSuccess, getNotificationsFail,
    updateImageRequest, updateImageSuccess, updateImageFail, clearupdateImage,
    updateNotificationsRequest, updateNotificationsSuccess, updateNotificationsFail, clearupdateNotifications,
    addShippingDataRequest, addShippingDataSuccess, addShippingDataFail,clearAddShippingData,
    getOneShippingDataRequest, getOneShippingDataSuccess, getOneShippingDataFail
} = actions;
export default reducer;