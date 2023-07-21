import  { useEffect } from "react";
import "../../Styles/PassedShift.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { getPassedShiftByID } from "../../Redux/BlankShiftReducer";
import { productType } from "../../Redux/Types";

export const PassedShift = () => {
    const shiftID = useLocation().pathname.split("=")[1]
    const dispatch : any = useDispatch()
    useEffect(() => {
        dispatch(getPassedShiftByID(shiftID))
    },[])
    const PassedShift = useSelector((state : Global_state_type) => state.blankShift.passedShift)
    const navigate = useNavigate()
    return (
        <section className={`container passed_shift_container translate_animation`}>
            <h3 onClick={() => {navigate(-1)}}>Назад</h3>
            <table>
            <tr>Смена от : <td>{PassedShift?.date}</td></tr>
            <tr>Заготовщик :<td>{PassedShift?.employe}</td></tr>
            <tr>Сделано позиций : </tr>
            {PassedShift?.products.map((el : productType) => {
                return (
                    <tr>{el.name}</tr>
                )
            })}
            </table>
          
        </section>
    )
}