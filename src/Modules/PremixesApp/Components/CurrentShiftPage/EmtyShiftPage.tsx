import { NavLink } from "react-router-dom";
import "../../../../Assets/Styles/BlamkShift.css"


// ---------
// If theres is no open shift at this time - return this component

export const EmptyShift = () => {
    return (
        <section className={`empty_shift_container container`}>
        <span>There is no open shift</span>
        {/* Link to shifth constructor */}
        <NavLink className={`nav_link begin-shift`} to={"create-new"}>
            Begin
        </NavLink>
    </section>
    )
}