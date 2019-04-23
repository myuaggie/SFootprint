
import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, withStyles} from "@material-ui/core/styles/index";
import blueGrey from "@material-ui/core/colors/blueGrey";
import {MuiThemeProvider} from "@material-ui/core/es/styles/index";
import 'react-quill/dist/quill.snow.css';
import $ from "jquery";
import { Table, Popconfirm } from "antd";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

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
            approvedApply:[]
        };

        this.columnsApproved = [
            {
                title: "用户名",
                dataIndex: "username",
                width: "30%",
            },
            {
                title: "申请表",
                dataIndex: "title",
                width: "30%",
                render: (text, record) => <a href={record.url}  target="_blank">{text}</a>,
            },
        ];

        this.columns = [
            {
                title: "用户名",
                dataIndex: "username",
                width: "30%",
            },
            {
                title: "申请表",
                dataIndex: "title",
                width: "30%",
                render: (text, record) => <a href={record.url}  target="_blank">{text}</a>,
            },
            {
                title: "operation",
                dataIndex: "operation",
                render: (text, record) =>
                    this.state.unapprovedApply.length >= 1 ? (
                        <Popconfirm
                            title="审批通过?"
                            onConfirm={() => this.handleDelete(record)}
                        >
                            <a href="javascript:;">点击审批通过</a>
                        </Popconfirm>
                    ) : null
            }
        ];
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete = record => {
        let dataSource = [...this.state.unapprovedApply];
        this.setState({ unapprovedApply: dataSource.filter(item => item.key !== record.key) });

        let itemListApproved = this.state.approvedApply;
        let add = {
            "url": 'http://47.103.7.215:8080/file/U3380821163e707/SJTULife/Apply/' + record.key,
            "title": record.title,
            "key": record.key,
            "username": record.username
        };
        itemListApproved.push(add);
        this.setState({approvedApply:itemListApproved});

        let data= {
            username:record.username,
            filename: record.title,
            status:1,
        };

        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Apply/"+record.key,
            type: "PUT",
            data: JSON.stringify(data),
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
            }
        });
    };


    componentWillMount() {
        $.ajax({
            url: "http://47.103.7.215:8080/Entity/U3380821163e707/SJTULife/Apply",
            type: "GET",
            dateType:'json',
            headers:{'Content-Type':'application/json'},
            contentType: false,
            processData: false,
            success: function (data) {
                let dataObj = data["Apply"];
                let itemListUnapproved = [];
                let itemListApproved = [];
                for (let i in dataObj){
                    if(dataObj[i].status===0) {
                        let add = {
                            "url": 'http://47.103.7.215:8080/file/U3380821163e707/SJTULife/Apply/' + dataObj[i].id,
                            "title": dataObj[i].filename,
                            "key": dataObj[i].id,
                            "username": dataObj[i].username
                        };
                        itemListUnapproved.push(add);
                        console.log("itemListUnapproved:"+dataObj[i].id);
                    }

                    else{
                        let add = {
                            "url": 'http://47.103.7.215:8080/file/U3380821163e707/SJTULife/Apply/' + dataObj[i].id,
                            "title": dataObj[i].filename,
                            "key": dataObj[i].id,
                            "username": dataObj[i].username
                        };
                        itemListApproved.push(add);
                    }
                }

                this.setState({
                    unapprovedApply: itemListUnapproved ,
                    approvedApply:itemListApproved
                });
            }.bind(this)
        });
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };


    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                        >
                            <Tab label="未审批" />
                            <Tab label="已审批" />
                        </Tabs>
                    </AppBar>

                    {value === 0 &&
                    <TabContainer>
                        <Table
                            bordered
                            dataSource= {this.state.unapprovedApply}
                            columns={this.columns}
                        />
                    </TabContainer>}
                    {value === 1 &&
                    <TabContainer>
                        <Table columns={this.columnsApproved} dataSource={this.state.approvedApply} />
                    </TabContainer>}
                </MuiThemeProvider>
            </div>
        );
    }
}

DealApply.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DealApply);

