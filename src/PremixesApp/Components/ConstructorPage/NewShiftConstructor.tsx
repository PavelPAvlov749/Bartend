import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../../Redux/Store";
import { productType } from "../../../Redux/Types";
import { blanksActions, } from "../../../Redux/BlankShiftReducer";
import "../../../Styles/BlamkShift.css"
import { getProductsByCompanyID } from "../../../Redux/ProductReduxer";
import { CreateNewShiftControls } from "./CreateNewShiftControls";
import { ProdcustItem } from "./PrroductItem";



export const CreateNewShift = () => {
    let isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    const user = useSelector((state: Global_state_type) => state.App.user)
    const blanks = useSelector((state: Global_state_type) => state.blankShift.productList)
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getProductsByCompanyID(user.teamID as string))
    }, [])


    const toggleSelecrted = (blank: productType) => {
        if (blank.checked) {
            dispatch(blanksActions.deselectItem(blank.id as string))
        } else {
            dispatch(blanksActions.selectItem(blank.id as string))
        }
    }


//     return (
//         <section className={`new_shift container translate_animation ${isDarkTheme ? "Dark" : "Light"}`}>
//             {/* <CreateNewShiftControls blanks={blanks} user={user}/> */}
//             {blanks.map((el: productType) => {
//                 return (
//                 }
//                 //    <ProdcustItem name={el.name} id={el.id as string} isChecked={el.checked as boolean} toggleFunction={toggleSelecrted} />
//                 )
//             })}
//         </section>
//     )
// }

}
