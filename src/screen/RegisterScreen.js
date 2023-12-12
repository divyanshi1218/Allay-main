import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'

const RegisterScreen = ({ history }) => {
    const [name, setName] = useState("")
    const [selectedDate, handleDateChange] = useState(new Date());
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState("")

    const handleClose = () => setShow(false);

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo && !userInfo.emailVerified)
            setShow(true)
    }, [dispatch, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (!email || !password) {
            alert("Enter credentials")
        }
        if (confirmPassword !== password) {
            setMessage("Passwords doesn't match!")
        } else {
            dispatch(register(name, selectedDate, email, password))
        }
    }

    return (
        <Container>
            <header className='text-center mt-3'>
                <h3 className='p-2 projectTitle' style={{ color: "#2c3e50 " }}>
                    Welcome to Allay
                </h3>
            </header>
            <div className='signupPage border border-dark'>
                {error && (<Message variant='danger'>{error}</Message>)}
                {message && (<Message variant='danger'>{message}</Message>)}
                {loading && <Loader />}
                <FormContainer>
                    <h2 className='pt-3 text-center'>SIGN UP</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Enter Name</Form.Label>
                            <Form.Control type='text'
                                placeholder="Enter name"
                                value={name}
                                required
                                onChange={e => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type='email'
                                placeholder="Enter email"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='dob'>
                            <Form.Label>Select Date of Birth</Form.Label>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    placeholder="2018/10/10"
                                    value={selectedDate}
                                    onChange={date => handleDateChange(date)}
                                    format="MM-dd-yyyy"
                                />
                            </MuiPickersUtilsProvider>
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
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password'
                                placeholder="Enter password again"
                                value={confirmPassword}
                                required
                                onChange={e => setConfirmPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' variant='primary' className='btn-block'>Register</Button>
                    </Form>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Registration Successfull !!!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Woohoo, you're are successfully registered to Allay!<br />
                            Please verify and login again to continue !!!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="success" onClick={() => {
                                handleClose()
                                history.push('/')
                            }}>
                                Go to Login
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Row className='py-3'>
                        <Col>
                            Have an account ?{' '}
                            <Link to='/'>Login</Link>
                        </Col>
                    </Row>
                </FormContainer>
            </div>
        </Container>
    )
}

export default RegisterScreen