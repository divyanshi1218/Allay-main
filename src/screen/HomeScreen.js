import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import Header from '../components/Header'
import { fetchAllPublicBlogs } from '../actions/blogActions'
import { useDispatch, useSelector } from 'react-redux'
import HomeArticle from '../components/HomeArticle'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = ({ history }) => {
    const { searchKeyword, sortMood } = useParams()

    const dispatch = useDispatch()
    const allPublicBlogs = useSelector(state => state.allPublicBlogs)
    const { loading, error, publicBlogsInfo } = allPublicBlogs

    const currentUser = useSelector(state => state.currentUser)
    const { currentUserInfo } = currentUser

    useEffect(() => {
        // if (currentUserInfo && !currentUserInfo.userName) {
        //     history.push('/')
        // }
        // if (userCurrent && location.state) {
        //     history.push(location.state.from)
        // }
        // if (currentUserInfo && currentUserInfo.userName) {
        // }
        dispatch(fetchAllPublicBlogs(searchKeyword, sortMood))
    }, [dispatch, searchKeyword, sortMood, history, currentUserInfo])

    return (
        <div className='text-center mb-2'>
            <Header headingTitle={null} history={history} page="public" />
            <main>
                {searchKeyword ? <h4>Search Results for {searchKeyword}</h4> : <h4>Explore Blogs</h4>}
                <hr />
                <ListGroup variant='flush' className='publicBlogs'>
                    {loading ? <Loader /> : error ? (<Message variant='info' className='text-center'>{error}</Message>) : (
                        publicBlogsInfo.length === 0 ? (
                            <h3>No Posts</h3>
                        ) : (
                            publicBlogsInfo.map(blogData => (
                                <div key={blogData.id}>
                                    <HomeArticle
                                        id={blogData.id}
                                        blog={blogData.value} />
                                </div>
                            ))
                        )
                    )}
                </ListGroup>
            </main>
        </div >
    )
}

export default HomeScreen
