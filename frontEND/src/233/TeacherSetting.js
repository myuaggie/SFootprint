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
import db from './firebase.js';

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

class TeacherSetting extends React.Component {
    state = {
        type:"teacher",
        id:'4',
        realName:'李荣浩',
        name: "Karry",
        position:"Professor",
        major:'Financial',
        detail:'Music',
        phone:'54749110',
        email:'KarryWang@sjtu.edu.cn',
        password: 'au123456789',
        showPassword: false,
        avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1305425676,3454048999&fm=27&gp=0.jpg",
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleInfo= () => {
        db.collection("teacher")
            .doc(this.state.id.toString()).set(
            {
                type:this.state.type,
                id:this.state.id,
                realName:this.state.realName,
                name: this.state.name,
                position:this.state.position,
                major:this.state.major,
                detail:this.state.detail,
                phone:this.state.phone,
                email:this.state.email,
                password: this.state.password,
                avatarUrl: this.state.avatarUrl,
            })
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
                    <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
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
                        disabled
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
                        disabled
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
                    <InputLabel htmlFor="input-with-icon-adornment">Position</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.position}
                        disabled
                        onChange={this.handleChange('position')}
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
                        disabled
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
                    <InputLabel htmlFor="input-with-icon-adornment">Detail</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.detail}
                        onChange={this.handleChange('detail')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    more
                                </i>
                            </InputAdornment>
                        }
                    />
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
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    email
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

TeacherSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherSetting);

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
    id:1,
    realName:Maggie,
    name: Myu,
    grade: Bachelor Grade Three,
    major:SE,
    careerGoal:IT,
    phone:18621880739,
    email:920369216@qq.com,
    password: this.state.password,
    avatarUrl: https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b90e7bec54e736d10a64ec699c504fc2d562695f.jpg,
* */
/*
*     handleInfo= () => {
        db.collection(this.state.type)
            .doc(this.state.id.toString()).update(
            {
                type:this.state.type,
                id:this.state.id,
                realName:this.state.realName,
                name: this.state.name,
                grade: this.state.grade,
                major:this.state.major,
                careerGoal:this.state.careerGoal,
                phone:this.state.phone,
                email:this.state.email,
                password: this.state.password,
                avatarUrl: this.state.avatarUrl,
            })
    };
* */

/*
* import React from 'react';
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
import db from './firebase.js';

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

class TeacherSetting extends React.Component {
    state = {
        type:"teacher",
        id:'4',
        realName:'李荣浩',
        name: "Karry",
        position:"Professor",
        major:'Financial',
        detail:'Music',
        phone:'54749110',
        email:'KarryWang@sjtu.edu.cn',
        password: 'au123456789',
        showPassword: false,
        avatarUrl: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1305425676,3454048999&fm=27&gp=0.jpg",
    };

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleInfo= () => {
        db.collection("teacher")
            .doc(this.state.id.toString()).set(
            {
                type:this.state.type,
                id:this.state.id,
                realName:this.state.realName,
                name: this.state.name,
                position:this.state.position,
                major:this.state.major,
                detail:this.state.detail,
                phone:this.state.phone,
                email:this.state.email,
                password: this.state.password,
                avatarUrl: this.state.avatarUrl,
            })
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
                    <InputLabel htmlFor="input-with-icon-adornment">Name</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.username}
                        onChange={this.handleChange('Name')}
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
                        disabled
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
                        disabled
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
                    <InputLabel htmlFor="input-with-icon-adornment">Position</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.position}
                        disabled
                        onChange={this.handleChange('position')}
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
                        disabled
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
                    <InputLabel htmlFor="input-with-icon-adornment">Detail</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.detail}
                        onChange={this.handleChange('detail')}
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
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="material-icons">
                                    email
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

TeacherSetting.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeacherSetting);

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
    id:1,
    realName:Maggie,
    name: Myu,
    grade: Bachelor Grade Three,
    major:SE,
    careerGoal:IT,
    phone:18621880739,
    email:920369216@qq.com,
    password: this.state.password,
    avatarUrl: https://gss0.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b90e7bec54e736d10a64ec699c504fc2d562695f.jpg,
* */
/*
*     handleInfo= () => {
        db.collection(this.state.type)
            .doc(this.state.id.toString()).update(
            {
                type:this.state.type,
                id:this.state.id,
                realName:this.state.realName,
                name: this.state.name,
                grade: this.state.grade,
                major:this.state.major,
                careerGoal:this.state.careerGoal,
                phone:this.state.phone,
                email:this.state.email,
                password: this.state.password,
                avatarUrl: this.state.avatarUrl,
            })
    };
* */
