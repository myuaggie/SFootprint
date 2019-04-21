import { Upload, Icon, message } from 'antd';
import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import {MuiThemeProvider} from "@material-ui/core/es";
import $ from "jquery";


const styles = theme => ({
    root1: {
        flexGrow: 1,
        width: '200px',
        height:'40px',
        marginTop:'10px',
        backgroundColor: theme.palette.background.paper,
    },
});

class UploadFile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            course:"SE203",
            imageUrl:'',
         };
        this.beforeUpload=this.beforeUpload.bind(this);
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
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
        const uploadButton = (
            <div className={classes.root1}>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <br/>
                <InputLabel htmlFor="input-with-icon-adornment">点击上传学生成绩文件</InputLabel>
            </div>
        );
        return (
            <div align="center">
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">课程代码</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.course}
                        onChange={this.handleChange('course')}
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
                <br/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    accept="image/*"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                >
                    {this.state.imageUrl? <img src={this.state.imageUrl}
                                               height="100px" width="100px" /> : uploadButton}

                </Upload>

                <a href="1.txt" download="1.txt">
                    下载成绩</a>

            </div>

        );
    }
}

UploadFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadFile);
