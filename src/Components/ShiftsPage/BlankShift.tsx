import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { productType } from "../../Redux/Types";
import { blanksActions, getPremixes } from "../../Redux/BlankShiftReducer";
import "../../Styles/BlamkShift.css"
import { CreateNewShiftControls } from "./CreateNewShiftControls";



export const CreateNewShift = () => {
    let isDarkTheme = useSelector((state : Global_state_type) => state.App.isDarktheme)
    const user = useSelector((state: Global_state_type) => state.App.user)
    const blanks = useSelector((state: Global_state_type) => state.blankShift.productList)
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(getPremixes(user.teamID as string))
    }, [])

    
    const toggleSelecrted = (blank: productType) => {
        if (blank.checked) {
            dispatch(blanksActions.deselectItem(blank.id as string))
        } else {
            dispatch(blanksActions.selectItem(blank.id as string))
        }
    }


    return (
        <section className={`new_shift container translate_animation ${isDarkTheme ? "Dark" : "Light"}`}>
            <CreateNewShiftControls blanks={blanks} user={user}/>
            {blanks.map((el: productType) => {
                return (
                    <div key={el.id} className={el.checked ? `checked_element` : `unchecked_element`} onClick={() => { toggleSelecrted(el) }}>
                        <span key={el.id}>{el.name}</span>
                    </div>
                )
            })}
        </section>
    )
}


