
import React from 'react';

import PropTypes from 'prop-types';

import Typography from "@material-ui/core/es/Typography/Typography";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {MuiThemeProvider} from "@material-ui/core/es/styles/index";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Table, Divider, Tag } from 'antd';
import {
    Upload, message, Button, Icon,
} from 'antd';
import 'antd/dist/antd.css';
import $ from 'jquery';



const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
    },

});

const styles = theme => ({
    button: {
        align: "center",
        margin: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
});



class UploadGrade extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            textTitle:'',
            textContent:'',
            id:"",
            filename:[],
            applyStatus:[],
            courseid:"CS203"
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
    }

    handleTitleChange(value){
        this.setState({ textTitle: value});
    }
    handleContentChange(value){
        this.setState({ textContent: value});
    }

    componentWillMount() {

        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Upload?Upload.status==2",
            type: "GET",
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                let dataObj = data["Upload"];
                let temp='';
                let itemList = [];
                for (let i in dataObj){
                    if(dataObj[i].status===0){
                        temp={"filename":dataObj[i].filename,
                            "reply":"已提交",}
                    }
                    else{
                        temp={"filename":dataObj[i].filename,
                            "reply":"已审批",}
                    }
                    itemList.push(temp);
                }
                this.setState({ applyStatus: itemList});
            }.bind(this)
        });

    }

    beforeUpload=(file)=>{
        let newfilename = this.state.filename;
        newfilename.push(file.name);
        this.setState({ filename: newfilename});
        let data= {
            filename: file.name,
        };

        /*生成 id*/
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Upload",
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
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Upload?Upload.filename="+file.name,
            type: "GET",
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                let dataObj = data["Upload"];
                this.setState({ id: dataObj[0].id});
            }.bind(this)
        });


        let formData = new FormData();
        formData.append('filename', file);
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Upload/"+this.state.id,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                alert("成功提交!");
            }
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>

                <Divider orientation="left">提交成绩表</Divider>
                    <Upload beforeUpload={this.beforeUpload}>
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>

                <Button block>点击提交</Button>

            </div>
        );
    }
}

UploadGrade.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadGrade);

