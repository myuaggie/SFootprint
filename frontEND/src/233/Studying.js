import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Broadcast from './Broadcast';
import UploadFile from './UploadFile'
import Avatar from "@material-ui/core/Avatar";
import TeacherSetting from './TeacherSetting'
import QueryGrade from './QueryGrade'
import MyNotice from "./MyNotice";
import StudentSetting from "./StudentSetting";
import CourseRecommend from "./CourseRecommend";

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class Studying extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="个人资料" icon={<i className="material-icons">
                            account_box
                        </i>}/>
                        <Tab label="成绩查询" icon={<i className="material-icons">
                            library_books
                        </i>}/>
                        <Tab label="课程推荐" icon={<i className="material-icons">
                            library_books
                        </i>}/>
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    <StudentSetting/>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    <QueryGrade/>
                </TabContainer>}
                {value === 2 && <TabContainer>
                    <CourseRecommend/>
                </TabContainer>}
            </div>
        );
    }
}

Studying.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Studying);