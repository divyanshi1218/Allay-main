import {
    FETCH_ACTIVE_FORMS_REQUEST,
    FETCH_ACTIVE_FORMS_SUCCESS,
    FETCH_ACTIVE_FORMS_FAIL,
    PICK_VOLUNTEER_FORM_REQUEST,
    PICK_VOLUNTEER_FORM_SUCCESS,
    PICK_VOLUNTEER_FORM_FAIL,
    PICK_VOLUNTEER_FORM_RESET,
    FETCH_PICKED_FORMS_REQUEST,
    FETCH_PICKED_FORMS_SUCCESS,
    FETCH_PICKED_FORMS_FAIL,
    FETCH_FORM_BY_ID_REQUEST,
    FETCH_FORM_BY_ID_SUCCESS,
    FETCH_FORM_BY_ID_FAIL,
    APPROVE_VOLUNTEER_REQUEST,
    APPROVE_VOLUNTEER_SUCCESS,
    APPROVE_VOLUNTEER_FAIL,
    DECLINE_VOLUNTEER_REQUEST,
    DECLINE_VOLUNTEER_SUCCESS,
    DECLINE_VOLUNTEER_FAIL
} from '../constants/selectorConstants'

export const activeFormsReducer = (state = { formsList: [] }, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_FORMS_REQUEST:
            return { loading: true, formsList: [] }
        case FETCH_ACTIVE_FORMS_SUCCESS:
            return { loading: false, formsList: action.payload }
        case FETCH_ACTIVE_FORMS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const formPickReducer = (state = {}, action) => {
    switch (action.type) {
        case PICK_VOLUNTEER_FORM_REQUEST:
            return { loading: true }
        case PICK_VOLUNTEER_FORM_SUCCESS:
            return { loading: false, success: true }
        case PICK_VOLUNTEER_FORM_FAIL:
            return { loading: false, error: action.payload }
        case PICK_VOLUNTEER_FORM_RESET:
            return {}
        default:
            return state
    }
}

export const pickedFormsReducer = (state = { formsList: [] }, action) => {
    switch (action.type) {
        case FETCH_PICKED_FORMS_REQUEST:
            return { loading: true, formsList: [] }
        case FETCH_PICKED_FORMS_SUCCESS:
            return { loading: false, formsList: action.payload }
        case FETCH_PICKED_FORMS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const volunteerFormByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_FORM_BY_ID_REQUEST:
            return { loading: true }
        case FETCH_FORM_BY_ID_SUCCESS:
            return { loading: false, formInfo: action.payload }
        case FETCH_FORM_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const formApproveReducer = (state = {}, action) => {
    switch (action.type) {
        case APPROVE_VOLUNTEER_REQUEST:
            return { loading: true }
        case APPROVE_VOLUNTEER_SUCCESS:
            return { loading: false, success: true }
        case APPROVE_VOLUNTEER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const formDeclineReducer = (state = {}, action) => {
    switch (action.type) {
        case DECLINE_VOLUNTEER_REQUEST:
            return { loading: true }
        case DECLINE_VOLUNTEER_SUCCESS:
            return { loading: false, success: true }
        case DECLINE_VOLUNTEER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
