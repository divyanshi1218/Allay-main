import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVolunteerQuestionById, replyChat } from '../actions/questionActions'
import { Form } from 'react-bootstrap'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CategoryIcon from '@material-ui/icons/Category';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { REPLY_QUESTION_RESET } from '../constants/questionConstants'
import firebase from 'firebase'

const VolunteerQuestionByIdScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser
    const { questionId } = useParams()
    const [reply, setReply] = useState('')

    const dispatch = useDispatch()
    const volunteerQuestionById = useSelector(state => state.volunteerQuestionById)
    const { loading: loadingChat, error: errorChat, questionInfo, userAccountId, userChatId } = volunteerQuestionById

    const chatReply = useSelector(state => state.chatReply)
    const { loading: loadingReply, error: errorReply, success } = chatReply

    // const volunteerChatById = useSelector(state => state.volunteerChatById)
    // const { loading: loadingData, error: errorData, questionData } = volunteerChatById

    useEffect(() => {
        // if (userCurrent && questionData && !questionData.userChatId && !fetchQuestion) {
        //     dispatch(fetchVolunteerChatById(questionId))
        // } else if (userCurrent && questionData && questionData.userChatId) {
        //     setFetchQuestion(true)
        // }
        // if (fetchQuestion && questionData && questionData.userChatId) {
        //     dispatch(fetchVolunteerQuestionById(questionData.userAccountId, questionData.userChatId))
        //     dispatch({ type: FETCH_VOLUNTEER_CHAT_BY_ID_RESET })
        // }
        if (success) {
            dispatch({ type: REPLY_QUESTION_RESET })
        }
        if (userCurrent) {
            dispatch(fetchVolunteerQuestionById(questionId))
        }
    }, [questionId, dispatch, userCurrent, success])

    const handleReply = (e) => {
        e.preventDefault()
        dispatch(replyChat({
            userAccountId,
            userChatId,
            questionReply: reply
        }))
    }

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Question Details"} history={history} />
            <main className='text-center'>
                {loadingChat ? <Loader /> : errorChat ? (<Message variant='info'>{errorChat}</Message>) : (
                    questionInfo && questionInfo.questionText && (
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
                                {!questionInfo.questionReply && (
                                    <div>
                                        <Button
                                            variant='contained'
                                            className='m-2'
                                            onClick={() => setReply('Our volunteer Marked this question as Irrelevent')}
                                            color='primary'>
                                            Mark as Irrelevant
                                        </Button>
                                        <Button
                                            variant='contained'
                                            className='m-2'
                                            onClick={() => setReply('Our volunteer Marked this question Out of Bound')}
                                            color='primary'>
                                            Mark as Out of Bound
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className='mx-2'>
                                <h3>Your Analysis</h3>
                                {questionInfo.questionReply ? (
                                    <div>
                                        <div className='volunteerTextReply p-2 border border-dark'>
                                            {questionInfo.questionReply}
                                        </div>
                                        {questionInfo.chatReplyScore ? (<div className='text-center'>
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
                                            <h4>No rating provided yet</h4>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        {loadingReply && <Loader />}
                                        {errorReply && (<Message variant='info'>{errorReply}</Message>)}
                                        <Form className='m-2 text-center' onSubmit={handleReply}>
                                            <Form.Group controlId='reply' className='px-1 text-center'>
                                                <Form.Control
                                                    as='textarea'
                                                    style={{ height: "270px" }}
                                                    value={reply}
                                                    required
                                                    onChange={e => setReply(e.target.value)}
                                                    // minrow='10'
                                                    placeholder='Write your reply here'
                                                >
                                                </Form.Control>
                                                <Button
                                                    variant='contained'
                                                    className='m-2'
                                                    type='submit'
                                                    color='primary'>
                                                    Reply User
                                                </Button>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                )}
            </main>
        </div>
    )
}

export default VolunteerQuestionByIdScreen
