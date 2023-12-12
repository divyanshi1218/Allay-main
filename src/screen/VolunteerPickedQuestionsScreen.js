import React, { useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Card from '@material-ui/core/Card';
// import Chip from '@material-ui/core/Chip';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { fetchPickedQuestions } from '../actions/questionActions'
import firebase from 'firebase/app'

const VolunteerPickedQuestionsScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser

    const dispatch = useDispatch()
    const pickedQuestions = useSelector(state => state.pickedQuestions)
    const { loading, error, questionList } = pickedQuestions

    useEffect(() => {
        // if (!userCurrent) {
        //     history.push('/home', { from: `/myquestions` })
        // }
        if (userCurrent) {
            dispatch(fetchPickedQuestions())
        }
    }, [userCurrent, dispatch])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Picked Questions"} history={history} />
            <main>
                {loading ? <Loader /> : error ? (<Message variant='info'>{error}</Message>) : (
                    <div>
                        {questionList.length === 0 ? (<h3 className='text-center'>No Question</h3>) : (
                            questionList.map(questionData => (
                                <LinkContainer key={questionData.key} to={`/volunteer/${questionData.key}`} style={{ cursor: 'pointer' }}>
                                    <Card className='m-2'>
                                        <div className='mt-2 mx-2'>
                                            <p className='userQuestionText'>Ques: {questionData.value.questionText}</p>
                                            <h6>{(questionData.value.dateOfQuestion).substr(0, 10)}</h6>
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

export default VolunteerPickedQuestionsScreen
