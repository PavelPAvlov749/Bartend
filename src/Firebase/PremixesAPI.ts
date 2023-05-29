
import {
    collection, getDocs, getFirestore, query, addDoc, where,
    QuerySnapshot, Timestamp, doc, getDoc, setDoc, documentId,
    updateDoc, arrayUnion, arrayRemove, deleteDoc, DocumentData
}
    from "firebase/firestore";
import { getDatabase, ref, onValue, set, get, child, serverTimestamp, update } from "firebase/database";
import { getDownloadURL, getStorage, ref as storegeRef, StorageReference } from "firebase/storage";
import { firebase, Firestore } from "./FirebaseConfig";
import { uploadBytes } from "firebase/storage";
import { blankShiftType, productType, userType } from "../Redux/Types";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CurrentShift } from "../Components/ShiftsPage/CurrentShift";







//Initialize Real-time data base instance 
const dataBase = getDatabase();

//APPLICATION FIRESTORE INSTANSE
const reference = ref(dataBase)
const auth = getAuth(firebase)

export const Firestore_instance = {

    getProductsByCompanyID: async (companyID: string) => {
        try {
            const q = await query(collection(Firestore, "Premixes"),where("teamID","==",companyID));

            let products: any = [];
            const querySnap = await getDocs(q)

            querySnap.forEach((doc) => {
                
                products.push(doc.data())

            })
            console.log(products)
            return products
        } catch (ex) {
            console.log(ex)
        }

    },

    deleteProduct : async (productID : string) => {
        await deleteDoc(doc(Firestore, "Premixes/", productID));
        
    },
    addProduct: async (card : productType) => {
        try {
            
            const docRef = await collection(Firestore, "Premixes")
            const docID = await doc(docRef)

            const newProduct = {
                name : card.name,
                teamID : card.teamID,
                composition : card.composition,
                description : card.description,
                timeStamp : JSON.stringify(new Date()),
                id : docID.id,

            }
            await setDoc(docID, newProduct)

            return docID.id
        } catch (ex) {
            console.log(ex)
        }

    },
    getBlankShifts : async (companyID : string) => {
        try{
            const q = query(collection(Firestore,"blankShifts"),where("teamID","==",companyID))
            let shifts : blankShiftType[] = []
            const querySnap = await getDocs(q)
            querySnap.forEach((doc) => {
                shifts.push(doc.data() as blankShiftType)
            })
            console.log(shifts)
            return shifts
        }catch(ex){

        }
    },
    setCurrentShift  :async (shift : blankShiftType) => {
        try{
            const docRef = collection(Firestore,"currentShift")
            const docID = await doc(docRef)
            const newShift = {...shift,shiftID : docID.id}
            console.log(shift)
            await setDoc(docID,newShift)

        }catch(ex){
            console.log(ex)
        }
    },
    clearCurrentShift : async (shiftID : string) => {
        try{
            await deleteDoc(doc(Firestore, "currentShift/", shiftID));
        }catch(ex) {

        }
    } ,
    getCurrentShift : async (companyID : string) => {
        try{
            const q = query(collection(Firestore,"currentShift"),where("teamID","==",companyID))
            const querySnap = await getDocs(q)
            let shift  :any = []
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            })
            console.log(querySnap.docs)
            return shift[0]
        }catch(ex){

        }
    },
    addShiftInHistory : async (shift : blankShiftType) => {
        try{
            const docRef = collection(Firestore,"blankShifts")
            await setDoc(doc(docRef),shift)
        }catch(ex){

        }
    },
    markProductAsReady : async (shiftID : string,productID:string) => {
        try{
            const docRef = query(collection(Firestore,"currentShift"),where("shiftID","==",shiftID))
            const querySnap = await getDocs(docRef)
            let products : any[] = []
            console.log(querySnap.docChanges())
        }catch(ex){

        }
    },
    getPassedShiftById : async (shiftId : string) => {
        try{
            const docRef = query(collection(Firestore,"blankShifts"),where("shiftID","==",shiftId))
            const querySnap = await getDocs(docRef)
            let shift : any[] = []
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            })
            return shift[0]
        }catch(ex){

        }
    },
    createuserWithEmailAndPassword : async (nickName : string,email : string,password : string) => {
        try{
            let uid = await createUserWithEmailAndPassword(auth,email,password)
            if(uid.user){
                const docRef = collection(Firestore,"Users")
                // const docID = await doc(docRef,"Users/",uid.user.uid)
                let newUser = {
                    nickName : nickName,
                    clan : null,
                    userID : uid.user.uid,

                }
                await await setDoc(doc(Firestore, "Users/" + uid.user.uid), newUser)
                await signInWithEmailAndPassword(auth,email,password)
            }
        }catch(ex){
            console.log(ex)
        }
    },
    getUserById : async (userID : string) => {
        try{
            const docRef = query(collection(Firestore,"Users"),where("userID","==",userID))
            const querySnap = await getDocs(docRef)
            let user : any[] = []
            querySnap.forEach((doc) => {
                user.push(doc.data())
            })
            return user[0]
        }catch(ex){

        }
    },
    getClanList : async () => {
        try{
            const q = query(collection(Firestore,"Clans"))
            const querySnap = await getDocs(q)
            let clans : any[] = []
            querySnap.forEach((doc) => {
                clans.push(doc.data())
            })
            return clans
        }catch(ex){

        }
    },
    getClansByUserID : async ( userID : string) => {
        try{
            const q = query(collection(Firestore,"Clans"),where("usersIDs","array-contains",userID))
            const querySnap = await getDocs(q)
            let clans : any[] = []
            querySnap.forEach((doc) => {
                clans.push(doc.data())
            })
            console.log(clans)
            return clans
        }catch(ex){
            console.log(ex)
        }
    },
    joinTheClan : async (userID : string, userName : string,clanID : string,clanName : string) => {
        try{
            const clansRef = doc(Firestore, "Clans/", clanID);
            await updateDoc(clansRef,{
                users : arrayUnion(userName),
                userIds : arrayUnion(userID) 
            })
            const userRef = doc(Firestore,"Users/",userID)
            await updateDoc(userRef,{
                team : clanName,
                teamID  : clanID
            })

        }catch(ex){
            console.log(ex)
        }
    },
    createTheClan : async (clanName : string,userID : string,userName : string) => {
        try{
            const docRef = collection(Firestore,"Clans")
            const userRef = doc(Firestore,"Users/",userID)
            await updateDoc(userRef,{
                clans : clanName
            })
            const docID = await doc(docRef)
            let newClan = {
                clanName : clanName,
                usersIDs : [userID],
                users : [userName],
                clanID : docID.id
            }
            await setDoc(docID,newClan)

        }catch(ex){
            console.log(ex)
        }
    }
    
}
