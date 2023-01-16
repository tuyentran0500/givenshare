// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: Hide these info in local.env
const firebaseConfig = {
  apiKey: 'AIzaSyCBxFJPM1AWUdcbttdVUSYy896Tcyuz7So',
  authDomain: 'givenshareauth.firebaseapp.com',
  projectId: 'givenshareauth',
  storageBucket: 'givenshareauth.appspot.com',
  messagingSenderId: '341636479770',
  appId: '1:341636479770:web:f63d2dd2b3fe41930dcaa3',
  measurementId: 'G-T58E3VZQZ2'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
