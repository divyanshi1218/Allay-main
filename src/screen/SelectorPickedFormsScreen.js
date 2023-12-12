import React, { useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
// import { fetchActiveForms, pickVolunteerForm, fetchPickedForms } from '../actions/selectorActions'
// import { PICK_VOLUNTEER_FORM_RESET } from '../constants/selectorConstants'
import { fetchPickedForms } from '../actions/selectorActions'
import firebase from 'firebase/app'

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const SelectorPickedFormsScreen = ({ history }) => {
    // const [open, setOpen] = useState(false)
    // const [statusMessage, setStatusMessage] = useState('')
    // const [statusVariant, setStatusVariant] = useState('success')

    const userCurrent = firebase.auth().currentUser

    const dispatch = useDispatch()
    const pickedForms = useSelector(state => state.pickedForms)
    const { loading, error, formsList } = pickedForms

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setOpen(false);
    // };

    useEffect(() => {
        if (userCurrent) {
            dispatch(fetchPickedForms())
        }
    }, [dispatch, userCurrent])

    // useEffect(() => {
    //     if (success) {
    //         setStatusMessage('Form Picked Successfully')
    //         setStatusVariant('success')
    //         setOpen(true)
    //         dispatch({ type: PICK_VOLUNTEER_FORM_RESET })
    //     }
    //     if (errorPick) {
    //         setStatusMessage(errorPick)
    //         setStatusVariant('error')
    //         setOpen(true)
    //         dispatch({ type: PICK_VOLUNTEER_FORM_RESET })
    //     }
    // }, [dispatch, success, errorPick])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Picked Forms"} history={history} />
            <main>
                {loading ? <Loader /> : error ? (<Message variant='info'>{error}</Message>) : (
                    <div>
                        {formsList.length === 0 ? (<h3 className='text-center'>No Picked Forms</h3>) : (
                            <div className='selectorForms'>
                                {formsList.map(formData => (
                                    <LinkContainer key={formData.key} to={`/selector/${formData.key}`} style={{ cursor: 'pointer' }}>
                                        <Card className='my-2'>
                                            <div className='mx-2 mb-1 mt-2'>
                                                <div>
                                                    <h4>Picked Form</h4>
                                                    {formData.value.dateOfApplication && (<h6>{formData.value.dateOfApplication.substr(0, 10)}</h6>)}
                                                </div>
                                                {/* <div>
                                                <Button
                                                    variant='contained'
                                                    disabled={formData.value.isSelected}
                                                    onClick={() => dispatch(pickVolunteerForm(formData.value.volunteerAccountId))}
                                                    color='primary'>
                                                    Pick
                                                </Button>
                                            </div> */}
                                            </div>
                                        </Card >
                                    </LinkContainer>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {/* <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={statusVariant}>
                        {statusMessage}
                    </Alert>
                </Snackbar> */}
            </main>
        </div>
    )
}

export default SelectorPickedFormsScreen

