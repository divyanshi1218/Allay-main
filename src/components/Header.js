import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Modal } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import NotesIcon from '@material-ui/icons/Notes';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AppsIcon from '@material-ui/icons/Apps';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ChatIcon from '@material-ui/icons/Chat';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPresentUser } from '../actions/userActions'
import firebase from 'firebase/app'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    heading: {
        backgroundColor: '#2c3e50',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#2c3e50',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        color: 'white'
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        color: 'white',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


function Header(props) {
    const path = useRouteMatch()
    const { window, headingTitle, history, page } = props;
    const userCurrent = firebase.auth().currentUser
    const classes = useStyles();
    const theme = useTheme();
    const anchorRef = React.useRef(null);
    const [dropdownTitle, setDropdownTitle] = useState('Filter')
    const [fetchMood, setFetchMood] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleModalClose = () => setShow(false);
    const handleShow = () => {
        setMobileOpen(false);
        setShow(true);
    }

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser)
    const { currentUserInfo } = currentUser

    const presentUser = useSelector(state => state.presentUser)
    const { presentUserInfo } = presentUser

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        if (!currentUserInfo) {
            history.push('/')
        } else if (currentUserInfo && !currentUserInfo.userEmail) {
            history.push('/')
        }
        if (!userCurrent) {
            history.push('/welcome', { from: path.url })
        }
        if (fetchMood) {
            if (dropdownTitle === 'NO FILTER' || dropdownTitle === 'FILTER') {
                var loc = (page === 'myblogs' ? '/myblogs' : '/home')
                history.push(loc)
            } else {
                history.push(`/sort/${page}/${dropdownTitle}`)
            }
            setFetchMood(false)
        }
        prevOpen.current = open;
    }, [dispatch, open, currentUserInfo, history, fetchMood, dropdownTitle, userCurrent, page, path.url]);

    // const [fetchUser, setFetchUser] = useState(true)
    // const fetchUserDetails = useSelector(state => state.fetchUserDetails)
    // const { userDetails } = fetchUserDetails

    React.useEffect(() => {
        if (path.url.startsWith('/volunteer') && presentUserInfo && (presentUserInfo.userRole > 4)) {
            history.push('/myquestions')
        }
        if (path.url.startsWith('/selector') && userCurrent && presentUserInfo && (presentUserInfo.userRole > 2)) {
            history.push(`/profile/${userCurrent.uid}`)
        }
        if (userCurrent && !presentUserInfo) {
            dispatch(fetchPresentUser())
        }
    }, [presentUserInfo, dispatch, userCurrent, path.url, history])

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={`text-center ${classes.heading}`}>
                <div className={classes.toolbar}>
                    <LinkContainer to='/home' edge="start">
                        <h3 className='p-2 projectTitle'>ALLAY</h3>
                    </LinkContainer>
                </div>
            </div>
            <Divider />
            <List>
                <LinkContainer to='/home'>
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItem>
                </LinkContainer>
                <Divider />
                {presentUserInfo && presentUserInfo.userRole < 3 && (
                    <div>
                        <LinkContainer to='/selector'>
                            <ListItem button>
                                <ListItemIcon><AppsIcon /></ListItemIcon>
                                <ListItemText primary='Selector Controls' />
                            </ListItem>
                        </LinkContainer>
                        <Divider />
                    </div>
                )}
                <LinkContainer to='/myblogs'>
                    <ListItem button>
                        <ListItemIcon><NotesIcon /></ListItemIcon>
                        <ListItemText primary='My Blogs' />
                    </ListItem>
                </LinkContainer>
                <LinkContainer to='/add'>
                    <ListItem button>
                        <ListItemIcon><AddBoxIcon /></ListItemIcon>
                        <ListItemText primary='Write a Blog' />
                    </ListItem>
                </LinkContainer>
                <Divider />
                {presentUserInfo && presentUserInfo.userRole < 5 && (
                    <div>
                        <LinkContainer to='/volunteer'>
                            <ListItem button>
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary='Volunteer Controls' />
                            </ListItem>
                        </LinkContainer>
                        <Divider />
                    </div>
                )}
                <LinkContainer to='/post'>
                    <ListItem button>
                        <ListItemIcon><ChatIcon /></ListItemIcon>
                        <ListItemText primary='Post Question' />
                    </ListItem>
                </LinkContainer>
                <LinkContainer to='/myquestions'>
                    <ListItem button>
                        <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
                        <ListItemText primary='My Questions' />
                    </ListItem>
                </LinkContainer>
                <Divider />
                {userCurrent && (
                    <LinkContainer to={`/profile/${userCurrent.uid}`}>
                        <ListItem button>
                            <ListItemIcon><AccountCircleSharpIcon /></ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItem>
                    </LinkContainer>
                )}
                <ListItem button onClick={handleShow}>
                    <ListItemIcon><ExitToAppOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem>
            </List>
            <Divider />
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    {headingTitle
                        ? (
                            <div className="text-center" style={{ color: "white", width: "100%" }}>
                                <h3 className='pt-2 headingTitle'>
                                    {headingTitle}
                                </h3>
                            </div>
                        ) : (
                            <div className='topBar'>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                    if (searchKeyword === "") {
                                        alert('Search something')
                                    } else {
                                        history.push(`/search/${page}/${searchKeyword}`)
                                    }
                                }}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            value={searchKeyword}
                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                </form>
                                <div>
                                    <Button
                                        ref={anchorRef}
                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                        style={{ color: "white" }}
                                    >
                                        {dropdownTitle}
                                    </Button>
                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('HAPPY')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>HAPPY</MenuItem>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('EXCITED')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>EXCITED</MenuItem>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('NEUTRAL')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>NEUTRAL</MenuItem>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('SAD')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>SAD</MenuItem>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('DEPRESSED')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>DEPRESSED</MenuItem>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('ANGRY')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>ANGRY</MenuItem>
                                                            <MenuItem onClick={(e) => {
                                                                setDropdownTitle('NO FILTER')
                                                                handleClose(e)
                                                                setFetchMood(true)
                                                            }}>NO FILTER</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>
                            </div>
                        )}
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <Modal show={show} onHide={handleModalClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Are you sure you want to logout?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='m-1' variant="contained" color='primary' onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button className='m-1' variant="contained" color='primary' onClick={() => {
                        handleModalClose()
                        dispatch(logout())
                    }}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

Header.propTypes = {
    window: PropTypes.func,
};

export default Header;
