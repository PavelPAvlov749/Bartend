import { NavLink } from "react-router-dom";
import "../../../Styles/BlamkShift.css"


// ---------
// If theres is no open shift at this time - return this component

export const EmptyShift = () => {
    return (
        <section className={`empty_shift_container container`}>
        <span>Нет открытых смен</span>
        {/* Link to shifth constructor */}
        <NavLink className={`nav_link`} to={"create-new"}>
            Начать
        </NavLink>
    </section>
    )
}