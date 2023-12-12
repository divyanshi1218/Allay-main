import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form, Image } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { applyForVolunteer } from '../actions/volunteerActions'
import { useDispatch, useSelector } from 'react-redux'
import { APPLY_VOLUNTEER_RESET } from '../constants/volunteerConstants'
import dateToISOLikeButLocal from '../components/ConvertDate'
import firebase from 'firebase/app'

const VolunteerApplyScreen = ({ history }) => {
    const userCurrent = firebase.auth().currentUser
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [answer4, setAnswer4] = useState('')
    const [answer5, setAnswer5] = useState('')
    const [answer6, setAnswer6] = useState('')
    const [answer7, setAnswer7] = useState('')
    const [answer8, setAnswer8] = useState('')

    const dispatch = useDispatch()
    const volunteerApply = useSelector(state => state.volunteerApply)
    const { loading, error, success } = volunteerApply
    const presentUser = useSelector(state => state.presentUser)
    const { presentUserInfo } = presentUser

    const handleApplication = (e) => {
        e.preventDefault()
        dispatch(applyForVolunteer({
            answers: {
                answer1,
                answer2,
                answer3,
                answer4,
                answer5,
                answer6,
                answer7,
                answer8
            },
            applicationDate: dateToISOLikeButLocal(new Date())
        }))
    }

    useEffect(() => {
        // if (!userCurrent) {
        //     history.push('/home', { from: `/apply` })
        // }
        if (userCurrent && success) {
            dispatch({ type: APPLY_VOLUNTEER_RESET })
            history.push(`/profile/${userCurrent.uid}`)
        }
        if (userCurrent && presentUserInfo && presentUserInfo.userRole < 5) {
            history.push(`/profile/${userCurrent.uid}`)
        }
    }, [userCurrent, history, success, dispatch, presentUserInfo])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Application"} history={history} />
            <main className='text-center'>
                {loading && <Loader />}
                {error && (<Message variant='info'>{error}</Message>)}
                <Form onSubmit={handleApplication}>
                    <div className='text-center'>
                        <h4>Question 1</h4>
                        <Form.Group controlId='answer1' className='px-1 questionData'>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FPicsArt_05-31-01.39.25.jpg?alt=media&token=cef3213c-1a8d-404c-85ad-2ef98029683b'
                                    className='questionPhoto'
                                    alt='answer 1' />
                            </div>
                            <TextField id="standard-basic"
                                type='number'
                                inputProps={{ min: "1", max: "4" }}
                                className='m-3 mr-5'
                                value={answer1}
                                onChange={e => setAnswer1(e.target.value)}
                                label="Answer 1" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 2</h4>
                        <Form.Group controlId='answer2' className='px-1 questionData'>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FPicsArt_06-11-04.09.12.jpg?alt=media&token=871e9aa2-c97f-44a0-907a-4d0dca98e024'
                                    className='questionPhoto'
                                    alt='answer 2' />
                            </div>
                            <TextField id="standard-basic"
                                type='number'
                                inputProps={{ min: "1", max: "4" }}
                                className='m-1 mr-5'
                                value={answer2}
                                onChange={e => setAnswer2(e.target.value)}
                                label="Answer 2" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 3</h4>
                        <Form.Group controlId='answer3' className='px-1 questionData'>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FPicsArt_06-11-04.00.28.jpg?alt=media&token=a6200756-a854-4b5f-a722-575862a56429'
                                    className='questionPhoto'
                                    alt='answer 3' />
                            </div>
                            <TextField id="standard-basic"
                                type='number'
                                inputProps={{ min: "1", max: "4" }}
                                className='m-3 mr-5'
                                value={answer3}
                                onChange={e => setAnswer3(e.target.value)}
                                label="Answer 3" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 4</h4>
                        <Form.Group controlId='answer4' className='px-1 questionData'>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FPicsArt_06-11-04.18.34.jpg?alt=media&token=19811c89-e2b2-4bfe-8302-c15c086521af'
                                    className='questionPhoto'
                                    alt='answer 4' />
                            </div>
                            <TextField id="standard-basic"
                                type='number'
                                inputProps={{ min: "1", max: "4" }}
                                className='m-3 mr-5'
                                value={answer4}
                                onChange={e => setAnswer4(e.target.value)}
                                label="Answer 4" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 5</h4>
                        <Form.Group controlId='answer5' className='px-1 questionData'>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FPicsArt_06-11-03.56.26.jpg?alt=media&token=b6942ad3-9915-4cc5-b40a-a475b6831f30'
                                    className='questionPhoto'
                                    alt='answer 5' />
                            </div>
                            <TextField id="standard-basic"
                                type='number'
                                inputProps={{ min: "1", max: "4" }}
                                className='m-3 mr-5'
                                value={answer5}
                                onChange={e => setAnswer5(e.target.value)}
                                label="Answer 5" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 6</h4>
                        <Form.Group controlId='answer6' className='px-1 questionData' style={{ width: '100%' }}>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FIMG_20210611_175852.jpg?alt=media&token=799b345e-feb5-43ef-a3c1-8c5c1b29e2a2'
                                    className='questionPhoto1'
                                    alt='answer 6' />
                            </div>
                            <TextField id="standard-basic"
                                type='text'
                                className='m-3 mr-5'
                                multiline
                                rowsMax={7}
                                value={answer6}
                                onChange={e => setAnswer6(e.target.value)}
                                label="Answer 6" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 7</h4>
                        <Form.Group controlId='answer7' className='px-1 questionData' style={{ width: '100%' }}>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FIMG_20210611_175947.jpg?alt=media&token=74270bf4-0970-41f6-81f1-2f7b177c04b3'
                                    className='questionPhoto1'
                                    alt='answer 7' />
                            </div>
                            <TextField id="standard-basic"
                                type='text'
                                className='m-3 mr-5'
                                multiline
                                rowsMax={7}
                                value={answer7}
                                onChange={e => setAnswer7(e.target.value)}
                                label="Answer 7" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <div className='text-center'>
                        <h4>Question 8</h4>
                        <Form.Group controlId='answer8' className='px-1 questionData' style={{ width: '100%' }}>
                            <div>
                                <Image
                                    src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FIMG_20210611_180247.jpg?alt=media&token=6af3af74-2afd-4ec2-8cd7-0026b4990166'
                                    className='questionPhoto1'
                                    alt='answer 8' />
                            </div>
                            <TextField id="standard-basic"
                                type='textarea'
                                className='m-3 mr-5'
                                multiline
                                rowsMax={7}
                                value={answer8}
                                onChange={e => setAnswer8(e.target.value)}
                                label="Answer 8" required />
                        </Form.Group>
                    </div>
                    <hr />
                    <Button type='submit' variant='contained' color='primary' className='m-2'>Submit Application</Button>
                </Form>
            </main>
        </div>
    )
}

export default VolunteerApplyScreen
