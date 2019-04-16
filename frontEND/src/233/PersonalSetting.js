import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import {
      Form, FormGroup, ControlLabel, Glyphicon,
} from 'react-bootstrap';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    // textField: {
    //     flexBasis: 200,
    // },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 220,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});
const currencies = [
    {
        value: 'IT',
        label: 'IT',
    },
    {
        value: 'Financial',
        label: 'Financial',
    },
    {
        value: 'Math',
        label: 'Math',
    },
    {
        value: 'Music',
        label: 'Music',
    },
];


class PersonalSetting extends React.Component {
    state = {
        type:'student',
        id:'516123456789',
        realName:'王俊凯',
        name: "Karry",
        grade: '大一',
        major:'Financial',
        careerGoal:'Music',
        phone:'54749110',
        email:'KarryWang@sjtu.edu.cn',
        password: 'au123456789',
        showPassword: false,
        avatarUrl: "http://img5.imgtn.bdimg.com/it/u=2082125334,1947800039&fm=26&gp=0.jpg",
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props;

        return (
            <div align ="center">
                <Avatar src={this.state.avatarUrl}className={classes.bigAvatar}/>
                <br/>
                <InputLabel htmlFor="input-with-icon-adornment">{this.state.type}</InputLabel>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    face
                                </i>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        className={classes.textField}
                        variant="filled"
                        type={this.state.showPassword ? 'text' : 'password'}
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        startAdornment={
                            <InputAdornment position="start" onClick={this.handleClickShowPassword}>
                                 {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Id</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.id}
                        onChange={this.handleChange('id')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    folder_shared
                                </i>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">RealName</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.realName}
                        onChange={this.handleChange('realName')}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Grade</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.grade}
                        onChange={this.handleChange('grade')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    grade
                                </i>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Major</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.major}
                        onChange={this.handleChange('major')}
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
                <FormControl className={classes.margin}>
                    <TextField
                        select
                        label="CareerGoal"
                        className={classNames(classes.margin, classes.textField)}
                        value={this.state.careerGoal}
                        onChange={this.handleChange('careerGoal')}
                        InputProps={{
                            startAdornment:
                                <InputAdornment position="start">
                                    <i className="material-icons">
                                    sentiment_satisfied_alt
                                    </i>
                                </InputAdornment>,
                        }}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    sentiment_satisfied_alt
                                </i>
                            </InputAdornment>
                        }
                    >
                        {currencies.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </FormControl>
                <br/>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Phone</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.phone}
                        onChange={this.handleChange('phone')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    call
                                </i>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <br/>
                <Button color = "primary" variant="contained"
                        onClick = {this.handleInfo}>
                    提交修改
                </Button>

            </div>
        );
    }
}

PersonalSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PersonalSetting);

/*
* <InputAdornment position="start" onClick={this.handleClickShowPassword}>
                                <IconButton
                                    aria-label="Toggle password visibility"

                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
* */
/*
*    {this.state.type}
                {this.state.username}
                {this.state.password}
                {this.state.careerGoal}
                {this.state.grade}
                {this.state.phone}
                {this.state.realName}
                {this.state.major}
                {this.state.id}
* */