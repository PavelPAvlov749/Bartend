import { NavLink } from "react-router-dom";
import "../../../Styles/BlamkShift.css"



export const NoOpenShiff = () => {
    return (
        <section className={`empty_shift_container container`}>
        <span>Нет открытых смен</span>
        <NavLink className={`nav_link`} to={"create-new"}>
            Начать
        </NavLink>
    </section>
    )
}