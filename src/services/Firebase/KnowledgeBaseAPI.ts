// Firstore functions
import {
    DocumentData, collection,
    doc, getDoc, getDocs, query,
    serverTimestamp, where
} from "firebase/firestore";
import FirebaseApi from "./FirebaseConfig";
// Impor Parent class


// Knowledge base API

class KnowledgeBaseAPI extends FirebaseApi {
    constructor() {
        super();
    }
    /**
     * Get Single Spirit type by ID
     * 
     * @param id string
     * @returns return Array<ingridients>
     */

    public async getIngridientByID(id: string) {
        try {
            let q = query(collection(this.firestore, "Spirits"), where("ID", "==", id))
            let querySnap = await getDocs(q);
            // Define an empty pbject
            let ingridient: DocumentData = [];
            querySnap.forEach((doc) => {
                ingridient.push(doc.data())
                console.log(doc.data())
            });

            return ingridient[0]
        } catch (ex) {
            console.log(ex);
        }
    }
    /**
     * Get all Alohol drinks from KnowledgeBase Database
     * 
     * @returns Array<Ingridients>
     */

    public async getAllSpirits() {
        try {
            let docRef = collection(this.firestore, "Spirits")
            let doc = await getDocs(docRef)
            let spirits: any[] = []
            doc.forEach((doc) => {
                spirits.push(doc.data())
            })
            return spirits
        } catch (ex) {
            console.log(ex);
        }
    }
    // Add article about Siprit in Database
    /**
     * @param article,autorID
     * @returns void
     */

    public async addSpiritArticle(article: any, authorID: string) {
        try {
            // Create Document Ref
            const refDoc = collection(this.firestore, "KnowledgeBase");

            // Define A data object
            let articleData = {
                ...article,
                serverTimeStamp: serverTimestamp(),
            };
            // Write Data in Database

        }
        catch (ex) {
            console.log(ex);
        }
    }

};

export const KnowledgeBase = new KnowledgeBaseAPI();