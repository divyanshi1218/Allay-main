import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import CategoryIcon from '@material-ui/icons/Category';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { firebaseDatabase } from "../firebase"
import firebase from 'firebase'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveStatus } from '../actions/questionActions'
import { UPDATE_QUESTION_STATUS_RESET } from '../constants/questionConstants'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ActiveQuestion = ({ questionId, questionInfo }) => {
    const userCurrent = firebase.auth().currentUser
    const [questionData, setQuestionData] = useState({})
    const [statusMessage, setStatusMessage] = useState('')
    const [statusVariant, setStatusVariant] = useState('success')
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()
    const statusChange = useSelector(state => state.statusChange)
    const { error, success } = statusChange

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        let isMounted = true
        if (success) {
            setStatusMessage('Question Picked Successfully')
            setStatusVariant('success')
            setOpen(true)
            dispatch({ type: UPDATE_QUESTION_STATUS_RESET })
        }
        if (error) {
            setStatusMessage(error)
            setStatusVariant('error')
            setOpen(true)
            dispatch({ type: UPDATE_QUESTION_STATUS_RESET })
        }
        if (userCurrent) {
            firebaseDatabase.ref().child(questionInfo.userAccountId).child('userchat').child(questionInfo.userChatId).once('value')
                .then(snapshot => {
                    if (isMounted) {
                        setQuestionData(snapshot.val())
                    }
                })
        }
        return () => { isMounted = false }
    }, [questionInfo, userCurrent, error, success, dispatch])
    return (
        <Card className='m-2'>
            <div className='m-3'>
                <h3><CategoryIcon fontSize='large' style={{ color: '#009688', marginRight: '20px' }} />Tags</h3>
                <div className='mb-3 mx-2 text-left'>
                    {questionData && (
                        <div>
                            {!questionData.questionTags ? (<h4>None</h4>) :
                                (questionData.questionTags.map((tag, index) => (
                                    <Chip
                                        key={index}
                                        size="medium"
                                        label={tag}
                                        style={{ backgroundColor: '#009688', color: "white" }}
                                        className='mt-3 mr-1' />
                                )))}
                        </div>
                    )}
                </div>
            </div>
            <hr />
            <div className='activeQuestionData ml-2 mb-1'>
                {questionData && (<p>{questionData.questionText}</p>)}
                <div>
                    <Button
                        variant='contained'
                        disabled={!questionInfo.isActive}
                        onClick={() => dispatch(changeActiveStatus(questionInfo, questionId))}
                        color='primary'>
                        Pick
                    </Button>
                </div>
            </div>
            <hr />
            <div className='activeQuestionAdditional m-0'>
                {questionData && questionData.dateOfQuestion && (<p>{(questionData.dateOfQuestion).substr(0, 10)}</p>)}
                {questionData && (<p>{questionData.chatPreferredLanguage}</p>)}
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={statusVariant}>
                    {statusMessage}
                </Alert>
            </Snackbar>
        </Card >
    )
}

export default ActiveQuestion
