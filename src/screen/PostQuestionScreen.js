import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { makeStyles } from '@material-ui/core/styles';
import { Form } from 'react-bootstrap'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Checkbox from '@material-ui/core/Checkbox';
import CategoryIcon from '@material-ui/icons/Category';
import { postQuestion } from '../actions/questionActions.js'
import { POST_QUESTION_RESET } from '../constants/questionConstants'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'

function dateToISOLikeButLocal(date) {
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal = date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    return iso;
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formControl2: {
        margin: theme.spacing(3),
    },
}));

const PostQuestionScreen = ({ history }) => {
    const classes = useStyles();
    const [language, setLanguage] = useState('');
    const [question, setQuestion] = useState("")
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState({
        Relationship: false,
        Family: false,
        Finance: false,
        Disease: false,
        Love: false,
        Emotions: false,
        Stress: false,
        Hygiene: false
    });
    const dispatch = useDispatch()
    const questionPost = useSelector(state => state.questionPost)
    const { loading, error, success } = questionPost

    const handlePostQuestion = () => {
        var tagArr = []
        for (let tag in tags) {
            if (tags[tag] === true) {
                tagArr.push(tag)
            }
        }
        if (!question) {
            alert('Please enter Questions')
        } else if (question && !language) {
            dispatch(postQuestion({
                questionText: question,
                questionTags: tagArr,
                dateOfQuestion: dateToISOLikeButLocal(new Date()),
                chatPreferredLanguage: 'English',
            }))
        } else {
            dispatch(postQuestion({
                questionText: question,
                questionTags: tagArr,
                dateOfQuestion: dateToISOLikeButLocal(new Date()),
                chatPreferredLanguage: language,
            }))
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleTagChange = (event) => {
        setTags({ ...tags, [event.target.name]: event.target.checked });
    };

    const { Relationship, Family, Finance, Disease, Love, Emotions, Stress, Hygiene } = tags;

    useEffect(() => {
        if (success) {
            dispatch({ type: POST_QUESTION_RESET })
            history.push('/myquestions')
        }
    }, [history, success, dispatch])

    return (
        <div className='text-center my-1'>
            <Header headingTitle={"Post Question"} history={history} />
            <main>
                <h3>Describe your question briefly</h3>
                <hr />
                {loading && <Loader />}
                {error && (<Message variant='info'>{error}</Message>)}
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Preferred Language</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={language}
                        onChange={handleChange}
                    >
                        <MenuItem value={'English'}>English</MenuItem>
                        <MenuItem value={'Hindi'}>Hindi</MenuItem>
                        <MenuItem value={'Punjabi'}>Punjabi</MenuItem>
                        <MenuItem value={'Bengali'}>Bengali</MenuItem>
                        <MenuItem value={'Gujrati'}>Gujrati</MenuItem>
                        <MenuItem value={'Marathi'}>Marathi</MenuItem>
                        <MenuItem value={'Tamil'}>Tamil</MenuItem>
                    </Select>
                </FormControl>
                <Form className='questionText'>
                    <Form.Group controlId='body' className='px-1'>
                        <Form.Control
                            as='textarea'
                            className='questionArea'
                            value={question}
                            required
                            onChange={e => setQuestion(e.target.value)}
                            minrow='10'
                            placeholder='Write your question here'
                        >
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Button variant="contained" className='mx-3 my-1' color='primary' onClick={handleClickOpen}>
                    <CategoryIcon /> Select Tags
                </Button>
                <Button variant="contained" className='mx-3 my-1' color='primary' onClick={handlePostQuestion}>
                    Post Question
                </Button>
                <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className='text-center'>
                    <DialogTitle id="simple-dialog-title">Select Tags</DialogTitle>
                    <FormControl component="fieldset" className={classes.formControl2}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={Relationship} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Relationship" />}
                                label="Relationship"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Family} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Family" />}
                                label="Family"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Finance} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Finance" />}
                                label="Finance"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Disease} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Disease" />}
                                label="Disease"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Love} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Love" />}
                                label="Love"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Emotions} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Emotions" />}
                                label="Emotions"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Stress} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Stress" />}
                                label="Stress"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={Hygiene} onChange={handleTagChange} style={{
                                    color: "#4CAF50",
                                }} name="Hygiene" />}
                                label="Hygiene"
                            />
                        </FormGroup>
                    </FormControl>
                </Dialog>
            </main>
        </div>
    )
}

export default PostQuestionScreen
