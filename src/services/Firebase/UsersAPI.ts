import { collection, getDocs, query, where } from "firebase/firestore";
import FirebaseApi from "./FirebaseConfig";

class UsersAPI extends FirebaseApi {
    constructor() {
        super();
    }
    public async getUserByID(userID: string) {
        try {
            // Get Document refrence
            const docRef = query(collection(this.realtimeDatabase, "Users"), where("userID", "==", userID));
            const querySnap = await getDocs(docRef);
            // Define a result array
            let user: any[] = [];
            // Push results into array
            querySnap.forEach((doc) => {
                user.push(doc.data())
            })
            return user[0]
        }
        catch (ex) {
            console.log(ex);
        }
    }
}

export const usersAPI = new UsersAPI();