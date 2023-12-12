import {
    POST_QUESTION_REQUEST,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAIL,
    POST_QUESTION_RESET,
    FETCH_USER_QUESTIONS_REQUEST,
    FETCH_USER_QUESTIONS_SUCCESS,
    FETCH_USER_QUESTIONS_FAIL,
    FETCH_USER_QUESTION_BY_ID_REQUEST,
    FETCH_USER_QUESTION_BY_ID_SUCCESS,
    FETCH_USER_QUESTION_BY_ID_FAIL,
    FETCH_ACTIVE_QUESTIONS_REQUEST,
    FETCH_ACTIVE_QUESTIONS_SUCCESS,
    FETCH_ACTIVE_QUESTIONS_FAIL,
    FETCH_PICKED_QUESTIONS_REQUEST,
    FETCH_PICKED_QUESTIONS_SUCCESS,
    FETCH_PICKED_QUESTIONS_FAIL,
    FETCH_REPLIED_QUESTIONS_REQUEST,
    FETCH_REPLIED_QUESTIONS_SUCCESS,
    FETCH_REPLIED_QUESTIONS_FAIL,
    FETCH_VOLUNTEER_CHAT_BY_ID_REQUEST,
    FETCH_VOLUNTEER_CHAT_BY_ID_SUCCESS,
    FETCH_VOLUNTEER_CHAT_BY_ID_FAIL,
    FETCH_VOLUNTEER_CHAT_BY_ID_RESET,
    FETCH_VOLUNTEER_QUESTION_BY_ID_REQUEST,
    FETCH_VOLUNTEER_QUESTION_BY_ID_SUCCESS,
    FETCH_VOLUNTEER_QUESTION_BY_ID_FAIL,
    UPDATE_QUESTION_STATUS_REQUEST,
    UPDATE_QUESTION_STATUS_SUCCESS,
    UPDATE_QUESTION_STATUS_FAIL,
    UPDATE_QUESTION_STATUS_RESET,
    UPDATE_RATING_REQUEST,
    UPDATE_RATING_SUCCESS,
    UPDATE_RATING_FAIL,
    UPDATE_RATING_RESET,
    REPLY_QUESTION_REQUEST,
    REPLY_QUESTION_SUCCESS,
    REPLY_QUESTION_FAIL,
    REPLY_QUESTION_RESET,
} from '../constants/questionConstants'

export const questionPostReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_QUESTION_REQUEST:
            return { loading: true }
        case POST_QUESTION_SUCCESS:
            return { loading: false, success: true }
        case POST_QUESTION_FAIL:
            return { loading: false, error: action.payload }
        case POST_QUESTION_RESET:
            return {}
        default:
            return state
    }
}

export const userQuestionsReducer = (state = { questionInfo: [] }, action) => {
    switch (action.type) {
        case FETCH_USER_QUESTIONS_REQUEST:
            return { loading: true, questionInfo: [] }
        case FETCH_USER_QUESTIONS_SUCCESS:
            return { loading: false, questionInfo: action.payload }
        case FETCH_USER_QUESTIONS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const userQuestionByIdReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_QUESTION_BY_ID_REQUEST:
            return { loading: true }
        case FETCH_USER_QUESTION_BY_ID_SUCCESS:
            return { loading: false, questionInfo: action.payload }
        case FETCH_USER_QUESTION_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const volunteerChatByIdReducer = (state = { questionData: {} }, action) => {
    switch (action.type) {
        case FETCH_VOLUNTEER_CHAT_BY_ID_REQUEST:
            return { loading: true, questionInfo: {} }
        case FETCH_VOLUNTEER_CHAT_BY_ID_SUCCESS:
            return { loading: false, questionData: action.payload }
        case FETCH_VOLUNTEER_CHAT_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        case FETCH_VOLUNTEER_CHAT_BY_ID_RESET:
            return {}
        default:
            return state
    }
}

export const volunteerQuestionByIdReducer = (state = { questionInfo: {} }, action) => {
    switch (action.type) {
        case FETCH_VOLUNTEER_QUESTION_BY_ID_REQUEST:
            return { loading: true, questionInfo: {} }
        case FETCH_VOLUNTEER_QUESTION_BY_ID_SUCCESS:
            return { loading: false, questionInfo: action.payload, userAccountId: action.userAccountId, userChatId: action.userChatId }
        case FETCH_VOLUNTEER_QUESTION_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const activeQuestionsReducer = (state = { questionList: [] }, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_QUESTIONS_REQUEST:
            return { loading: true, questionList: [] }
        case FETCH_ACTIVE_QUESTIONS_SUCCESS:
            return { loading: false, questionList: action.payload }
        case FETCH_ACTIVE_QUESTIONS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const pickedQuestionsReducer = (state = { questionList: [] }, action) => {
    switch (action.type) {
        case FETCH_PICKED_QUESTIONS_REQUEST:
            return { loading: true, questionList: [] }
        case FETCH_PICKED_QUESTIONS_SUCCESS:
            return { loading: false, questionList: action.payload }
        case FETCH_PICKED_QUESTIONS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const repliedQuestionsReducer = (state = { questionList: [] }, action) => {
    switch (action.type) {
        case FETCH_REPLIED_QUESTIONS_REQUEST:
            return { loading: true, questionList: [] }
        case FETCH_REPLIED_QUESTIONS_SUCCESS:
            return { loading: false, questionList: action.payload }
        case FETCH_REPLIED_QUESTIONS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const statusChangeReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_QUESTION_STATUS_REQUEST:
            return { loading: true }
        case UPDATE_QUESTION_STATUS_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_QUESTION_STATUS_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_QUESTION_STATUS_RESET:
            return {}
        default:
            return state
    }
}

export const ratingUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_RATING_REQUEST:
            return { loading: true }
        case UPDATE_RATING_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_RATING_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_RATING_RESET:
            return {}
        default:
            return state
    }
}

export const chatReplyReducer = (state = {}, action) => {
    switch (action.type) {
        case REPLY_QUESTION_REQUEST:
            return { loading: true }
        case REPLY_QUESTION_SUCCESS:
            return { loading: false, success: true }
        case REPLY_QUESTION_FAIL:
            return { loading: false, error: action.payload }
        case REPLY_QUESTION_RESET:
            return {}
        default:
            return state
    }
}