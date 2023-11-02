
import {
    collection, getDocs, query, where,
    doc, getDoc, setDoc,
    updateDoc, arrayUnion, arrayRemove, deleteDoc, QueryDocumentSnapshot, DocumentData,
}
    from "firebase/firestore";
import { getDatabase, ref } from "firebase/database";
import { firebase, Firestore } from "./FirebaseConfig";
import { blankShiftType, productType, userType } from "../../Redux/Types";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const makeid = (length: number) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


//Initialize Real-time data base instance 
const dataBase = getDatabase();
//APPLICATION FIRESTORE INSTANSE
const reference = ref(dataBase)
const auth = getAuth(firebase)

export const Firestore_instance = {

    getProductsByCompanyID: async (companyID: string) => {
        try {
            const q = await query(collection(Firestore, "Premixes"), where("teamID", "==", companyID));

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
    // Update product card 
    updatePrdocurCard: async (card: productType) => {
        try {
            const ref = doc(Firestore, "Premixes/", card.id as string);
            let updatedCard = {
                name: card.name,
                teamID: card.teamID,
                composition: card.composition,
                description: card.description,
                timeStamp: JSON.stringify(new Date()),
                id: card.id,
            }
            await updateDoc(ref, updatedCard);
        }
        catch (ex) {
            console.log(ex)
        }
    },
    deleteProduct: async (productID: string) => {
        await deleteDoc(doc(Firestore, "Premixes/", productID));

    },
    addProduct: async (card: productType) => {
        try {

            const docRef = await collection(Firestore, "Premixes")
            const docID = await doc(docRef)

            const newProduct = {
                name: card.name,
                teamID: card.teamID,
                composition: card.composition,
                description: card.description,
                timeStamp: JSON.stringify(new Date()),
                id: docID.id,

            }
            await setDoc(docID, newProduct)

            return docID.id
        } catch (ex) {
            console.log(ex)
        }
    },
    getBlankShifts: async (companyID: string) => {
        try {
            const q = query(collection(Firestore, "blankShifts"), where("teamID", "==", companyID))
            let shifts: blankShiftType[] = []
            const querySnap = await getDocs(q)
            querySnap.forEach((doc) => {
                shifts.push(doc.data() as blankShiftType)
            })
            return shifts
        } catch (ex) {

        }
    },
    setCurrentShift: async (shift: blankShiftType) => {
        try {
            const docRef = collection(Firestore, "currentShift")
            const docID = await doc(docRef)
            const newShift = { ...shift, shiftID: docID.id }
            await setDoc(docID, newShift)
        } catch (ex) {
            console.log(ex)
        }
    },
    clearCurrentShift: async (shiftID: string) => {
        try {
            await deleteDoc(doc(Firestore, "currentShift/", shiftID));
        } catch (ex) {

        }
    },
    getCurrentShift: async (companyID: string) => {
        try {
            const q = query(collection(Firestore, "currentShift"), where("teamID", "==", companyID))
            const querySnap = await getDocs(q)
            let shift: any = []
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            })
            return shift[0]
        } catch (ex) {

        }
    },
    addShiftInHistory: async (shift: blankShiftType) => {
        try {
            const docRef = collection(Firestore, "blankShifts")
            await setDoc(doc(docRef), shift)
        } catch (ex) {

        }
    },
    markProductAsReady: async (shiftID: string, productID: string) => {
        try {
            const docRef = query(collection(Firestore, "currentShift"), where("shiftID", "==", shiftID))
            const querySnap = await getDocs(docRef)
            let products: any[] = []

        } catch (ex) {

        }
    },
    getPassedShiftById: async (shiftId: string) => {
        try {
            const docRef = query(collection(Firestore, "blankShifts"), where("shiftID", "==", shiftId))
            const querySnap = await getDocs(docRef)
            let shift: any[] = []
            querySnap.forEach((doc) => {
                shift.push(doc.data())
            })
            return shift[0]
        } catch (ex) {

        }
    },
    createuserWithEmailAndPassword: async (nickName: string, email: string, password: string) => {
        try {
            let uid = await createUserWithEmailAndPassword(auth, email, password)
            if (uid.user) {
                const docRef = collection(Firestore, "Users")

                let newUser = {
                    userName: nickName,
                    team: null,
                    userID: uid.user.uid,

                }
                await await setDoc(doc(Firestore, "Users/" + uid.user.uid), newUser)
                await signInWithEmailAndPassword(auth, email, password)
            }
        } catch (ex) {
            console.log(ex)
        }
    },
    getUserById: async (userID: string) => {
        try {
            const docRef = query(collection(Firestore, "Users"), where("userID", "==", userID))
            const querySnap = await getDocs(docRef)
            let user: any[] = []
            querySnap.forEach((doc) => {
                user.push(doc.data())
            })
            return user[0]
        } catch (ex) {

        }
    },
    getClanList: async () => {
        try {
            const q = query(collection(Firestore, "Clans"))
            const querySnap = await getDocs(q)
            let clans: any[] = []
            querySnap.forEach((doc) => {
                clans.push(doc.data())
            })

            return clans
        } catch (ex) {

        }
    },
    getProductByID: async (id: string): Promise<DocumentData | undefined> => {
        try {
            let docRef = doc(Firestore, "Premixes/", id);
            let products = await getDoc(docRef);

            console.log(products.data());
            return products;


        }
        catch (ex) {
            console.log(ex);

        }
    },
    leavetheTeam: async (teamID: string, userID: string, userName: string) => {
        try {

            let docRef = doc(Firestore, "Clans/", teamID)
            let userRef = doc(Firestore, "Users/", userID)
            let team = await getDoc(docRef)

            if (team.data()?.users.length === 1) {
                deleteDoc(docRef)

            } else {
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
    },
    getClansByUserID: async (userID: string) => {
        try {
            const q = query(collection(Firestore, "Clans"), where("userIDs", "array-contains", userID))
            const querySnap = await getDocs(q)
            let clans: any[] = []
            querySnap.forEach((doc) => {
                clans.push(doc.data())

            })

            return clans[0]
        } catch (ex) {
            console.log(ex)
        }
    },
    joinTheClan: async (userID: string, userName: string, clanID: string, clanName: string) => {
        try {
            const clansRef = doc(Firestore, "Clans/", clanID);
            await updateDoc(clansRef, {
                users: arrayUnion(userName),
                userIDs: arrayUnion(userID)
            })
            const userRef = doc(Firestore, "Users/", userID)
            await updateDoc(userRef, {
                team: clanName,
                teamID: clanID
            })

        } catch (ex) {
            console.log(ex)
        }
    },
    createTheClan: async (team: { newTeamName: string, newTeamDescription: string, }, userID: string, userName: string) => {
        try {
            const docRef = collection(Firestore, "Clans")
            const userRef = doc(Firestore, "Users/", userID)
            const docID = await doc(docRef)
            await updateDoc(userRef, {
                team: team.newTeamName,
                teamID: docID.id
            })

            let newTeam = {
                teamName: team.newTeamName,
                userIDs: [userID],
                users: [userName],
                teamID: docID.id,
                description: team.newTeamDescription
            }
            await setDoc(docID, newTeam)

        } catch (ex) {
            console.log(ex)
        }
    },
    getAllSpirits: async () => {
        try {
            let docRef = collection(Firestore, "Spirits")
            let doc = await getDocs(docRef)
            let spirits: any[] = []
            doc.forEach((doc) => {
                spirits.push(doc.data())
            })
            return spirits
        } catch (ex) {

        }
    },
    getIngridientByID: async (id: string) => {
        try {
            let q = query(collection(Firestore, "Spirits"), where("ID", "==", id))
            let querySnap = await getDocs(q)
            let ingridient: any[] = []
            querySnap.forEach((doc) => {
                ingridient.push(doc.data())
                console.log(doc.data())
            })
            return ingridient[0]
        } catch (ex) {

        }
    }

}


