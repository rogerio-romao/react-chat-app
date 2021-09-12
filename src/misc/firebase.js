import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const config = {
  apiKey: 'AIzaSyDV5BDzQiPikQLpMPend_eXiLAS1jtuAV0',
  authDomain: 'react-chat-app-fca7d.firebaseapp.com',
  projectId: 'react-chat-app-fca7d',
  storageBucket: 'react-chat-app-fca7d.appspot.com',
  messagingSenderId: '382346123103',
  appId: '1:382346123103:web:e38b0a6938ccdcba1b08ea',
  databaseURL:
    'https://react-chat-app-fca7d-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
