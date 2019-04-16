import { Upload, Icon, message } from 'antd';
import React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";


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
            imageUrl:'',
         };
        this.beforeUpload=this.beforeUpload.bind(this);
    }

    beforeUpload=(file)=> {
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     message.error('You can only upload JPG file!');
        // }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend =  () => {
            this.setState({
                imageUrl: reader.result,
            });
        };
        this.props.setFile(file);
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
                <br/>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    accept="image/*"
                    showUploadList={false}
                   // beforeUpload={this.beforeUpload}
                >
                    {this.state.imageUrl? <img src={this.state.imageUrl}
                                               height="100px" width="100px" /> : uploadButton}

                </Upload>
            </div>

        );
    }
}

UploadFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadFile);
