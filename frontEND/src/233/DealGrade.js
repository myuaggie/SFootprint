import {Upload, Icon, message, Divider, Button} from 'antd';
import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import {MuiThemeProvider} from "@material-ui/core/es";
import $ from "jquery";
import InputBase from "@material-ui/core/InputBase";
import db from "./firebase";



const styles = theme => ({
    root1: {
        flexGrow: 1,
        width: '200px',
        height:'40px',
        marginTop:'10px',
        backgroundColor: theme.palette.background.paper,
    },
    margin:{
        margin:'10px',
    },
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
});
var grades=[""];
var kk = true;
class UploadFile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            courseid:"",
            imageUrl:'',
            year:'2019-1',
            filename:[],
            id:"",
            grade:[],
            message:"",
        };
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    componentWillMount=state=>{
        grades=[];
        // var obj ;
        // var query = db.collection("grades")
        //     .where("courseid","==",this.state.courseid)
        //     .where("year","==",this.state.year);
        // query.get()
        //     .then(function(querySnapshot) {
        //         querySnapshot.forEach(function(doc) {
        //             // doc.data() is never undefined for query doc snapshots
        //             console.log(doc.id, " => ", doc.data());
        //             var str = JSON.stringify(doc.data());
        //             obj = eval('(' + str + ')');
        //             grades.push(obj.message);
        //
        //         });
        //         this.setState(state => ({
        //             message:obj.message
        //         }));
        //     })
        //     .catch(function(error) {
        //         console.log("Error getting document:", error);
        //     });
    }

    handleGrade= state => {
        if(kk)grades=[];
        kk=!kk;
        var obj ;
        var query = db.collection("grades")
            .where("courseid","==",this.state.courseid)
            .where("year","==",this.state.year);
        query.get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    var str = JSON.stringify(doc.data());
                    obj = eval('(' + str + ')');
                    grades.push(obj.message);
                });

            })
            .catch(function(error) {
                console.log("Error getting document:", error);
            });

        this.setState(state => ({
            message:grades[0],
        }));

    };


    render() {
        const { classes } = this.props;

        return (
            <div align="center">
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
                <Divider orientation="center">拉取成绩表</Divider>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        成绩内容
                    </InputLabel>
                    <InputBase
                        multiline
                        id="bootstrap-input"
                        value={this.state.message}
                        //onChange={this.handleChange('message')}
                        rows = {3}
                        classes={{
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput2,
                        }}
                    />
                </FormControl>
                <br/>
                <Button color = "primary" variant="contained"
                        onClick = {this.handleGrade}>
                    拉取成绩表
                </Button>
            </div>

        );
    }
}

UploadFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadFile);
