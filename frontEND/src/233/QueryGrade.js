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
        maxWidth: 800,
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
class QueryGrade extends React.Component {
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
        showPassword: false,
        avatarUrl: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1028415273,4122561235&fm=27&gp=0.jpg",
        courseid:"SE203",
        year:"2019-1",
        result:[],

    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
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
                result:dataset,
                平时分:dataset[0].平时分,
                期末分:dataset[0].期末分,
                总分:dataset[0].总分,
            }));
        }



    };
    componentWillMount=()=>{
        grades=[];
        var obj ;
        var query = db.collection("grade").where("studentid","==","1");
        query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var str = JSON.stringify(doc.data());
                    var obj = eval('(' + str + ')');
                    grades.push(obj);

                });
                this.setState(state => ({
                    result:grades,
                }));
            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });

    }
    handleInfo2= prop => {
        var obj ;
        var query = db.collection("grade").where("studentid","==","1");
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
        // alert(JSON.stringify(res));

        if(grades[0]!=null) {
            // alert(dataset[0].平时分);
            this.setState(state => ({
                result:grades,
            }));
        }

    };


    render() {
        const { classes } = this.props;

        return (
            <div align ="center">
                <Paper className={classes.table}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>courseid</TableCell>
                                <TableCell align="left">课程名称</TableCell>
                                <TableCell align="left">学期</TableCell>
                                <TableCell align="left">平时分</TableCell>
                                <TableCell align="left">期末分</TableCell>
                                <TableCell align="left">总分</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.result.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.courseid}
                                    </TableCell>
                                    <TableCell align="left">{row.coursename}</TableCell>
                                    <TableCell align="left">{row.year}</TableCell>
                                    <TableCell align="left">{row.平时分}</TableCell>
                                    <TableCell align="left">{row.期末分}</TableCell>
                                    <TableCell align="left">{row.总分}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <Button color = "primary" variant="contained"
                        onClick = {this.handleInfo2}>
                    我的成绩
                </Button>
            </div>
        );
    }
}

QueryGrade.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(QueryGrade);

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
* */

