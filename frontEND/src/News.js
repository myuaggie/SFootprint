
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


class News extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            site:[],
            news:[[]]
        };
    }

    componentWillMount(){
        let temp = [];
        let siteTemp=[];
        for(let k = 0; k < 3; k++) {
            temp[k] = [];
        }
        fetch('http://localhost:5000/TeachingInformationService',{
            method:'GET',
            mode:'cors',
        })
            .then(response=>{
                return response.json()
                    .then(result=>{
                        temp[0] = result;
                        siteTemp.push(result[0].site);
            });
        });

        fetch('http://localhost:5000/SJTUNews',{
                method:'GET',
                mode:'cors',
            })
                .then(response=>{
                    return response.json()
                        .then(result=>{
                            temp[1] = result;
                            siteTemp.push(result[0].site);
                            this.setState({
                                news:temp,
                                site:siteTemp
                            });
                        });
                })


    };

    render() {
        const { classes } = this.props;
        return (
          <div>
              <MuiThemeProvider theme={theme}>
                  {this.state.site.map((site) => (
                      <div>
                  <Typography variant="subtitle1" gutterBottom>
                      {site}
                  </Typography>
                          <Divider/>
                  {this.state.news.map((item,i) => (
                      <div>
                          {item.map((item2) => (
                              <div>
                                  {item2.site === site
                                      ? <div><a href={item2.href} target="_blank">{item2.title}</a><br/></div>
                                      :""}
                                      </div>
                              ))
                          }


                          </div>

              ),this)
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

