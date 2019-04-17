
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

const columns = [{
    title: '申请表',
    dataIndex: 'filename',
}, {
    title: 'Reply',
    dataIndex: 'reply',
}];

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



class Apply extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            textTitle:'',
            textContent:'',
            id:"",
            filename:[],
            applyStatus:[]
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
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Apply?Apply.username=Winny",
            type: "GET",
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                let dataObj = data["Apply"];
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
            username:"Winny",
            filename: file.name,
            status:0,
        };

        /*生成 id*/
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Apply",
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
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Apply?Apply.filename="+file.name,
            type: "GET",
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                let dataObj = data["Apply"];

                this.setState({ id: dataObj[0].id});
            }.bind(this)
        });


        let formData = new FormData();
        formData.append('filename', file);
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Apply/"+this.state.id,
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
                    <Divider orientation="left">奖学金申请</Divider>
                    <a href="http://xsb.seiee.sjtu.edu.cn/content/fileUpload.action?method=downFileById&amp;fileId=10EE264FA2DE4F46955C9D1AC7FAFC42" download="2019wish奖学金申请表.xls">
                        2019wish奖学金申请表</a>
                    <br/>
                    <a href="http://xsb.seiee.sjtu.edu.cn/content/fileUpload.action?method=downFileById&amp;fileId=50761A3DBAB44F7FB1135707FEA5FA02" download="2019心动奖学金申请表.xls">
                        2019心动奖学金申请表</a>
                    <Divider orientation="left">贫困生补助申请</Divider>
                    <a href="http://affairs.sjtu.edu.cn/file_save/ueditor/jsp/upload/20181102/96671541154208261.docx" target="_self" textvalue="上海交通大学补充助学金申请表（新评、续评通用）">上海交通大学补充助学金申请表（新评、续评通用）</a>
                    <br/>
                    <a href="http://affairs.sjtu.edu.cn/file_save/ueditor/jsp/upload/20181102/9061541154164192.docx" target="_self" textvalue="上海交通大学补充助学金取消续评表（通用）">上海交通大学补充助学金取消续评表（通用）</a>

                <Divider orientation="left">提交申请表</Divider>
                    <Upload beforeUpload={this.beforeUpload}>
                        <Button>
                            <Icon type="upload" /> Click to Upload
                        </Button>
                    </Upload>
                <br/>
                    <Divider orientation="left">申请表提交状态</Divider>
                    <Table columns={columns} dataSource={this.state.applyStatus} />


                    <Divider orientation="left">其他申请</Divider>

                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <AccountCircleIcon/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="申请人" />
                        </Grid>
                    </Grid>
                    <br/>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <ArrowRightIcon/>
                        </Grid>
                        <Grid item>
                            <TextField id="input-with-icon-grid" label="申请主题" />
                        </Grid>
                    </Grid>
                    <br/>

                    <ReactQuill theme="snow"
                                value={this.state.textContent}
                                modules={this.tools}
                                placeholder="申请内容" onChange={this.handleContentChange}/>
                    <br/>
                <Button block>点击提交</Button>

            </div>
        );
    }
}

Apply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Apply);

