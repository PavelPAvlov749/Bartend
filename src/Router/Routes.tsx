// ---------- IMPORT REACT COMPOENTS

import { Navigate } from "react-router-dom";
import { CheckLists } from "../Components/CheckLists/CheckLists";
import { CheckListPage } from "../Components/CheckLists/CheclListPage";
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
import { NewCheckList } from "../Components/CheckLists/NewCheckList";
import { KnowledgeBase } from "../Components/KnowledjeBase/KnowledgeBase";
import { IngridientCard } from "../Components/KnowledjeBase/Ingridient";
import { LoginPage } from "../Components/Registration/LoginPage";
import { Registration } from "../Components/Registration/Registration";
import { PremixesApp } from "../PremixesApp/Premixes";
import { PassedShift } from "../PremixesApp/Components/HistoryPage/PassedShiftItem";

// ---------- ROUTES STRINGS

const HOME = "/home"
const COCKTAIL_CARD = "/cocktail/:id"
const PREMIX_LIST = "/premixes"
const ADD_PRODUCT = "/add"
const PRODUCT_CARD = "/card/:id"
const LOG_OUT = "/logOut"
const REGISTRATION = "/registration"
const NO_MATCH_ROUTE = "*"
const BLANK_SHIFT = "/blank-shift/*"
const STEP_2 = "add-step-two"
const NEW_BLANK_SHIFT = "/blank-shift/create-new"
const CHECK_LISTS = "/check-lists"
const PASSED_SHIFT = "blank-shift/:id"
const CLAN_LISTS = "/clan-list"
const CREATE_TEAM = "/create-team"
const JOIN_TEAM = "/join-team"
const NEW_CHECK_LIST = "/new-check-list"
const CHECK_LIST = "/check-lists/:id"
const KNIWLEDGE_BASE = "knowledge-base"
const INGRIDIENT = "ingridient/:id"
const HISTORY = '/blank-shift/history'

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