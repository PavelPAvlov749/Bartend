import { NavLink } from 'react-router-dom';
import styles from './Styles/TextbookContainer.module.css';


export const TextbookContainer: React.FC = () => {

    return (
        <section className={styles.textbookContainer}>
            <h1 className={styles.textbookContainer__tittle}>Textbook</h1>
            <ul className={styles.tittles}>
                <li className={styles.tittleItem}>
                    <NavLink to={"/article/name=distilation"}>
                        Distilation
                    </NavLink>
                </li>
                <li className={styles.tittleItem}>
                    <a href="/article/name=mixibg-techniques">Mixing techniques</a>
                </li>
                <li className={styles.tittleItem}>
                    <a href="/article/name=spirits">Spirits</a>
                </li>
                <li className={styles.tittleItem}>
                    <a href="/article/name=modern-techniques">Modern techniques</a>
                </li>
                <li className={styles.tittleItem}>
                    <a href="/article/name=coctails-categories">Coctail categories</a>
                </li>
            </ul>
        </section>
    )
}