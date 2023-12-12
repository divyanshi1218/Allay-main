import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ListGroup, Row, Col, Image } from 'react-bootstrap'
import { Button, IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import HowToRegIcon from '@material-ui/icons/HowToReg';
import UseMediaQuery from '../components/UseMediaQuery'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { FETCH_USER_DETAILS_BY_ID_RESET, UPDATE_USER_DETAILS_RESET } from '../constants/userConstants'
import { fetchUserById, uploadImage, userDetailsUpdate } from '../actions/userActions'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublicBlogs from '../components/PublicBlogs'
import { LinkContainer } from 'react-router-bootstrap'
import { fetchAuthorPublicBlogs } from '../actions/blogActions'
import firebase from 'firebase/app'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: "100%",
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
        cursor: "pointer"
    },
    gridTile: {
        border: '1px solid black',
        margin: "1%",
        color: "black",
        cursor: "pointer",
        borderRadius: '8px'
    }
}));

const ProfileScreen = ({ history }) => {
    const classes = useStyles()
    const userCurrent = firebase.auth().currentUser
    const { userId, editUserId } = useParams()
    const [userBio, setUserBio] = useState("")
    const [imageURL, setImageURL] = useState('https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/userdata%2FE2esVpFqZwSq25ufeyE3boPP7k222021-05-30T18%3A05%3A38.477107?alt=media&token=07406990-77dd-4b7a-8a88-1e1d33bd9eed')
    const [imageFile, setImageFile] = useState(null)
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false);
    const [width] = UseMediaQuery()

    const handleClose = () => {
        setOpen(false);
    }

    const dispatch = useDispatch()
    const imageUpload = useSelector(state => state.imageUpload)
    const { loading, error, imageInfo } = imageUpload

    // const currentUser = useSelector(state => state.currentUser)
    // const { currentUserInfo } = currentUser

    const userPublicBlogs = useSelector(state => state.userPublicBlogs)
    const { loading: publicLoading, error: publicError, userPublicBlogsInfo } = userPublicBlogs

    const updateUserDetails = useSelector(state => state.updateUserDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = updateUserDetails

    const fetchUserDetails = useSelector(state => state.fetchUserDetails)
    const { loading: loadingUser, error: errorUser, userDetails } = fetchUserDetails

    const handleImageUpload = (e) => {
        dispatch(uploadImage(e.target.files[0]))
        setImageFile(null)
    }

    const handleBioChange = () => {
        // const bioName = prompt("Please enter New Bio");
        // setUserBio(bioName);
        setOpen(true);
    }

    useEffect(() => {
        // if (!userCurrent && editUserId) {
        //     history.push('/home', { from: `/edit/profile/${editUserId}` })
        // }
        // if (!userCurrent && userId) {
        //     history.push('/home', { from: `/profile/${userId}` })
        // }
        // if (!userCurrent) {
        //     history.push('/home', { from: `/profile` })
        // }
        if (userCurrent && editUserId && (editUserId !== userCurrent.uid)) {
            history.push(`/myBlogs`)
        }
        // if (!userId && !editUserId && currentUserInfo) {
        //     setUserData(currentUserInfo)
        //     setUserBio(currentUserInfo.userBio)
        //     if (currentUserInfo && currentUserInfo.profilePhotoLink) {
        //         setImageURL(currentUserInfo.profilePhotoLink)
        //     }
        // }
        if (successUpdate && userCurrent) {
            dispatch({ type: UPDATE_USER_DETAILS_RESET })
            history.push(`/profile/${userCurrent.uid}`)
        }
        if (userDetails) {
            setUserData(userDetails)
            setUserBio(userDetails.userBio)
            if (userDetails && userDetails.profilePhotoLink) {
                setImageURL(userDetails.profilePhotoLink)
            }
            dispatch({ type: FETCH_USER_DETAILS_BY_ID_RESET })
        }
    }, [userId, userCurrent, editUserId, userDetails, successUpdate, dispatch, history])

    useEffect(() => {
        if (imageInfo) {
            setImageURL(imageInfo)
        }
    }, [imageInfo])

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId))
            dispatch(fetchAuthorPublicBlogs(userId))
        } else if (editUserId) {
            dispatch(fetchUserById(editUserId))
        }
    }, [userId, editUserId, dispatch])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Profile"} history={history} />
            <main>
                <div className="mx-2">
                    {loadingUser ? <Loader /> : errorUser ? (<Message>{errorUser}</Message>) : (
                        <div>
                            {width < 500
                                ? (
                                    <div className='p-1'>
                                        <Row>
                                            <Col xs={4} >
                                                {loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
                                                    <Image
                                                        src={imageURL}
                                                        className='userImage'
                                                        roundedCircle />
                                                )}
                                            </Col>
                                            <Col xs={8}>
                                                <Row className='mt-2 ml-2'>
                                                    <div>
                                                        <h3>
                                                            {userData.userName}
                                                            <span className='ml-2'>{userData.userRole === 4 && (<HowToRegIcon fontSize='large' />)}</span>
                                                        </h3>
                                                    </div>
                                                    {/* <Button variant='light' className="ml-1 px-1">
                                        <i className="fas fa-edit"></i>
                                    </Button> */}
                                                </Row>
                                                <Row className='ml-3'>
                                                    <h5>{userData.userBio}</h5>
                                                    {/* <Col style={{ fontSize: '17px' }}><b>5 </b>Public</Col>
                                    <Col style={{ fontSize: '17px' }}><b>5 </b>Private</Col> */}
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                ) : (
                                    <div className='ml-5 p-1'>
                                        <Row className='ml-5'>
                                            <div>
                                                {loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
                                                    <Image
                                                        src={imageURL}
                                                        className='userImage'
                                                        roundedCircle />
                                                )}
                                            </div>
                                            <div className='pl-3'>
                                                <Row className='mt-4 ml-3'>
                                                    <div>
                                                        <h3>
                                                            {userData.userName}
                                                            <span className='ml-2'>{userData.userRole === 4 && (<HowToRegIcon fontSize='large' />)}</span>
                                                        </h3>
                                                    </div>
                                                    {/* <Button variant='light' className='mt-2 ml-4'>
                                        <i className="fas fa-edit"></i>
                                    </Button> */}
                                                </Row>
                                                <Row className='mt-3 ml-4'>
                                                    <h5>{userData.userBio}</h5>
                                                </Row>
                                            </div>
                                        </Row>
                                    </div>
                                )}
                            <hr />
                            {(userCurrent &&
                                ((editUserId && (editUserId === userCurrent.uid)) || (userId && (userId === userCurrent.uid)))) ? (
                                <div>
                                    <ListGroup varinat='flush' className={width > 500 ? 'mb-2 text-center' : 'mb-2'}>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={4} md={4}>User Role</Col>
                                                <Col xs={8} md={8}>{userData.userRole < 5 ? "Volunteer" : "User"}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={4} md={4}>Email</Col>
                                                <Col xs={8} md={8}>{userData.userEmail}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={4} md={4}>Birth Date</Col>
                                                {userData.userDateOfBirth && (
                                                    <Col xs={8} md={8}>{(userData.userDateOfBirth).substr(0, 10)}</Col>
                                                )}
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col xs={4} md={4}>Bio {editUserId && (<Button variant='text' onClick={handleBioChange}>
                                                    <i className="fas fa-edit"></i>
                                                </Button>)}
                                                </Col >
                                                <Col xs={8} md={8}>{userBio}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {editUserId && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col xs={4} md={4} className='mt-3'>Edit Photo</Col>
                                                    <Col xs={8} md={8}><div>
                                                        <input accept="image/*" id="icon-button-file" onChange={handleImageUpload} type="file" style={{ display: " None" }} />
                                                        <label htmlFor="icon-button-file">
                                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                                <PhotoCamera />
                                                            </IconButton>
                                                        </label>
                                                    </div></Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                    </ListGroup>
                                    <div className='text-center mt-5'>
                                        {userCurrent && userId && userId === userCurrent.uid && (
                                            <div>
                                                {userData.userRole === 5 && (
                                                    <Button variant="contained"
                                                        color="primary"
                                                        className='mx-2 my-1'
                                                        onClick={() => {
                                                            history.push('/rules')
                                                        }}>Apply for Volunteer</Button>
                                                )}
                                                <Button variant="contained"
                                                    color="primary"
                                                    className='mx-2 my-1'
                                                    onClick={() => {
                                                        history.push(`/edit/profile/${userCurrent.uid}`)
                                                    }}>Edit Profile</Button>
                                            </div>
                                        )}
                                        {loadingUpdate && <Loader />}
                                        {errorUpdate && (<Message>{errorUpdate}</Message>)}
                                        {userCurrent && (editUserId === userCurrent.uid) && editUserId && (
                                            <Button variant="contained" color="primary" onClick={() => {
                                                dispatch(userDetailsUpdate({
                                                    bio: userBio,
                                                    photoURL: imageURL
                                                }))
                                            }}>
                                                Update Profile
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center'>
                                    {
                                        publicLoading ? <Loader /> : publicError ? (<Message variant='info' className='text-center'>{publicError}</Message>) : (
                                            <div className={classes.root}>
                                                {userPublicBlogsInfo.length === 0 ? (
                                                    <GridList className={classes.gridList} cols={1}>
                                                        <h5 className='pt-5'>No Public Blogs</h5>
                                                    </GridList>
                                                ) : (
                                                    <GridList className={classes.gridList} cols={width > 600 ? 3.5 : 2.1}>
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
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Bio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can change your bio by editing below
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={userBio}
                        onChange={e => setUserBio(e.target.value)}
                        label="Edit Bio"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ProfileScreen
