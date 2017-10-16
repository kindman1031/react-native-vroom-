import React from 'react';
import { Actions } from 'react-native-router-flux';

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
} = require('../lib/constants').default;


export function login(email, password, callback) {
    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then((res) => {
          const itemsRef = firebase.database().ref('/users/'+res.uid);
          
          itemsRef.once('value', (snap) => {
            var params = {
              fullName: snap.val()['profile']['fullname'],
              address:snap.val()['profile']['address'],
              phoneNumber: snap.val()['profile']['phoneNumber'],
              email:snap.val()['profile']['email'],
              password:snap.val()['profile']['password'],
              image: snap.val()['profile']['image'],
              userid: res.uid,
            };
              dispatch({
                type: LOGIN_SUCCESS,
                payload: { user: params},
              });
              Actions.home();
              callback(); 
          });
          
        })
        .catch((error) => {
          Actions.home();
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

export function signup(email, password, fullName, address, phoneNumber, image, callback) {
    
    return dispatch => {    
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then((res) => {
        var imageUrl='default_avatar';
        if(image.uri!=null){
            uploadImage(res.uid,image.uri)
            .then(url => {  
                imageUrl=url;
                firebase.database().ref('users/'+res.uid+'/profile').set({
                    fullname: fullName,
                    address:address,
                    phoneNumber: phoneNumber,
                    email:email,
                    password:password,
                    image: imageUrl,
                });
                
                var params = {
                    fullName: fullName,
                    address:address,
                    phoneNumber: phoneNumber,
                    email:email,
                    password:password,
                    image: imageUrl,
                    userid: res.uid,
                };
                dispatch({
                    type: SIGNUP_SUCCESS,
                    payload: { user: params},
                });
                Actions.home();
                callback();  
            })
            .catch(error => {
                console.log(error);
                Actions.home();
            });
        }
        else{
            firebase.database().ref('users/'+res.uid+'/profile').set({
                fullname: fullName,
                address:address,
                phoneNumber: phoneNumber,
                email:email,
                password:password,
                image: imageUrl,
            });
            
            var params = {
                fullName: fullName,
                address:address,
                phoneNumber: phoneNumber,
                email:email,
                password:password,
                image: imageUrl,
                userid: res.uid,
            };
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: { user: params},
            });
            Actions.home();
            callback(); 
        }
            
        })
        .catch((error) => {
            Actions.home();
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



