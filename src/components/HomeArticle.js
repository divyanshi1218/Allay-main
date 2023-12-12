import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
// import ShareIcon from '@material-ui/icons/Share';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { SelectColor } from '../components/SelectButton'
// import { useDispatch, useSelector } from 'react-redux'
// import { db } from '../firebase'
// import { changeLikeStatus, changeSaveStatus } from '../actions/blogActions'
// import { } from '../constants/blogConstants'
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app'
import { db, firebaseDatabase } from "../firebase"
// import {
//     BLOG_SAVE_STATUS_CHANGE_REQUEST,
//     BLOG_SAVE_STATUS_CHANGE_SUCCESS,
//     BLOG_SAVE_STATUS_CHANGE_FAIL,
//     BLOG_LIKE_STATUS_CHANGE_REQUEST,
//     BLOG_LIKE_STATUS_CHANGE_SUCCESS,
//     BLOG_LIKE_STATUS_CHANGE_FAIL,
//     BLOG_LIKE_STATUS_CHANGE_RESET,
//     BLOG_SAVE_STATUS_CHANGE_RESET
// } from '../constants/blogConstants'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const HomeArticle = ({ id, blog }) => {
    const history = useHistory()
    const userCurrent = firebase.auth().currentUser
    // const dispatch = useDispatch()
    const buttonColor = SelectColor(blog.publicBlogMood)

    const authorId = blog.authorUserId
    const [authorName, setAuthorName] = useState("")
    const [like, setLike] = useState(blog.publicBlogLikes.includes(userCurrent.uid))
    const [likeCount, setLikeCount] = useState(blog.publicBlogLikes.length)
    const [open, setOpen] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')
    const [successLike, setSuccessLike] = useState(false)
    const [successSave, setSuccessSave] = useState(false)
    const [saveStatus, setSaveStatus] = useState('')
    // const [save, setSave] = useState(fetchSaveStatus(id, uid))
    const [authorImage, setAuthorImage] = useState("https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/defaultPic.jpg?alt=media&token=f20b8ac0-86c4-4994-8d10-ec732ddade10")

    // const changeBlogLikeStatus = useSelector(state => state.changeBlogLikeStatus)
    // const { success: successLike } = changeBlogLikeStatus

    // const changeBlogSaveStatus = useSelector(state => state.changeBlogSaveStatus)
    // const { success: successSave, saveStatus } = changeBlogSaveStatus

    const handleLike = () => {
        // dispatch(changeLikeStatus(id))
        if (userCurrent) {
            // dispatch({ type: BLOG_LIKE_STATUS_CHANGE_REQUEST })
            let uid = userCurrent.uid
            var resultArr = []
            resultArr.push(uid)
            var firePostRef = db.collection('publicblogs')
            var likedBlogRef = firebaseDatabase.ref().child(uid).child('userlikedpost').child(id)
            firebaseDatabase.ref().child(uid).child('userlikedpost').child(id).once('value')
                .then(async (blog) => {
                    if (blog.val() !== null) {
                        likedBlogRef.remove()
                        firePostRef.doc(id).update({
                            publicBlogLikes: firebase.firestore.FieldValue.arrayRemove(...resultArr)
                        })
                    } else {
                        likedBlogRef.push().set({ 'blogId': id })
                        firePostRef.doc(id).update({
                            publicBlogLikes: firebase.firestore.FieldValue.arrayUnion(...resultArr)
                        })
                    }
                    setSuccessLike(true)
                    // dispatch({
                    //     type: BLOG_LIKE_STATUS_CHANGE_SUCCESS
                    // })
                })
                .catch(error => {
                    alert(error.message)
                    // dispatch({
                    //     type: BLOG_LIKE_STATUS_CHANGE_FAIL,
                    //     payload: error.message
                    // })
                })
        }
    }

    const handleSave = () => {
        // dispatch({ type: BLOG_SAVE_STATUS_CHANGE_REQUEST })
        let uid = userCurrent.uid
        var savedBlogRef = firebaseDatabase.ref().child(uid).child('savedblogs').child(id)
        savedBlogRef.once('value')
            .then(async (blog) => {
                if (blog.val() !== null) {
                    savedBlogRef.remove()
                    // dispatch({
                    //     type: BLOG_SAVE_STATUS_CHANGE_SUCCESS,
                    //     payload: 'removed'
                    // })
                    setSaveStatus('removed')
                } else {
                    savedBlogRef.push().set({ 'blogId': id })
                    // dispatch({
                    //     type: BLOG_SAVE_STATUS_CHANGE_SUCCESS,
                    //     payload: 'added'
                    // })
                    setSaveStatus('added')
                }
                setSuccessSave(true)
            })
            .catch(error => {
                alert(error.message)
                // dispatch({
                //     type: BLOG_SAVE_STATUS_CHANGE_FAIL,
                //     payload: error.message
                // })
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true;
        if (successLike) {
            setLike(!like)
            if (!like) {
                setLikeCount(likeCount + 1)
            } else {
                setLikeCount(likeCount - 1)
            }
            setSuccessLike(false)
            // dispatch({ type: BLOG_LIKE_STATUS_CHANGE_RESET })
        }
        if (successSave) {
            if (saveStatus === 'added') {
                setSaveMessage('Blog Added SuccessFully!!')
            } else {
                setSaveMessage('Blog Removed SuccessFully')
            }
            setOpen(true)
            setSaveStatus('')
            setSuccessSave(false)
            // dispatch({ type: BLOG_SAVE_STATUS_CHANGE_RESET })
        }
        db.collection('userdata').doc(authorId)
            .get()
            .then(doc => {
                if (isMounted) {
                    setAuthorName(doc.data().userName)
                    setAuthorImage(doc.data().profilePhotoLink)
                }
            })
            .catch(() => {
                alert("Some Error occured Please refesh")
            })
        return () => {
            isMounted = false;
        }
    }, [authorId, successLike, successSave, like, likeCount, saveStatus])

    return (
        <Card border="dark" className='my-2 shadow-sm'>
            <Card.Header>
                <h4>{blog.publicBlogTitle}</h4>
            </Card.Header>
            <Card.Body>
                <Card.Title onClick={() => {
                    history.push(`/profile/${authorId}`)
                }}>
                    <div className='homeUserDetails text-center'>
                        <Avatar alt={authorName} src={authorImage} className="authorImageAvatar" />
                        <div className='blogUserDetails mt-2 ml-1'>
                            {authorName}<br />
                            {(blog.publicBlogDate).substr(0, 10)}
                        </div>
                        <div className="mt-2"><Chip size="small" label={blog.publicBlogMood} style={{ backgroundColor: buttonColor, color: "white" }} /></div>
                    </div>
                </Card.Title>
                <hr />
                <div className="homeScreenBlogText">
                    <div className='homeBlogText'>{blog.publicBlogText}</div>
                    <div className='seeMore'><Button color="primary" onClick={() => history.push(`/public/${id}`)}>See More</Button></div>
                </div>
                {/* <LinkContainer to={`/public/${id}`}></LinkContainer> */}
            </Card.Body>
            <Card.Footer>
                <div className='homeBlogFooter' style={{ cursor: "pointer" }}>
                    <div>
                        {like ? <ThumbUpIcon onClick={() => handleLike()} /> : <ThumbUpOutlinedIcon onClick={() => handleLike()} />}
                        <span style={{ margin: "5%" }}>{likeCount}</span>
                    </div>
                    {/* <div><ShareIcon /></div> */}
                    <div><SaveOutlinedIcon onClick={() => handleSave()} /></div>
                </div>
            </Card.Footer>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {saveMessage}
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default HomeArticle
