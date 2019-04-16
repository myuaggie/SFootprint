import React, { Component } from 'react';
import './App.css';
import News from "./News";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "./Dashboard";
import FirstPage from "./FirstPage";
import personalSetting from "./233/personalSetting";
import broadcast from "./233/broadcast";
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
                        <Route path='/personalSetting' component={personalSetting}/>
                        <Route path='/broadcast' component={broadcast}/>
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
