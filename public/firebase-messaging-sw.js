/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyDV5BDzQiPikQLpMPend_eXiLAS1jtuAV0',
  authDomain: 'react-chat-app-fca7d.firebaseapp.com',
  projectId: 'react-chat-app-fca7d',
  storageBucket: 'react-chat-app-fca7d.appspot.com',
  messagingSenderId: '382346123103',
  appId: '1:382346123103:web:e38b0a6938ccdcba1b08ea',
  databaseURL:
    'https://react-chat-app-fca7d-default-rtdb.europe-west1.firebasedatabase.app',
});

firebase.messaging();
