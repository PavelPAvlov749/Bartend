// -------------------------------------------
// 
//.............................................THIS FILE CONTAINS AN ARRAY MATCHING ADDRESS 
//                                              STRINGS WITH THEIR CORRESPONDING COMPONENTS
//                                              THESE ROUTES ARE USED BY THE FILE Router.tsx
// -------------------------------------------

// ---------- IMPORT REACT COMPOENTS

import { Navigate } from "react-router-dom";
import { CheckLists } from "../Modules/ChecklistApp/Components/CheckLists";
import { CheckListPage } from "../Modules/ChecklistApp/Components/CheclListPage";
import { Premixes } from "../Components/Ingridients/Premixes";
import { ProductCardContainer } from "../Components/Ingridients/ProductCardContainer";
import { CocktailCard } from "../Components/KnowledjeBase/CoctrailCard";
import { CreateTeam } from "../Modules/TeamApp/CreateTeam";
import { HomePage } from "../Components/mainScreen";
import { ROUTE } from "../Redux/Types";
import { NewProduct } from "../Components/NewProduct/NewProduct";
import { SecondStep } from "../Components/NewProduct/SecondStep";
import { NewCheckList } from "../Modules/ChecklistApp/Components/NewCheckList";
import { KnowledgeBase } from "../Components/KnowledjeBase/KnowledgeBase";
import { IngridientCard } from "../Components/KnowledjeBase/Ingridient";
import { LoginPage } from "../Modules/Auth/LoginPage";
import { Registration } from "../Modules/Auth/Registration";
import { PremixesApp } from "../Modules/PremixesApp/Premixes";
import { PassedShift } from "../Modules/PremixesApp/Components/HistoryPage/PassedShiftItem";
import { ShiftConstructorContainer } from "../Modules/PremixesApp/Components/ConstructorPage/ShiftCounstructorContainer";
import { TeamPageContainer } from "../Modules/TeamApp/TeamPageContainer";


// ---------- ROUTES STRINGS
export const SHIFT_MANAGER = '/shiftManager/*'
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
export const NEW_BLANK_SHIFT = "/shiftManager/create-new"  
export const CHECK_LISTS = "/check-lists"
export const PASSED_SHIFT = "shiftManager/:id"
export const CLAN_LISTS = "/clan-list"
export const CREATE_TEAM = "/create-team"
export const JOIN_TEAM = "/join-team"
export const NEW_CHECK_LIST = "/new-check-list"
export const CHECK_LIST = "/check-lists/:id"
export const KNIWLEDGE_BASE = "knowledge-base"
export const INGRIDIENT = "ingridient/:id"
export const HISTORY = '/blank-shift/history'


// PRIVATE ROUTES ARRAY
// These routes are available only to authorized users
// If an unauthorized user attempts to access, they are redirected to the login page

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
        path : CREATE_TEAM,
        element : <CreateTeam/>
    },
    {
        path : SHIFT_MANAGER,
        element : <PremixesApp/>
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
        element : <ProductCardContainer/>
    },
    {
        path : NEW_BLANK_SHIFT,
        element : <ShiftConstructorContainer/>
    },
    {
        path : CHECK_LISTS,
        element : <CheckLists/>
    },
    {
        path : NO_MATCH_ROUTE,
        element : <Navigate to="/home" />
    },
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
        element : <TeamPageContainer/>
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
// PUBLICK ROUTES ARRAY
// This routes are accessible for all users includeing not authiorized users
// 
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