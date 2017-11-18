import React, { Component } from 'react';
import { Router, Reducer, Scene } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthAction from './actions/auth';

import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import Driver from './components/driver';
import Music from './components/music';
import Watch from './components/watch';
import Result from './components/result';
import DriverHome from './components/driverHome';
import DriverAppHome from './components/driver_home';

import * as firebase from 'firebase';
import config from './lib/config';
const fierbaseApp = firebase.initializeApp(config.firebaseConfig);
// firebase.initializeApp(config.firebaseConfig);
// map redux store to props
function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

// map actions to props
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            Auth: bindActionCreators(AuthAction, dispatch),
        }
    }
}

const reducerCreate = params => {
    const defaultReducer = Reducer(params);

    return (state, action) => {
        console.log("ROUTER ACTION: ", action);
        return defaultReducer(state, action);
    }
}


export default class popuppin extends Component {
    render() {
        return(
            <Router createReducer={reducerCreate}>
                
                <Scene key="root">
                    <Scene key="login" component={Login} hideNavBar={true} intial/>
                    <Scene key="driverHome" component={DriverHome} hideNavBar={true}/>
                    
                    <Scene key="home" component={Home} hideNavBar={true}/>
                    <Scene key="result" component={Result} hideNavBar={true}/>
                    <Scene key="driver" component={Driver} hideNavBar={true}/>
                    <Scene key="watch" component={Watch} hideNavBar={true}/>
                    <Scene key="signup" component={Signup} hideNavBar={true} />
                    <Scene key="music" component={Music} hideNavBar={true} />
                    <Scene key="driver_home" component={DriverAppHome} hideNavBar={true} />
                    
                </Scene>
            </Router>
        );
    }
}
