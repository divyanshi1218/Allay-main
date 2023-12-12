import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Button, Card, ListGroup, Form, Modal, ProgressBar, Image } from 'react-bootstrap'
import { Button as MaterialButton, IconButton } from '@material-ui/core'
import UseMediaQuery from '../components/UseMediaQuery'
import { SelectButton } from '../components/SelectButton'
import Sentiment from 'sentiment'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Header'
import dateToISOLikeButLocal from '../components/ConvertDate'
import { uploadImage } from '../actions/userActions'
import { addPublicBlog, addPrivateBlog, fetchPublicBlogById, updatePublicBlog } from '../actions/blogActions'
import { ADD_PUBLIC_BLOG_RESET, ADD_PRIVATE_BLOG_RESET, UPDATE_PUBLIC_BLOG_RESET, } from '../constants/blogConstants'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'

const AddArticleScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser
    const { blogId } = useParams()
    const [fetchBlogUsingId, setFetchBlogUsingId] = useState(blogId)
    const [changeDataAfterFetching, setChangeDataAfterFetching] = useState(true)
    const sentiment = new Sentiment();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [result, setResult] = useState({ score: null, tokens: [] })
    const [score, setScore] = useState(0)
    const [show, setShow] = useState(false)
    const [width] = UseMediaQuery()
    const [mood, setMood] = useState('NEUTRAL')
    const [moodClass, setMoodClass] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const [imageURL, setImageURL] = useState('https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/userdata%2FE2esVpFqZwSq25ufeyE3boPP7k222021-05-30T18%3A05%3A38.477107?alt=media&token=07406990-77dd-4b7a-8a88-1e1d33bd9eed')
    const [selectedDate, handleDateChange] = useState(new Date());

    const dispatch = useDispatch()

    const imageUpload = useSelector(state => state.imageUpload)
    const { loading, error, imageInfo } = imageUpload

    const publicBlogById = useSelector(state => state.publicBlogById)
    const { blogInfo } = publicBlogById

    const publicBlogAdd = useSelector(state => state.publicBlogAdd)
    const { loading: publicLoading, error: publicError, publicBlogInfo } = publicBlogAdd

    const privateBlogAdd = useSelector(state => state.privateBlogAdd)
    const { loading: privateLoading, error: privateError, privateBlogInfo } = privateBlogAdd

    const publicBlogUpdate = useSelector(state => state.publicBlogUpdate)
    const { loading: updateLoading, error: updateError, success } = publicBlogUpdate

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        // if (!userCurrent && !blogId) {
        //     history.push('/home', { from: `/add` })
        // }else if (!userCurrent) {
        //     history.push('/home', { from: `/edit/${blogId}` })
        // }
        if (success) {
            setBody("")
            setTitle("")
            handleDateChange(new Date())
            history.push('/home')
            dispatch({ type: UPDATE_PUBLIC_BLOG_RESET })
        }
        const score = result.score !== null ? parseInt((result.comparative * 100).toPrecision(4)) : null
        setScore(score)
        setMoodClass(SelectButton(mood))
        if (changeDataAfterFetching && userCurrent && (blogInfo.authorUserId === userCurrent.uid)) {
            setMood(blogInfo.publicBlogMood)
            setBody(blogInfo.publicBlogText)
            setTitle(blogInfo.publicBlogTitle)
            handleDateChange(blogInfo.publicBlogDate)
            setChangeDataAfterFetching(false)
        }
        if (fetchBlogUsingId) {
            dispatch(fetchPublicBlogById(fetchBlogUsingId))
            setFetchBlogUsingId(null)
        }
        if (publicBlogInfo) {
            dispatch({
                type: ADD_PUBLIC_BLOG_RESET
            })
            history.push('/home')
        }
        if (privateBlogInfo) {
            dispatch({
                type: ADD_PRIVATE_BLOG_RESET
            })
            history.push('/myblogs')
        }
        if (!imageInfo) {
            setImageURL('https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/userdata%2FE2esVpFqZwSq25ufeyE3boPP7k222021-05-30T18%3A05%3A38.477107?alt=media&token=07406990-77dd-4b7a-8a88-1e1d33bd9eed')
        } else {
            setImageURL(imageInfo)
        }
    }, [dispatch, history, userCurrent, blogId, result, score, mood, imageInfo, publicBlogInfo, privateBlogInfo, changeDataAfterFetching, fetchBlogUsingId, blogInfo, success])

    const analyzeText = () => {
        const res = sentiment.analyze(body);
        setResult(res);
        handleShow();
    }

    const handleImageUpload = (e) => {
        dispatch(uploadImage(e.target.files[0]))
        setImageFile(null)
    }

    return (
        <div className='my-2 mx-1 addArticleContainer text-center'>
            <Header headingTitle={"Add Blog"} history={history} />
            <main>
                <Row>
                    <Col sm={12} lg={3} className='my-1'>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item><h6>How are you feeling today?</h6></ListGroup.Item>
                                <ListGroup.Item>
                                    {!blogId && (
                                        <div>
                                            {loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
                                                <Image
                                                    src={imageURL}
                                                    className='moodImage'
                                                    roundedCircle />
                                            )}
                                            <input
                                                id="icon-button-file"
                                                type="file"
                                                onChange={handleImageUpload}
                                                style={{ display: " None" }} />
                                            <label htmlFor="icon-button-file">
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <PhotoCamera style={{ color: "#2c3e50" }} />
                                                </IconButton>
                                            </label>
                                        </div>
                                    )}
                                    {width < 1000
                                        ? (
                                            <div>
                                                <div className='moodButtons-1'>
                                                    <div className='py-1 moodButton'>
                                                        <Button
                                                            type='button'
                                                            className='btn-warning btn-sm'
                                                            onClick={() => {
                                                                setMood('HAPPY')
                                                            }}>HAPPY</Button>
                                                    </div>
                                                    <div className='py-1 moodButton'>
                                                        <Button
                                                            type='button'
                                                            className='btn-success btn-sm'
                                                            onClick={() => {
                                                                setMood('EXCITED')
                                                            }}>EXCITED</Button>
                                                    </div>
                                                    <div className='py-1 moodButton'>
                                                        <Button
                                                            type='button'
                                                            className='btn-danger btn-sm'
                                                            onClick={() => {
                                                                setMood('ANGRY')
                                                            }}>ANGRY</Button>
                                                    </div>
                                                </div>
                                                <div className='moodButtons-1'>
                                                    <div className='py-1 moodButton'>
                                                        <Button
                                                            type='button'
                                                            className='btn-primary btn-sm'
                                                            onClick={() => {
                                                                setMood('SAD')
                                                            }}>SAD</Button>
                                                    </div>
                                                    <div className='py-1 moodButton'>
                                                        <Button
                                                            type='button'
                                                            className='btn-secondary btn-sm'
                                                            onClick={() => {
                                                                setMood('DEPRESSED')
                                                            }}>DEPRESSED</Button>
                                                    </div>
                                                    <div className='py-1 moodButton'>
                                                        <Button
                                                            type='button'
                                                            className='btn-info btn-sm'
                                                            onClick={() => {
                                                                setMood('NEUTRAL')
                                                            }}>NEUTRAL</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='moodButtons'>
                                                <Button
                                                    type='button'
                                                    className='btn-warning my-1'
                                                    onClick={() => {
                                                        setMood('HAPPY')
                                                    }}>HAPPY</Button>
                                                <Button
                                                    type='button'
                                                    className='btn-success my-1'
                                                    onClick={() => {
                                                        setMood('EXCITED')
                                                    }}>EXCITED</Button>
                                                <Button
                                                    type='button'
                                                    className='btn-danger my-1'
                                                    onClick={() => {
                                                        setMood('ANGRY')
                                                    }}>ANGRY</Button>
                                                <Button
                                                    type='button'
                                                    className='btn-primary my-1'
                                                    onClick={() => {
                                                        setMood('SAD')
                                                    }}>SAD</Button>
                                                <Button
                                                    type='button'
                                                    className='btn-secondary my-1'
                                                    onClick={() => {
                                                        setMood('DEPRESSED')
                                                    }}>DEPRESSED</Button>

                                                <Button
                                                    type='button'
                                                    className='btn-info my-1'
                                                    onClick={() => {
                                                        setMood('NEUTRAL')
                                                    }}>NEUTRAL</Button>
                                            </div>
                                        )
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={12} lg={6} className='my-1'>
                        <Card className='text-left'>
                            <ListGroup>
                                <ListGroup.Item>
                                    <div className='addNotesTitle'>
                                        {width < 800
                                            ? (
                                                <h6>What's in your diary today?</h6>
                                            ) : (
                                                <h4>What's in your diary today?</h4>
                                            )}
                                        <div>
                                            <Button type='button' className={moodClass}>{mood}</Button>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form>
                                        <Form.Group controlId='date' className='px-1 text-center w-100'>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    placeholder="2018/10/10"
                                                    value={selectedDate}
                                                    onChange={date => handleDateChange(date)}
                                                    format="MM-dd-yyyy"
                                                />
                                            </MuiPickersUtilsProvider>
                                        </Form.Group>
                                        <Form.Group controlId='title' className='px-1'>
                                            <Form.Control
                                                type='text'
                                                value={title}
                                                required
                                                onChange={e => setTitle(e.target.value)}
                                                placeholder='Title'
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId='body' className='px-1'>
                                            <Form.Control
                                                as='textarea'
                                                className='textArea w-100'
                                                minLength={30}
                                                value={body}
                                                required
                                                onChange={e => setBody(e.target.value)}
                                                minrow='15'
                                                placeholder='Write here'
                                            >
                                            </Form.Control>
                                        </Form.Group>
                                    </Form>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col sm={12} lg={3} className='my-1'>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    {!show
                                        ? (
                                            <div>
                                                {!score && (<h6>Analyze your text</h6>)}
                                                {score && (
                                                    <div>
                                                        <h4>Your score: {score}</h4>
                                                        {score < 0
                                                            ? (
                                                                <div>
                                                                    <ProgressBar variant="danger" now={Math.abs(score)} />
                                                                    <hr />
                                                                    You are feeling negative today
                                                                </div>
                                                            ) : score > 0
                                                                ? (
                                                                    <div>
                                                                        <ProgressBar variant="success" now={score} />
                                                                        <hr />
                                                                        You are feeling positive today
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div>
                                                                        <ProgressBar variant="success" now={score} />
                                                                        <hr />
                                                                        You are feeling neutral today
                                                                    </div>
                                                                )
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <Modal show={show} onHide={handleClose} centered>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Analysis Result</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body className='text-center'>
                                                        <h3>Your score: {score}</h3>
                                                        <hr />
                                                        {score < 0
                                                            ? (
                                                                <div>
                                                                    <ProgressBar variant="danger" now={Math.abs(score)} />
                                                                    <hr />
                                                                    You are feeling negative today
                                                                </div>
                                                            )
                                                            : score > 0
                                                                ? (
                                                                    <div>
                                                                        <ProgressBar variant="success" now={score} />
                                                                        <hr />
                                                                        You are feeling positive today
                                                                    </div>
                                                                )
                                                                : (
                                                                    <div>
                                                                        <ProgressBar variant="success" now={score} />
                                                                        <hr />
                                                                        You are feeling neutral today
                                                                    </div>
                                                                )
                                                        }
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="primary" onClick={handleClose}>
                                                            Close
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </div>
                                        )
                                    }
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <MaterialButton
                                        type='button'
                                        variant='contained'
                                        className='textButton my-3'
                                        onClick={analyzeText}
                                        disabled={body === ''}
                                    >Analyze your Text
                                    </MaterialButton>
                                    {updateLoading && <Loader />}
                                    {updateError && (<Message variant='info' className='text-center'>{updateError}</Message>)}
                                    {privateLoading && <Loader />}
                                    {privateError && (<Message variant='info' className='text-center'>{privateError}</Message>)}
                                    {publicLoading && <Loader />}
                                    {publicError && (<Message variant='info' className='text-center'>{publicError}</Message>)}
                                    <div className='publishOptions p-0'>
                                        <MaterialButton variant='contained' type='button' size="small" className='textButton m-1' onClick={() => {
                                            if (!title || !body || !selectedDate) {
                                                alert("Please fill all details first")
                                            } else {
                                                var scoreFinal = score
                                                if (scoreFinal === null) {
                                                    const newRes = sentiment.analyze(body)
                                                    scoreFinal = parseInt((newRes.comparative * 100).toPrecision(4))
                                                    console.log(scoreFinal)
                                                }
                                                dispatch(addPrivateBlog({
                                                    userBlogTitle: title,
                                                    userBlogText: body,
                                                    userBlogDate: dateToISOLikeButLocal(selectedDate),
                                                    userBlogMood: mood,
                                                    userBlogAnalysisReport: scoreFinal,
                                                    userBlogImageUrl: imageURL,
                                                }))
                                            }
                                        }}>
                                            Publish as Personal
                                        </MaterialButton>
                                        {!blogId && (
                                            <MaterialButton variant='contained' type='button' size="small" className='textButton m-1' onClick={() => {
                                                if (!title || !body || !selectedDate) {
                                                    alert("Please fill all details first")
                                                } else {
                                                    dispatch(addPublicBlog({
                                                        publicBlogTitle: title,
                                                        publicBlogText: body,
                                                        publicBlogDate: dateToISOLikeButLocal(selectedDate),
                                                        publicBlogMood: mood
                                                    }))
                                                }
                                            }}>
                                                Publish as Public
                                            </MaterialButton>
                                        )}
                                        {blogId && (
                                            <MaterialButton variant='contained' type='button' size="small" className='textButton m-1' onClick={() => {
                                                if (!title || !body || !selectedDate) {
                                                    alert("Please fill all details first")
                                                } else {
                                                    dispatch(updatePublicBlog({
                                                        publicBlogTitle: title,
                                                        publicBlogText: body,
                                                        publicBlogMood: mood
                                                    }, blogId))
                                                }
                                            }}>
                                                Update Public Blog
                                            </MaterialButton>
                                        )}
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </main>
        </div >
    )
}

export default AddArticleScreen

