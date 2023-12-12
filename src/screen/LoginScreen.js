import React, { useState, useEffect } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap'
import { Button as MaterialButton } from '@material-ui/core';
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { emailLogin, googleLogin, createUser, sendVerificationLink, resetPassword, fetchCurrentUser } from '../actions/userActions'
// import firebase from 'firebase'

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [messageError, setMessageError] = useState("")
    const [messageInfo, setMessageInfo] = useState("")
    // const [name, setName] = useState("")
    const [selectedDate, handleDateChange] = useState(null);
    const [handleName, setHandleName] = useState(false)
    // const [check, setCheck] = useState(true)
    // const userCurrent = firebase.auth().currentUser

    const handleClose = () => setShow(false);

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const currentUser = useSelector(state => state.currentUser)
    const { loading: loadingUser, error: errorUser, currentUserInfo, userNotFound } = currentUser

    const linkSend = useSelector(state => state.linkSend)
    const { loading: loadingSend, error: errorSend, success: successSend } = linkSend

    const passwordReset = useSelector(state => state.passwordReset)
    const { loading: loadingReset, error: errorReset, success: successReset } = passwordReset

    useEffect(() => {
        let isMounted = true
        if (userInfo && userInfo.user.emailVerified) {
            // savetoLocalStorage(userInfo.user)
            if (userInfo.additionalUserInfo.isNewUser) {
                // setName(userInfo.user.displayName)
                if (isMounted) {
                    setHandleName(true)
                }
            } else {
                dispatch(fetchCurrentUser())
            }
        } else if (userInfo && !userInfo.user.emailVerified && isMounted) {
            setShow(true)
        }

        if (successSend) {
            setMessageInfo("Email Verification link send Successfully !!")
        }
        if (successReset) {
            setMessageInfo("Password Reset link send Successfully !!")
        }
        if (error) {
            setMessageError(error)
        }
        if (errorSend) {
            setMessageError(errorSend)
        }
        if (errorReset) {
            setMessageError(errorReset)
        }
        if (messageInfo !== "") {
            var timer1 = setTimeout(() => {
                setMessageInfo("")
            }, 5000)
        }
        if (messageError !== "") {
            var timer2 = setTimeout(() => {
                setMessageError("")
            }, 5000)
        }
        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [dispatch, userInfo, history, successSend, successReset, error, errorSend, errorReset])

    useEffect(() => {
        let isMounted = true
        // if (currentUserInfo && currentUserInfo.email) {
        //     setInterval(() => {
        //         if (isMounted) {
        //             setCheck(!check)
        //         }
        //     }, 2000)
        // }
        if (currentUserInfo && currentUserInfo.userEmail) {
            // dispatch(fetchPresentUser())
            history.push('/home')
        }
        if (userNotFound) {
            // setName(userInfo.user.displayName)
            if (isMounted) {
                setHandleName(true)
            }
        }
        return () => { isMounted = false }
    }, [currentUserInfo, history, dispatch, userNotFound])

    const signIn = () => {
        dispatch(googleLogin())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(emailLogin(email, password))
    }

    return (
        <Container>
            <header className='text-center mt-3'>
                <h3 className='p-2 projectTitle' style={{ color: "#2c3e50 " }}>
                    Welcome to Allay
                </h3>
            </header>
            <div className='loginPage border border-dark'>
                <FormContainer className='m-0'>
                    <h2 className='pt-3 text-center'>SIGN IN</h2>
                    {loading && <Loader />}
                    {messageInfo && (<Message variant='info' className='text-center'>{messageInfo}</Message>)}
                    {messageError && (<Message variant='danger' className='text-center'>{messageError}</Message>)}
                    {loadingSend && <Loader />}
                    {loadingUser && <Loader />}
                    {loadingReset && <Loader />}
                    {errorUser && (<Message variant='danger' className='text-center'>{errorUser}</Message>)}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email'
                                placeholder="Enter email"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password'
                                placeholder="Enter password"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <div className='text-right pb-2 pt-0'>
                            <MaterialButton color="primary" onClick={() => {
                                if (!email)
                                    alert("Enter email first")
                                else
                                    dispatch(resetPassword(email))
                            }}>Forgot Password ?</MaterialButton>
                        </div>
                        <Button type='submit' variant='primary' className='btn-block text-center'>Sign In</Button>
                    </Form>
                    <MaterialButton
                        className='googleLoginButton my-3 btn-block'
                        onClick={signIn}
                    >Sign in With Google</MaterialButton>
                    <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Unverified Email !!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Please verify your email first to continue !!!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="info" onClick={() => {
                                dispatch(sendVerificationLink())
                                setShow(false)
                            }}>
                                Send Again
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={handleName} onHide={() => setHandleName(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Enter your Date of Birth to proceed</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={() => {
                                createUser(userInfo.user, userInfo.user.displayName, selectedDate)
                                setHandleName(false)
                                history.push('/home')
                            }}>
                                <Form.Group controlId='name'>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            placeholder="2018/10/10"
                                            value={selectedDate}
                                            onChange={date => handleDateChange(date)}
                                            format="MM-dd-yyyy"
                                        />
                                        {/* <KeyboardDatePicker
                                            variant="inline"
                                            value={selectedDate}
                                            inputVariant="outlined"
                                            label="With keyboard"
                                            format="MM/dd/yyyy"
                                            onChange={newDate => {
                                                handleDateChange(newDate);
                                            }}
                                            KeyboardButtonProps={{
                                                onFocus: e => {
                                                    setHandleName(true)
                                                }
                                            }}
                                            PopoverProps={{
                                                disableRestoreFocus: true,
                                                onClose: () => {
                                                    setHandleName(false)
                                                }
                                            }}
                                            InputProps={{
                                                onFocus: () => {
                                                    setHandleName(true)
                                                }
                                            }}
                                            open={handleName}
                                        /> */}
                                    </MuiPickersUtilsProvider>
                                    {/* <Form.Label>Enter Name</Form.Label>
                                    <Form.Control type='text'
                                        placeholder="Enter name"
                                        value={name}
                                        required
                                        onChange={e => setName(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='name'>
                                    <Form.Label>Enter Age</Form.Label>
                                    <Form.Control type='text'
                                        placeholder="Enter age"
                                        value={age}
                                        required
                                        onChange={e => setAge(e.target.value)}>
                                    </Form.Control> */}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="success" onClick={() => {
                                createUser(userInfo.user, userInfo.user.displayName, selectedDate)
                                setHandleName(false)
                                dispatch(fetchCurrentUser())
                            }}>
                                Continue
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Row className='py-3'>
                        <Col>
                            New User ?{' '}
                            <Link to='/register'>Sign Up</Link>
                        </Col>
                    </Row>
                </FormContainer>
            </div>
        </Container>
    )
}

export default LoginScreen
