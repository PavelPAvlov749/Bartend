
import {
    collection, getDocs, getFirestore, query, addDoc, where,
    QuerySnapshot, Timestamp, doc, getDoc, setDoc, documentId,
    updateDoc, arrayUnion, arrayRemove, deleteDoc
}
    from "firebase/firestore";
import { getDatabase, ref, onValue, set, get, child, serverTimestamp, update } from "firebase/database";
import { getDownloadURL, getStorage, ref as storegeRef, StorageReference } from "firebase/storage";
import { firebase, Firestore } from "./FirebaseConfig";
import { uploadBytes } from "firebase/storage";
import { blankShiftType, productType } from "../Redux/Types";







//Initialize Real-time data base instance 
const dataBase = getDatabase();

//APPLICATION FIRESTORE INSTANSE
const reference = ref(dataBase)

export const Firestore_instance = {

    getProductsByCompanyID: async (companyID: string) => {
        try {
            const q = await query(collection(Firestore, "Premixes"),where("companyID","==",companyID));

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
                companyID: card.companyID,
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
            const q = query(collection(Firestore,"blankShifts"),where("companyID","==",companyID))
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
            await setDoc(docID,newShift)

        }catch(ex){

        }
    },
    getCurrentShift : async (companyID : string) => {
        try{
            const q = query(collection(Firestore,"currentShift"),where("companyID","==",companyID))
            const querySnap = await getDocs(q)
            let shift  :any = []
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            })
            console.log(querySnap.docs)
            return shift[0]
        }catch(ex){

        }
    }
  
}
