import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import db from './firebase.js';

import {
      Form, FormGroup, ControlLabel, Glyphicon,
} from 'react-bootstrap';
import purple from "@material-ui/core/colors/purple";
import InputBase from "@material-ui/core/InputBase";
import Card from "./MyNotice";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        maxWidth: 500,
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
var res;
var dataset=[];
var grades=[];
class CourseGrade extends React.Component {
    state = {
        type:"student",
        id:'1',
        realName:'王俊凯',
        name: "Karry",
        grade: '大一',
        major:'Financial',
        careerGoal:'Music',
        phone:'54749110',
        email:'KarryWang@sjtu.edu.cn',
        password: 'au123456789',
        show: false,
        courseid:"SE203",
        year:"2019-1",
        result:"",

    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    componentWillMount=()=>{
        grades=[];
        // var obj ;
        // var query = db.collection("grade").where("courseid","==",this.state.courseid).where("year","==",this.state.year);
        // query.get()
        //     .then(function(querySnapshot) {
        //         querySnapshot.forEach(function(doc) {
        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, " => ", doc.data());
        //             var str = JSON.stringify(doc.data());
        //             var obj = eval('(' + str + ')');
        //             grades.push(obj);
        //         });
        //     })
        //     .catch(function(error) {
        //         console.log("Error getting document:", error);
        //     });
        // // alert(JSON.stringify(res));
        //
        // if(grades[0]!=null) {
        //     // alert(dataset[0].平时分);
        //     this.setState(state => ({
        //         result:JSON.stringify(res),
        //     }));
        // }
    }
    handleInfo2= prop => {
        grades=[];
        var obj ;
        var query = db.collection("grade").where("courseid","==",this.state.courseid).where("year","==",this.state.year);
        query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var str = JSON.stringify(doc.data());
                    var obj = eval('(' + str + ')');
                    grades.push(obj);
                });
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
        if(grades[0]!=null) {
            alert(dataset[0].平时分);

        }
        this.setState(state => ({
            show:!this.state.show
        }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div align ="center">
                <Paper className={classes.table}>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">课程代码</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            value={this.state.courseid}
                            onChange={this.handleChange('courseid')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i className="material-icons">
                                        radio_button_checked
                                    </i>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl className={classes.margin}>
                        <InputLabel htmlFor="input-with-icon-adornment">学年</InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            value={this.state.year}
                            onChange={this.handleChange('year')}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i className="material-icons">
                                        radio_button_checked
                                    </i>
                                </InputAdornment>
                            }
                        />

                    </FormControl>
                    <br/>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>StudentId</TableCell>
                                <TableCell align="right">平时分</TableCell>
                                <TableCell align="right">期末分</TableCell>
                                <TableCell align="right">总分</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {grades.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.studentid}
                                    </TableCell>
                                    <TableCell align="right">{row.平时分}</TableCell>
                                    <TableCell align="right">{row.期末分}</TableCell>
                                    <TableCell align="right">{row.总分}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Button color = "primary" variant="contained"
                        onClick = {this.handleInfo2}>
                    班级成绩
                </Button>
            </div>
        );
    }
}

CourseGrade.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseGrade);

/*
* <InputAdornment position="start" onClick={this.handleClickShowPassword}>
                                <IconButton
                                    aria-label="Toggle password visibility"

                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
* */
/*
*    {this.state.type}
                {this.state.username}
                {this.state.password}
                {this.state.careerGoal}
                {this.state.grade}
                {this.state.phone}
                {this.state.realName}
                {this.state.major}
                {this.state.id}
    id:1,
    realName:Maggie,
    name: Myu,
    grade: Bachelor Grade Three,
    major:SE,
    careerGoal:IT,
    phone:18621880739,
    email:920369216@qq.com,
    password: this.state.password,
    avatarUrl: https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b90e7bec54e736d10a64ec699c504fc2d562695f.jpg,
* */
/*
*     handleInfo= () => {
        db.collection(this.state.type)
            .doc(this.state.id.toString()).update(
            {
                type:this.state.type,
                id:this.state.id,
                realName:this.state.realName,
                name: this.state.name,
                grade: this.state.grade,
                major:this.state.major,
                careerGoal:this.state.careerGoal,
                phone:this.state.phone,
                email:this.state.email,
                password: this.state.password,
                avatarUrl: this.state.avatarUrl,
            })
    };
       handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleInfo= prop => {
        var obj ;
        var docRef = db.collection("grade").doc(this.state.courseid).collection(this.state.year).doc(this.state.id)
            .get()
            .then(function(doc) {
                if (doc.exists) {
                    dataset=[];
                    console.log("Document data:", doc.data());
                    res = doc.data();
                    var str = JSON.stringify(doc.data());
                    obj = eval('(' + str + ')');
                    // alert(obj.平时分);
                    var r = {平时分:obj.平时分,期末分:obj.期末分,总分:obj.总分};
                    dataset.push(r);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });
        if(dataset[0]!=null) {
            // alert(dataset[0].平时分);
            this.setState(state => ({
                result:JSON.stringify(res),
                平时分:dataset[0].平时分,
                期末分:dataset[0].期末分,
                总分:dataset[0].总分,
            }));
        }

        // db.collection("student")
        //     .doc(this.state.id.toString()).set(
        //     {
        //         type:this.state.type,
        //         id:this.state.id,
        //         realName:this.state.realName,
        //         name: this.state.name,
        //         grade: this.state.grade,
        //         major:this.state.major,
        //         careerGoal:this.state.careerGoal,
        //         phone:this.state.phone,
        //         email:this.state.email,
        //         password: this.state.password,
        //         avatarUrl: this.state.avatarUrl,
        //     })
    };
* */

