import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };
const config = {
  apiKey: "AIzaSyADdLXeLoTf_6rkYZi-yC6PdhKUg3l2QsQ",
  authDomain: "polling-app-4fb8f.firebaseapp.com",
  projectId: "polling-app-4fb8f",
  databaseURL: "https://polling-app-4fb8f-default-rtdb.firebaseio.com",
  storageBucket: "polling-app-4fb8f.appspot.com",
  messagingSenderId: "455964651717",
  appId: "1:455964651717:web:87768f1ac9ba5094ffc0ac",
  measurementId: "G-0PQKEEETRV"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth=app.auth();
    this.db = app.firestore();
  }

  // *** Auth API ***
 
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
 
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
 
  doSignOut = () => this.auth.signOut();
 
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

}
 
export default Firebase;