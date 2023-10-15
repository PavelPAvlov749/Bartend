// STYLES IMPORTS
import { CurrentShift } from "../CurrentShiftPage/CurrentShift";
import "../HistoryPage/PassedShiftItem";
import '../HistoryPage/ShiftsHistory';
import { ShiftsHistory } from "../HistoryPage/ShiftsHistory";
// COMPONENTS 


// Use navbar hook witch return navbar component and actual state of ShiftType
import { useNavbar } from "./UseNabar";


// Основной компонент MainPage
export const MainPage = () => {
    //Get a tuple from the navbar component and the current state of the currentShift variable
    const [Navbar, shiftType] = useNavbar();

    return (
        <section className={`blank_shift_container translate_animation`}>
            {Navbar}
            {/* В зависимости от типа смены отображаем соответствующий компонент */}
            {shiftType === 0 ? <CurrentShift /> : <ShiftsHistory />}
        </section>
    );
}

