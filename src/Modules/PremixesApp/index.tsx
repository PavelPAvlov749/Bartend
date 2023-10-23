import { Route, Routes } from "react-router-dom"
import { MainPage } from "./Components/MainPage/MainPage"
import { ShiftConstructorContainer } from "./Components/ConstructorPage/ShiftCounstructorContainer"

export const PremixesApp = () => {
    return (
        <section className="premixes-app">
            <Routes>
                {/* <Route path="/shiftManager" element={<MainPage/>}></Route> */}
                <Route path="/shiftManager/create-new" element={<ShiftConstructorContainer/>}/>
            </Routes>
        </section>
    )
}