import {
    APPLY_VOLUNTEER_REQUEST,
    APPLY_VOLUNTEER_SUCCESS,
    APPLY_VOLUNTEER_FAIL,
    APPLY_VOLUNTEER_RESET,
    FETCH_VOLUNTEER_STATUS_REQUEST,
    FETCH_VOLUNTEER_STATUS_SUCCESS,
    FETCH_VOLUNTEER_STATUS_FAIL
} from '../constants/volunteerConstants'

export const volunteerApplyReducer = (state = {}, action) => {
    switch (action.type) {
        case APPLY_VOLUNTEER_REQUEST:
            return { loading: true }
        case APPLY_VOLUNTEER_SUCCESS:
            return { loading: false, success: true }
        case APPLY_VOLUNTEER_FAIL:
            return { loading: false, error: action.payload }
        case APPLY_VOLUNTEER_RESET:
            return {}
        default:
            return state
    }
}

export const volunteerStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_VOLUNTEER_STATUS_REQUEST:
            return { loading: true }
        case FETCH_VOLUNTEER_STATUS_SUCCESS:
            return { loading: false, volunteerStatusInfo: action.payload }
        case FETCH_VOLUNTEER_STATUS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}