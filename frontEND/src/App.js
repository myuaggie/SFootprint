import React, { Component } from 'react';
import './App.css';
import News from "./News";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "./Dashboard";
import FirstPage from "./FirstPage";

class App extends Component {
    render() {
        return (
            <div>
            <BrowserRouter>
                <Dashboard>
                    <Switch>
                        <Route exact path='/' component={FirstPage}/>
                        <Route path='/news' component={News}/>
                    </Switch>
                </Dashboard>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;
