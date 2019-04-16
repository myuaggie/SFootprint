
import React from 'react';
import Divider from "@material-ui/core/es/Divider/Divider";
import PropTypes from 'prop-types';
import List from "@material-ui/core/es/List/List";
import ListItem from "@material-ui/core/es/ListItem/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
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
import Button from "@material-ui/core/es/Button/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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
});


class DealApply extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            textTitle:'',
            textContent:''
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    handleTitleChange(value){
        this.setState({ textTitle: value});
    }
    handleContentChange(value){
        this.setState({ textContent: value});
    }
    componentWillMount() {
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
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

                   

                </MuiThemeProvider>
            </div>
        );
    }
}

DealApply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DealApply);

