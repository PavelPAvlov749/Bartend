// React,React hooks imports
import { useState } from "react"
import { useNavigate } from "react-router-dom";
// Components
import { RecepiesSearch } from "./ProductSerach";
import { RecepiesList } from "./RecepiesList";
import { DotsMenu } from "./DotsMenu";
// Style imports
import styles from "./Styles/RecepiesContainer.module.css";
// Assests
// Redux,ReduxThunks,Actions
// Cuastom hooks
import { useProductFilter } from "../../Helpers/CustomHooks";


/**
 * Container component for premix recipe application. 
 * Contains two sections: alcoholic and non-alcoholic premixes
 * 
 * @returns React.Ellement
 */

export const RecepiesAppContainer: React.FC = () => {
    // State defining a recepies section
    // 0 Non alcoholic 1 alc premixes
    const [section, setSection] = useState(0);
    // Array of section labels
    let sections: string[] = ['Non-alcoholic', 'alcoholic'];
    // On change handler
    function onChange(event: React.SyntheticEvent, newValue: number) {
        setSection(newValue);
    }
    // Get products 
    const [products, filterProducts] = useProductFilter('');
    // Grt navigate
    const navigate = useNavigate();

    return (
        <section className={styles.recepiesContainer}>
            {/* <SelectionTabs setValue={setSection} handleChange={onChange} labels={sections} value={section} />        */}
            <div className={styles.recepiesContainerHeader}>
                <h1 className={styles.recepiesContainer__tittle}>Premixes : </h1>
                <DotsMenu />
            </div>
            <RecepiesSearch filterProducts={filterProducts} />
            <RecepiesList navigate={navigate} recepies={products} />

        </section>
    )
}