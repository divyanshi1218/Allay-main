import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { useDispatch, useSelector } from 'react-redux'
import { changeSaveStatus } from '../actions/blogActions'
import { BLOG_SAVE_STATUS_CHANGE_RESET } from '../constants/blogConstants'

const useStyles = makeStyles((theme) => ({
    title: {
        color: 'white',
    },
    titleBar: {
        margin: '0%',
        width: '100%',
        padding: '0%',
        background: 'grey',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px'
        // 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const PublicBlogs = ({ id, history }) => {
    const classes = useStyles()
    const [blogData, setBlogData] = useState({})
    const [code, setCode] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const changeBlogSaveStatus = useSelector(state => state.changeBlogSaveStatus)
    const { success: successSave } = changeBlogSaveStatus

    useEffect(() => {
        let isMounted = true;
        if (successSave) {
            dispatch({ type: BLOG_SAVE_STATUS_CHANGE_RESET })
            history.push("/myblogs")
        }
        db.collection("publicblogs")
            .doc(id)
            .get()
            .then((doc) => {
                if (isMounted) {
                    if (doc.exists) {
                        setBlogData(doc.data())
                    } else {
                        setError("This file doesn't exist")
                        setCode(404)
                    }
                    setLoading(false)
                }
            })
            .catch(error => {
                if (isMounted) {
                    setError(error.message)
                }
            })
        return () => {
            isMounted = false;
        }
    }, [id, successSave, history, dispatch])

    return (
        <div>
            {loading ? <CircularProgress /> : !error ? (
                <div>
                    <p>{blogData.publicBlogText}</p >
                    <GridListTileBar
                        title={blogData.publicBlogTitle}
                        classes={{
                            root: classes.titleBar,
                            title: classes.title,
                        }}
                    />
                </div >
            ) : (
                <div onClick={() => { dispatch(changeSaveStatus(id)) }}>
                    <p> {error}</p>
                    {code && (
                        <h4>
                            Click anywhere in the post to Delete
                        </h4>
                    )}
                </div>
            )}
        </div >
    )
}

export default PublicBlogs
