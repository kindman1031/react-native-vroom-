import React, { Component } from 'react';
import { Router, Reducer, Scene } from 'react-native-router-flux';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthAction from './actions/auth';

import Login from './components/login';
import Signup from './components/signup';
import Forgot from './components/forgot';
import Home from './components/home';
import Driver from './components/driver';
import RNDrawerDemo from './components/music';

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
                    <Scene key="driver" component={Driver} hideNavBar={true}/>
                    
                    <Scene key="home" component={Home} hideNavBar={true} />
                    
                    <Scene key="signup" component={Signup} hideNavBar={true} />
                    <Scene key="forgot" component={Forgot} hideNavBar={true} />
                    
                    <Scene key="music" component={RNDrawerDemo} hideNavBar={true} />
                </Scene>
            </Router>
        );
    }
}
