import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import '../App.css';
import News from "../News";
import {HashRouter, Route} from 'react-router-dom';
import Dashboard from "../Dashboard";

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
});

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
    typography: { useNextVariants: true },
});

class Broadcast extends Component {
    state = {
        id:"",
        senderName:"王俊凯",
        title:"",
        message:"你好",
        time:"",
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleBroadcast= () => {
        alert("OK")
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
