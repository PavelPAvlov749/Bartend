import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore"
import {Firestore }from "./FirebaseConfig"

export const CheckListsAPI = {
    getChekLists : async (teamID : string) => {
        try {
      
            let docRef = query(collection(Firestore,"CheckLists"),where("teamID","==",teamID))
            let querySnap = await getDocs(docRef)
            let chekLists : any[] = []
            querySnap.forEach((doc) => {
                chekLists.push(doc.data())
            })
        
            return chekLists
        }catch (ex){
            console.log(ex)
        }
    },
    addCheckList : async (teamID : string,tasks : string[],name : string) => {
        try{
            const docRef = collection(Firestore,"CheckLists")
            const docID = await doc(docRef)
            let newChekList = {
                name : name,
                tasks : tasks,
                teamID : teamID,
                createdAt : new Date(),
                tasksCounter : tasks.length,
                id : docID.id
            }
            await setDoc(docID,newChekList)
        }catch(ex){
            console.log(ex)
        }
    },
    deleteCheckList : async (checkListId : string) => {
        try{
           
            await deleteDoc(doc(Firestore,"CheckLists/",checkListId))
        }catch(ex){
            console.log(ex)
        }
    }
}