
import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {MuiThemeProvider} from "@material-ui/core/es/styles/index";
import 'react-quill/dist/quill.snow.css';
import $ from "jquery";
import {Table, Popconfirm, Button} from "antd";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Timeline, Icon } from 'antd';
import { Input } from 'antd';



const { TextArea } = Input;
const myDate = new Date();
const year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
const month = myDate.getMonth()+1;       //获取当前月份(1-12)
const day = myDate.getDate();        //获取当前日(1-31)
const newDay = year + "-" + month + "-" + day;

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },

};

class DealApply extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            unapprovedApply: [],
            approvedApply:[],
            newRecordBool:false,
            newRecord:''
        };
    }

    handleClick =() =>{
        let input = document.getElementById("input");
        this.setState({
            newRecordBool:true,
            newRecord:input.value
        });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div>
                <br/>
                <TextArea id="input" placeholder="记录生活，记录每一天"/>
                <br/> <br/>
                <Button onClick={this.handleClick}>提交</Button>
                <br/> <br/>
                <Timeline mode="alternate">
                    {this.state.newRecordBool &&
                    <Timeline.Item>
                        {newDay}{"  "}{this.state.newRecord}
                    </Timeline.Item>
                    }
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        2019-02-24 大三下开学
                    </Timeline.Item>
                    <Timeline.Item>
                        2018-10-22 获得B类奖学金
                    </Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        2018-09-10 大三上开学
                    </Timeline.Item>
                    <Timeline.Item color="green">
                        2018-03-30 半马志愿者
                    </Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        2018-02-24 大二下开学
                    </Timeline.Item>
                    <Timeline.Item>
                        2017-10-21 获得A类奖学金
                    </Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        2017-09-10 大二上开学
                    </Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        2017-02-23 大一下开学
                    </Timeline.Item>
                    <Timeline.Item color="red">
                        2016-12-10 申请贫困补助
                    </Timeline.Item>
                    <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                        2016-09-10 大一上开学
                    </Timeline.Item>
                </Timeline>,

            </div>
        );
    }
}

DealApply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DealApply);

