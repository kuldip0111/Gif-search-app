import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDPwO5g7dsQwwsffsQC0tYmvyLNeQAjJ3I",
	authDomain: "alphabitask-cdb17.firebaseapp.com",
	projectId: "alphabitask-cdb17",
	storageBucket: "alphabitask-cdb17.appspot.com",
	messagingSenderId: "355105015527",
	appId: "1:355105015527:web:4fc63e87745bcdecae4442",
	measurementId: "G-X3DH3KE39V"
	// measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
if (!getApps().length) {
	initializeApp(firebaseConfig);
}
// Initialize Firebase auth
export const auth = getAuth();
