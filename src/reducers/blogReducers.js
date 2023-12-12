import {
    FETCH_PUBLIC_BLOG_REQUEST,
    FETCH_PUBLIC_BLOG_SUCCESS,
    FETCH_PUBLIC_BLOG_FAIL,
    ADD_PRIVATE_BLOG_REQUEST,
    ADD_PRIVATE_BLOG_SUCCESS,
    ADD_PRIVATE_BLOG_FAIL,
    ADD_PRIVATE_BLOG_RESET,
    FETCH_USER_PRIVATE_BLOG_REQUEST,
    FETCH_USER_PRIVATE_BLOG_SUCCESS,
    FETCH_USER_PRIVATE_BLOG_FAIL,
    FETCH_PRIVATE_BLOG_BY_ID_REQUEST,
    FETCH_PRIVATE_BLOG_BY_ID_SUCCESS,
    FETCH_PRIVATE_BLOG_BY_ID_FAIL,
    // UPDATE_PRIVATE_BLOG_REQUEST,
    // UPDATE_PRIVATE_BLOG_SUCCESS,
    // UPDATE_PRIVATE_BLOG_FAIL,
    DELETE_PRIVATE_BLOG_REQUEST,
    DELETE_PRIVATE_BLOG_SUCCESS,
    DELETE_PRIVATE_BLOG_FAIL,
    DELETE_PRIVATE_BLOG_RESET,
    ADD_PUBLIC_BLOG_REQUEST,
    ADD_PUBLIC_BLOG_SUCCESS,
    ADD_PUBLIC_BLOG_FAIL,
    ADD_PUBLIC_BLOG_RESET,
    FETCH_USER_PUBLIC_BLOG_REQUEST,
    FETCH_USER_PUBLIC_BLOG_SUCCESS,
    FETCH_USER_PUBLIC_BLOG_FAIL,
    FETCH_PUBLIC_BLOG_BY_ID_REQUEST,
    FETCH_PUBLIC_BLOG_BY_ID_SUCCESS,
    FETCH_PUBLIC_BLOG_BY_ID_FAIL,
    UPDATE_PUBLIC_BLOG_REQUEST,
    UPDATE_PUBLIC_BLOG_SUCCESS,
    UPDATE_PUBLIC_BLOG_FAIL,
    UPDATE_PUBLIC_BLOG_RESET,
    DELETE_PUBLIC_BLOG_REQUEST,
    DELETE_PUBLIC_BLOG_SUCCESS,
    DELETE_PUBLIC_BLOG_FAIL,
    DELETE_PUBLIC_BLOG_RESET,
    FETCH_USER_SAVED_BLOG_REQUEST,
    FETCH_USER_SAVED_BLOG_SUCCESS,
    FETCH_USER_SAVED_BLOG_FAIL,
    BLOG_SAVE_STATUS_CHANGE_REQUEST,
    BLOG_SAVE_STATUS_CHANGE_SUCCESS,
    BLOG_SAVE_STATUS_CHANGE_FAIL,
    BLOG_SAVE_STATUS_CHANGE_RESET,
    BLOG_LIKE_STATUS_CHANGE_REQUEST,
    BLOG_LIKE_STATUS_CHANGE_SUCCESS,
    BLOG_LIKE_STATUS_CHANGE_FAIL,
    BLOG_LIKE_STATUS_CHANGE_RESET
} from '../constants/blogConstants'

export const allPublicBlogsReducer = (state = { publicBlogsInfo: [] }, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_BLOG_REQUEST:
            return { loading: true, publicBlogsInfo: [] }
        case FETCH_PUBLIC_BLOG_SUCCESS:
            return { loading: false, publicBlogsInfo: action.payload }
        case FETCH_PUBLIC_BLOG_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const privateBlogAddReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PRIVATE_BLOG_REQUEST:
            return { loading: true }
        case ADD_PRIVATE_BLOG_SUCCESS:
            return { loading: false, privateBlogInfo: action.payload }
        case ADD_PRIVATE_BLOG_FAIL:
            return { loading: false, error: action.payload }
        case ADD_PRIVATE_BLOG_RESET:
            return {}
        default:
            return state
    }
}

export const userPrivateBlogReducer = (state = { userPrivateBlogsInfo: [] }, action) => {
    switch (action.type) {
        case FETCH_USER_PRIVATE_BLOG_REQUEST:
            return { loading: true, userPrivateBlogsInfo: [] }
        case FETCH_USER_PRIVATE_BLOG_SUCCESS:
            return { loading: false, userPrivateBlogsInfo: action.payload }
        case FETCH_USER_PRIVATE_BLOG_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const privateBlogByIdReducer = (state = { blogInfo: {} }, action) => {
    switch (action.type) {
        case FETCH_PRIVATE_BLOG_BY_ID_REQUEST:
            return { loading: true, blogInfo: {} }
        case FETCH_PRIVATE_BLOG_BY_ID_SUCCESS:
            return { loading: false, blogInfo: action.payload }
        case FETCH_PRIVATE_BLOG_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// export const privateBlogUpdateReducer = (state = {}, action) => {
//     switch (action.type) {
//         case UPDATE_PRIVATE_BLOG_REQUEST:
//             return { loading: true }
//         case UPDATE_PRIVATE_BLOG_SUCCESS:
//             return { loading: false, success: true }
//         case UPDATE_PRIVATE_BLOG_FAIL:
//             return { loading: false, error: action.payload }
//         default:
//             return state
//     }
// }

export const privateBlogDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRIVATE_BLOG_REQUEST:
            return { loading: true }
        case DELETE_PRIVATE_BLOG_SUCCESS:
            return { loading: false, success: true }
        case DELETE_PRIVATE_BLOG_FAIL:
            return { loading: false, error: action.payload }
        case DELETE_PRIVATE_BLOG_RESET:
            return {}
        default:
            return state
    }
}

export const publicBlogAddReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PUBLIC_BLOG_REQUEST:
            return { loading: true }
        case ADD_PUBLIC_BLOG_SUCCESS:
            return { loading: false, publicBlogInfo: action.payload }
        case ADD_PUBLIC_BLOG_FAIL:
            return { loading: false, error: action.payload }
        case ADD_PUBLIC_BLOG_RESET:
            return {}
        default:
            return state
    }
}

export const userPublicBlogReducer = (state = { userPublicBlogsInfo: [] }, action) => {
    switch (action.type) {
        case FETCH_USER_PUBLIC_BLOG_REQUEST:
            return { loading: true, userPublicBlogsInfo: [] }
        case FETCH_USER_PUBLIC_BLOG_SUCCESS:
            return { loading: false, userPublicBlogsInfo: action.payload }
        case FETCH_USER_PUBLIC_BLOG_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const publicBlogByIdReducer = (state = { blogInfo: {} }, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_BLOG_BY_ID_REQUEST:
            return { loading: true, blogInfo: {} }
        case FETCH_PUBLIC_BLOG_BY_ID_SUCCESS:
            return { loading: false, blogInfo: action.payload }
        case FETCH_PUBLIC_BLOG_BY_ID_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const publicBlogUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PUBLIC_BLOG_REQUEST:
            return { loading: true }
        case UPDATE_PUBLIC_BLOG_SUCCESS:
            return { loading: false, success: true }
        case UPDATE_PUBLIC_BLOG_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_PUBLIC_BLOG_RESET:
            return {}
        default:
            return state
    }
}

export const publicBlogDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PUBLIC_BLOG_REQUEST:
            return { loading: true }
        case DELETE_PUBLIC_BLOG_SUCCESS:
            return { loading: false, success: true }
        case DELETE_PUBLIC_BLOG_FAIL:
            return { loading: false, error: action.payload }
        case DELETE_PUBLIC_BLOG_RESET:
            return {}
        default:
            return state
    }
}

export const userSavedBlogReducer = (state = { userSavedBlogsInfo: [] }, action) => {
    switch (action.type) {
        case FETCH_USER_SAVED_BLOG_REQUEST:
            return { loading: true, userSavedBlogsInfo: [] }
        case FETCH_USER_SAVED_BLOG_SUCCESS:
            return { loading: false, userSavedBlogsInfo: action.payload }
        case FETCH_USER_SAVED_BLOG_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const changeBlogLikeStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_LIKE_STATUS_CHANGE_REQUEST:
            return { loading: true }
        case BLOG_LIKE_STATUS_CHANGE_SUCCESS:
            return { loading: false, success: true }
        case BLOG_LIKE_STATUS_CHANGE_FAIL:
            return { loading: false, error: action.payload }
        case BLOG_LIKE_STATUS_CHANGE_RESET:
            return {}
        default:
            return state
    }
}

export const changeBlogSaveStatusReducer = (state = {}, action) => {
    switch (action.type) {
        case BLOG_SAVE_STATUS_CHANGE_REQUEST:
            return { loading: true }
        case BLOG_SAVE_STATUS_CHANGE_SUCCESS:
            return { loading: false, success: true, saveStatus: action.payload }
        case BLOG_SAVE_STATUS_CHANGE_FAIL:
            return { loading: false, error: action.payload }
        case BLOG_SAVE_STATUS_CHANGE_RESET:
            return {}
        default:
            return state
    }
}
