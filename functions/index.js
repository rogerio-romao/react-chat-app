/* eslint-disable object-curly-spacing */
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    'https://react-chat-app-fca7d-default-rtdb.europe-west1.firebasedatabase.app',
});

const { sendFcm } = require('./src/fcm');
exports.sendFcm = sendFcm;
