import { push, ref, set } from "firebase/database"
import { dataBase } from "./FirebaseConfig"

export const DatabaseApi = {
    
    sendMessage : async (teamID : string,mesageText : string,senderName : string,senderID : string) => {
        try{
            await push(ref(dataBase,"Messages/" + teamID),{
                teamID : teamID,
                senderName : senderName,
                senderID : senderID,
                messageText : mesageText
            })
        }catch(ex){
            console.log(ex)
        }
    }
}