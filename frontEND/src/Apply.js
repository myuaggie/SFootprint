
import React from 'react';
import Divider from "@material-ui/core/es/Divider/Divider";
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



class Apply extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            textTitle:'',
            textContent:''
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.beforeUpload = this.beforeUpload.bind(this);
        this.click = this.click.bind(this);
    }



    click(){
        let formData = new FormData();
        formData.append("username", "Vermouth");
        formData.append("password", "llh123");
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U6b703f828303/SFootprint/User",
            type: "POST",
            data: formData,
            dateType:'json',
            contentType:false,
            processData:false,
            headers:{'Content-Type':'application/json;charset=utf8'},
            success: function (data) {
                console.log(data);
            }
        });
    }

    handleTitleChange(value){
        this.setState({ textTitle: value});
    }
    handleContentChange(value){
        this.setState({ textContent: value});
    }
    componentWillMount() {

    }

    beforeUpload=(file)=> {
        let formData = new FormData();
        formData.append("file", file);
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U1b3f54782445b8/bus/Bus/1",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            }
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button type="primary" onClick={this.click}>Primary</Button>
                <Upload beforeUpload={this.beforeUpload}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <MuiThemeProvider theme={theme}>


                <Typography variant="subtitle1" gutterBottom>
                    奖学金申请
                </Typography>
                <Divider/>
                    <a href="http://xsb.seiee.sjtu.edu.cn/content/fileUpload.action?method=downFileById&amp;fileId=10EE264FA2DE4F46955C9D1AC7FAFC42" download="2019wish奖学金申请表.xls">
                        2019wish奖学金申请表</a>
                    <br/>
                    <a href="http://xsb.seiee.sjtu.edu.cn/content/fileUpload.action?method=downFileById&amp;fileId=50761A3DBAB44F7FB1135707FEA5FA02" download="2019心动奖学金申请表.xls">
                        2019心动奖学金申请表</a>
                    <br/><br/>

                    <Typography variant="subtitle1" gutterBottom>
                        贫困生补助申请
                    </Typography>
                    <Divider/>
                    <a href="http://affairs.sjtu.edu.cn/file_save/ueditor/jsp/upload/20181102/96671541154208261.docx" target="_self" textvalue="上海交通大学补充助学金申请表（新评、续评通用）">上海交通大学补充助学金申请表（新评、续评通用）</a>
                    <br/>
                    <a href="http://affairs.sjtu.edu.cn/file_save/ueditor/jsp/upload/20181102/9061541154164192.docx" target="_self" textvalue="上海交通大学补充助学金取消续评表（通用）">上海交通大学补充助学金取消续评表（通用）</a>

                    <br/>

                    <br/>

                    <Typography variant="subtitle1" gutterBottom>
                        其他申请
                    </Typography>
                    <Divider/>

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

                </MuiThemeProvider>
            </div>
        );
    }
}

Apply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Apply);

