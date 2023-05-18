
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
import { productType } from "../Redux/Types";







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
  
}
