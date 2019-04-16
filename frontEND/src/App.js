import React, { Component } from 'react';
import './App.css';
import News from "./News";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "./Dashboard";
import FirstPage from "./FirstPage";
import PersonalSetting from "./233/PersonalSetting";
import Working from "./233/Working"
import Apply from "./Apply";
import DealApply from "./DealApply";


class App extends Component {
    render() {
        return (
            <div>
            <BrowserRouter>
                <Dashboard>
                    <Switch>
                        <Route exact path='/' component={FirstPage}/>
                        <Route path='/news' component={News}/>
                        <Route path='/personalSetting' component={PersonalSetting}/>
                        <Route path='/working' component={Working}/>
  						<Route path='/apply' component={Apply}/>
                        <Route path='/dealApply' component={DealApply}/>
                    </Switch>
                </Dashboard>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;
