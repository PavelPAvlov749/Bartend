import { collection, getDocs, query, where } from "firebase/firestore";
import FirebaseApi from "./FirebaseConfig";
import { FirebaseError } from "firebase/app";

class TextbookAPI extends FirebaseApi {
    public async getArticleByName (name : string) {
        try
        {
            // get document refrene
            let docRef = query(collection(this.firestore,"Articles/"),where('name',"==",name));
            // Get docuent
            let articleDoc = await getDocs(docRef);
            console.log(articleDoc.docs[0].data().document);
            let document = articleDoc.docs[0].data().document;
            // Storage refrence
            
            return document;
        }
        catch(ex) {
            const error : FirebaseError = ex as FirebaseError;
            console.log(error.message);
        }
    }
}


const textbookAPI = new TextbookAPI();

export default textbookAPI;