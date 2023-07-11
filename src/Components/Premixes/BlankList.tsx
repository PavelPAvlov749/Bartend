
import { productType } from "../../Redux/Types";
import { NavLink } from "react-router-dom";
import { productActions } from "../../Redux/ProductReduxer";
import empty from "../../Assets/icons8-empty-90.png"
import { parseElementNameToString } from "../../Helpers/Helpers";



export const PremixesList = (props: { blanks: productType[] ,dispatch : any,Navigate : (a : string) => any}) => {

    if (props.blanks.length > 0 && props.blanks !== undefined) {
        return (
            <>
                {props.blanks.map((el : productType) => {
                    return (
                        <div key={el.id} className="element" onClick={() => {
                            props.dispatch(productActions.setAcualProductCard(el))
                            props.Navigate("/card/id=" + el.id)
                            }}>
                        
                            <NavLink to={"/product/id=" + el.id}>
                            <span>{parseElementNameToString(el.name)}</span>
                            </NavLink>
                         
                            <br />
                          
                        </div>
                    )
                })}
            </>
        )
        
              
    }else{
        return (
            <div className="nothing_found">
            <img src={empty} className="emtyIcon" alt="" />
            <h1>Список пуст</h1>
        </div>
        )
    }
}