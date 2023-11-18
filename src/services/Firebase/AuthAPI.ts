
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import FirebaseApi from "./FirebaseConfig";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { FirebaseError } from "firebase/app";



// ---------------------------------------
//
// AuthAPI class
// Contains all authentitication methods of Firebase 
// Extends frebaseAPI class
// 
// ---------------------------------------

class authAPI extends FirebaseApi {
    constructor() {
        super();
    }
    /**
     * Sign Out function 
     * @returns void
     */
    public async logOut() {
        try {
            this.logOut();
        }
        catch (ex) {
            console.log(ex);
        }
    }
    /**
     * Create new user document in Firestore by GoogleAuthProvider credentials
     * 
     * @param userID string
     * @param userName string
     * 
     * @returns void
     */
    public async createUserFromGoogleCredentials (userID : string,userName : string) {
        try
        {
            // Creatae document refrence 
            let userPath = await collection(this.firestore, "Users/");
            let userRef = await doc(userPath, userID);
            // Create new user Document and Write the data into firesstore
            await setDoc(userRef,{
                userName : userName,
                userID : userID,
                teamID : null,
                teamName : null
            });
        }
        catch (ex)
        {
            console.log(ex);
        }

    }
    /**
     * Sign in bt email and apssword function 
     * @param email string
     * @param password string
     * @returns userID string 
     */
    async signInByEmailAndPassword(email: string, password: string) {
        try {
            // Signing in by Firebase Function and retirn authenicated user ID
            const userID = await (await signInWithEmailAndPassword(this.firebaseAuth, email, password)).user.uid;
            // Reuturn userID
            return userID;
        }
        catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Check is user document exist in Firestore
     * Returns boolean flag
     * @param userID string
     * 
     * @returns boolean 
     */
    public async isUserExist (userID : string) {
        try
        {
            // Get document refrence 
            let userRef = doc(this.firestore,"Users/",userID);
            // Check if user document alreadfy exist in database
            let userDoc = await getDoc(userRef);
            // Return boolean
            return userDoc.exists();
        }   
        catch (ex)
        {
            console.log(ex);
        }
    }
    /**
     * Create new user function 
     * 
     * @param email string
     * @param password string
     * @param userName string

     * @returns userCredentioals | ErrorMEssage
     */
    public async createUserWithEmailAndPassword(email: string, password: string, userName: string) {

        // Try to create new user with email and apssword bu Firebase functions 
        const result = (await createUserWithEmailAndPassword(this.firebaseAuth, email, password));
        // Check if user was created successfuly
        if (result.user) {
            // If success 
            // Create user Document redrence with goggle user ID
            let path = await collection(this.firestore, "Users/");
            let userRef = await doc(path, result.user.uid);
            // Write data in the firestore
            await setDoc(userRef, {
                userName: userName,
                userID: result.user.uid,
                team: null,
                teamID: null
            });

        }



    }
    public async loginWithEmailAndPassword(email: string, password: string) {
        try {
            // Signin in by Freibase function
            const userID = await (await signInWithEmailAndPassword(this.firebaseAuth, email, password)).user.uid
            console.log(userID);
            return userID;
        }
        
        catch (ex ) {
            const firebaseError : FirebaseError = ex as FirebaseError;
            return {
                message : firebaseError.message,
                errCode : firebaseError.code
            };
        }
    }
    /**
     * Get user page Data from Firestore by userID
     * @param userID string
     * 
     * @returns userPage 
     */
    public async getUserByID(userID: string) {
        try {
            // Get user document refrence 
            let userRef = await doc(this.firestore, "Users/", userID);
            // Get user Document from Firestore
            let userData = await getDoc(userRef);
            if (userData.exists()) {
                // Reutn user data if document exist
                return userData.data();
            }
            else {
                // Anotherwise throw an error
                throw new Error("Error : User is not Exist");
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }
    /**
     * 
     * Pop Sign inFunction
     * If the user is authenticating for the first time, then we register 
     * By saving his ID, username, email in the firestore `Users`
     * 
     * return object <UserType>
     */
    public async loginInWithPopUp() {
        try {
            // Try to signIn with Frebase GooglePopUp funcion
            let result = await this.popUp(this.firebaseAuth, this.googleAuthProvider);
            console.log(result);
            // Get user document refrence in firebase DB
            let userRef = await doc(this.firestore, "Users/", result.user.uid);
            // Get document 
            let userDoc = await getDoc(userRef);
            // Check if user already exist in Database 
            if (userDoc.exists()) {
                // If user are exist return User<obkject>
                return userDoc.data();
            }
            else {
                // If user does not exist create a new document if firebase and reurn them
                // Crate new SUer object 
                let newUser = {
                    userName: result.user.displayName,
                    userID: result.user.uid,
                    team: null,
                    teamID: null
                }
                // Create user Document redrence with goggle user ID
                let userPath = await collection(this.firestore, "Users/");
                let userRef = await doc(userPath, result.user.uid);
                // Crate new SUer object 
                await setDoc(userRef, newUser);
                // Return user object
                return newUser;
            }

        }
        catch (ex) {
            console.log(ex);
        }
    }
}

export const authApi = new authAPI();