import React, { Component } from 'react';
import '../App.css';
import News from "../News";
import {HashRouter, Route} from 'react-router-dom';
import Dashboard from "../Dashboard";

class broadcast extends Component {
    render() {
        return (
            <h1>发布通知</h1>
        );
    }
}

export default broadcast;
