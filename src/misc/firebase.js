import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported, onMessage } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
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

const app = initializeApp(config);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export const functions = getFunctions(app, 'europe-west3');
export const messaging = isSupported() ? getMessaging(app) : null;

if (messaging) {
  onMessage(messaging, ({ notification }) => {
    const { title, body } = notification;
    Toast.info({ title, description: body, duration: 0 });
  });
}

if (isLocalhost) {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
