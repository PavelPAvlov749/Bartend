// import { type } from "os"

import { type } from "os"

export type ProfileType = {
    avatar : any,
    companyName : string | null,
    premixes : Array<{}> | null,
    coctails : Array<{}> | null,
}

export type productType = {
    name: string,
    description: string,
    composition: {},
    id?: string,
    calculate?: (val: number) => {},
    teamID? : string,
    checked? : boolean,
    done? : boolean
}


export type blankShiftType = {
    date : string,
    products : productType[],
    teamID : string,
    teamName : string,
    employe : string,
    done : boolean,
    count : number,
    shiftID? : string,
    
}

export type userType = {
    userName : string,
    password : string,
    companyName : string,
    repeatPassword : string,
    email : string
}

export type userPageType = {
    userID: string | null,
    userName: string | null,
    team: string | null,
    teamID: string | null
  }