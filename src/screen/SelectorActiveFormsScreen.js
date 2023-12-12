import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { fetchActiveForms, pickVolunteerForm } from '../actions/selectorActions'
import { PICK_VOLUNTEER_FORM_RESET } from '../constants/selectorConstants'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SelectorActiveFormsScreen = ({ history }) => {
    const [open, setOpen] = useState(false)
    const [statusMessage, setStatusMessage] = useState('')
    const [statusVariant, setStatusVariant] = useState('success')

    const dispatch = useDispatch()
    const activeForms = useSelector(state => state.activeForms)
    const { loading, error, formsList } = activeForms

    const formPick = useSelector(state => state.formPick)
    const { error: errorPick, success } = formPick

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchActiveForms())
    }, [dispatch])

    useEffect(() => {
        if (success) {
            setStatusMessage('Form Picked Successfully')
            setStatusVariant('success')
            setOpen(true)
            dispatch({ type: PICK_VOLUNTEER_FORM_RESET })
        }
        if (errorPick) {
            setStatusMessage(errorPick)
            setStatusVariant('error')
            setOpen(true)
            dispatch({ type: PICK_VOLUNTEER_FORM_RESET })
        }
    }, [dispatch, success, errorPick])

    return (
        <div className='my-3 mx-1'>
            <Header headingTitle={"Active Forms"} history={history} />
            <main>
                {loading ? <Loader /> : error ? (<Message variant='info'>{error}</Message>) : (
                    <div>
                        {formsList.length === 0 ? (<h3 className='text-center'>No Active Forms</h3>) : (
                            <div className='selectorForms'>
                                {formsList.map(formData => (
                                    <Card className='my-2' key={formData.key}>
                                        <div className='selectorQuestionData mx-2 mb-1 mt-2'>
                                            <div>
                                                <h4>Active Form</h4>
                                                <h6>{formData.value.dateOfApplication.substr(0, 10)}</h6>
                                            </div>
                                            <div>
                                                <Button
                                                    variant='contained'
                                                    disabled={formData.value.isSelected}
                                                    onClick={() => dispatch(pickVolunteerForm(formData.value.volunteerAccountId))}
                                                    color='primary'>
                                                    Pick
                                                </Button>
                                            </div>
                                        </div>
                                    </Card >
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={statusVariant}>
                        {statusMessage}
                    </Alert>
                </Snackbar>
            </main>
        </div>
    )
}

export default SelectorActiveFormsScreen

