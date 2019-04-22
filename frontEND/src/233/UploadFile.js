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
        this.beforeUpload=this.beforeUpload.bind(this);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    beforeUpload=(file)=>{
        let newfilename = this.state.filename;
        newfilename.push(file.name);
        this.setState({ filename: newfilename});
        let data= {
            courseid:"SE203",
            year:"2019-1",
            filename: file.name,
        };

        /*生成 id*/
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/File",
            type: "POST",
            data: JSON.stringify(data),
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            }
        });

        /*获取 id*/
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/File/File.filename="+file.name,
            type: "GET",
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                let dataObj = data["File"];
                this.setState({ id: dataObj[0].id});
            }.bind(this)
        });


        let formData = new FormData();
        formData.append('filename', file);
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/File/"+this.state.id,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert("成功提交!");
            }
        });
    };

    handleGrade= () => {
        var myDate = new Date();
        myDate.toLocaleDateString();     //获取当前日期
        var time = myDate.toLocaleString();
        var oldgrades = this.state.message;
        var arr=oldgrades.split("\n");
        alert(arr[0]);
        var onegrade;
        for (var i=1;i<arr.length;i++)
        {
            var onegrade2 = arr[i].split("\t");
            if(onegrade2.length>=2){
                onegrade=onegrade2;
                db.collection("grade")
                    .doc(onegrade[0]+onegrade[3]+onegrade[2]).set(
                    {
                        courseid:onegrade[0],
                        coursename:onegrade[1],
                        studentid:onegrade[2],
                        year:onegrade[3],
                        平时分:onegrade[4],
                        期末分:onegrade[5],
                        总分:onegrade[6],
                    })
            }
        }
        db.collection("grades")
            .doc(onegrade[0]+onegrade[1]).set(
            {
                courseid:onegrade[0],
                year:this.state.year,
                message:this.state.message,
            })

    };


    render() {
        const { classes } = this.props;
        // const uploadButton = (
        //     <div className={classes.root1}>
        //         <Icon type={this.state.loading ? 'loading' : 'plus'} />
        //         <br/>
        //         <InputLabel htmlFor="input-with-icon-adornment">点击上传学生成绩文件</InputLabel>
        //     </div>
        // );
        return (
            <div align="center">
                <Divider orientation="center">提交成绩表单</Divider>

                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel shrink htmlFor="bootstrap-input" className={classes.bootstrapFormLabel}>
                        成绩表单内容（excel选中复制粘贴即可）
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
                        onClick = {this.handleGrade}>
                    发布
                </Button>
            </div>

        );
    }
}

UploadFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadFile);
{/*<FormControl className={classes.margin}>*/}
    {/*<InputLabel htmlFor="input-with-icon-adornment">课程代码</InputLabel>*/}
    {/*<Input*/}
        {/*id="input-with-icon-adornment"*/}
        {/*value={this.state.course}*/}
        {/*onChange={this.handleChange('course')}*/}
        {/*startAdornment={*/}
            {/*<InputAdornment position="start">*/}
                {/*<i className="material-icons">*/}
                    {/*radio_button_checked*/}
                {/*</i>*/}
            {/*</InputAdornment>*/}
        {/*}*/}
    {/*/>*/}
{/*</FormControl>*/}
{/*<br/>*/}
{/*<br/>*/}
{/*<FormControl className={classes.margin}>*/}
    {/*<InputLabel htmlFor="input-with-icon-adornment">学年</InputLabel>*/}
{/*<Input*/}
    {/*id="input-with-icon-adornment"*/}
    {/*value={this.state.year}*/}
    {/*onChange={this.handleChange('year')}*/}
    {/*startAdornment={*/}
        {/*<InputAdornment position="start">*/}
            {/*<i className="material-icons">*/}
                {/*radio_button_checked*/}
            {/*</i>*/}
        {/*</InputAdornment>*/}
    {/*}*/}
{/*/>*/}

{/*</FormControl>*/}
{/*<br/>*/}
{/*<br/>*/}
{/*<Upload*/}
{/*name="avatar"*/}
{/*listType="picture-card"*/}
{/*className="avatar-uploader"*/}
{/*accept="image/*"*/}
{/*showUploadList={false}*/}
{/*beforeUpload={this.beforeUpload}*/}
    {/*>*/}
    {/*{this.state.imageUrl? <img src={this.state.imageUrl}*/}
                               {/*height="100px" width="100px" /> : uploadButton}*/}

{/*</Upload>*/}
{/*<Upload beforeUpload={this.beforeUpload}>*/}
    {/*<Button>*/}
        {/*<Icon type="upload" /> Click to Upload*/}
    {/*</Button>*/}
{/*</Upload>*/}