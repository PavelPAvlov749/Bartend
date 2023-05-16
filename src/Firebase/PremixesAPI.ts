
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





    getPostsByUserID: async (companyID: string) => {
        try {
            const q = await query(collection(Firestore, "Premixes"),where("companyID","==",companyID));

            let products: any = [];
            const querySnap = await getDocs(q)

            querySnap.forEach((doc) => {
                
                products.push(doc.data())

            })
            
            return products
        } catch (ex) {
            console.log(ex)
        }

    },
    addProduct: async (composition : string,description : string,userID: string, name: string) => {
        try {
            
            const docRef = await collection(Firestore, "Premixes")
            const docID = await doc(docRef)

            const newProduct: productType = {
                name : name,
                companyID: userID,
                composition : composition,
                description : description,
                id : docID.id

            }
            await setDoc(docID, newProduct)

            return docID.id
        } catch (ex) {
            console.log(ex)
        }

    },
  
}
