import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import { DELETE_PUBLIC_BLOG_RESET } from '../constants/blogConstants'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
// import ShareIcon from '@material-ui/icons/Share';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { SelectColor } from '../components/SelectButton'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../firebase'
import { fetchPublicBlogById, changeLikeStatus, changeSaveStatus, deletePublicBlog } from '../actions/blogActions'
import { BLOG_SAVE_STATUS_CHANGE_RESET } from '../constants/blogConstants'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import firebase from 'firebase/app'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PublicPostByIdScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser
    const { blogId } = useParams()
    const dispatch = useDispatch()
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [loadingAuthor, setLoadingAuthor] = useState(true)
    const [authorData, setAuthorData] = useState({})
    const [fetchData, setFetchData] = useState(true)
    const [saveMessage, setSaveMessage] = useState('')
    const [blogDate, setBlogDate] = useState((new Date()).toISOString())
    const [open, setOpen] = useState(false);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const changeBlogSaveStatus = useSelector(state => state.changeBlogSaveStatus)
    const { success: successSave, saveStatus } = changeBlogSaveStatus

    const publicBlogById = useSelector(state => state.publicBlogById)
    const { loading, error, blogInfo } = publicBlogById

    const publicBlogDelete = useSelector(state => state.publicBlogDelete)
    const { loading: loadingDelete, error: errorDelete, success } = publicBlogDelete

    const handleLike = () => {
        dispatch(changeLikeStatus(blogId))
        setLike(!like)
        if (!like) {
            setLikeCount(likeCount + 1)
        } else {
            setLikeCount(likeCount - 1)
        }
    }

    const handleSave = () => {
        dispatch(changeSaveStatus(blogId))
    }

    useEffect(() => {
        let isMounted = true;
        // if (!userCurrent) {
        //     history.push('/home', { from: `/public/${blogId}` })
        // }
        if (success) {
            history.push('/myblogs')
            dispatch({ type: DELETE_PUBLIC_BLOG_RESET })
        }
        if (successSave && isMounted) {
            if (saveStatus === 'added') {
                setSaveMessage('Blog Added SuccessFully!!')
            } else {
                setSaveMessage('Blog Removed SuccessFully')
            }
            setOpen(true)
            dispatch({ type: BLOG_SAVE_STATUS_CHANGE_RESET })
        }
        if (fetchData) {
            dispatch(fetchPublicBlogById(blogId))
            setFetchData(false)
        }
        if (!loading && !blogInfo) {
            history.push('/myblogs')
        } else if (!loading && blogInfo.authorUserId) {
            if (isMounted && userCurrent) {
                setBlogDate(blogInfo.publicBlogDate)
                setLike(blogInfo.publicBlogLikes.includes(userCurrent.uid))
                setLikeCount(blogInfo.publicBlogLikes.length)
            }
            db.collection('userdata').doc(blogInfo.authorUserId)
                .get()
                .then(doc => {
                    if (isMounted) {
                        setAuthorData(doc.data())
                        setLoadingAuthor(false)
                    }
                })
                .catch(() => {
                    alert("Some Error occured Please refesh")
                })
        }
        return () => {
            isMounted = false;
        }
    }, [blogId, dispatch, blogInfo, fetchData, success, loading, history, userCurrent, successSave, saveStatus])

    return (
        <div className='text-center mb-2 blogByIdDetails'>
            <Header history={history} headingTitle={"View Details"} />
            <main>
                {(loading || loadingAuthor) ? <Loader /> : error ? (<Message variant='info' className='text-center'>{error}</Message>) : (
                    <Card border="dark" className='m-2 text-center publicBlogs'>
                        <Card.Header>
                            <h4>{blogInfo.publicBlogTitle}</h4>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title onClick={() => {
                                history.push(`/profile/${blogInfo.authorUserId}`)
                            }}>
                                <div className='homeUserDetails text-center'>
                                    <Avatar
                                        alt={authorData.userName}
                                        src={authorData.profilePhotoLink}
                                        className="authorImageAvatar" />
                                    <div className='blogUserDetails mt-2 ml-1'>
                                        {authorData.userName}<br />
                                        {blogDate.substr(0, 10)}
                                    </div>
                                    <div className="mt-2"><Chip size="small" label={blogInfo.publicBlogMood} style={{ backgroundColor: SelectColor(blogInfo.publicBlogMood), color: "white" }} /></div>
                                </div>
                            </Card.Title>
                            <hr />
                            <Card.Text>
                                {blogInfo.publicBlogText}
                            </Card.Text>
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
                            <hr />
                            {userCurrent && userCurrent.uid === blogInfo.authorUserId && (
                                <div className='m-2 mt-4 publicBlogFooter'>
                                    <div>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#149A80", color: "white" }}
                                            onClick={() => {
                                                history.push(`/edit/blog/${blogId}`)
                                            }}>
                                            Edit
                                        </Button>
                                    </div>
                                    <div>
                                        {loadingDelete && (<Loader />)}
                                        {errorDelete && (<Message variant='info' className='text-center'>{errorDelete}</Message>)}
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: "#149A80", color: "white" }}
                                            onClick={() => {
                                                if (window.confirm()) {
                                                    dispatch(deletePublicBlog(blogId))
                                                }
                                            }}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card.Footer >
                    </Card >
                )}
                {/* <Button variant="outlined" onClick={handleClick}>
                    Open success snackbar
                </Button> */}
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {saveMessage}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    )
}

export default PublicPostByIdScreen