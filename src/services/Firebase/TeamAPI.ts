
// Firebase functions
import {
    collection, getDocs, query, where,
    doc, getDoc, setDoc,
    updateDoc, arrayUnion, arrayRemove, deleteDoc
}
    from "firebase/firestore";
// Import Config and parent class
import FirebaseApi, { Firestore } from "./FirebaseConfig";

// Types
import { FirebaseError } from "firebase/app";
import { UserRoles } from "../../Redux/Types";



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
            // Udate user fireabase document
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
     * Join user to the team by invite code
     * 
     * @param inviteCode string
     * @param userID string
     * @param userName string
     * @returns ClanType
     */
    public async joinTeamByInviteCode(inviteCode: string, userID: string, userName: string) {
        try {

            // Document query
            let teamQuery = query(collection(this.firestore, "Clans/"), where("inviteCode", "==", inviteCode));
            let teamSnap = await getDocs(teamQuery);
            // get user ref
            let userRef = doc(this.firestore, "Users/" + userID);
            // Define a team array
            let team: any[] = [];
            // Check if documents exist in query
            if (teamSnap.empty) {
                // If not,that means invite code was incorrect
                // Throw error
                throw new Error("Error : Incorect invite code!");
            }
            else {
                // Anotherwise push document in result array 
                teamSnap.forEach((doc) => {
                    team.push(doc.data())
                });

                // Team ref
                let teamRef = doc(this.firestore, "Clans/" + team[0].teamID);
                // Update team document
                // Set userId and userName into team document
                await updateDoc(teamRef, {
                    inviteCode: null,
                    users: arrayUnion({userName : userName,userID : userID}),
                    userIDs: arrayUnion(userID)
                });
                // Update user document 
                // Set teamID and teamName into user document
                await updateDoc(userRef, {
                    teamID: team[0].teamID,
                    team: team[0].teamName
                });
                // Finaly,return team doc to set hin into redux store
                return team[0];
            }


        }
        catch (ex) {
            let error: FirebaseError = ex as FirebaseError;
            console.log(error.message);
            return error.message;
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
            // And set this useer as admin
            await updateDoc(userRef, {
                team: team.newTeamName,
                teamID: docID.id,
                role: UserRoles.admin
            })
            // CDefine a new teasm object
            let newTeam = {
                teamName: team.newTeamName,
                userIDs: [userID],
                users: [{
                    userName : userName,
                    userID : userID
                }],
                teamID: docID.id,
                description: team.newTeamDescription,
                adminID: userID,
                adminName : userName
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
    /**
     * Set the value of the nite code for individuals to join the group
     * 
     * @param teamID string
     * @param inviteCode string
     * @returns void
     */
    public async setInviteCode(teamID: string, inviteCode: string) {
        try {
            // Get document ref
            const ref = doc(Firestore, "Clans/", teamID as string);
            // Get team document
            let teamDoc = (await getDoc(ref)).data();
            console.log(inviteCode);
            // Define updated document insatnce with new Server Timestamp
            let updatedCard = { ...teamDoc, inviteCode: inviteCode };
            // Write changes to Firestore
            await updateDoc(ref, updatedCard);
        }
        catch (ex) {
            let error: FirebaseError = ex as FirebaseError;
            console.log(error.message);
            return error;
        }
    }

    /**
     * Delete member og team
     * @param userID string
     * @param teamID string
     * @param userName string
     * 
     * @returns void
     */

    public async deleteUserFromTeam (userID : string,teamID : string,userName : string) {
        try
        {
            // User docRef
            let userRef = doc(this.firestore,"Users/" + userID);
            // teamRef
            let teamRef = doc (this.firestore,"Clans/" + teamID);

            // Remove user data from team frirebase entry
            await updateDoc(teamRef,{
                users : arrayRemove({userName : userName,userID : userID}),
                userIDs : arrayRemove(userID)
            });
            // Remove team data from user document
            await updateDoc(userRef,{
                teamID : null,
                team : null
            })
        }
        catch(ex)
        {
            let error : FirebaseError = ex as FirebaseError;
            console.log(error.message);
            return error;
         }
    }
}


export const TeamModuleAPI = new TeamAPI();