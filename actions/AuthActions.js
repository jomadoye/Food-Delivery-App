import firebase from 'firebase';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  PHONE_CHANGED,
  FIRSTNAME_CHANGED,
  LASTNAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGIN_STATUS_CHANGED,
  LOAD_WELCOME_CHANGED,
  EMAIL_RESET_CHANGED,
  FONT_LOADED_CHANGED,
  SIGNUP_USER,
  ERROR_SET,
} from './types';

import NavigatorService from './../utils/navigator';

const loginUserFail = (dispatch, errMessage) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: errMessage,
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });
};

export const errorSet = text => ({
  type: ERROR_SET,
  payload: text,
});

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const fontLoadedChanged = text => ({
  type: FONT_LOADED_CHANGED,
  payload: text,
});

export const emailResetChanged = text => ({
  type: EMAIL_RESET_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const phoneChanged = text => ({
  type: PHONE_CHANGED,
  payload: text,
});

export const firstnameChanged = text => ({
  type: FIRSTNAME_CHANGED,
  payload: text,
});

export const lastnameChanged = text => ({
  type: LASTNAME_CHANGED,
  payload: text,
});

export const loginStatusChanged = text =>
  // console.log ("login status : " + text);
  ({
    type: LOGIN_STATUS_CHANGED,
    payload: text,
  });
export const loadWelcomeChanged = text =>
  // console.log ("load Windows Screen : " + text);
  ({
    type: LOAD_WELCOME_CHANGED,
    payload: text,
  });
export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch({
    type: LOGIN_STATUS_CHANGED,
    payload: 'checking',
  });
  dispatch({ type: LOGIN_USER });
  try {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    loginUserSuccess(dispatch, user);
  } catch (error) {
    const errMessage = error.message;
    loginUserFail(dispatch, errMessage);
  }
};

export const resetUser = ({ email }) => async (dispatch) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    dispatch({
      type: ERROR_SET,
      payload: 'Reset Email Sent',
    });
  } catch (error) {
    const errMessage = error.message;
    dispatch({
      type: ERROR_SET,
      payload: errMessage,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: LOGIN_STATUS_CHANGED,
    payload: 'checking',
  });
  try {
    await firebase.auth().signOut();
  } catch (error) {
    dispatch({
      type: LOGIN_STATUS_CHANGED,
      payload: 'loggedin',
    });
  }
};

export const signupUser = ({
  email, password, phone, firstname, lastname,
}) => async (dispatch) => {
  dispatch({
    type: LOGIN_STATUS_CHANGED,
    payload: 'checking',
  });
  dispatch({ type: SIGNUP_USER });
  const displayName = `${firstname} ${lastname}`;

  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    user.updateProfile({ displayName });
    // write user properties to firebase
    firebase.database().ref(`/users/${user.uid}/userDetails`).set({
      email,
      phone,
      firstname,
      lastname,
      displayName,
    });
    // console.log(user);
    loginUserSuccess(dispatch, user);
    dispatch({
      type: ERROR_SET,
      payload: 'Welcome to our Online Shop',
    });
  } catch (error) {
    loginUserFail(dispatch);
  }
};

// Get message from firebase and do the reset
export const authStateChanged = () => (dispatch) => {
  let currentNavState;
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch({
        type: LOGIN_STATUS_CHANGED,
        payload: 'loggedin',
      });
      currentNavState = NavigatorService.getCurrentRoute();
      if (currentNavState.routeName !== 'main_screen') {
        NavigatorService.reset('main_screen');
      }
    } else {
      dispatch({
        type: LOGIN_STATUS_CHANGED,
        payload: 'notloggedin',
      });
      currentNavState = NavigatorService.getCurrentRoute();
      if (currentNavState.routeName !== 'welcome_screen') {
        NavigatorService.reset('welcome_screen');
      }
    }
  });
};

