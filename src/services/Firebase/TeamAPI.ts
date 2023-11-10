// Import Parent Class
// Firebase functions
import {
    collection, getDocs, query, where,
    doc, getDoc, setDoc,
    updateDoc, arrayUnion, arrayRemove, deleteDoc, QueryDocumentSnapshot, DocumentData,
}
    from "firebase/firestore";
// Import Config
import FirebaseApi, {Firestore } from "./FirebaseConfig";



class TeamAPI extends FirebaseApi {
    constructor() {
        super();
    }
    /**
     * Leave team functions
     * 
     * @param teamID string
     * @param userID string
     * @param userName string
     */
    public async leavetheTeam(teamID: string, userID: string, userName: string) {
        try {
            // Team document ref
            let docRef = doc(Firestore, "Clans/", teamID);
            // User document ref
            let userRef = doc(Firestore, "Users/", userID);
            let team = await getDoc(docRef);
            // Check if current Suer are the last user in team 
            if (team.data()?.users.length === 1) {
                // If he are delete team document from collection
                deleteDoc(docRef)
            }
            else {
                // Anotherwise Update document with removed user 
                updateDoc(docRef, {
                    users: arrayRemove(userName),
                    userIDs: arrayRemove(userID)
                })
            }

            await updateDoc(userRef, {
                team: null,
                teamID: null
            })

        } catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Get user team bu ID
     * @param userID string
     * 
     * @returns Araay<team>
     */
    public async getClansByUserID(userID: string) {
        try {
            const q = query(collection(this.firestore, "Clans"), where("userIDs", "array-contains", userID));
            const querySnap = await getDocs(q);
            // Define a team array
            let clans: any[] = [];
            // Push the results 
            querySnap.forEach((doc) => {
                clans.push(doc.data())
            })

            return clans[0]
        } catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Join the function :
     * Updates the user's document in the database by adding a record about 
     * the team he is joining and also updates the team record by adding the
     * user to the array of users passed in the current group 
     * 
     * @param userID string
     * @param userName string
     * @param clanID string
     * @param clanName string
     * 
     * @returns void
     */
    public async joinTheClan(userID: string, userName: string, clanID: string, clanName: string) {
        try {
            // Get document ref
            const clansRef = doc(Firestore, "Clans/", clanID);
            // Update Firestore document by pushing user ID into team users Array
            await updateDoc(clansRef, {
                users: arrayUnion(userName),
                userIDs: arrayUnion(userID)
            })
            // 
            const userRef = doc(Firestore, "Users/", userID)
            // Push team data into user document
            await updateDoc(userRef, {
                team: clanName,
                teamID: clanID
            })

        }
        catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Create new Team and join current user to the team
     * 
     * @param team {name : string,Description : string}
     * @param userID string
     * @param userName string
     * 
     * @returns void
     */
    public async createTheClan(team: { newTeamName: string, newTeamDescription: string, }, userID: string, userName: string) {
        try {
            // Get document red
            const docRef = collection(Firestore, "Clans");
            // Get document by ref
            const userRef = doc(Firestore, "Users/", userID);
            // Get new document ID
            const docID = await doc(docRef);
            // Update user entry passing into them new teasm data
            await updateDoc(userRef, {
                team: team.newTeamName,
                teamID: docID.id
            })
            // CDefine a new teasm object
            let newTeam = {
                teamName: team.newTeamName,
                userIDs: [userID],
                users: [userName],
                teamID: docID.id,
                description: team.newTeamDescription
            }
            // Write new Team object intio database
            await setDoc(docID, newTeam)

        }
        catch (ex) {
            console.log(ex)
        }
    }
    /**
     * Get all teams
     * @returns Array <string>
     */
    public async getClanList() {
        try {
            const q = query(collection(Firestore, "Clans"));
            const querySnap = await getDocs(q);
            // Define a result array
            let clans: any[] = [];
            // Push results in the array
            querySnap.forEach((doc) => {
                clans.push(doc.data())
            })

            return clans
        } catch (ex) {

        }
    }
}


export const TeamModuleAPI = new TeamAPI();