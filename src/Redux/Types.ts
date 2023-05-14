// import { type } from "os"

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
    id: string,
    calculate: (val: number) => {}
}
