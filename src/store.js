import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    userLoginReducer,
    userRegisterReducer,
    currentUserReducer,
    presentUserReducer,
    imageUploadReducer,
    fetchUserDetailsReducer,
    updateUserDetailsReducer,
    linkSendReducer,
    passwordResetReducer
} from './reducers/userReducers'

import {
    allPublicBlogsReducer,
    privateBlogAddReducer,
    userPrivateBlogReducer,
    privateBlogByIdReducer,
    // privateBlogUpdateReducer,
    privateBlogDeleteReducer,
    publicBlogAddReducer,
    userPublicBlogReducer,
    publicBlogByIdReducer,
    publicBlogUpdateReducer,
    publicBlogDeleteReducer,
    userSavedBlogReducer,
    changeBlogSaveStatusReducer,
    changeBlogLikeStatusReducer
} from './reducers/blogReducers'

import {
    questionPostReducer,
    userQuestionsReducer,
    userQuestionByIdReducer,
    volunteerChatByIdReducer,
    volunteerQuestionByIdReducer,
    activeQuestionsReducer,
    pickedQuestionsReducer,
    repliedQuestionsReducer,
    statusChangeReducer,
    ratingUpdateReducer,
    chatReplyReducer
} from './reducers/questionReducers'

import {
    volunteerApplyReducer,
    volunteerStatusReducer
} from './reducers/volunteerReducers'

import {
    activeFormsReducer,
    formPickReducer,
    pickedFormsReducer,
    volunteerFormByIdReducer,
    formApproveReducer,
    formDeclineReducer
} from './reducers/selectorReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    currentUser: currentUserReducer,
    presentUser: presentUserReducer,
    imageUpload: imageUploadReducer,
    fetchUserDetails: fetchUserDetailsReducer,
    updateUserDetails: updateUserDetailsReducer,
    linkSend: linkSendReducer,
    passwordReset: passwordResetReducer,
    allPublicBlogs: allPublicBlogsReducer,
    privateBlogAdd: privateBlogAddReducer,
    userPrivateBlogs: userPrivateBlogReducer,
    privateBlogById: privateBlogByIdReducer,
    // privateBlogUpdate: privateBlogUpdateReducer,
    privateBlogDelete: privateBlogDeleteReducer,
    publicBlogAdd: publicBlogAddReducer,
    userPublicBlogs: userPublicBlogReducer,
    publicBlogById: publicBlogByIdReducer,
    publicBlogUpdate: publicBlogUpdateReducer,
    publicBlogDelete: publicBlogDeleteReducer,
    userSavedBlog: userSavedBlogReducer,
    changeBlogSaveStatus: changeBlogSaveStatusReducer,
    changeBlogLikeStatus: changeBlogLikeStatusReducer,
    questionPost: questionPostReducer,
    activeQuestions: activeQuestionsReducer,
    pickedQuestions: pickedQuestionsReducer,
    repliedQuestions: repliedQuestionsReducer,
    userQuestions: userQuestionsReducer,
    userQuestionById: userQuestionByIdReducer,
    volunteerChatById: volunteerChatByIdReducer,
    volunteerQuestionById: volunteerQuestionByIdReducer,
    statusChange: statusChangeReducer,
    ratingUpdate: ratingUpdateReducer,
    chatReply: chatReplyReducer,
    volunteerApply: volunteerApplyReducer,
    volunteerStatus: volunteerStatusReducer,
    activeForms: activeFormsReducer,
    formPick: formPickReducer,
    pickedForms: pickedFormsReducer,
    volunteerFormById: volunteerFormByIdReducer,
    formApprove: formApproveReducer,
    formDecline: formDeclineReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    currentUser: { currentUserInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store