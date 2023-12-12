import {
    USER_EMAIL_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_EMAIL_LOGIN_FAIL,
    USER_GOOGLE_LOGIN_REQUEST,
    USER_GOOGLE_LOGIN_FAIL,
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
    FETCH_USER_DETAILS_BY_ID_REQUEST,
    FETCH_USER_DETAILS_BY_ID_SUCCESS,
    FETCH_USER_DETAILS_BY_ID_FAIL,
    UPDATE_USER_DETAILS_REQUEST,
    UPDATE_USER_DETAILS_SUCCESS,
    UPDATE_USER_DETAILS_FAIL,
    VERIFICATION_LINK_REQUEST,
    VERIFICATION_LINK_SUCCESS,
    VERIFICATION_LINK_FAIL,
    PASSWORD_RESET_REQUEST,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL
} from '../constants/userConstants'
import { auth, provider, db, storage } from "../firebase";
import firebase from 'firebase/app'
import dateToISOLikeButLocal from '../components/ConvertDate'

const createUser = (user, name, dob) => {
    var photoURL = 'https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/userdata%2FE2esVpFqZwSq25ufeyE3boPP7k222021-05-30T18%3A05%3A38.477107?alt=media&token=07406990-77dd-4b7a-8a88-1e1d33bd9eed'
    if (user.photoURL) {
        photoURL = user.photoURL
    }
    db.collection('userdata').doc(user.uid).set({
        userEmail: user.email,
        userName: name,
        userRole: 5,
        userBio: "Hey there! I am using Allay",
        userDateOfBirth: dateToISOLikeButLocal(dob),
        profilePhotoLink: photoURL,
    })
}

const sendVerificationLink = () => async (dispatch) => {
    dispatch({
        type: VERIFICATION_LINK_REQUEST
    })
    var user = firebase.auth().currentUser

    user.sendEmailVerification()
        .then(() => {
            dispatch({
                type: VERIFICATION_LINK_SUCCESS,
            })

        }).catch((error) => {
            dispatch({
                type: VERIFICATION_LINK_FAIL,
                payload: error.message
            })
        });
}

const resetPassword = (email) => async (dispatch) => {
    dispatch({
        type: PASSWORD_RESET_REQUEST
    })
    auth.sendPasswordResetEmail(email)
        .then(() => {
            dispatch({
                type: PASSWORD_RESET_SUCCESS,
            })

        }).catch((error) => {
            dispatch({
                type: PASSWORD_RESET_FAIL,
                payload: error.message
            })
        });
}

const uploadImage = (file) => async (dispatch) => {
    dispatch({
        type: UPLOAD_IMAGE_REQUEST
    })

    var ref = storage.ref().child(`userblogs/${(new Date()).toISOString()}`)
    var metadata = {
        contentType: 'image/jpeg',
    }
    const uploadTask = ref.put(file, metadata)
    uploadTask.on('state_changed',
        () => {
            // var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log('Upload is ' + progress + '% done');
            // switch (snapshot.state) {
            //     case firebase.storage.TaskState.PAUSED: // or 'paused'
            //         console.log('Upload is paused');
            //         break;
            //     case firebase.storage.TaskState.RUNNING: // or 'running'
            //         console.log('Upload is running');
            //         break;
            //}
        }, (err) => {
            dispatch({
                type: UPLOAD_IMAGE_FAIL,
                payload: err.message
            })
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL()
                .then(fireBaseUrl => {
                    dispatch({
                        type: UPLOAD_IMAGE_SUCCESS,
                        payload: fireBaseUrl
                    })
                })
        })
}


const emailLogin = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_EMAIL_LOGIN_REQUEST,
    })

    auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: result
            })
        })
        .catch((error) => dispatch({
            type: USER_EMAIL_LOGIN_FAIL,
            payload: error.message
        }));
}

const savetoLocalStorage = (userDetails) => {
    localStorage.setItem('userInfo', JSON.stringify(userDetails))
}

const googleLogin = () => async (dispatch) => {
    dispatch({
        type: USER_GOOGLE_LOGIN_REQUEST
    })

    auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: result
            })
        })
        .catch((error) => dispatch({
            type: USER_GOOGLE_LOGIN_FAIL,
            payload: error.message
        }));
}

const register = (name, dob, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST
    })
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.sendEmailVerification()
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: result
            })

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: result
            })
            createUser(result.user, name, dob)
        }).catch((error) => {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.message
            })
        });
}

const fetchCurrentUser = () => (dispatch) => {
    dispatch({ type: CURRENT_USER_DETAILS_REQUEST })

    const uid = firebase.auth().currentUser.uid
    db.collection('userdata').doc(uid)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch({
                    type: CURRENT_USER_DETAILS_SUCCESS,
                    payload: doc.data()
                })
                savetoLocalStorage(doc.data())
            } else {
                dispatch({ type: CURRENT_USER_DETAILS_NOTFOUND })
            }
        })
        .catch(error => (
            dispatch({
                type: CURRENT_USER_DETAILS_FAIL,
                payload: error.message
            })
        ))
}

const fetchPresentUser = () => (dispatch) => {
    dispatch({ type: CURRENT_USER_DATA_REQUEST })

    if (firebase.auth().currentUser) {
        const uid = firebase.auth().currentUser.uid
        db.collection('userdata').doc(uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    dispatch({
                        type: CURRENT_USER_DATA_SUCCESS,
                        payload: doc.data()
                    })
                }
            })
            .catch(error => (
                dispatch({
                    type: CURRENT_USER_DATA_FAIL,
                    payload: error.message
                })
            ))
    } else {
        dispatch({
            type: CURRENT_USER_DATA_FAIL,
            payload: "User not found"
        })
    }
}

const logout = () => (dispatch) => {
    auth.signOut().then(() => window.location.reload())
    localStorage.removeItem('userInfo')
    dispatch({ type: CURRENT_USER_DETAILS_RESET })
    dispatch({ type: CURRENT_USER_DATA_RESET })
    dispatch({ type: USER_LOGOUT })
}

const fetchUserById = (id) => (dispatch) => {
    dispatch({ type: FETCH_USER_DETAILS_BY_ID_REQUEST })

    db.collection('userdata').doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                dispatch({
                    type: FETCH_USER_DETAILS_BY_ID_SUCCESS,
                    payload: doc.data()
                })
            } else {
                dispatch({
                    type: FETCH_USER_DETAILS_BY_ID_FAIL,
                    payload: {
                        code: 404,
                        message: "The user doesn't exist !"
                    }
                })
            }
        })
        .catch(error => (
            dispatch({
                type: FETCH_USER_DETAILS_BY_ID_FAIL,
                payload: {
                    code: error.code,
                    message: error.message
                }
            })
        ))

}

const userDetailsUpdate = (user) => (dispatch) => {
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST })

    const uid = firebase.auth().currentUser.uid

    db.collection('userdata').doc(uid)
        .update({
            userBio: user.bio,
            profilePhotoLink: user.photoURL,
        }).then(() => {
            dispatch({
                type: UPDATE_USER_DETAILS_SUCCESS
            })
        })
        .catch(error => (
            dispatch({
                type: UPDATE_USER_DETAILS_FAIL,
                payload: error.message
            })
        ))

}


export {
    emailLogin,
    googleLogin,
    register,
    fetchCurrentUser,
    fetchPresentUser,
    logout,
    savetoLocalStorage,
    uploadImage,
    createUser,
    userDetailsUpdate,
    fetchUserById,
    sendVerificationLink,
    resetPassword
}