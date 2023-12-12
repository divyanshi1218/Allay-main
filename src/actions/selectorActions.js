import {
    FETCH_ACTIVE_FORMS_REQUEST,
    FETCH_ACTIVE_FORMS_SUCCESS,
    FETCH_ACTIVE_FORMS_FAIL,
    PICK_VOLUNTEER_FORM_REQUEST,
    PICK_VOLUNTEER_FORM_SUCCESS,
    PICK_VOLUNTEER_FORM_FAIL,
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
import { firebaseDatabase, db } from "../firebase"
import firebase from 'firebase/app'
import dateToISOLikeButLocal from '../components/ConvertDate'

const fetchActiveForms = () => dispatch => {
    dispatch({ type: FETCH_ACTIVE_FORMS_REQUEST })

    firebaseDatabase.ref().child('volunteeractiveapplication').once('value')
        .then(async (snapshot) => {
            var resultArr = snapshot.val()
            var arr = []
            for (let childSnapshot in resultArr) {
                let childKey = childSnapshot
                let childData = resultArr[childSnapshot]
                if (!childData.dateOfAllocation) {
                    var formRef = await firebaseDatabase.ref().child(childData.volunteerAccountId).child('volunteerapplication').once('value')
                    arr.push({ key: childKey, value: formRef.val() })
                }
            }
            dispatch({
                type: FETCH_ACTIVE_FORMS_SUCCESS,
                payload: arr
            })
        })
        .catch(error => dispatch({
            type: FETCH_ACTIVE_FORMS_FAIL,
            payload: error.messsage
        }))
}

const pickVolunteerForm = (volunteerId) => dispatch => {
    dispatch({ type: PICK_VOLUNTEER_FORM_REQUEST })

    const selectorId = firebase.auth().currentUser.uid
    const dateOfAllocation = dateToISOLikeButLocal(new Date())

    const activeApplicationRef = firebaseDatabase.ref().child('volunteeractiveapplication').child(volunteerId);
    activeApplicationRef.once('value').then(async (snapshot) => {
        if (!snapshot.val().dateOfAllocation) {
            const applicationRef = firebaseDatabase.ref().child(volunteerId).child('volunteerapplication');
            await applicationRef.update({
                'selectorAccountId': selectorId,
                'dateOfAllocation': dateOfAllocation,
            });
            const selectorApplicationRef = firebaseDatabase.ref().child(selectorId).child('volunteerforms').child(volunteerId);
            await selectorApplicationRef.set({
                'selectorAccountId': selectorId,
                'volunteerAccountId': volunteerId,
                'dateOfAllocation': dateOfAllocation,
            });
            await activeApplicationRef.update({
                'volunteerAccountId': volunteerId,
                'dateOfAllocation': dateOfAllocation,
            });
            dispatch({ type: PICK_VOLUNTEER_FORM_SUCCESS })
        } else {
            dispatch({
                type: PICK_VOLUNTEER_FORM_FAIL,
                payload: 'Form is already picked'
            })
        }
    }).catch(error => {
        dispatch({
            type: PICK_VOLUNTEER_FORM_FAIL,
            payload: error.messsage
        })
    })
}

const fetchPickedForms = () => dispatch => {
    dispatch({ type: FETCH_PICKED_FORMS_REQUEST })

    const selectorId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(selectorId).child('volunteerforms').once('value')
        .then(async (snapshot) => {
            var resultArr = snapshot.val()
            var arr = []
            for (let childSnapshot in resultArr) {
                let childKey = childSnapshot
                let childData = resultArr[childSnapshot]
                // console.log(childData)
                if (!childData.awardedMarks) {
                    // console.log(`childkey : ${childKey} and volunteerId : ${childData.volunteerAccountId}`)
                    var formRef = await firebaseDatabase.ref().child(childData.volunteerAccountId).child('volunteerapplication').once('value')
                    // if (!formRef.val().awardedMark) {
                    arr.push({ key: childKey, value: formRef.val() })
                    //}
                }
            }
            dispatch({
                type: FETCH_PICKED_FORMS_SUCCESS,
                payload: arr
            })
        })
        .catch(error => dispatch({
            type: FETCH_PICKED_FORMS_FAIL,
            payload: error.messsage
        }))
}

const fetchVolunteerFormById = (volunteerId) => dispatch => {
    dispatch({ type: FETCH_FORM_BY_ID_REQUEST })

    firebaseDatabase.ref().child(volunteerId).child('volunteerapplication').once('value')
        .then(snapshot => {
            dispatch({
                type: FETCH_FORM_BY_ID_SUCCESS,
                payload: snapshot.val()
            })
        })
        .catch(error => dispatch({
            type: FETCH_FORM_BY_ID_FAIL,
            payload: error.message
        }))
}

const approveForm = (awardedMarks, volunteerId) => async (dispatch) => {
    dispatch({ type: APPROVE_VOLUNTEER_REQUEST })

    const selectorId = firebase.auth().currentUser.uid;

    const applicationRef = firebaseDatabase.ref().child(volunteerId).child('volunteerapplication');
    await applicationRef.update({
        'awardedMarks': awardedMarks,
    }).catch(error => dispatch({
        type: APPROVE_VOLUNTEER_FAIL,
        payload: error.message
    }))
    const selectorApplicationRef = firebaseDatabase.ref().child(selectorId).child('volunteerforms').child(volunteerId);
    await selectorApplicationRef.update({
        'awardedMarks': awardedMarks,
        'isSelected': true,
    }).catch(error => dispatch({
        type: APPROVE_VOLUNTEER_FAIL,
        payload: error.message
    }))
    await firebaseDatabase.ref().child('volunteeractiveapplication').child(volunteerId).remove()
        .catch(error => dispatch({
            type: APPROVE_VOLUNTEER_FAIL,
            payload: error.message
        }))
    await db.collection("userdata").doc(volunteerId).update({
        'userRole': 4,
        'dateOfApproval': dateToISOLikeButLocal(new Date())
    }).catch(error => dispatch({
        type: APPROVE_VOLUNTEER_FAIL,
        payload: error.message
    }))

    dispatch({ type: APPROVE_VOLUNTEER_SUCCESS })
}

const declineForm = (awardedMarks, volunteerId) => async (dispatch) => {
    dispatch({ type: DECLINE_VOLUNTEER_REQUEST })

    const selectorId = firebase.auth().currentUser.uid;

    const applicationRef = firebaseDatabase.ref().child(volunteerId).child('volunteerapplication');
    await applicationRef.update({
        'awardedMarks': null,
        'dateOfApplication': null
    }).catch(error => dispatch({
        type: DECLINE_VOLUNTEER_FAIL,
        payload: error.message
    }))
    const selectorApplicationRef = firebaseDatabase.ref().child(selectorId).child('volunteerforms').child(volunteerId);
    await selectorApplicationRef.update({
        'awardedMarks': awardedMarks,
        'isSelected': false,
    }).catch(error => dispatch({
        type: DECLINE_VOLUNTEER_FAIL,
        payload: error.message
    }))
    await firebaseDatabase.ref().child('volunteeractiveapplication').child(volunteerId).remove()
        .catch(error => dispatch({
            type: DECLINE_VOLUNTEER_FAIL,
            payload: error.message
        }))
    // await db.collection("userdata").doc(volunteerId).update({
    //     'userRole': 4,
    //     'dateOfApproval': dateToISOLikeButLocal(new Date())
    // }).catch(error => dispatch({
    //     type: DECLINE_VOLUNTEER_FAIL,
    //     payload: error.message
    // }))

    dispatch({ type: DECLINE_VOLUNTEER_SUCCESS })
}

export {
    fetchActiveForms,
    pickVolunteerForm,
    fetchPickedForms,
    fetchVolunteerFormById,
    approveForm,
    declineForm
}

