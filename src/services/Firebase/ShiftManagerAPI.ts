// Firestore APP
import FirebaseApi, { Firestore } from "./FirebaseConfig";
// Firestore functions
import {
    DocumentData, collection,
    deleteDoc, doc, getDoc,
    getDocs, query, serverTimestamp,
    setDoc, updateDoc, where
} from "firebase/firestore";
// Types
import { blankShiftType} from "../../Redux/Types";




// Shift manager module Firenase API
// Implenets all methods for work with blank shifts

class ShiftManagerAPI extends FirebaseApi {
    constructor() {
        super();
    }
    /**
     * Get blanks shift of all company employes by company ID
     * @param companyID string (Company identifier)
     * @returns shifts <blankShiftType>
     * 
     */
    public async getBlankShifts(companyID: string) {
        try {
            // Get document ref
            const q = query(collection(Firestore, "blankShifts"), where("teamID", "==", companyID))
            // Define an empty shifts array
            let shifts: blankShiftType[] = [];
            // Fetch data
            const querySnap = await getDocs(q);

            querySnap.forEach((doc) => {
                shifts.push(doc.data() as blankShiftType)
            });
            return shifts
        }
        catch (ex) {
            console.log(ex);
        }
    }
    /**
     * 
     * @param shift blankShifType
     * {
     *  date: string;
        products: productType[];
        teamID: string;
        teamName: string;
        employe: string;
        done: boolean;
        count: number;
        shiftID?: string | undefined
     * }
        @returns void
     */
    public async setCurrentShift(shift: blankShiftType) {
        try {
            const docRef = collection(Firestore, "currentShift")
            const docID = await doc(docRef)
            // Create new shift object with shiftID and timeStamp
            const newShift = {
                ...shift,
                shiftID: docID.id,
                serverTimeStamp: serverTimestamp()
            }
            // Write new data
            await setDoc(docID, newShift)
        }
        catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Get opened blank shift by compoany identifier
     * 
     * @param companyID string
     * @returns shift shiftType
     */
    public async getCurrentShift(companyID: string) {
        try {
            // Get dcument ref
            const q = query(collection(Firestore, "currentShift"), where("teamID", "==", companyID))
            const querySnap = await getDocs(q);
            // Define an empty shift 
            let shift: DocumentData = [];
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            });

            return shift[0];
        }
        catch (ex) {
            console.log(ex);
        }
    }
    /**
     * Move current opened blank shift to history 
     * when shift is closing
     * 
     * @param shift shiftType
     * @returns void
     */
    public async addShiftInHistory(shift: blankShiftType) {
        try {
            // Get ref
            const docRef = collection(Firestore, "blankShifts")
            // Set new document in Database
            await setDoc(doc(docRef), shift)
        }
        catch (ex) {
            console.log(ex);
        }
    }
    /**
     * Get single shift document from history by ID
     * 
     * @param shiftId string
     * @returns void
     */
    public async getPassedShiftById(shiftId: string) {
        try {
            // Get document ref
            const docRef = query(collection(Firestore, "blankShifts"), where("shiftID", "==", shiftId))
            const querySnap = await getDocs(docRef);
            // Define shift object
            let shift: DocumentData = [];
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            })
            return shift[0]
        }
        catch (ex) {
            console.log(ex);
        }
    }
    /**
     * Dlete current shift from currentShift collection after copyng 
     * it into the Shift History collection
     * @param shiftID string
     * 
     * @returns void
     */
    public async clearCurrentShift (shiftID: string)  {
        try 
        {        
            await deleteDoc(doc(Firestore, "currentShift/", shiftID));
        } 
        catch (ex)
        {
            console.log(ex);
        }
    }
}

// ---------------------------
// --------------------------- EXPORT SHIFT API

export const ShiftAPI = new ShiftManagerAPI();

// --------------------------