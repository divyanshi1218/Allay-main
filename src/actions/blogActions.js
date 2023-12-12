import {
    FETCH_PUBLIC_BLOG_REQUEST,
    FETCH_PUBLIC_BLOG_SUCCESS,
    FETCH_PUBLIC_BLOG_FAIL,
    ADD_PRIVATE_BLOG_REQUEST,
    ADD_PRIVATE_BLOG_SUCCESS,
    ADD_PRIVATE_BLOG_FAIL,
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
    ADD_PUBLIC_BLOG_REQUEST,
    ADD_PUBLIC_BLOG_SUCCESS,
    ADD_PUBLIC_BLOG_FAIL,
    FETCH_USER_PUBLIC_BLOG_REQUEST,
    FETCH_USER_PUBLIC_BLOG_SUCCESS,
    FETCH_USER_PUBLIC_BLOG_FAIL,
    FETCH_PUBLIC_BLOG_BY_ID_REQUEST,
    FETCH_PUBLIC_BLOG_BY_ID_SUCCESS,
    FETCH_PUBLIC_BLOG_BY_ID_FAIL,
    UPDATE_PUBLIC_BLOG_REQUEST,
    UPDATE_PUBLIC_BLOG_SUCCESS,
    UPDATE_PUBLIC_BLOG_FAIL,
    DELETE_PUBLIC_BLOG_REQUEST,
    DELETE_PUBLIC_BLOG_SUCCESS,
    DELETE_PUBLIC_BLOG_FAIL,
    FETCH_USER_SAVED_BLOG_REQUEST,
    FETCH_USER_SAVED_BLOG_SUCCESS,
    FETCH_USER_SAVED_BLOG_FAIL,
    BLOG_SAVE_STATUS_CHANGE_REQUEST,
    BLOG_SAVE_STATUS_CHANGE_SUCCESS,
    BLOG_SAVE_STATUS_CHANGE_FAIL,
    BLOG_LIKE_STATUS_CHANGE_REQUEST,
    BLOG_LIKE_STATUS_CHANGE_SUCCESS,
    BLOG_LIKE_STATUS_CHANGE_FAIL,
} from '../constants/blogConstants'
import { db, firebaseDatabase } from "../firebase"
import firebase from 'firebase/app'

const fetchAllPublicBlogs = (searchKeyword, sortMood) => (dispatch) => {
    dispatch({ type: FETCH_PUBLIC_BLOG_REQUEST })

    if (!searchKeyword && !sortMood) {
        db.collection("publicblogs")
            .orderBy("publicBlogDate", 'desc')
            .get()
            .then(snapshot => {
                let arr = []
                snapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }))
                dispatch({
                    type: FETCH_PUBLIC_BLOG_SUCCESS,
                    payload: arr
                })
            })
            .catch(error => dispatch({
                type: FETCH_PUBLIC_BLOG_FAIL,
                payload: error.message
            }))
    } else if (sortMood) {
        db.collection("publicblogs")
            .where("publicBlogMood", "==", sortMood)
            .get()
            .then(snapshot => {
                let arr = []
                snapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }))
                dispatch({
                    type: FETCH_PUBLIC_BLOG_SUCCESS,
                    payload: arr
                })
            })
            .catch(error => dispatch({
                type: FETCH_PUBLIC_BLOG_FAIL,
                payload: error.message
            }))
    } else if (searchKeyword) {
        db.collection("publicblogs")
            //.orderBy('publicBlogTitle').startAt(searchKeyword).endAt(searchKeyword)
            // .where('publicBlogTitle', '>=', searchKeyword)
            // .where('publicBlogTitle', '<', searchKeyword + 'z')
            .get()
            .then(snapshot => {
                let arr = []
                snapshot.docs.map(function (doc) {
                    var check = (doc.data().publicBlogTitle).toLowerCase()
                    if (check.includes(searchKeyword.toLowerCase())) {
                        arr.push({ id: doc.id, value: doc.data() })
                    }
                }
                )
                dispatch({
                    type: FETCH_PUBLIC_BLOG_SUCCESS,
                    payload: arr
                })
            })
            .catch(error => dispatch({
                type: FETCH_PUBLIC_BLOG_FAIL,
                payload: error.message
            }))
    }
}

const addPrivateBlog = (blogData) => (dispatch) => {
    dispatch({ type: ADD_PRIVATE_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    db.collection("userblogs").doc(uid).collection('myprivateblogs').add(
        {
            userBlogTitle: blogData.userBlogTitle,
            userBlogText: blogData.userBlogText,
            userBlogDate: blogData.userBlogDate,
            userBlogMood: blogData.userBlogMood,
            userBlogAnalysisReport: blogData.userBlogAnalysisReport,
            userBlogImageUrl: blogData.userBlogImageUrl,
        })
        .then(result => {
            dispatch({
                type: ADD_PRIVATE_BLOG_SUCCESS,
                payload: result
            })
        })
        .catch(error => dispatch({
            type: ADD_PRIVATE_BLOG_FAIL,
            payload: error.message
        }))
}

const fetchUserPrivateBlogs = (searchKeyword, sortMood) => (dispatch) => {
    dispatch({ type: FETCH_USER_PRIVATE_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    if (!searchKeyword && !sortMood) {
        db.collection("userblogs")
            .doc(uid)
            .collection('myprivateblogs')
            .orderBy("userBlogDate", 'desc')
            .get()
            .then(snapshot => {
                let arr = []
                snapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }))
                dispatch({
                    type: FETCH_USER_PRIVATE_BLOG_SUCCESS,
                    payload: arr
                })
            })
            .catch(error => dispatch({
                type: FETCH_USER_PRIVATE_BLOG_FAIL,
                payload: error.message
            }))
    } else if (sortMood) {
        db.collection("userblogs")
            .doc(uid)
            .collection('myprivateblogs')
            .where("userBlogMood", "==", sortMood)
            .get()
            .then(snapshot => {
                let arr = []
                snapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }))
                dispatch({
                    type: FETCH_USER_PRIVATE_BLOG_SUCCESS,
                    payload: arr
                })
            })
            .catch(error => dispatch({
                type: FETCH_USER_PRIVATE_BLOG_FAIL,
                payload: error.message
            }))
    } else if (searchKeyword) {
        db.collection("userblogs")
            .doc(uid)
            .collection('myprivateblogs')
            .orderBy("userBlogDate", 'desc')
            .get()
            .then(snapshot => {
                let arr = []
                snapshot.docs.map(doc => {
                    var check = (doc.data().userBlogTitle).toLowerCase()
                    if (check.includes(searchKeyword.toLowerCase())) {
                        return arr.push({ id: doc.id, value: doc.data() })
                    }
                    return
                })
                dispatch({
                    type: FETCH_USER_PRIVATE_BLOG_SUCCESS,
                    payload: arr
                })
            })
            .catch(error => dispatch({
                type: FETCH_USER_PRIVATE_BLOG_FAIL,
                payload: error.message
            }))
    }
}

const fetchPrivateBlogById = (id) => (dispatch) => {
    dispatch({ type: FETCH_PRIVATE_BLOG_BY_ID_REQUEST })

    const uid = firebase.auth().currentUser.uid

    db.collection("userblogs")
        .doc(uid)
        .collection('myprivateblogs')
        .doc(id)
        .get()
        .then(doc => dispatch({
            type: FETCH_PRIVATE_BLOG_BY_ID_SUCCESS,
            payload: doc.data()
        }))
        .catch(error => dispatch({
            type: FETCH_PRIVATE_BLOG_BY_ID_FAIL,
            payload: error.message
        }))
}


// const updatePrivateBlog = (blogData, id) => (dispatch, getState) => {
//     dispatch({ type: UPDATE_PRIVATE_BLOG_REQUEST })

//     const { userLogin: { userInfo } } = getState()

//     db.collection("userblogs").doc(userInfo.user.uid).collection('myprivateblogs').doc(id).update(
//         {
//             "userBlogTitle": blogData.userBlogTitle,
//             "userBlogText": blogData.userBlogText,
//             "userBlogMood": blogData.userBlogMood,
//             "userBlogAnalysisReport": blogData.userBlogAnalysisReport,
//             "userBlogImageUrl": blogData.userBlogImageUrl,
//         })
//         .then(() => {
//             dispatch({
//                 type: UPDATE_PRIVATE_BLOG_SUCCESS
//             })
//         })
//         .catch(error => dispatch({
//             type: UPDATE_PRIVATE_BLOG_FAIL,
//             payload: error.message
//         }))
// }

const deletePrivateBlog = (id) => (dispatch) => {
    dispatch({ type: DELETE_PRIVATE_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    db.collection("userblogs")
        .doc(uid)
        .collection('myprivateblogs')
        .doc(id)
        .delete()
        .then(() => {
            dispatch({
                type: DELETE_PRIVATE_BLOG_SUCCESS
            })
        })
        .catch(error => dispatch({
            type: DELETE_PRIVATE_BLOG_FAIL,
            payload: error.message
        }))
}

const addPublicBlog = (blogData) => async (dispatch) => {
    dispatch({ type: ADD_PUBLIC_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    db.collection("publicblogs").add(
        {
            publicBlogTitle: blogData.publicBlogTitle,
            publicBlogText: blogData.publicBlogText,
            publicBlogDate: blogData.publicBlogDate,
            publicBlogMood: blogData.publicBlogMood,
            publicBlogLikes: [],
            authorUserId: uid,
        })
        .then(async (result) => {
            var blogId = result.id
            var publicBlogRef = await firebaseDatabase.ref().child(uid).child('userpublicblogs').child(blogId).push()
            await publicBlogRef.set({
                'blogId': blogId
            })
            dispatch({
                type: ADD_PUBLIC_BLOG_SUCCESS,
                payload: result
            })
        })
        .catch(error => dispatch({
            type: ADD_PUBLIC_BLOG_FAIL,
            payload: error.message
        }))
}

const fetchUserPublicBlogs = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_PUBLIC_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    await firebaseDatabase.ref().child(uid).child('userpublicblogs').once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const key = Object.keys(snapshot.val())
                dispatch({
                    type: FETCH_USER_PUBLIC_BLOG_SUCCESS,
                    payload: key
                })
            } else {
                dispatch({
                    type: FETCH_USER_PUBLIC_BLOG_SUCCESS,
                    payload: []
                })
            }
        })
        .catch(error => dispatch({
            type: FETCH_USER_PUBLIC_BLOG_FAIL,
            payload: {
                code: error.code,
                message: error.message
            }
        }))

    // db.collection("publicblogs")
    //     .where("authorUserId", "==", userInfo.user.uid)
    //     .get()
    //     .then(snapshot => {
    //         let arr = []
    //         snapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }))
    //         dispatch({
    //             type: FETCH_USER_PUBLIC_BLOG_SUCCESS,
    //             payload: arr
    //         })
    //     })
    //     .catch(error => dispatch({
    //         type: FETCH_USER_PUBLIC_BLOG_FAIL,
    //         payload: error.message
    //     }))
}

const fetchAuthorPublicBlogs = (authorId) => async (dispatch) => {
    dispatch({ type: FETCH_USER_PUBLIC_BLOG_REQUEST })

    await firebaseDatabase.ref().child(authorId).child('userpublicblogs').once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const key = Object.keys(snapshot.val())
                dispatch({
                    type: FETCH_USER_PUBLIC_BLOG_SUCCESS,
                    payload: key
                })
            } else {
                dispatch({
                    type: FETCH_USER_PUBLIC_BLOG_SUCCESS,
                    payload: []
                })
            }
        })
        .catch(error => dispatch({
            type: FETCH_USER_PUBLIC_BLOG_FAIL,
            payload: {
                code: error.code,
                message: error.message
            }
        }))
}

const fetchPublicBlogById = (id) => (dispatch) => {
    dispatch({ type: FETCH_PUBLIC_BLOG_BY_ID_REQUEST })

    db.collection("publicblogs")
        .doc(id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                dispatch({
                    type: FETCH_PUBLIC_BLOG_BY_ID_SUCCESS,
                    payload: doc.data()
                })
            } else {
                dispatch({
                    type: FETCH_PUBLIC_BLOG_BY_ID_FAIL,
                    payload: {
                        code: 404,
                        message: "This blog has been removed"
                    }
                })
            }
        })
        .catch(error => dispatch({
            type: FETCH_PUBLIC_BLOG_BY_ID_FAIL,
            payload: {
                code: error.code,
                message: error.message
            }
        }))
}

const updatePublicBlog = (blogData, id) => (dispatch) => {
    dispatch({ type: UPDATE_PUBLIC_BLOG_REQUEST })

    db.collection("publicblogs").doc(id).update(
        {
            "publicBlogTitle": blogData.publicBlogTitle,
            "publicBlogText": blogData.publicBlogText,
            "publicBlogMood": blogData.publicBlogMood,
        })
        .then(() => {
            dispatch({
                type: UPDATE_PUBLIC_BLOG_SUCCESS
            })
        })
        .catch(error => dispatch({
            type: UPDATE_PUBLIC_BLOG_FAIL,
            payload: error.message
        }))
}

const deletePublicBlog = (id) => (dispatch) => {
    dispatch({ type: DELETE_PUBLIC_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    db.collection("publicblogs").doc(id).delete()
        .then(() => {
            firebaseDatabase.ref().child(uid).child('userpublicblogs').remove()
            dispatch({
                type: DELETE_PUBLIC_BLOG_SUCCESS
            })
        })
        .catch(error => dispatch({
            type: DELETE_PUBLIC_BLOG_FAIL,
            payload: error.message
        }))
}

const fetchUserSavedBlogs = () => async (dispatch) => {
    dispatch({ type: FETCH_USER_SAVED_BLOG_REQUEST })

    const uid = firebase.auth().currentUser.uid

    await firebaseDatabase.ref().child(uid).child('savedblogs').once('value')
        .then(snapshot => {
            if (snapshot.exists()) {
                const key = Object.keys(snapshot.val())
                dispatch({
                    type: FETCH_USER_SAVED_BLOG_SUCCESS,
                    payload: key
                })
            } else {
                dispatch({
                    type: FETCH_USER_SAVED_BLOG_SUCCESS,
                    payload: []
                })
            }
        })
        .catch(error => dispatch({
            type: FETCH_USER_SAVED_BLOG_FAIL,
            payload: error.message
        }))
}

const changeSaveStatus = (blogId) => async (dispatch) => {
    dispatch({ type: BLOG_SAVE_STATUS_CHANGE_REQUEST })

    const uid = firebase.auth().currentUser.uid

    var savedBlogRef = firebaseDatabase.ref().child(uid).child('savedblogs').child(blogId)
    savedBlogRef.once('value')
        .then(async (blog) => {
            if (blog.val() !== null) {
                savedBlogRef.remove()
                dispatch({
                    type: BLOG_SAVE_STATUS_CHANGE_SUCCESS,
                    payload: 'removed'
                })
            } else {
                savedBlogRef.push().set({ 'blogId': blogId })
                dispatch({
                    type: BLOG_SAVE_STATUS_CHANGE_SUCCESS,
                    payload: 'added'
                })
            }
        })
        .catch(error => dispatch({
            type: BLOG_SAVE_STATUS_CHANGE_FAIL,
            payload: error.message
        }))
}

const changeLikeStatus = (blogId) => async (dispatch) => {
    dispatch({ type: BLOG_LIKE_STATUS_CHANGE_REQUEST })

    const uid = firebase.auth().currentUser.uid

    var resultArr = []
    resultArr.push(uid)

    var firePostRef = db.collection('publicblogs')
    var likedBlogRef = firebaseDatabase.ref().child(uid).child('userlikedpost').child(blogId)
    firebaseDatabase.ref().child(uid).child('userlikedpost').child(blogId).once('value')
        .then(async (blog) => {
            if (blog.val() !== null) {
                likedBlogRef.remove()
                firePostRef.doc(blogId).update({
                    publicBlogLikes: firebase.firestore.FieldValue.arrayRemove(...resultArr)
                })
            } else {
                likedBlogRef.push().set({ 'blogId': blogId })
                firePostRef.doc(blogId).update({
                    publicBlogLikes: firebase.firestore.FieldValue.arrayUnion(...resultArr)
                })
            }
            dispatch({
                type: BLOG_LIKE_STATUS_CHANGE_SUCCESS
            })
        })
        .catch(error => dispatch({
            type: BLOG_LIKE_STATUS_CHANGE_FAIL,
            payload: error.message
        }))
}

const fetchLikeStatus = (id, uid) => {
    firebaseDatabase.ref().child(uid).child('userlikedpost').child(id).once('value')
        .then(blog => {
            if (blog.val() !== null) {
                return true
            }
        })
    return false
}

const fetchSaveStatus = (id, uid) => {
    firebaseDatabase.ref().child(uid).child('savedblogs').child(id).once('value')
        .then(blog => {
            if (blog.val() !== null) {
                return true
            }
        })
    return false
}

export {
    fetchAllPublicBlogs,
    addPrivateBlog,
    fetchUserPrivateBlogs,
    fetchPrivateBlogById,
    // updatePrivateBlog,
    deletePrivateBlog,
    addPublicBlog,
    fetchUserPublicBlogs,
    fetchPublicBlogById,
    updatePublicBlog,
    deletePublicBlog,
    fetchUserSavedBlogs,
    changeSaveStatus,
    changeLikeStatus,
    fetchLikeStatus,
    fetchSaveStatus,
    fetchAuthorPublicBlogs
}