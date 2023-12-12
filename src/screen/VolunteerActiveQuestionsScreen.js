import React, { useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ActiveQuestion from '../components/ActiveQuestion'
import { useDispatch, useSelector } from 'react-redux'
// import { LinkContainer } from 'react-router-bootstrap'
import { fetchActiveQuestions } from '../actions/questionActions'

const VolunteerActiveQuestionsScreen = ({ history }) => {

    const dispatch = useDispatch()
    const activeQuestions = useSelector(state => state.activeQuestions)
    const { loading, error, questionList } = activeQuestions

    useEffect(() => {
        dispatch(fetchActiveQuestions())
    }, [dispatch])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Active Questions"} history={history} />
            <main>
                {loading ? <Loader /> : error ? (<Message variant='info'>{error}</Message>) : (
                    <div>
                        {questionList.length === 0 ? (<h3 className='text-center'>No Question</h3>) : (
                            questionList.map(questionData => (
                                    <ActiveQuestion key={questionData.childKey} questionId={questionData.childKey} questionInfo={questionData.childData} />
                            ))
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

export default VolunteerActiveQuestionsScreen
