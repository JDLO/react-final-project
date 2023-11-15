import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDX0k2J8MPqtBofbqCocHNSHzYQhNhGqI4",
  authDomain: "capgemini-votacion.appspot.com",
  projectId: "capgemini-votacion",
  storageBucket: "capgemini-votacion.appspot.com",
  messagingSenderId: "167499023827",
  appId: "1:167499023827:android:2f8c27bcd6cd8920f35b26"
}

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const database = getFirestore(app);
// export { auth };
 