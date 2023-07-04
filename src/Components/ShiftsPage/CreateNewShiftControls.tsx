import { getFullDateString } from "../../Helpers/Helpers";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { productType, userPageType } from "../../Redux/Types";
import { useNavigate } from "react-router-dom";
import { setCurrentShiftByCompanyID, blanksActions } from "../../Redux/BlankShiftReducer";
// IMPORT ICONS AND STYLES
import "../../Styles/BlamkShift.css"
import selectAll from "../../Assets/icons8-checked-checkbox-100.png"
import clearAll from "../../Assets/icons8-clear-100.png";
import startIcon from "../../Assets/icons8-start-64.png"
import broomIconDark from "../../Assets/icons8-broom-100.png"
import startIconDark from "../../Assets/icons8-start-96.png"
import checkBoxDark from "../../Assets/icons8-checkbox-100.png"


export const CreateNewShiftControls = (props: { blanks: productType[], user: userPageType }) => {
    let isDarkTheme = useSelector((state: Global_state_type) => state.App.isDarktheme)
    const navigate = useNavigate()
    const dispatch: any = useDispatch()

    const createShift = () => {
        if (props.user.team) {
            let shift = {
                date: getFullDateString(),
                employe: props.user.userName as string,
                products: props.blanks.filter((el: productType) => el.checked === true).map((el: productType) => {
                    return { ...el, done: false }
                }),
                done: false,
                count: props.blanks.filter((el: productType) => el.checked === true).length,
                teamID: props.user.teamID as string,
                teamName: props.user.team
            }
            dispatch(setCurrentShiftByCompanyID(shift))
            navigate("/begin-blank-shift")
        } else {
            navigate("/clan-list")
        }

    }
    return (
        <ul className={`controls`}>
            <li>Select All
                <img className="icon" id={`selectAll`} src={isDarkTheme ? selectAll : checkBoxDark} alt="" onClick={() => {
                    dispatch(blanksActions.selectAllItems())
                }} />
            </li>
            <li>Clear All
                <img className="icon" id={`clear`} src={isDarkTheme ? clearAll : broomIconDark} alt="" onClick={() => {
                    dispatch(blanksActions.deselectAll())
                }} />
            </li>
            <li>Start
                <img className="icon" src={isDarkTheme ? startIcon : startIconDark} alt="" onClick={createShift} />
            </li>



        </ul>
    )
}