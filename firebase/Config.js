import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp, collection, addDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {

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