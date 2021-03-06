import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

// Firebase app initialize
export const initializeLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
}

// Handle google sign in
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
        .signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            return user;
        }).catch((error) => {
            // Handle Errors here.

        });
}

// Handle Facebook sign in
export const handleFacebookSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
        .then((result) => {
            const credential = result.credential;
            const user = result.user;
            return user;
        })
        .catch((error) => {
        
            
        });
}
export const updateUsername = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        
        console.log("Username updated successfully");
    }).catch(function (error) {
        
        console.log(error)
    });
}

// Create User with Email and Password
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUserInfo = { user };
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUsername(name);
            return newUserInfo;
        })
        .catch((error) => {
           
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

// Login using email and password
export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            const newUserInfo = user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}