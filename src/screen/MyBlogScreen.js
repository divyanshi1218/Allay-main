import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import UseMediaQuery from '../components/UseMediaQuery'
import Loader from '../components/Loader'
import Message from '../components/Message'
import PublicBlogs from '../components/PublicBlogs'
import { LinkContainer } from 'react-router-bootstrap'
import { fetchUserPublicBlogs, fetchUserPrivateBlogs, fetchUserSavedBlogs } from '../actions/blogActions'
import firebase from 'firebase/app'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        width: '100%',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridTile: {
        border: '1px solid black',
        margin: "1%",
        color: "black",
        cursor: "pointer",
        borderRadius: '8px'
    },
    title: {
        color: 'white',
    },
    titleBar: {
        margin: '0%',
        background: 'grey',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px'
        // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    newRoot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: "100%",
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    newGridList: {
        width: '100%',
        height: '100%',
        cursor: "pointer"
    },
}));


const MyBlogScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser
    const { searchKeyword, sortMood } = useParams()
    const classes = useStyles()
    const dispatch = useDispatch()
    const [width] = UseMediaQuery()

    const userPublicBlogs = useSelector(state => state.userPublicBlogs)
    const { loading: publicLoading, error: publicError, userPublicBlogsInfo } = userPublicBlogs

    const userPrivateBlogs = useSelector(state => state.userPrivateBlogs)
    const { loading: privateLoading, error: privateError, userPrivateBlogsInfo } = userPrivateBlogs

    const userSavedBlog = useSelector(state => state.userSavedBlog)
    const { loading: savedLoading, error: savedError, userSavedBlogsInfo } = userSavedBlog

    useEffect(() => {
        // if (!userCurrent) {
        //     history.push('/home', { from: `/myblogs` })
        // }
        // if (!userCurrent && searchKeyword) {
        //     history.push('/home', { from: `/search/myblogs/${searchKeyword}` })
        // }
        // if (!userCurrent && sortMood) {
        //     history.push('/home', { from: `/sort/myblogs/${sortMood}` })
        // }
        if (userCurrent) {
            dispatch(fetchUserPublicBlogs())
            dispatch(fetchUserSavedBlogs())
            dispatch(fetchUserPrivateBlogs(searchKeyword, sortMood))
        }
    }, [dispatch, searchKeyword, sortMood, userCurrent])

    return (
        <div className='mb-3 text-center'>
            <Header headingTitle={null} history={history} page="myblogs" />
            <main>
                <h3>Recent Blogs</h3>
                <hr />
                {privateLoading ? <Loader /> : privateError ? (<Message variant='info' className='text-center'>{privateError}</Message>) : (
                    <div className={classes.root}>
                        {userPrivateBlogsInfo.length === 0 ? (
                            <GridList className={classes.gridList} cols={1}>
                                <h5 className='pt-5'>No Recent Blogs</h5>
                            </GridList>
                        ) : (
                            <GridList className={classes.gridList} cols={width > 600 ? 3.5 : 2}>
                                {userPrivateBlogsInfo.slice(0, 7).map((blog) => (
                                    <LinkContainer key={blog.id} to={`/private/${blog.id}`}>
                                        <GridListTile className={classes.gridTile}>
                                            <p className="absolute-center">{blog.value.userBlogText}</p>
                                            <GridListTileBar
                                                title={blog.value.userBlogTitle}
                                                classes={{
                                                    root: classes.titleBar,
                                                    title: classes.title,
                                                }}
                                            />
                                        </GridListTile>
                                    </LinkContainer>
                                ))}
                            </GridList>
                        )}
                    </div>
                )
                }
                <hr />
                <h3>My Saved Blogs</h3>
                <hr />
                {
                    savedLoading ? <Loader /> : savedError ? (<Message variant='info' className='text-center'>{savedError}</Message>) : (
                        <div className={classes.root}>
                            {userSavedBlogsInfo.length === 0 ? (
                                <GridList className={classes.gridList} cols={1}>
                                    <h5 className='pt-5'>No Saved Blogs</h5>
                                </GridList>
                            ) : (
                                <GridList className={classes.gridList} cols={width > 600 ? 3.5 : 2}>
                                    {userSavedBlogsInfo.map((tile) => (
                                        <LinkContainer key={tile} to={`/public/${tile}`}>
                                            <GridListTile className={classes.gridTile}>
                                                <PublicBlogs id={tile} history={history} />
                                            </GridListTile>
                                        </LinkContainer>
                                    ))}
                                </GridList>
                            )}
                        </div>
                    )
                }
                <hr />
                <h3>My Public Blogs</h3>
                <hr />
                {
                    publicLoading ? <Loader /> : publicError ? (<Message variant='info' className='text-center'>{publicError}</Message>) : (
                        <div className={classes.root}>
                            {userPublicBlogsInfo.length === 0 ? (
                                <GridList className={classes.gridList} cols={1}>
                                    <h5 className='pt-5'>No Public Blogs</h5>
                                </GridList>
                            ) : (
                                <GridList className={classes.gridList} cols={width > 600 ? 3.5 : 2}>
                                    {userPublicBlogsInfo.map((tile) => (
                                        <LinkContainer key={tile} to={`/public/${tile}`}>
                                            <GridListTile className={classes.gridTile}>
                                                <PublicBlogs id={tile} history={history} />
                                            </GridListTile>
                                        </LinkContainer>
                                    ))}
                                </GridList>
                            )}
                        </div>
                    )
                }
                <hr />
                <h3>My Private Blogs</h3>
                <hr />
                {
                    privateLoading ? <Loader /> : privateError ? (<Message variant='info' className='text-center'>{privateError}</Message>) : (
                        <div className={classes.newRoot}>
                            {userPrivateBlogsInfo.length === 0 ? (
                                <GridList className={classes.gridList} cols={1}>
                                    <h5 className='pt-5'>No Private Blogs</h5>
                                </GridList>
                            ) : (
                                <GridList className={classes.newGridList} cols={width > 600 ? 3.2 : 2.1}>
                                    {userPrivateBlogsInfo.map((blog) => (
                                        <LinkContainer key={blog.id} to={`/private/${blog.id}`}>
                                            <GridListTile className={classes.gridTile}>
                                                <p className="absolute-center">{blog.value.userBlogText}</p>
                                                <GridListTileBar
                                                    title={blog.value.userBlogTitle}
                                                    classes={{
                                                        root: classes.titleBar,
                                                        title: classes.title,
                                                    }}
                                                />
                                            </GridListTile>
                                        </LinkContainer>
                                    ))}
                                </GridList>
                            )}
                        </div>
                    )
                }
            </main>
        </div >
    )
}

export default MyBlogScreen



