import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase/app'
import logo192 from './logo192.png'
import logo193 from './logo193.png'
import { fetchPresentUser } from '../actions/userActions'
import UseMediaQuery from '../components/UseMediaQuery'

const WelcomeScreen = ({ history, location }) => {
    const userCurrent = firebase.auth().currentUser
    const [width] = UseMediaQuery()

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)
    const { currentUserInfo } = currentUser

    const [check, setCheck] = useState(true)
    // const [fetchUser, setFetchUser] = useState(false)

    useEffect(() => {
        let isMounted = true;
        var loop = setInterval(() => {
            if (isMounted) {
                setCheck(!check)
            }
        }, 2000)
        if (!currentUserInfo) {
            history.push('/')
        } else if (currentUserInfo && !currentUserInfo.userEmail) {
            history.push('/')
        }
        if (userCurrent && location.state) {
            dispatch(fetchPresentUser())
            history.push(location.state.from)
        } else if (userCurrent && !location.state) {
            dispatch(fetchPresentUser())
            history.push('/home')
        }
        return () => {
            isMounted = false
            clearInterval(loop)
        }
    }, [history, userCurrent, location.state, check, currentUserInfo, dispatch])
    return (
        <div style={{ backgroundColor: "black", height: '100vh', margin: '0%' }}>
            {/* <div></div> */}
            {width < 370 ? (
                <div className='welcomePageLogo' style={{ backgroundImage: `url(${logo193})`, backgroundSize: 'cover' }}>
                    <h3>Welcome</h3>
                </div>
            ) : (
                <div className='welcomePageLogo' style={{ backgroundImage: `url(${logo192})`, backgroundSize: 'cover' }}>
                    <h3>Welcome</h3>
                </div>
            )
            }


        </div >
    )
}

export default WelcomeScreen
