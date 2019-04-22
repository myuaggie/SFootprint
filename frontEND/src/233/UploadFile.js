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
            courseid:"SE203",
            imageUrl:'',
            year:'2019-1',
            filename:[],
            id:"",
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
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/File?File.filename="+file.name,
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
                <Divider orientation="left">提交成绩表</Divider>
                <Upload beforeUpload={this.beforeUpload}>
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
                <br/>
            </div>

        );
    }
}

UploadFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadFile);
