import React, { Component } from 'react';
import './App.css';
import News from "./News";
import {Route} from "react-router-dom";
import HashRouter from "react-router-dom/es/HashRouter";
import Dashboard from "./Dashboard";

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Dashboard>
                    <Route path='/news' component={News}/>
                </Dashboard>
            </HashRouter>
        );
    }
}

export default App;
