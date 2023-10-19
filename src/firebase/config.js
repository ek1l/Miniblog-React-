import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAIBKGVubHImTHOOSP2klRx4_UrceLXgeY',
  authDomain: 'miniblog-22f3f.firebaseapp.com',
  projectId: 'miniblog-22f3f',
  storageBucket: 'miniblog-22f3f.appspot.com',
  messagingSenderId: '130986783304',
  appId: '1:130986783304:web:1cd581ddc9e2ed482c1e7d',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
