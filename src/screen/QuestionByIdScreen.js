import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserQuestionById, updateRating } from '../actions/questionActions'
import { UPDATE_RATING_RESET } from '../constants/questionConstants'
// import { Form } from 'react-bootstrap'
import CategoryIcon from '@material-ui/icons/Category';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import firebase from 'firebase/app'

const QuestionByIdScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser
    const { quesId } = useParams()
    const [rating, setRating] = useState(0)

    const dispatch = useDispatch()
    const userQuestionById = useSelector(state => state.userQuestionById)
    const { loading, error, questionInfo } = userQuestionById

    const ratingUpdate = useSelector(state => state.ratingUpdate)
    const { loading: loadRating, error: errorRating, success: successRating } = ratingUpdate

    useEffect(() => {
        // if (!userCurrent) {
        //     history.push('/home', { from: `/myquestions/${quesId}` })
        // }
        if (userCurrent) {
            dispatch(fetchUserQuestionById(quesId))
        }
        if (successRating) {
            dispatch({ type: UPDATE_RATING_RESET })
        }
    }, [userCurrent, quesId, successRating, dispatch])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"View Reply"} history={history} />
            <main className='text-center'>
                {loading ? <Loader /> : error ? (<Message variant='info'>{error}</Message>) : (
                    questionInfo && (
                        <div>
                            <div className='questionByIdDetails text-center'>
                                <div>
                                    <h4 className='mt-2'>
                                        {questionInfo.chatPreferredLanguage}
                                        <span className='ml-5'>{(questionInfo.dateOfQuestion).substr(0, 10)}</span>
                                    </h4>
                                    <div className='border border-dark m-3'>
                                        <h3><CategoryIcon fontSize='large' style={{ color: '#009688', marginRight: '20px' }} />Tags</h3>
                                        <div className='mb-3 mx-2 text-left'>
                                            {questionInfo.questionTags ? questionInfo.questionTags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    size="medium"
                                                    label={tag}
                                                    style={{ backgroundColor: '#009688', color: "white" }}
                                                    className='mt-3 mr-1' />
                                            )) : (
                                                <h5 className='text-center'>None</h5>
                                            )}
                                        </div>
                                    </div>
                                    <Card className='m-3 border border-dark' style={{ minHeight: '150px' }}>
                                        <h3>Question</h3>
                                        <p className='questionText'>{questionInfo.questionText}</p>
                                    </Card>
                                    {loadRating && <Loader />}
                                    {errorRating && (<Message variant='info'>{errorRating}</Message>)}
                                    {questionInfo.questionReply && !questionInfo.chatReplyScore && (
                                        <div>
                                            <div className='rating text-center mb-2'>
                                                <span onClick={() => setRating(1)}>
                                                    {rating >= 1 ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                                <span onClick={() => setRating(2)}>
                                                    {rating >= 2 ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                                <span onClick={() => setRating(3)}>
                                                    {rating >= 3 ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                                <span onClick={() => setRating(4)}>
                                                    {rating >= 4 ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                                <span onClick={() => setRating(5)}>
                                                    {rating >= 5 ? <StarIcon /> : <StarBorderIcon />}
                                                </span>
                                            </div>
                                            <Button variant='contained' color='primary' onClick={() => dispatch(updateRating(quesId, rating))}>Confirm Rating</Button>
                                        </div>
                                    )}
                                </div>
                                <div className='mx-2'>
                                    <h3>Volunteer's Analysis</h3>
                                    <div className='volunteerTextReply p-2 border border-dark'>
                                        {questionInfo.questionReply ? questionInfo.questionReply : <h4>Analysis in progress...</h4>}
                                    </div>
                                    {/* <Form className='questionText'>
                                <Form.Group controlId='body' className='px-1'>
                                    <Form.Control
                                        as='textarea'
                                        className='questionArea'
                                        required
                                        minrow='10'
                                        placeholder='Write your question here'
                                    >
                                    </Form.Control>
                                </Form.Group>
                            </Form> */}
                                    {questionInfo.chatReplyScore ? (
                                        <div className='text-center'>
                                            <span>
                                                {questionInfo.chatReplyScore >= 1 ? <StarIcon /> : <StarBorderIcon />}
                                            </span>
                                            <span>
                                                {questionInfo.chatReplyScore >= 2 ? <StarIcon /> : <StarBorderIcon />}
                                            </span>
                                            <span>
                                                {questionInfo.chatReplyScore >= 3 ? <StarIcon /> : <StarBorderIcon />}
                                            </span>
                                            <span>
                                                {questionInfo.chatReplyScore >= 4 ? <StarIcon /> : <StarBorderIcon />}
                                            </span>
                                            <span>
                                                {questionInfo.chatReplyScore >= 5 ? <StarIcon /> : <StarBorderIcon />}
                                            </span>
                                        </div>
                                    ) : (
                                        <Button variant='contained' color='primary'>Report Volunteer Answer</Button>
                                    )}
                                </div>
                            </div>
                            {questionInfo.chatReplyScore && (<Button variant='contained' color='primary'>Report Volunteer Answer</Button>)}
                        </div>
                    )
                )}
            </main>
        </div>
    )
}

export default QuestionByIdScreen
