import {
    USER_GOOGLE_LOGIN_REQUEST,
    USER_GOOGLE_LOGIN_FAIL,
    USER_EMAIL_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_EMAIL_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    CURRENT_USER_DETAILS_REQUEST,
    CURRENT_USER_DETAILS_SUCCESS,
    CURRENT_USER_DETAILS_NOTFOUND,
    CURRENT_USER_DETAILS_FAIL,
    CURRENT_USER_DETAILS_RESET,
    CURRENT_USER_DATA_REQUEST,
    CURRENT_USER_DATA_SUCCESS,
    CURRENT_USER_DATA_FAIL,
    CURRENT_USER_DATA_RESET,
    UPLOAD_IMAGE_REQUEST,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_FAIL,
    UPLOAD_IMAGE_RESET,
    FETCH_USER_DETAILS_BY_ID_REQUEST,
    FETCH_USER_DETAILS_BY_ID_SUCCESS,
    FETCH_USER_DETAILS_BY_ID_FAIL,
    FETCH_USER_DETAILS_BY_ID_RESET,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
    UPDATE_USER_DETAILS_RESET,
    VERIFICATION_LINK_REQUEST,
    VERIFICATION_LINK_SUCCESS,
    VERIFICATION_LINK_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_GOOGLE_LOGIN_REQUEST:
            return { loading: true }
        case USER_GOOGLE_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_EMAIL_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_EMAIL_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload, name: action.name }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const currentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_USER_DETAILS_REQUEST:
            return { loading: true }
        case CURRENT_USER_DETAILS_SUCCESS:
            return { loading: false, currentUserInfo: action.payload }
        case CURRENT_USER_DETAILS_NOTFOUND:
            return { loading: false, userNotFound: true }
        case CURRENT_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case CURRENT_USER_DETAILS_RESET:
            return {}
        default:
            return state
    }
}

export const presentUserReducer = (state = {}, action) => {
    switch (action.type) {
        case CURRENT_USER_DATA_REQUEST:
            return { loading: true }
        case CURRENT_USER_DATA_SUCCESS:
            return { loading: false, presentUserInfo: action.payload }
        case CURRENT_USER_DATA_FAIL:
            return { loading: false, error: action.payload }
        case CURRENT_USER_DATA_RESET:
            return {}
        default:
            return state
    }
}

export const fetchUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_DETAILS_BY_ID_REQUEST:
            return { loading: true }
        case FETCH_USER_DETAILS_BY_ID_SUCCESS:
            return { loading: false, userDetails: action.payload }
        case FETCH_USER_DETAILS_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        case FETCH_USER_DETAILS_BY_ID_RESET:
            return {}
        default:
            return state
    }
}

export const updateUserDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_DETAILS_REQUEST:
            return { loading: true }
        case UPDATE_USER_DETAILS_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_USER_DETAILS_RESET:
            return {}
        default:
            return state
    }
}

export const imageUploadReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_IMAGE_REQUEST:
            return { loading: true }
        case UPLOAD_IMAGE_SUCCESS:
            return { loading: false, imageInfo: action.payload }
        case UPLOAD_IMAGE_FAIL:
            return { loading: false, error: action.payload }
        case UPLOAD_IMAGE_RESET:
            return {}
        default:
            return state
    }
}

export const linkSendReducer = (state = {}, action) => {
    switch (action.type) {
        case VERIFICATION_LINK_REQUEST:
            return { loading: true }
        case VERIFICATION_LINK_SUCCESS:
            return { loading: false, success: true }
        case VERIFICATION_LINK_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const passwordResetReducer = (state = {}, action) => {
    switch (action.type) {
        case PASSWORD_RESET_REQUEST:
            return { loading: true }
        case PASSWORD_RESET_SUCCESS:
            return { loading: false, success: true }
        case PASSWORD_RESET_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}