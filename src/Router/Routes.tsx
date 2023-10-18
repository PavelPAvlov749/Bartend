// ---------- IMPORT REACT COMPOENTS

import { Navigate } from "react-router-dom";
import { CheckLists } from "../ChecklistApp/Components/CheckLists";
import { CheckListPage } from "../ChecklistApp/Components/CheclListPage";
import { Premixes } from "../Components/Ingridients/Premixes";
import { ProductCard } from "../Components/Ingridients/ProductCard";
import { CocktailCard } from "../Components/KnowledjeBase/CoctrailCard";

import { CreateNewShift } from "../Components/ShiftsPage/NewShiftConstructor";
// import { ShiftPageContainer } from "../Components/ShiftsPage/ShiftsPageContainer";
import { CreateTeam } from "../Components/Teams/CreateTeam";
import { JoinTeam } from "../Components/Teams/JoinTeam";
import { HomePage } from "../Components/mainScreen";
import { ROUTE } from "../Redux/Types";
import { NewProduct } from "../Components/NewProduct/NewProduct";
import { SecondStep } from "../Components/NewProduct/SecondStep";
import { TeamPageContainer } from "../Components/Teams/ClanList";
import { NewCheckList } from "../ChecklistApp/Components/NewCheckList";
import { KnowledgeBase } from "../Components/KnowledjeBase/KnowledgeBase";
import { IngridientCard } from "../Components/KnowledjeBase/Ingridient";
import { LoginPage } from "../Components/Registration/LoginPage";
import { Registration } from "../Components/Registration/Registration";
import { PremixesApp } from "../PremixesApp/Premixes";
import { PassedShift } from "../PremixesApp/Components/HistoryPage/PassedShiftItem";

// ---------- ROUTES STRINGS

export const HOME = "/home"
export const COCKTAIL_CARD = "/cocktail/:id"
export const PREMIX_LIST = "/premixes"
export const ADD_PRODUCT = "/add"
export const PRODUCT_CARD = "/card/:id"
export const LOG_OUT = "/logOut"
export const REGISTRATION = "/registration"
export const NO_MATCH_ROUTE = "*"
export const BLANK_SHIFT = "/blank-shift/*"
export const STEP_2 = "add-step-two"
export const NEW_BLANK_SHIFT = "/blank-shift/create-new"
export const CHECK_LISTS = "/check-lists"
export const PASSED_SHIFT = "blank-shift/:id"
export const CLAN_LISTS = "/clan-list"
export const CREATE_TEAM = "/create-team"
export const JOIN_TEAM = "/join-team"
export const NEW_CHECK_LIST = "/new-check-list"
export const CHECK_LIST = "/check-lists/:id"
export const KNIWLEDGE_BASE = "knowledge-base"
export const INGRIDIENT = "ingridient/:id"
export const HISTORY = '/blank-shift/history'

export const PRIVATE_ROUTES : ROUTE[] = [
    {
        path : HISTORY,
        element : <h1>History</h1>
    },
    {
        path : HOME,
        element : <HomePage/>
    },
    {
        path : COCKTAIL_CARD,
        element : <CocktailCard/>
    },
    {
        path : JOIN_TEAM,
        element : <JoinTeam/>
    },
    {
        path : CREATE_TEAM,
        element : <CreateTeam/>
    },
    {
        path : CHECK_LIST,
        element : <CheckListPage/>
    },
    {
        path : PASSED_SHIFT,
        element : <PassedShift/>
    },
    {
        path : BLANK_SHIFT,
        element : <PremixesApp/>
    },
    {
        path : PREMIX_LIST,
        element : <Premixes/>
    },
    {
        path : PRODUCT_CARD,
        element : <ProductCard/>
    },
    {
        path : NEW_BLANK_SHIFT,
        element : <CreateNewShift/>
    },
    {
        path : CHECK_LISTS,
        element : <CheckLists/>
    },
    // {
    //     path : NO_MATCH_ROUTE,
    //     element : <Navigate to="/home" />
    // },
    {
        path : ADD_PRODUCT,
        element : <NewProduct isDarkTheme={true}/>
    },
    {
        path : STEP_2,
        element : <SecondStep isDarkTheme={true}/>
    },
    {
        path : CLAN_LISTS,
        element : <TeamPageContainer isDarkTheme={true}/>
    },
    {
        path : NEW_CHECK_LIST,
        element : <NewCheckList/>
    },
    {
        path : KNIWLEDGE_BASE,
        element : <KnowledgeBase/>
    },
    {
        path : INGRIDIENT,
        element : <IngridientCard/>
    }
]

export const PUBLICK_ROUTES : ROUTE [] = [
    {
        path : LOG_OUT,
        element : <LoginPage/>
    },
    {
        path : NO_MATCH_ROUTE,
        element : <Navigate to={"/logOut"}/>
    },
    {
        path : REGISTRATION,
        element : <Registration/>
    }

]