import { ref, get, child, push, update, query } from "firebase/database";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { dataBase, Firebase_auth } from "./FirebaseConfig";
import { firebase } from "./FirebaseConfig";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref as storage_ref} from "firebase/storage";


//Abstarct API class 
export class abstractAPI {
    protected RealtimeDataBase = dataBase
    protected DatabaseRef = ref(dataBase)
    protected firebaseAPP = firebase
    protected firebaseStorage = getStorage(this.firebaseAPP)
    protected storageRefrence = storage_ref(this.firebaseStorage)
    protected firebaseAuth = Firebase_auth
    protected googleAuthProvider = new GoogleAuthProvider()

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

    async createUserWithEmailAndPassword(email: string, password: string, userName: string,avatar?:Blob | Uint16Array | ArrayBuffer,status? : string) {
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
            const user = get(child(this.ref(this.RealtimeDataBase),"Users/" + newUser.uid))
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
    async getAccount(userID: string) {
        try {
            let usersRef = ref(this.RealtimeDataBase, "Users/" + userID)
            let result = await (await get(query(usersRef))).val()
            if (result) {
                const account = {
                    fullName : result.fullName,
                    avatar : result.avatar,
                    userID : result.userID,
                    status : result.status,
                    chats : Object.hasOwn(result,"chats") ? Object.values(result.chats) : [] as Array<any>
                }
                return account
            } else {
                throw new Error()
            }

        } catch (ex) {
            console.error(ex)
        }

    }
}

export const authAPI = new AuthAPI()