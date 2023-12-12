import React from 'react'
import Header from '../components/Header'
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const SelectorControlScreen = ({ history }) => {

    return (
        <div>
            <Header headingTitle={"Selector Controls"} history={history} />
            <main className='text-center'>
                <div className='volunteerControlOptions'>
                    <div className='m-2'>
                        <Card className='volunteerControlLink'>
                            <h3 className='m-1 mt-3'>Active Forms</h3>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => history.push('/selector/active')}
                                className='volunteerControlButton mt-5'>
                                View Forms
                            </Button>
                        </Card>
                    </div>
                    <div className='m-2'>
                        <Card className='volunteerControlLink'>
                            <h3 className='m-1 mt-3'>Picked Forms</h3>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => history.push('/selector/picked')}
                                className='volunteerControlButton mt-5'>
                                View Forms
                            </Button>
                        </Card>
                    </div>
                </div>
                {/* <div className='repliedChatLink'>
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
                </div> */}
            </main>
        </div>
    )
}

export default SelectorControlScreen
