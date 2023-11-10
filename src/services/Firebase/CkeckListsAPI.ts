
// Firebase functions
import {
    collection, deleteDoc, doc,
    getDocs, query, setDoc,
    where
} from "firebase/firestore"

// Parent class import
import FirebaseApi from "./FirebaseConfig";

// ---------------------------------------------


// This class contains functions to work with dada in cheklistApp module
// Implements CRUD operations for cheklist documents in Firestore


// ---------------------------------------------

class CheckListAppAPI extends FirebaseApi {
    constructor() {
        super();
    }
    /**
     * Get all checklists of compeny by companyID
     * @param teamID string
     * @returns Array<Checklists>
     */
    public async getChekLists(teamID: string) {
        try {
            // Get document refrence
            let docRef = query(collection(this.firestore, "CheckLists"), where("teamID", "==", teamID));
            let querySnap = await getDocs(docRef);
            // Define a empty array for checklists
            let chekLists: any[] = [];
            // Fill the array with dethed data
            querySnap.forEach((doc) => {
                chekLists.push(doc.data())
            })

            return chekLists
        }
        catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Add new checklist document in Firesotore
     * 
     * @param teamID string
     * @param tasks array <string> array of tasks in checklist
     * @param name name of checklist document
     * 
     * @returns void
     */
    public async addCheckList(teamID: string, tasks: string[], name: string) {
        try {
            const docRef = collection(this.firestore, "CheckLists");
            const docID = await doc(docRef);
            // Define a new cheklist Object
            let newChekList = {
                name: name,
                tasks: tasks,
                teamID: teamID,
                createdAt: new Date(),
                tasksCounter: tasks.length,
                id: docID.id
            };
            // Set new Document to Firestore
            await setDoc(docID, newChekList)
        } catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Delete checklist from Firestore by checklist ID
     * @param checkListId string
     */
    public async deleteCheckList(checkListId: string) {
        try {
            // Delete document bu ID
            await deleteDoc(doc(this.firestore, "CheckLists/", checkListId))
        }
        catch (ex) {
            console.log(ex)
        }
    }
}

// EXPORT cChecklistApp class instance
export const CheckListsAPI = new CheckListAppAPI();