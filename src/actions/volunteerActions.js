import {
    APPLY_VOLUNTEER_REQUEST,
    APPLY_VOLUNTEER_SUCCESS,
    APPLY_VOLUNTEER_FAIL,
    FETCH_VOLUNTEER_STATUS_REQUEST,
    FETCH_VOLUNTEER_STATUS_SUCCESS,
    FETCH_VOLUNTEER_STATUS_FAIL
} from '../constants/volunteerConstants'
import { firebaseDatabase } from "../firebase"
import firebase from 'firebase/app'

const applyForVolunteer = ({ answers, applicationDate }) => async (dispatch) => {
    dispatch({ type: APPLY_VOLUNTEER_REQUEST })

    const userId = firebase.auth().currentUser.uid

    const applicationRef = await firebaseDatabase.ref().child(userId).child('volunteerapplication');
    applicationRef.set({
        volunteerAccountId: userId,
        selectorAccountId: null,
        volunteerAnswers: answers,
        dateOfApplication: applicationDate,
        isSelected: false,
    });
    const activeApplicationRef = await firebaseDatabase.ref().child('volunteeractiveapplication').child(userId);
    activeApplicationRef.set({
        volunteerAccountId: userId,
        selectorAccountId: null,
        dateOfApplication: applicationDate,
    })
        .then(() => dispatch({ type: APPLY_VOLUNTEER_SUCCESS }))
        .catch((error) => dispatch({
            type: APPLY_VOLUNTEER_FAIL,
            payload: error.message
        }))
}

const fetchVolunteerStatus = () => dispatch => {
    dispatch({ type: FETCH_VOLUNTEER_STATUS_REQUEST })

    const userId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(userId).child('volunteerapplication').once('value')
        .then(application => {
            let status = false
            if (application.val() && application.val().dateOfApplication) {
                status = true
            }
            dispatch({
                type: FETCH_VOLUNTEER_STATUS_SUCCESS,
                payload: status
            })
        })
        .catch((error) => dispatch({
            type: FETCH_VOLUNTEER_STATUS_FAIL,
            payload: error.message
        }))
}

export {
    applyForVolunteer,
    fetchVolunteerStatus
}