import React, { Component } from 'react';
import './App.css';
import News from "./News";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "./Dashboard";
import FirstPage from "./FirstPage";
import PersonalSetting from "./233/PersonalSetting";
import Working1 from "./233/Working1"
import Working2 from "./233/Working2"
import Apply from "./Apply";
import DealApply from "./DealApply";
import Footprint from "./Footprint";
import Studying from "./233/Studying";

class App extends Component {
    render() {
        return (
            <div>
            <BrowserRouter>
                <Dashboard>
                    <Switch>
                        <Route exact path='/' component={FirstPage}/>
                        <Route path='/news' component={News}/>
                        <Route path='/personalSetting' component={Studying}/>
                        <Route path='/working1' component={Working1}/>
                        <Route path='/working2' component={Working2}/>
  						<Route path='/apply' component={Apply}/>
                        <Route path='/dealApply' component={DealApply}/>
                        <Route path='/footprint' component={Footprint}/>
                    </Switch>
                </Dashboard>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;
