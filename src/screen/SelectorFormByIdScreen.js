import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form, Image, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { fetchVolunteerFormById, approveForm, declineForm } from '../actions/selectorActions'
import { useDispatch, useSelector } from 'react-redux'

const SelectorFormByIdScreen = ({ history }) => {
    const { formId } = useParams()
    const [awardedMarks, setAwardedMarks] = useState('')
    const [show, setShow] = useState(false)
    const [requestType, setRequestType] = useState('decline')
    const dispatch = useDispatch()

    const volunteerFormById = useSelector(state => state.volunteerFormById)
    const { loading: loadingForm, error: errorForm, formInfo } = volunteerFormById

    const formApprove = useSelector(state => state.formApprove)
    const { loading: loadingApprove, error: errorApprove, success: successApprove } = formApprove

    const formDecline = useSelector(state => state.formDecline)
    const { loading: loadingDecline, error: errorDecline, success: successDecline } = formDecline

    const handleModalClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (successApprove || successDecline) {
            history.push('/selector/picked')
        }
        dispatch(fetchVolunteerFormById(formId))
    }, [formId, successApprove, successDecline, dispatch, history])

    const handleApprove = () => {
        if (awardedMarks < 1 || awardedMarks > 25) {
            alert('Award Marks between 1 and 25')
        } else {
            dispatch(approveForm(awardedMarks, formId))
        }
    }

    const handleDecline = () => {
        if (awardedMarks < 1 || awardedMarks > 25) {
            alert('Award Marks between 1 and 25')
        } else {
            dispatch(declineForm(awardedMarks, formId))
        }
    }

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Application"} history={history} />
            <main className='text-center'>
                {loadingForm && <Loader />}
                {errorForm && (<Message variant='info'>{errorForm}</Message>)}
                {formInfo && (
                    <div>
                        <Form>
                            <div className='text-center'>
                                <h4>Question 1</h4>
                                <Form.Group controlId='answer1' className='px-1 questionData'>
                                    <div>
                                        <Image
                                            src='https://firebasestorage.googleapis.com/v0/b/allay-convo.appspot.com/o/VolunteerApplicationQuestion%2FPicsArt_05-31-01.39.25.jpg?alt=media&token=cef3213c-1a8d-404c-85ad-2ef98029683b'
                                            className='questionPhoto'
                                            alt='answer 1' />
                                    </div>
                                    <div className='m-3'>
                                        <h4 className='m-2 border-bottom border-dark'>Answer: {formInfo.volunteerAnswers.answer1}</h4>
                                    </div>
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
                                    <div className='m-3'>
                                        <h4 className='m-2 border-bottom border-dark'>Answer: {formInfo.volunteerAnswers.answer2}</h4>
                                    </div>
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
                                    <div className='m-3'>
                                        <h4 className='m-2 border-bottom border-dark'>Answer: {formInfo.volunteerAnswers.answer3}</h4>
                                    </div>
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
                                    <div className='m-3'>
                                        <h4 className='m-2 border-bottom border-dark'>Answer: {formInfo.volunteerAnswers.answer4}</h4>
                                    </div>
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
                                    <div className='m-3'>
                                        <h4 className='m-2 border-bottom border-dark'>Answer: {formInfo.volunteerAnswers.answer5}</h4>
                                    </div>
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
                                    <div className='m-3'>
                                        <p className='m-2 border-bottom border-dark'>
                                            <span className='answerHeading'>Answer:</span>
                                            <span className='answerText ml-1'>{formInfo.volunteerAnswers.answer6}</span>
                                        </p>
                                    </div>
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
                                    <div className='m-3'>
                                        <p className='m-2 border-bottom border-dark'>
                                            <span className='answerHeading'>Answer:</span>
                                            <span className='answerText ml-1'>{formInfo.volunteerAnswers.answer7}</span>
                                        </p>
                                    </div>
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
                                    <div className='m-1'>
                                        <p className='my-2 border-bottom border-dark'>
                                            <span className='answerHeading'>Answer:</span>
                                            <span className='answerText ml-1'>{formInfo.volunteerAnswers.answer8}</span>
                                        </p>
                                    </div>
                                </Form.Group>
                            </div>
                            <hr />
                        </Form>
                        <div className='m-2'>
                            <div>
                                <TextField id="standard-basic"
                                    type='number'
                                    style={{ width: "150px" }}
                                    inputProps={{ min: "1", max: "25" }}
                                    className='m-3 mr-5'
                                    value={awardedMarks}
                                    onChange={e => setAwardedMarks(e.target.value)}
                                    label="Awarded Marks" required />
                            </div>
                            {(loadingApprove || loadingDecline) && <Loader />}
                            {(errorApprove || errorDecline) && (<Message variant='info'>{(errorApprove || errorDecline)}</Message>)}
                            <Button
                                variant='contained'
                                color='primary'
                                className='m-2'
                                onClick={() => {
                                    if (!awardedMarks) {
                                        alert('Award marks first')
                                    } else {
                                        setRequestType('approve')
                                        handleShow()
                                    }
                                }}>Approve</Button>
                            <Button
                                variant='contained'
                                color='primary'
                                className='m-2'
                                onClick={() => {
                                    if (!awardedMarks) {
                                        alert('Award marks first')
                                    } else {
                                        setRequestType('decline')
                                        handleShow()
                                    }
                                }}>Decline</Button>
                        </div>
                    </div>
                )}
            </main>
            <Modal show={show} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Do you want to {requestType} the request of this volunteer?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='m-1' variant="contained" color='primary' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button className='m-1' variant="contained" color='primary' onClick={() => {
                        handleModalClose()
                        requestType === 'decline' ? handleDecline() : handleApprove()
                    }}>
                        {requestType === 'decline' ? <span>Decline</span> : <span>Approve</span>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SelectorFormByIdScreen
