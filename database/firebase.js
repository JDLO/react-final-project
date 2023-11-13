import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDX0k2J8MPqtBofbqCocHNSHzYQhNhGqI4",
    authDomain: "capgemini-votacion.appspot.com",
    projectId: "capgemini-votacion",
    storageBucket: "capgemini-votacion.appspot.com",
    messagingSenderId: "167499023827",
    appId: "1:167499023827:android:2f8c27bcd6cd8920f35b26"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.firestore();
const settings = { timestampsInSnapshots: true };
database.settings(settings);

// Enable experimentalForceLongPolling for Firestore
const firestoreConfig = {
    experimentalForceLongPolling: true,
};
const firestore = firebase.firestore(firebase.app());
firestore.settings(firestoreConfig);

export { firebase, database };