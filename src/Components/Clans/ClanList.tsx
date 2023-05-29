import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { ClanType, clanActions, createClanThunk, getAllClans, getClanListByUserID, joinTheClan } from "../../Redux/ClanReducer";
import styles from "../../Styles/teamList.module.css"

export const ClanList = () => {
    const dispatch : any = useDispatch()
    const user = useSelector((state : Global_state_type) => state.App.user)
    useEffect(() => {
        dispatch(getClanListByUserID(user.userID as string))
        dispatch(getAllClans())
    },[])
    const teamName = useSelector((state : Global_state_type) => state.clans.newClanName)
    const clanList = useSelector((state:Global_state_type) => state.clans.clanList)

    const searchedClanName = useSelector((state : Global_state_type) => state.clans.searchedClanName)
    const team = useSelector((state : Global_state_type) => state.clans.joinedClans[0])
    let [ClanType,setClanType] = useState("all")
    // FUNCTIONS
    const createTeam = (name : string,userID : string,userName : string) => {
        dispatch(createClanThunk(name,userID,userName))
        debugger
    }
    const joinClan = (userID : string,userName : string,clanID  : string,clanName: string) => {
        dispatch(joinTheClan(userID,userName,clanID,clanName))
    }
    const leaveClan = (clanID : string) => {
        dispatch()
    }
    return (
        <section className={styles.team_container}>
            <section className={styles.controls}>
                <span onClick={() => {setClanType("all")}}>Поиск</span>
                <span onClick={()=> {setClanType("my-clans")}}>Моя команда </span>
            </section>
            {ClanType === "all" ?
            <>
             <input id={styles.search} type="text" placeholder="Название команды"/>
            <section className={styles.teams_list}>
            {clanList ? clanList.map((el : ClanType) => {
                return(
                    <div className={styles.single_team}>
                        <span>{el.clanName}</span>
                        <button
                        onClick={!el.users?.includes(user.userID as string) ? () => {joinClan(user.userID as string,user.userName as string, el.clanID,el.clanName)} : () => {leaveClan(el.clanID)}}
                        >{el.users?.includes(user.userID as string) ? "Покинуть" : "Вступить"}</button>
                    </div>
                )
            }) : searchedClanName.length > 0 ? "Клан не найден" : null}
            </section> 
            </>
           : 
           <>
           <section className={styles.my_team}>
               
                {user.team ? 
                <>
                  <h1>{user.team}</h1>
                  <h2>Участники</h2>
                    {team.users.map((el : string) => {
                        return (
                            <span>{el}</span>
                        )
                    })}
                    
                </>    
             : 
             <>
             <h1>Вы не состоите в команде</h1>
             <input type="text" placeholder="Название команды" onChange={(e : React.SyntheticEvent<HTMLInputElement>) => {
                dispatch(clanActions.setNewClanName(e.currentTarget.value))
             }}/>
             <span onClick={() => {
                createTeam(teamName,user.userID as string,user.userName as string)
             }}>Создать</span>
             </>
             }
           </section>
           </>
           
           }
         
        </section>
    )
}