import React, { useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { fetchUserQuestions, fetchPickedQuestions, fetchRepliedQuestions } from '../actions/questionActions'
import firebase from 'firebase/app'

const MyUserQuestionsScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser

    const dispatch = useDispatch()
    const userQuestions = useSelector(state => state.userQuestions)
    const { loading, error, questionInfo } = userQuestions

    useEffect(() => {
        // if (!userCurrent) {
        //     history.push('/home', { from: `/myquestions` })
        // }
        if (userCurrent) {
            dispatch(fetchUserQuestions())
            dispatch(fetchPickedQuestions())
            dispatch(fetchRepliedQuestions())
        }
    }, [userCurrent, dispatch])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"My Questions"} history={history} />
            <main>
                {loading ? <Loader /> : error ? (<Message variant='info'>{error}</Message>) : (
                    <div>
                        {questionInfo.length === 0 ? (<h4 className='text-center'>No Question</h4>) : (
                            questionInfo.map(questionData => (
                                <LinkContainer key={questionData.childKey} to={`/myquestions/${questionData.childKey}`}>
                                    <Card className='userQuestionList m-2'>
                                        <div className='mt-2 mx-2'>
                                            <p className='userQuestionText'>Ques: {questionData.childData.questionText}</p>
                                            <h6>{(questionData.childData.dateOfQuestion).substr(0, 10)}</h6>
                                        </div>
                                        <div className='text-center'>
                                            <Chip
                                                size="medium"
                                                label={!questionData.childData.volunteerAccountId ? 'Posted' : !questionData.childData.questionReply ? 'Assigned' : 'Replied'}
                                                style={{ backgroundColor: '#4CAF50', color: "white" }}
                                                className='mt-3 mr-1' />
                                        </div>
                                    </Card>
                                </LinkContainer>
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

export default MyUserQuestionsScreen
