import React, { Component } from 'react';
import './App.css';
import News from "./News";
import {HashRouter, Route} from 'react-router-dom';
import Dashboard from "./Dashboard";

class FirstPage extends Component {
    render() {
        return (
            <h1>主页</h1>
        );
    }
}

export default FirstPage;
