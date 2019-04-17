
import React from 'react';

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
import { Divider } from 'antd';
import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

const theme = createMuiTheme({
    palette: {
        primary: blueGrey,
    },
});

const styles = theme => ({
    eye: {
        color: blueGrey[500],
    },
});

const treeChildrenChildren11=[
    {
        title: '电院教务办本科生',
        value: '电院教务办本科生',
        key: '0-0-0',
    },
    {
        title: '电院教务办研究生',
        value: '电院教务办研究生',
        key: '0-0-1',
}];

const treeChildren1 =[
    {
        title: '电院教务办',
        value: '电院教务办',
        key: '0-0',
        children: treeChildrenChildren11
    },
    {
        title: '电院学生处',
        value: '电院学生处',
        key: '0-1',
    }
];

const treeChildren2 =[
    {
        title: '安泰教务办',
        value: '安泰教务办',
        key: '1-0',
    },
    {
        title: '安泰学生处',
        value: '安泰学生处',
        key: '1-1',
    }
];

const treeData = [
    {
        title: '电子信息与电气工程学院',
        value: '0-0',
        key: '0',
        children: treeChildren1
    },
    {
        title: '安泰经济与管理学院',
        value: '0-1',
        key: '1',
        children: treeChildren2
    }];


class News extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            site:["上海交大新闻网", "教学信息服务网"],
            news:[],
            value: undefined,
            moreNews:[]
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange = (value) => {
        console.log(value);
        this.setState({ value });
        fetch('http://localhost:5000/EENews',{
            method:'GET',
            mode:'cors',
        })
            .then(response=>{
                return response.json()
                    .then(result=>{
                        console.log("EEnews:"+result);
                        let siteTemp = this.state.site;
                        siteTemp.push(value);
                        let newsTemp = this.state.news;
                        for(let i in result){
                            newsTemp.push(result[i]);
                        }
                        this.setState({
                            news:newsTemp,
                            site:siteTemp
                        });
                    });
            });
    };

    componentWillMount(){
        fetch('http://localhost:5000/SJTUNews',{
            method:'GET',
            mode:'cors',
        })
            .then(response=>{
                return response.json()
                    .then(result=>{
                        this.setState({
                            news:result,
                        });
            });
        });

    };

    render() {
        const { classes } = this.props;

        return (
          <div>
              <MuiThemeProvider theme={theme}>
                  <TreeSelect
                      style={{ width: 300 }}
                      value={this.state.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="点击选择其他校园资讯"
                      treeDefaultExpandAll
                      onChange={this.onChange}
                  >
                  </TreeSelect>


                  {this.state.site.map((site) => (
                      <div>
                          <Divider orientation="left">{site}</Divider>
                          {this.state.news.map((item) => (
                              <div>
                                  {item.site === site
                                      ? <div><a href={item.href} target="_blank">{item.title}</a><br/></div>
                                      : ""}
                              </div>

                          ), this)
                          }
                          <br/><br/>
                      </div>
                  ))
                  }




              </MuiThemeProvider>
          </div>
        );
    }
}

News.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(News);

