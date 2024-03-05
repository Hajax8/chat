import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDYwwaXv_o9bdrG0MA3_Gdv3ZDOPijOmHU",
    authDomain: "chat-d227a.firebaseapp.com",
    projectId: "chat-d227a",
    storageBucket: "chat-d227a.appspot.com",
    messagingSenderId: "716102977391",
    appId: "1:716102977391:web:ecac103a95bf5831d84a9a"
  };

  initializeApp(firebaseConfig);

  const firestore = getFirestore();

  const MESSAGES = 'messages'

  export{
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    MESSAGES,
    getAuth,
    signInWithEmailAndPassword,
  }