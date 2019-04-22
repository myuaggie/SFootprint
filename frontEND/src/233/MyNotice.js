import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import '../App.css';
import News from "../News";
import {HashRouter, Route} from 'react-router-dom';
import Dashboard from "../Dashboard";
// import firebase from 'firebase';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import ReactQuill from "react-quill";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import TextArea from "antd/es/input/TextArea";
import InputAdornment from "@material-ui/core/InputAdornment";
// import firebase from 'firebase';
import db from './firebase.js';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import red from "@material-ui/core/es/colors/red";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";


const styles = theme => ({
    card: {
        maxWidth: 700,
        margin:20,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        '&$cssFocused': {
            color: purple[500],
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: purple[500],
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: purple[500],
        },
    },
    notchedOutline: {},
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '800px',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapInput2: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '800px',
        height:'150px',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
    textField: {
        marginLeft: 0,
        marginRight: theme.spacing.unit*2,
        padding: '10px 12px',
        width: "800px",
    },
});
const currencies = [
    {
        value: 'IT',
        label: 'IT',
    },
    {
        value: 'Financial',
        label: 'Financial',
    },
    {
        value: 'Math',
        label: 'Math',
    },
    {
        value: 'Music',
        label: 'Music',
    },
];

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    typography: { useNextVariants: true },
});

// firebase.initializeApp({
//     apiKey: 'AIzaSyBl9i4zCUV0-dmrm2EOg9Jxm7of4iTRjko',
//     projectId: 'sfootprint2'
// });
var notices=[];
class MyNotice extends Component {
    state = {
        id:"",
        senderid:"4",
        senderName:"李荣浩",
        title:"",
        message:"",
        condition:"",
        receiver: "",
        expanded: false
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };
    componentWillMount=()=>{
        notices=[];
        this.handleBroadcast();
    }
    handleBroadcast= () => {
        // var db = firebase.firestore();

         var sendNotice = db.collection("broadcast");
         var query = sendNotice.where("senderid","==",this.state.senderid);
        query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var str = JSON.stringify(doc.data());
                    var obj = eval('(' + str + ')');
                    notices.push(obj);
                });
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
        // alert(JSON.stringify(res));
        if(notices[0]!=null){
            this.setState({
                condition:"获取成功",
                title:"",
                message:"",
            });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div align="center">
                <h1>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        我发布的通知
                    </InputLabel>
                </h1>
                <br/>
                {notices.map((item, i) => (
                        <Card className={classes.card}>
                            {/*<CardHeader*/}
                                {/*title={"Title: "+item.title}*/}
                                {/*subheader={"receiver: "+item.receiver + "  " + item.time}*/}
                            {/*/>*/}
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h1">
                                    {item.title}
                                </Typography>
                                <Typography component="p">
                                    {"  发布时间: " + item.time + "  接收者: "+item.receiver  }
                                </Typography>
                                <Typography component="p">

                                </Typography>
                                {/*<Typography component="p" gutterBottom variant="h5" component="h5">*/}
                                    {/*{"content: "}*/}
                                {/*</Typography>*/}
                                <Typography component="p" gutterBottom variant="h5" component="h5">
                                    {item.message}
                                </Typography>
                            </CardContent>
                        </Card>
                ))}
                <br/>
                <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                    {this.state.condition}
                </InputLabel>
                <br/>
                <Button color = "primary" variant="contained"
                                         onClick = {this.handleBroadcast}>
                    获取
                </Button>
                <br/>
            </div>
        );
    }
}

MyNotice.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (MyNotice);
