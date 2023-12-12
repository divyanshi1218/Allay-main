import {
    POST_QUESTION_REQUEST,
    POST_QUESTION_SUCCESS,
    POST_QUESTION_FAIL,
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
    // FETCH_VOLUNTEER_CHAT_BY_ID_REQUEST,
    // FETCH_VOLUNTEER_CHAT_BY_ID_SUCCESS,
    // FETCH_VOLUNTEER_CHAT_BY_ID_FAIL,
    FETCH_VOLUNTEER_QUESTION_BY_ID_REQUEST,
    FETCH_VOLUNTEER_QUESTION_BY_ID_SUCCESS,
    FETCH_VOLUNTEER_QUESTION_BY_ID_FAIL,
    UPDATE_QUESTION_STATUS_REQUEST,
    UPDATE_QUESTION_STATUS_SUCCESS,
    UPDATE_QUESTION_STATUS_FAIL,
    UPDATE_RATING_REQUEST,
    UPDATE_RATING_SUCCESS,
    UPDATE_RATING_FAIL,
    REPLY_QUESTION_REQUEST,
    REPLY_QUESTION_SUCCESS,
    REPLY_QUESTION_FAIL,
} from '../constants/questionConstants'
import { firebaseDatabase } from "../firebase"
import firebase from 'firebase/app'

const postQuestion = (chat) => async (dispatch) => {
    dispatch({ type: POST_QUESTION_REQUEST })

    const userId = firebase.auth().currentUser.uid

    const chatRef = firebaseDatabase.ref().child(userId).child('userchat').push();
    await chatRef.set({
        'userAccountId': userId,
        'volunteerAccountId': null,
        'questionText': chat.questionText,
        'questionReply': null,
        'questionTags': chat.questionTags,
        'dateOfQuestion': chat.dateOfQuestion,
        'chatPreferredLanguage': chat.chatPreferredLanguage,
        'chatReplyScore': null
    });
    const activeChatRef = firebaseDatabase.ref().child('activechat').child(chatRef.key);
    await activeChatRef.set({
        'userChatId': chatRef.key,
        'userAccountId': userId,
        'isActive': true,
        'volunteerAccountId': null,
        'postTime': chat.dateOfQuestion,
    })
        .then(() => dispatch({ type: POST_QUESTION_SUCCESS }))
        .catch((error) => dispatch({
            type: POST_QUESTION_FAIL,
            payload: error.message
        }))
}

const fetchUserQuestions = () => dispatch => {
    dispatch({ type: FETCH_USER_QUESTIONS_REQUEST })

    const userId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(userId).child('userchat').once('value')
        .then(snapshot => {
            var arr = []
            snapshot.forEach(function (childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val()
                arr.push({ childKey, childData })
            })
            dispatch({
                type: FETCH_USER_QUESTIONS_SUCCESS,
                payload: arr
            })
        })
        .catch(error => dispatch({
            type: FETCH_USER_QUESTIONS_FAIL,
            payload: error.message
        }))

}

const fetchUserQuestionById = (quesId) => dispatch => {
    dispatch({ type: FETCH_USER_QUESTION_BY_ID_REQUEST })

    const userId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(userId).child('userchat').child(quesId).once('value')
        .then(snapshot => {
            dispatch({
                type: FETCH_USER_QUESTION_BY_ID_SUCCESS,
                payload: snapshot.val()
            })
        })
        .catch(error => dispatch({
            type: FETCH_USER_QUESTION_BY_ID_FAIL,
            payload: error.message
        }))

}

// const fetchVolunteerChatById = (questionId) => dispatch => {
//     dispatch({ type: FETCH_VOLUNTEER_CHAT_BY_ID_REQUEST })
//     const volunteerId = firebase.auth().currentUser.uid

//     firebaseDatabase.ref().child(volunteerId).child('volunteerchat').child(questionId).once('value')
//         .then(snapshot => {
//             dispatch({
//                 type: FETCH_VOLUNTEER_CHAT_BY_ID_SUCCESS,
//                 payload: snapshot.val()
//             })
//         })
//         .catch(error => dispatch({
//             type: FETCH_VOLUNTEER_CHAT_BY_ID_FAIL,
//             payload: error.message
//         }))
// }

const fetchVolunteerQuestionById = (questionId) => dispatch => {
    dispatch({ type: FETCH_VOLUNTEER_QUESTION_BY_ID_REQUEST })

    const volunteerId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(volunteerId).child('volunteerchat').child(questionId).once('value')
        .then(snapshot => {
            var data = snapshot.val()
            firebaseDatabase.ref().child(data.userAccountId).child('userchat').child(data.userChatId).once('value')
                .then(snapshot => {
                    dispatch({
                        type: FETCH_VOLUNTEER_QUESTION_BY_ID_SUCCESS,
                        payload: snapshot.val(),
                        userAccountId: data.userAccountId,
                        userChatId: data.userChatId
                    })
                })
        })
        .catch(error => dispatch({
            type: FETCH_VOLUNTEER_QUESTION_BY_ID_FAIL,
            payload: error.message
        }))

}

const fetchActiveQuestions = () => dispatch => {
    dispatch({ type: FETCH_ACTIVE_QUESTIONS_REQUEST })

    firebaseDatabase.ref().child('activechat').once('value')
        .then(snapshot => {
            var arr = []
            snapshot.forEach(function (childSnapshot) {
                let childKey = childSnapshot.key;
                let childData = childSnapshot.val()
                if (childData.isActive) {
                    arr.push({ childKey, childData })
                }
            })
            dispatch({
                type: FETCH_ACTIVE_QUESTIONS_SUCCESS,
                payload: arr
            })
        })
        .catch(error => dispatch({
            type: FETCH_ACTIVE_QUESTIONS_FAIL,
            payload: error.message
        }))

}

const fetchPickedQuestions = () => (dispatch) => {
    dispatch({ type: FETCH_PICKED_QUESTIONS_REQUEST })

    const volunteerId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(volunteerId).child('volunteerchat').once('value')
        .then(async (snapshot) => {
            var resultArr = snapshot.val()
            var arr = []
            for (let childSnapshot in resultArr) {
                let childKey = childSnapshot
                let childData = resultArr[childSnapshot]
                var chatRef = await firebaseDatabase.ref().child(childData.userAccountId).child('userchat').child(childData.userChatId).once('value')
                if (!chatRef.val().questionReply) {
                    arr.push({ key: childKey, value: chatRef.val() })
                }
            }
            // snapshot.forEach(async function (childSnapshot) {
            //     console.log(childSnapshot.val())
            //     let childData = childSnapshot.val()
            //     var chatRef = await firebaseDatabase.ref().child(childData.userAccountId).child('userchat').child(childData.userChatId).once('value')
            //     if (!chatRef.val().questionReply) {
            //         arr.push({ key: chatRef.key, value: chatRef.val() })
            //     }
            // })
            // .then(data => {
            //     var temp = data.val()
            //     if (!temp.questionReply) {
            //         arr.push({ key: data.key, value: data.val() })
            //     }
            // })
            var finalArr = arr.sort(function (a, b) {
                return new Date(a.value.dateOfQuestion) - new Date(b.value.dateOfQuestion)
            })
            dispatch({
                type: FETCH_PICKED_QUESTIONS_SUCCESS,
                payload: finalArr
            })
        })
        .catch(error => dispatch({
            type: FETCH_PICKED_QUESTIONS_FAIL,
            payload: error.message
        }))

}

const fetchRepliedQuestions = () => (dispatch) => {
    dispatch({ type: FETCH_REPLIED_QUESTIONS_REQUEST })

    const volunteerId = firebase.auth().currentUser.uid

    firebaseDatabase.ref().child(volunteerId).child('volunteerchat').once('value')
        .then(async (snapshot) => {
            var resultArr = snapshot.val()
            var arr = []
            for (let childSnapshot in resultArr) {
                let childKey = childSnapshot
                let childData = resultArr[childSnapshot]
                var chatRef = await firebaseDatabase.ref().child(childData.userAccountId).child('userchat').child(childData.userChatId).once('value')
                if (chatRef.val().questionReply) {
                    arr.push({ key: childKey, value: chatRef.val() })
                }
            }
            var finalArr = arr.sort(function (a, b) {
                return new Date(a.value.dateOfQuestion) - new Date(b.value.dateOfQuestion)
            })
            dispatch({
                type: FETCH_REPLIED_QUESTIONS_SUCCESS,
                payload: finalArr
            })
        })
        .catch(error => dispatch({
            type: FETCH_REPLIED_QUESTIONS_FAIL,
            payload: error.message
        }))

}

const changeActiveStatus = (chat, questionId) => async (dispatch) => {
    dispatch({ type: UPDATE_QUESTION_STATUS_REQUEST })

    const volunteerId = firebase.auth().currentUser.uid

    const activeChatRef = firebaseDatabase.ref().child('activechat').child(questionId);
    activeChatRef.once('value').then(async (snapshot) => {
        if (snapshot.val().isActive) {
            const chatRef = firebaseDatabase.ref().child(chat.userAccountId).child('userchat').child(chat.userChatId);
            await chatRef.update({
                volunteerAccountId: volunteerId,
            });
            const volunteerChatRef = firebaseDatabase.ref().child(volunteerId).child('volunteerchat').push();
            await volunteerChatRef.set({
                userAccountId: chat.userAccountId,
                volunteerAccountId: volunteerId,
                userChatId: chat.userChatId,
                chatReplyScore: null
            });
            await activeChatRef.update({
                isActive: false,
                volunteerAccountId: volunteerId,
            })
                .then(() => {
                    dispatch({
                        type: UPDATE_QUESTION_STATUS_SUCCESS,
                    })
                })
                .catch(error => dispatch({
                    type: UPDATE_QUESTION_STATUS_FAIL,
                    payload: error.message
                }))
        } else {
            dispatch({
                type: UPDATE_QUESTION_STATUS_FAIL,
                payload: 'Question is already picked'
            })
        }
    })

}

const updateRating = (chatId, rating) => async (dispatch) => {
    dispatch({ type: UPDATE_RATING_REQUEST })
    const userId = firebase.auth().currentUser.uid

    var snapshot = firebaseDatabase.ref().child(userId).child('userchat').child(chatId);
    await snapshot.update({
        'chatReplyScore': rating,
    })
        .then(() => dispatch({ type: UPDATE_RATING_SUCCESS }))
        .catch((error) => dispatch({ type: UPDATE_RATING_FAIL, payload: error.message }))
}

const replyChat = (chat) => dispatch => {
    dispatch({ type: REPLY_QUESTION_REQUEST })
    const volunteerId = firebase.auth().currentUser.uid

    var chatRef = firebaseDatabase.ref().child(chat.userAccountId).child('userchat').child(chat.userChatId);
    chatRef.once('value')
        .then(snapshot => {
            if (snapshot.val().volunteerAccountId === volunteerId) {
                chatRef.update({
                    questionReply: chat.questionReply,
                });
                firebaseDatabase.ref().child('activechat').child(chatRef.key).remove();
                dispatch({ type: REPLY_QUESTION_SUCCESS })
            } else (
                dispatch({ type: REPLY_QUESTION_FAIL, payload: 'This Question was picked by some Other Volunteer' })
            )
        })
        .catch((error) => dispatch({ type: REPLY_QUESTION_FAIL, payload: error.message }))
}

export {
    postQuestion,
    fetchUserQuestions,
    fetchActiveQuestions,
    fetchPickedQuestions,
    fetchRepliedQuestions,
    fetchUserQuestionById,
    // fetchVolunteerChatById,
    fetchVolunteerQuestionById,
    changeActiveStatus,
    updateRating,
    replyChat
}