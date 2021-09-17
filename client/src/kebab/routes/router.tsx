import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { forgotpassword } from '../components/forgotpassword';
import Home from '../components/home'
import Signup from '../components/signup';
import {DisplayUser} from '../components/UserProfile';
function MyRouter() {
    return (
        <Router>

            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/signup" component={Signup}></Route>
                <Route exact path="/forgotpassword" component={forgotpassword}></Route>
                <Route exact path="/user/:username" component={DisplayUser}></Route>
            </Switch>

        </Router>

    );

}


export default MyRouter