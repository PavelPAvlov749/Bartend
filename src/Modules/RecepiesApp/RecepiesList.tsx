import { productType } from "../../Redux/Types"
// Styles
import styles from "./Styles/RecepiesContainer.module.css";

// List Props type 
type RecepiesListPropsType = {
    recepies: productType[],
    navigate: any // Remove this any later and define accurate type for this function
}

export const RecepiesList: React.FC<RecepiesListPropsType> = (props) => {

    // Navigation to product card function
    function goToProductCard(event: React.SyntheticEvent<HTMLLIElement>) {
        props.navigate("/card/id=" + event.currentTarget.dataset.id);
    }
    return (
        <ul className={styles.RecepiesList}>
            {
            /*  Map on the recepies array and reuturn <li> with containing 
                name of each element and navigation function passed into onClick 
            */}

            {props.recepies.map((el: productType) => {
                return (
                    <li className={styles.listItem} key={el.id} data-id={el.id} onClick={goToProductCard}>{el.name}</li>
                )
            })}
        </ul>




    )
}