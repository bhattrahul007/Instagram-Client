import { initializeApp } from 'firebase/app';
import { FieldValue } from 'firebase/firestore';
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCAyGumVE_Js9XznSo6qgOwNfVFak9HPgU',
  authDomain: 'instagram-ui-d271d.firebaseapp.com',
  projectId: 'instagram-ui-d271d',
  storageBucket: 'instagram-ui-d271d.appspot.com',
  messagingSenderId: '740018409442',
  appId: '1:740018409442:web:69a6135d0081138065b3bb',
};

const firebase = initializeApp(config);
// const firestore = getFirestore(firebase);

// do it only once
// seedDatabase(firestore);

export { FieldValue, firebase };
