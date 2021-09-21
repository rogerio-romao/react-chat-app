import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/messaging';
import 'firebase/compat/functions';
import { Notification as Toast } from 'rsuite';

import { isLocalhost } from './helpers';

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

export const fcmVapidKey =
  'BFXWNb7Y0f0oI2shgycRXdlxeZzt-su2iZ-W0O6H4iYUtx-BaWvjlG5x4XKBQiEHZ2QPZXcr_IZGHDVnATBX370';

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
export const functions = app.functions('europe-west1');
export const messaging = firebase.messaging.isSupported()
  ? app.messaging()
  : null;

if (messaging) {
  messaging.onMessage(({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  functions.useEmulator('localhost', 5001);
}
