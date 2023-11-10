import { ref, get, child, push, update, } from "firebase/database";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import FirebaseApi, { dataBase, Firebase_auth } from "./FirebaseConfig";
import { firebase } from "./FirebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref as storage_ref } from "firebase/storage";
import { responsiveFontSizes } from "@mui/material";
import { FirestoreError, collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import { FirebaseError } from '@firebase/util'

//Abstarct API class 
export class abstractAPI {
    protected RealtimeDataBase = dataBase
    protected DatabaseRef = ref(dataBase)
    protected firebaseAPP = firebase
    protected firebaseStorage = getStorage(this.firebaseAPP)
    protected storageRefrence = storage_ref(this.firebaseStorage)
    protected firebaseAuth = Firebase_auth
    protected googleAuthProvider = new GoogleAuthProvider()
    protected signInWithPopUp = signInWithPopup
    public ref = ref

    public getAuthProvider() {

        return this.googleAuthProvider
    }
    public getAuthInstatnce() {
        return this.firebaseAuth
    }
    public getApp() {
        return this.firebaseAPP
    }

    public getDatabase() {
        return this.RealtimeDataBase
    }

}



class AuthAPI extends abstractAPI {
    constructor() {
        super()
    }
    checkAuthState = onAuthStateChanged

    async signInByEmailAndPassword(email: string, password: string) {
        try {

            const userID = await (await signInWithEmailAndPassword(this.firebaseAuth, email, password)).user.uid
            console.log(userID)
            return userID
        } catch (ex) {
            console.log(ex)
        }
    }
    async signOut() {
        await signOut(this.firebaseAuth)

    }
    /**
     * Google Sign With PopUp function
     * If the user is authenticating for the first time, then we register 
     * by saving his ID, username, email in the firestore `Users`
     * @returns object user <UsrtType>
    //  */
    // async signInWithPopUp() {
    //     try {
    //         // Get user document refrence
    //         let userRef = ref(this.RealtimeDataBase, "Users/" + this.firebaseAuth.currentUser?.uid);
    //         // Fetch Data
    //         let result = await get(userRef);
    //         // Check if user with this uid already exist in Firestore Database
    //         if (!result.val()) {
    //             // If user does not exist we create a new user
    //             // Define a new user Object
    //             let newUser = {
    //                 userName: this.firebaseAuth.currentUser?.displayName,
    //                 userID: this.firebaseAuth.currentUser?.uid,
    //                 team: null,
    //                 teamID: null
    //             };
    //             let updates: any = {};
    //             // Udate Firestore Data
    //             updates["Users/" + this.firebaseAuth.currentUser?.uid] = newUser;
    //             update(ref(this.RealtimeDataBase), updates);
    //             // Return result
    //             return result.val();
    //         }
    //         else {
    //             // If user already exist just retirn result
    //             return result.val();
    //         }

    //     }
    //     catch (ex) {
    //         console.log(ex);
    //     }
    //     const result = await signInWithPopup(this.firebaseAuth, this.googleAuthProvider).then((response) => {
    //         const userRef = ref(this.RealtimeDataBase, "Users/" + this.firebaseAuth.currentUser?.uid);
    //         const result = get(userRef,).then((response) => {
    //             if (response.val() === null || response.val() === undefined) {
    //                 console.log("ADDING NEW USER")
    //                 const new_user = {
    //                     fullName: this.firebaseAuth.currentUser?.displayName,
    //                     posts: {},
    //                     status: null,
    //                     foloowers: {},
    //                     subscribes: {},
    //                     userID: this.firebaseAuth.currentUser?.uid,
    //                     avatar: this.firebaseAuth.currentUser?.photoURL
    //                 };
    //                 const updates: any = {};
    //                 updates["Users/" + this.firebaseAuth.currentUser?.uid] = new_user;
    //                 update(ref(this.RealtimeDataBase), updates);
    //                 return response
    //             }
    //         })
    //         return response
    //     })
    //     return result
    // }
    async createUserWithEmailAndPassword(email: string, password: string, userName: string, avatar?: Blob | Uint16Array | ArrayBuffer, status?: string) {
        try {
            const newUser = (await createUserWithEmailAndPassword(this.firebaseAuth, email, password)).user
            const newUserRef = push(child(ref(this.RealtimeDataBase), "Users/")).key
            const RealtimeDatabaseUser = {
                fullName: userName,
                userID: newUser.uid,
                avatar: null,
                posts: {},
                likesCount: null,
                status: null,
                followers: {},
                subscibes: {},
                chat: {},
                savedPosts: {}
            }
            const updates: any = {};
            updates[`Users/` + newUser.uid] = RealtimeDatabaseUser;
            //Update Database with new element
            update(ref(this.RealtimeDataBase), updates);
            const user = get(child(this.ref(this.RealtimeDataBase), "Users/" + newUser.uid))
            console.log(user)
            return user
        } catch (ex) {
            console.log(ex)
        }
    }
    async getCurrentUserID() {
        const currentUserID = await this.firebaseAuth.currentUser?.uid
        if (currentUserID) {
            return currentUserID
        }
    }
    // async getAccount(userID: string) {
    //     try {
    //         let usersRef = ref(this.RealtimeDataBase, "Users/" + userID)
    //         // let result = await (await get(query(usersRef))).val()
    //         if (result) {
    //             const account = {
    //                 fullName: result.fullName,
    //                 avatar: result.avatar,
    //                 userID: result.userID,
    //                 status: result.status,
    //                 chats: Object.hasOwn(result, "chats") ? Object.values(result.chats) : [] as Array<any>
    //             }
    //             return account
    //         } else {
    //             throw new Error()
    //         }

    //     } catch (ex) {
    //         console.error(ex)
    //     }

    // }

}

// export const authAPI = new AuthAPI()




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
        catch (ex) {
            console.log(ex);
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