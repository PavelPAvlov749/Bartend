
import FirebaseApi, {  Firestore } from "./FirebaseConfig";

import { DocumentData, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { blankShiftType, productType } from "../../Redux/Types";
import { FirebaseError } from "firebase/app";




// Firestore API instance for product cards
// Implements CRUD operations with product cards

class PremixApi extends FirebaseApi {
    constructor() {
        super()
    };
    /**
     * Get all products of one bar by company id
     * @param companyID string (User`s compony unique identifier)
     * @returns productType[]
     */
    public async getProductsByCompanyID(companyID: string) {
        try {
            const q = await query(collection(this.firestore, "Premixes"), where("teamID", "==", companyID));
            // Array of products
            let products: DocumentData = [];
            const querySnap = await getDocs(q);

            querySnap.forEach((doc) => {
                products.push(doc.data());
            })

            return products;
        }
        catch (ex) {

            console.log(ex);
            return ex;
        }

    }
    // Update product card in Firestore
    /**
     * 
     * @param card productType
     * @returns void
     */
    public async updatePrdocurCard(card: productType) {
        try {
            // Get document ref
            const ref = doc(Firestore, "Premixes/", card.id as string);
            // Define updated document insatnce with new Server Timestamp
            let updatedCard = { ...card, timeStamp: JSON.stringify(new Date()) };
            // Write changes to Firestore
            await updateDoc(ref, updatedCard);
        }
        catch (ex) {
            console.log(ex);
        }
    }
    // Delete document from firestore by ID
    /**
     * @param productID string
     * @returns void
     */
    public async deleteProduct(productID: string) {
        try {
            // Delete DOcument data
            await deleteDoc(doc(Firestore, "Premixes/", productID));

        }
        catch (ex) {
            console.log(ex)
        }

    }
    /**
     * Create new prodyct card in Firestore Database
     * 
     * @param card productType
     * @returns cardID string
     */
    public async addProduct(card: productType) {
        try {

            const docRef = await collection(Firestore, "Premixes");
            const docID = await doc(docRef);
            // Define a new document insatnce with new Server Timestamp
            const newProduct = {
                ...card,
                timeStamp: JSON.stringify(new Date()),
                id: docID.id,
            };
            // Set new Document
            await setDoc(docID, newProduct)
            // If no erorrs retirn new card identifier
            return docID.id
        } catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Get single product card data by ID
     * 
     * @param id string (Prdocuct Indetofier)
     * @returns product <productType>
     */
    public async getProductByID(id: string): Promise<DocumentData | undefined> {
        try {
            let docRef = doc(Firestore, "Premixes/", id);
            let products = await getDoc(docRef);
            return products;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    
    public async getAllPublicProducts () {
        try
        {
            // Get products query 
            let productsQuery = await query(collection(this.firestore, "Premixes"), where("isVisibleForAll","==",true));
             // Array of products
             let products: DocumentData = [];
             const querySnap = await getDocs(productsQuery);
             querySnap.forEach((doc) => {
                products.push(doc.data());
             })
             return products;
        }
        catch(ex)
        {
            let error : FirebaseError = ex as FirebaseError;
            console.log(error.message);
            return error;
        }
    }
}

export const premixAPI = new PremixApi();