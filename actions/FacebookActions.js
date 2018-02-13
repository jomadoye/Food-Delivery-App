// import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import firebase from 'firebase';
import { fbappid } from './../config/auth';
// import { emailChanged, passwordChanged, signupUser } from '../actions';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  LOGIN_STATUS_CHANGED,
  ERROR_SET,
} from './types';


export const facebookSignin = () => async (dispatch) => {
  dispatch({
    type: LOGIN_STATUS_CHANGED,
    payload: 'fbchecking',
  });


  const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
    permissions: ['public_profile', 'email'],
  });

  if (type === 'cancel') {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'fbloginfailed',
    });
    return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
  }

  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  try {
    const user = await firebase.auth().signInWithCredential(credential);
    const emailcheck = await firebase.database().ref(`/users/${user.uid}/userDetails/email`).once('value');
    const emailcheckflag = emailcheck.val();

    if (emailcheckflag) {
      // update user properties to firebase
      firebase.database().ref(`/users/${user.uid}/userDetails`).update({
        fbEmail: user.email,
        fbDisplayName: user.displayName,
        fbPhotoURL: user.photoURL,
      });
    }
  } catch (error) {
    const errMessage = error.message;
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'notloggedin',
    });
    dispatch({
      type: ERROR_SET,
      payload: errMessage,
    });
  }
  // // await AsyncStorage.setItem('fb_token', token);
  // if (emailcheckflag) {
  //   dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  // } else {
  //   // case where the user has signed in without signing up.
  //   await firebase.auth().signOut();
  //   dispatch({ type: ERROR_SET, payload: 'Please Register first ...' });
  // }
};

export const facebookSignup = ({
  email, phone, firstname, lastname,
}) => async (dispatch) => {
  dispatch({
    type: LOGIN_STATUS_CHANGED,
    payload: 'fbchecking',
  });

  const { type, token } = await Facebook.logInWithReadPermissionsAsync(fbappid, {
    permissions: ['public_profile', 'email'],
  });


  if (type === 'cancel') {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'fbloginfailed',
    });
    return (dispatch({ type: FACEBOOK_LOGIN_FAIL }));
  }

  const credential = firebase.auth.FacebookAuthProvider.credential(token);

  try {
    const user = await firebase.auth().signInWithCredential(credential);
    const displayName = `${firstname} ${lastname}`;
    // write user properties to firebase
    firebase.database().ref(`/users/${user.uid}/userDetails`).set({
      email,
      phone,
      firstname,
      lastname,
      displayName,
      fbEmail: user.email,
      fbDisplayName: user.displayName,
      fbPhotoURL: user.photoURL,
    });
    dispatch({
      type: ERROR_SET,
      payload: 'Welcome to our online shop',
    });
  } catch (error) {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'notloggedin',
    });
    const errMessage = error.message;
    dispatch({
      type: ERROR_SET,
      payload: errMessage,
    });
  }
  // await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
