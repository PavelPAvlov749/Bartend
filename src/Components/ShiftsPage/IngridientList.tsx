import { useDispatch } from "react-redux";
import { productType } from "../../Redux/Types";
import "../../Styles/BlamkShift.css"
import { blanksActions} from "../../Redux/BlankShiftReducer";



export const IngridientList = (props : {ingridients : productType[]}) => {
    const dispatch: any = useDispatch()
    const toggleItem = (el: productType) => {
        props.ingridients.map((product: productType) => {
            if (product.done === true) {
                return { ...product, done: false }
            } else {
                return product
            }
        })
        if (el.done === true) {
            dispatch(blanksActions.setItemUndone(el.id as string))
        } else {
            dispatch(blanksActions.setItemDone(el.id as string))
        }
    }
    return (
        <section className="product_list_container ">
                {props.ingridients?.map((el: productType) => {
                        return (
                            <div key={el.id} className={el.done ? `single_product` : `ready_product`}>
                                <span>{el.name}</span>
                                <span id={`setDoneBtn`} onClick={() => {
                                    toggleItem(el)
                                }}>{el.done ? "В процессе" : "Готово"}</span>
                            </div>

                        )
                    })}
        </section>
    )
}