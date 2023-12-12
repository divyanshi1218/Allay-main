import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Image, ProgressBar } from 'react-bootstrap'
import { Button } from '@material-ui/core'
import Chip from '@material-ui/core/Chip';
import { SelectColor } from '../components/SelectButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPrivateBlogById, deletePrivateBlog } from '../actions/blogActions'
import { DELETE_PRIVATE_BLOG_RESET } from '../constants/blogConstants'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import firebase from 'firebase/app'

const PrivatePostByIdScreen = ({ history }) => {
    const { blogId } = useParams()
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState('https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/defaultPic.jpg?alt=media&token=f20b8ac0-86c4-4994-8d10-ec732ddade10')
    const [fetchData, setFetchData] = useState(true)
    const [blogDate, setBlogDate] = useState((new Date()).toISOString())

    const currentUser = useSelector(state => state.currentUser)
    const { currentUserInfo } = currentUser

    const privateBlogById = useSelector(state => state.privateBlogById)
    const { loading: loadingBlog, error: errorBlog, blogInfo } = privateBlogById

    const privateBlogDelete = useSelector(state => state.privateBlogDelete)
    const { loading: loadingDelete, error: errorDelete, success } = privateBlogDelete

    var userCurrent = firebase.auth().currentUser

    useEffect(() => {
        // if (!userCurrent) {
        //     history.push('/home', { from: `/private/${blogId}` })
        // }
        if (success) {
            history.push('/myblogs')
            dispatch({ type: DELETE_PRIVATE_BLOG_RESET })
        }
        let isMounted = true;
        if (fetchData && userCurrent) {
            dispatch(fetchPrivateBlogById(blogId))
            setFetchData(false)
        }
        if (blogInfo.userBlogDate) {
            if (isMounted) {
                setBlogDate(blogInfo.userBlogDate)
            }
        }
        if (blogInfo.userBlogImageUrl) {
            if (isMounted) {
                setImageUrl(blogInfo.userBlogImageUrl)
            }
        }
        return () => {
            isMounted = false;
        }
    }, [blogId, dispatch, blogInfo, fetchData, success, history, userCurrent])

    return (
        <div className='text-center mb-2 blogByIdDetails'>
            <Header history={history} headingTitle={"View Details"} />
            <main>
                {(loadingBlog) ? <Loader /> : (errorBlog) ? (<Message variant='info' className='text-center'>{errorBlog}</Message>) : (
                    <Card border="dark" className='m-2 text-center publicBlogs'>
                        <Card.Header>
                            <h4>{blogInfo.userBlogTitle}</h4>
                        </Card.Header>
                        <Card.Body className="mt-0">
                            <Card.Title>
                                <div className='privateUserDetails text-center mt-0'>
                                    <Image alt={currentUserInfo.userName} src={imageUrl} className="userBlogImage" roundedCircle />
                                    <div className='mt-4'>
                                        <div className="mt-2"><Chip size="medium" label={blogInfo.userBlogMood} style={{ backgroundColor: SelectColor(blogInfo.userBlogMood), color: "white" }} /></div>
                                        <span className='mt-3'>{blogDate.substr(0, 10)}</span>
                                    </div>
                                </div>
                            </Card.Title>
                            <hr />
                            <Card.Text className="homeScreenBlogText">
                                {blogInfo.userBlogText}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <h3>Your Score: {blogInfo.userBlogAnalysisReport}</h3>
                            {blogInfo.userBlogAnalysisReport < 0
                                ? (
                                    <div>
                                        <ProgressBar variant="danger" now={Math.abs(blogInfo.userBlogAnalysisReport)} />
                                    </div>
                                ) : (
                                    <div>
                                        <ProgressBar variant="success" now={blogInfo.userBlogAnalysisReport} />
                                    </div>
                                )
                            }
                            <hr />
                            <div className='m-2 mt-4'>
                                {loadingDelete && (<Loader />)}
                                {errorDelete && (<Message variant='info' className='text-center'>{errorDelete}</Message>)}
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: "#149A80", color: "white" }}
                                    onClick={() => {
                                        if (window.confirm()) {
                                            dispatch(deletePrivateBlog(blogId))
                                        }
                                    }}>
                                    Delete
                                </Button>
                            </div>
                        </Card.Footer >
                    </Card >
                )}
            </main>
        </div>
    )
}

export default PrivatePostByIdScreen