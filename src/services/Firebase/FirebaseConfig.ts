import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";import { ref, get, child, push, update, } from "firebase/database";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";


import { getStorage, ref as storage_ref } from "firebase/storage";

//                                                ::::::::::::::::::::::CONFIG THE FIREBASE::::::::::::::::::::::::::

//Here is the config file of Firebase SDK to allow the functions use Firebase_instance object
export const firebaseConfig = {
    apiKey: "AIzaSyDULRcuwRHvgwlGafaQ_PxLlT2wSiFMT4Y",

    authDomain: "bartend-f0891.firebaseapp.com",

    projectId: "bartend-f0891",

    storageBucket: "bartend-f0891.appspot.com",

    messagingSenderId: "15780593851",

    appId: "1:15780593851:web:1bc49a4c467b4ea22da99e"

};
//INITIALIZE FIREBASE
export const firebase = initializeApp(firebaseConfig);

//Initializing the Firebase instance and creating Firebase auth object then initializing GoggleAuthProvider Object
export const Firebase_auth = getAuth();



//INITIALIZING FIRESTORE INSTANCE;port 
export const Firestore = getFirestore(firebase);

//Initialize Real-time data base instance 
export const dataBase = getDatabase(firebase);

//Google Provider
export const google_provider = new GoogleAuthProvider();

// --------------------------------------------

// DEFINE A PARENT CLASS FOR ANOTHER FIREBAE api

// --------------------------------------------


class FirebaseApi {
    // Realtime Database 
    protected RealtimeDataBase = dataBase;
    // 
    protected DatabaseRef = ref(this.RealtimeDataBase);
    // Firestore instance
    protected firestore = Firestore;
    // Realtim database instance 
    protected realtimeDatabase = getFirestore();
    // Firebase App instance
    protected firebaseAPP = firebase;
    // File storage
    protected firebaseStorage = getStorage(this.firebaseAPP);
    protected storageRefrence = storage_ref(this.firebaseStorage);
    // Firebase auth instances
    protected firebaseAuth = Firebase_auth;
    protected googleAuthProvider = new GoogleAuthProvider();


    // Auth Firebase functions
    // ----------------------

    protected popUp = signInWithPopup
    protected checkAuthState = onAuthStateChanged;
    protected signOut = signOut;
    protected signInWithEmailAndPassword = signInWithEmailAndPassword;
    protected createUserByEmailAndPassword = createUserWithEmailAndPassword;

    // -----------------------
};

export default FirebaseApi;