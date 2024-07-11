// @ts-nocheck


// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDiKMgXAyxHTNe37A9mq7CbflZCV_G080E',
  authDomain: 'elite-mediator.firebaseapp.com',
  projectId: 'elite-mediator',
  storageBucket: 'elite-mediator.appspot.com',
  messagingSenderId: '144513732823',
  appId: '1:144513732823:web:33a6a583a38005f582e092',
  measurementId: 'G-K8GD4K1D70'
});


const messaging = firebase.messaging();
