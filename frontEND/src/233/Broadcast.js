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


const styles = theme => ({
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

class Broadcast extends Component {
    state = {
        id:"",
        senderName:"王源",
        title:"",
        message:"",
        condition:"",
        receiver: "IT",
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleBroadcast= () => {
        var myDate = new Date();
        myDate.toLocaleDateString();     //获取当前日期
        myDate.toLocaleString();
        alert("发布成功");

        // var db = firebase.firestore();
        db.collection("notice/"+this.state.receiver+"/"+this.state.receiver)
            .doc(myDate.getTime().toString()).set(
            {
            message:this.state.message,
            senderName:this.state.senderName,
            title:this.state.title,
            time:myDate.toLocaleString()
        })

        this.setState({
            condition:"发布成功",
            title:"",
            message:"",
        });

    };

    render() {
        const { classes } = this.props;
        return (
            <div align="center">
                <h1>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        通知
                    </InputLabel>
                </h1>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        接收者
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.receiver}
                        onChange={this.handleChange('receiver')}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput,
                        }}
                    />
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        标题
                    </InputLabel>
                    <InputBase
                        id="title"
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput,
                        }}

                    />
                </FormControl>
                <br/>

                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        内容
                    </InputLabel>
                    <InputBase
                        multiline
                        id="bootstrap-input"
                        value={this.state.message}
                        onChange={this.handleChange('message')}
                        rows = {3}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput2,
                        }}
                    />
                </FormControl>
                <br/>
                <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                    {this.state.condition}
                </InputLabel>
                <br/>
                <Button color = "primary" variant="contained"
                                         onClick = {this.handleBroadcast}>
                    发布
                </Button>
                <br/>
            </div>
        );
    }
}

Broadcast.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles) (Broadcast);
/*
* <TextField
                        select
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.careerGoal}
                        onChange={this.handleChange('careerGoal')}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <i className="material-icons">
                                        email
                                    </i>
                                </InputAdornment>,
                        }}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    perm_identity
                                </i>
                            </InputAdornment>
                        }
                    >
                        {currencies.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>*/