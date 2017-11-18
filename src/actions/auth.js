import React from 'react';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import _ from 'lodash';

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    DEST_SUCCESS,
    DRIVER_SUCCESS,
    WATCH_SUCCESS,
} = require('../lib/constants').default;


export function login(email, password, callback) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((res) => {
            
          const itemsRef = firebase.database().ref('/role/'+res.uid);
          var role="";
          itemsRef.once('value', (snap) => { 
            
              role = snap.val()["role"];
              if(role == "passenger"){
                const itemsRef1 = firebase.database().ref('/Passenger/'+res.uid);
                itemsRef1.once('value', (snap) => { 
                    var params = {
                      fname: snap.val()['fname'],
                      lanme:snap.val()['lname'],
                      phone: snap.val()['phone'],
                      email:snap.val()['email'],
                      userid: res.uid,
                    };
                      dispatch({
                        type: LOGIN_SUCCESS,
                        payload: { user: params},
                      });
                      
                      
                  });
                Actions.home();
                callback();
              }
              else{
                firebase.database().ref('role/'+res.uid).set({
                    role: "driver",
                    flag: "signin",
                });
                Actions.driver_home();
                callback();
              }
                // alert(role);
                
              
          });

        })
        .catch((error) => {
          Actions.login();
          callback();
          alert(error);
        })
    }
  }
  
export function logout() {
    return dispatch => {

        firebase.auth().signOut()
        .then(()=>{
            Actions.login();
        })
        .catch((error)=>{
            alert(error);
        })
    }
}

export function signup(fname, lname, title, major, email, phone, password, role, callback) {
    
    return dispatch => {    
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((res) => {
        
            if(role == "Driver"){
                firebase.database().ref('Driver/'+res.uid).set({
                    fname: fname,
                    lname:lname,
                    phone: phone,
                    email:email,
                    majordept:major,
                    title:title,
                });
                firebase.database().ref('role/'+res.uid).set({
                    role: "driver",
                    flag: "not",
                });
            }
            else{
                firebase.database().ref('Passenger/'+res.uid).set({
                    fname: fname,
                    lname:lname,
                    phone: phone,
                    email:email,
                    majordept:major,
                    title:title,
                });
                firebase.database().ref('role/'+res.uid).set({
                    role: "passenger",
                });
            }
            
            
            Actions.login();
            callback(); 
        
            
        })
        .catch((error) => {
            Actions.login();
            callback();
        });
        
    }
}

export function sendForgot(email, callback) {
    
    return dispatch => {    
      firebase.auth().sendPasswordResetEmail(email)
      .then((res) => {
        Actions.login();
        callback();
            
      })
      .catch((error) => {
        Actions.home();
        callback();
        
      });
      
    }
  }

  export function next(destination, callback) {
    return dispatch => {
        const itemsRef = firebase.database().ref('/role');
        itemsRef.once('value', (snap) => { 
            var roleLi = snap.val();
            var keyLi = [];
            _.map(roleLi, (obj, key) => {
                
                if(obj.flag == "signin"){
                    keyLi.push(key);
                }
                
            })

            const itemsRef1 = firebase.database().ref('/Driver');
            itemsRef1.once('value', (snap) => { 
                let ddLi = snap.val();
                var driverLi = {}
                _.map(ddLi, (obj1, key1) => {
                    
                    keyLi.forEach(function(element) {
                        if(key1==element){
                            
                            driverLi[key1] = obj1;
                            
                        }
                    }, this);
                    
                })

                // console.log("ttttttt",driverLi);
    
                var params = {
                    dest: destination,
                    dirverList:driverLi,
                };
                  dispatch({
                    type: DEST_SUCCESS,
                    payload: { dest: params },
                  });
               
                Actions.driver();
                
                callback();
            });

        });
        
        
        
    }
  }

  export function nexttoWatch(driver, callback) {
    return dispatch => {
        const itemsRef = firebase.database().ref('/VRContent');
        itemsRef.once('value', (snap) => {
            
            var params = {
                sel_driver: driver,
                watchList:snap.val(),
            };
              dispatch({
                type: DRIVER_SUCCESS,
                payload: { watch: params },
              });
           
            Actions.watch();
            
            callback();
        });
        
        
    }
  }

  export function nexttoMusic(watch, callback) {
    return dispatch => {
        const itemsRef = firebase.database().ref('/Music');
        itemsRef.once('value', (snap) => {
            
            var params = {
                sel_watch: watch,
                musicList:snap.val(),
            };
              dispatch({
                type: WATCH_SUCCESS,
                payload: { music: params },
              });
           
            Actions.music();
            
            callback();
        });
        
        
    }
  }


  export function nexttoFinal(music, callback) {
    return dispatch => {
        const itemsRef = firebase.database().ref('/Music');
        itemsRef.once('value', (snap) => {
            
            var params = {
                sel_music: music,
            };
              dispatch({
                type: WATCH_SUCCESS,
                payload: { final: params },
              });
           
            Actions.result();
            
            callback();
        });
        
        
    }
  }

