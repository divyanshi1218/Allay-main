import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Header from '../components/Header'
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux'
import { fetchVolunteerStatus } from '../actions/volunteerActions'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        cursor: 'default'
    },
    listItemText: {
        fontSize: "1.7rem",
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.3rem"
        },
    },
    listItemText1: {
        fontSize: "1.5rem",
        [theme.breakpoints.down('xs')]: {
            fontSize: "1.1rem"
        },
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const VolunteerRulesScreen = ({ history }) => {
    const classes = useStyles()
    const userCurrent = firebase.auth().currentUser

    const dispatch = useDispatch()
    const presentUser = useSelector(state => state.presentUser)
    const { presentUserInfo } = presentUser
    const volunteerStatus = useSelector(state => state.volunteerStatus)
    const { volunteerStatusInfo } = volunteerStatus


    useEffect(() => {
        if (userCurrent) {
            dispatch(fetchVolunteerStatus())
        }
    }, [userCurrent,dispatch])

    return (
        <div>
            <Header headingTitle={"Volunteer Guideline"} history={history} />
            <main className='text-center'>
                <div className='m-2'>
                    <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
                        <ListItem>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Volunteer has to be 
                                qualified enough to answer questions using his Emotional Intelligence which must portray 
                                his honest ideology and problem solving skills." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.listItemText }}
                                primary="Plagiarism at any cost will not be tolerated." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Volunteer must anonymously 
                                solve problems of the users by this structure :" />
                        </ListItem>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="Volunteer will get a 
                                    list of active questions. He can pick the question if he feels that he has proper remedy 
                                    to the problem after complete analysis." />
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="He has to answer the 
                                    picked question within 72 hours in the most simple and consoling way possible." />
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="Volunteer has the 
                                    right to mark a question as irrelevant or out of bound if genuinely he finds it so. " />
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="Volunteer will receive
                                    a rating for his answer by the user which he should use for further scope of improvement. " />
                            </ListItem>
                        </List>
                        <ListItem>
                            <ListItemIcon>
                                <SendIcon />
                            </ListItemIcon>
                            <ListItemText classes={{ primary: classes.listItemText }} primary="On getting the confirmation of 
                                approval, volunteer must follow the following code of conduct :" />
                        </ListItem>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="Volunteer has to be 
                                    humble with everyone and deal every case patiently." />
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="Volunteer cannot use
                                     harsh words and should not be rude at even worst case scenarios" />
                            </ListItem>
                            <ListItem className={classes.nested}>
                                <ListItemIcon>
                                    <ArrowForwardIcon />
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.listItemText1 }} primary="Volunteer should limit
                                     the scope of personal bias or his current situation. " />
                            </ListItem>
                        </List>
                    </List>
                    {(presentUserInfo && presentUserInfo.userRole < 5) ? (
                        <Button className='mt-2' variant='contained' color="primary">Already a Volunteer</Button>
                    ) : volunteerStatusInfo ? (
                        <Button className='mt-2' variant='contained' color="primary">Application in Progress</Button>
                    ) : (
                        <Button onClick={() => history.push('/apply')} className='mt-2' variant='contained' color="primary">Proceed to test</Button>
                    )}

                </div>
            </main>
        </div>
    )
}

export default VolunteerRulesScreen