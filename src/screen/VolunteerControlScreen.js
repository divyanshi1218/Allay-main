import React from 'react'
import Header from '../components/Header'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchUserById } from '../actions/userActions'
// import firebase from 'firebase'

const VolunteerControlScreen = ({ history }) => {
    // const userCurrent = firebase.auth().currentUser
    // const [fetchUser, setFetchUser] = useState(true)

    // const dispatch = useDispatch()
    // const fetchUserDetails = useSelector(state => state.fetchUserDetails)
    // const { userDetails } = fetchUserDetails

    // useEffect(() => {
    //     let isMounted = true;
    //     if (fetchUser && userCurrent && isMounted) {
    //         dispatch(fetchUserById(userCurrent.uid))
    //         setFetchUser(false)
    //     }
    //     // if (userDetails && userCurrent && (userDetails.userRole === 5)) {
    //     //     history.push(`/profile/${userCurrent.uid}`)
    //     // }
    //     return () => { isMounted = false }
    // }, [userCurrent, fetchUser, userDetails, dispatch, history])

    return (
        <div>
            <Header headingTitle={"Volunteer Controls"} history={history} />
            <main className='text-center'>
                <div className='volunteerControlOptions'>
                    <div className='m-2'>
                        <Card className='volunteerControlLink'>
                            <h3 className='m-1 mt-3'>Active Questions</h3>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => history.push('/volunteer/active')}
                                className='volunteerControlButton mt-5'>
                                View Chats
                            </Button>
                        </Card>
                    </div>
                    <div className='m-2'>
                        <Card className='volunteerControlLink'>
                            <h3 className='m-1 mt-3'>Picked Chats</h3>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => history.push('/volunteer/picked')}
                                className='volunteerControlButton mt-5'>
                                View Chats
                            </Button>
                        </Card>
                    </div>
                </div>
                <div className='repliedChatLink'>
                    <Card className='volunteerControlLink m-1'>
                        <h3 className='m-1 mt-3'>Replied Chats</h3>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => history.push('/volunteer/replied')}
                            className='volunteerControlButton mt-5'>
                            View Chats
                        </Button>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default VolunteerControlScreen
