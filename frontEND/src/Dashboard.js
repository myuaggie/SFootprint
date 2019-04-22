import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {secondaryListItems } from './ListItems';
import { createMuiTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from "@material-ui/core/es/styles/index";
import blueGrey from '@material-ui/core/colors/blueGrey';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PublicIcon from '@material-ui/icons/Public';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PetsIcon from '@material-ui/icons/Pets';
import {Link} from "react-router-dom";
import Footer from "./Footer";
import Button from "@material-ui/core/es/Button/Button";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import Tabs from "@material-ui/core/es/Tabs/Tabs";
import Tab from "@material-ui/core/es/Tab/Tab";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import Fade from "@material-ui/core/es/Fade/Fade";
import TextField from "@material-ui/core/es/TextField/TextField";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import TabContainer from "react-bootstrap/es/TabContainer";
import Paper from "@material-ui/core/es/Paper/Paper";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Grid from "@material-ui/core/es/Grid/Grid";
import InputLabel from "@material-ui/core/es/InputLabel/InputLabel";
import InputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";
import Input from "@material-ui/core/es/Input/Input";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
    },
});

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),

    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,

    },
    menuButtonHidden: {
        display: 'none',

    },
    title: {
        flexGrow: 1,

    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),

    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },

    },
    appBarSpacer: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',

    },
    chartContainer: {
        marginLeft: -22,

    },
    tableContainer: {
        height: 320,

    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

class Dashboard extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            open:true,
            student:false,
            teacher1:false,
            teacher2:false,
            loginPop:false,
            registerPop:false,
            logoutPop:false,
            value:0,  //logintabs
            loginPattern:0
        };
    }

    handleLogout= () => {
        this.setState({
            student:false,
            teacher1:false,
            teacher2:false,
            logoutPop:false
        });

    };

    handleChangeTabs = (event, value) => {
        this.setState({ value });
    };

    handleLogoutOpen = () => {
        this.setState({logoutPop:true});
    };

    handleLoginOpen = () =>{
        this.setState({ loginPop:true});
    };

    handleRegisterOpen = () =>{
        this.setState({ registerPop:true});
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleLoginClose = () =>{
        this.setState({ loginPop:false});
    };
    handleLogoutClose= () =>{
        this.setState({ logoutPop:false});
    };

    handleLogin = () => {
        let username = document.getElementById("username-input");
        let password = document.getElementById("password-input");
        // if(this.state.value === 1){
        //     this.setState({
        //         student:true,
        //         teacher1:false,
        //         teacher2:false,
        //         //loginPattern:1,
        //         loginPop:false
        //     });
        // }
        if(this.state.value === 0){
            this.setState({
                student:true,
                teacher1:false,
                teacher2:false,
                loginPop:false
            });
        }
        else if(this.state.value === 1){
            this.setState({
                teacher1:true,
                student:false,
                teacher2:false,
                loginPop:false
            });
        }
        else if(this.state.value === 2){
            this.setState({
                teacher2:true,
                student:false,
                teacher1:false,
                loginPop:false
            });
        }
        this.setState({
            loginPop:false
        });
        alert("login success!");

    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            校园足迹 in SJTU
                        </Typography>

                        {!(this.state.student || this.state.teacher1 || this.state.teacher2)
                            ? <Button
                                color="inherit"
                                onClick={this.handleLoginOpen}>
                                Login
                            </Button>
                            : <Button
                                color="inherit"
                                onClick={this.handleLogoutOpen}>
                                Logout
                            </Button>
                        }
                        {!(this.state.student || this.state.teacher1 || this.state.teacher2) &&
                        <Button color="inherit"
                                onClick={this.handleRegisterOpen}>
                            Register
                        </Button>
                        }


                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider/>

                    <List>
                        {this.state.student &&
                        <Link to="/personalSetting">
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="material-icons">
                                        account_box
                                    </i>
                                </ListItemIcon>
                                <ListItemText primary="个人中心" />
                            </ListItem>
                        </Link>
                        }
                        <Link to="/footprint">
                        <ListItem button>
                            <ListItemIcon>
                                <PetsIcon/>
                            </ListItemIcon>
                            <ListItemText primary="我的足迹" />
                        </ListItem>
                        </Link>
                        {this.state.student &&
                            <Link to="/apply">
                            <ListItem button>
                            <ListItemIcon>
                            <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary="申请" />
                            </ListItem>
                            </Link>
                        }
                        {this.state.teacher2 &&
                        <Link to="/dealApply">
                            <ListItem button>
                                <ListItemIcon>
                                    <AssignmentIcon/>
                                </ListItemIcon>
                                <ListItemText primary="处理申请"/>
                            </ListItem>
                        </Link>
                        }
                        {(this.state.teacher1) &&
                        <Link to="/working1">
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="material-icons">
                                        today
                                    </i>
                                </ListItemIcon>
                                <ListItemText primary="工作中心"/>
                            </ListItem>
                        </Link>
                        }
                        {(this.state.teacher2) &&
                        <Link to="/working2">
                            <ListItem button>
                                <ListItemIcon>
                                    <i className="material-icons">
                                        today
                                    </i>
                                </ListItemIcon>
                                <ListItemText primary="工作中心"/>
                            </ListItem>
                        </Link>
                        }
                    </List>
                    <Divider />
                    <Link to="/news">
                        <ListItem button>
                            <ListItemIcon>
                                <PublicIcon/>
                            </ListItemIcon>
                            <ListItemText primary="校园新闻" />
                        </ListItem>
                    </Link>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {this.props.children}
                    <Footer/>
                </main>

                    <Dialog
                        open={this.state.loginPop}
                        onClose={this.handleLoginClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                        <DialogContent>
                            {this.state.loginPattern===0 &&
                            <div className={classes.loginTab}>
                                <AppBar position="static">
                                    <Tabs value={this.state.value} onChange={this.handleChangeTabs}>
                                        <Tab label="学生"/>
                                        <Tab label="教务处老师"/>
                                        <Tab label="学服老师"/>
                                    </Tabs>
                                </AppBar>
                                {this.state.value === 0 &&
                                <TabContainer>
                                    <Fade in={this.state.value === 0}>
                                        <div className={classes.margin}>
                                            <Grid container spacing={8} alignItems="flex-end">
                                                <Grid item>
                                                    <AccountCircleIcon />
                                                </Grid>
                                                <Grid item>
                                                    <TextField id="username-input" label="用户名" />
                                                </Grid>

                                                <Grid item>
                                                    <TextField id="password-input" label="密码" />
                                                </Grid>
                                            </Grid>

                                        </div>
                                    </Fade>
                                </TabContainer>}
                                {this.state.value === 1 &&
                                <TabContainer>
                                    <Fade in={this.state.value === 1}>
                                        <div className={classes.margin}>
                                            <Grid container spacing={8} alignItems="flex-end">
                                                <Grid item>
                                                    <AccountCircleIcon />
                                                </Grid>
                                                <Grid item>
                                                    <TextField id="username-input" label="用户名" />
                                                </Grid>

                                                <Grid item>
                                                    <TextField id="password-input" label="密码" />
                                                </Grid>
                                            </Grid>

                                        </div>
                                    </Fade>
                                </TabContainer>}
                                {this.state.value === 2 &&
                                <TabContainer>
                                    <Fade in={this.state.value === 2}>
                                        <div className={classes.margin}>
                                            <Grid container spacing={8} alignItems="flex-end">
                                                <Grid item>
                                                    <AccountCircleIcon />
                                                </Grid>
                                                <Grid item>
                                                    <TextField id="username-input" label="用户名" />
                                                </Grid>

                                                <Grid item>
                                                    <TextField id="password-input" label="密码" />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Fade>
                                </TabContainer>}
                            </div>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleLoginClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleLogin} color="primary">
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={this.state.logoutPop}
                        onClose={this.handleLogoutClose}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle className={classes.registerTitle} id="form-dialog-title">Logout</DialogTitle>
                        <DialogContent>
                            <Typography component="p">
                                Are you sure to log out?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleLogoutClose} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleLogout} color="primary">
                                Logout
                            </Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);