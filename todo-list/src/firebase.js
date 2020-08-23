import firebase from 'firebase';

const firebaseConfig = {
  apiKey: '******',
  authDomain: '******',
  databaseURL: '******',
  projectId: '******',
  storageBucket: '******',
  messagingSenderId: '******',
  appId: '******',
  measurementId: '******',
};

const firebaseApp = firebase.initializeApp({
  ...firebaseConfig,
});
const db = firebaseApp.firestore();
export default db;
