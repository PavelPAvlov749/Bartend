// ---------- LOADER
import loader from "../../../Assets/Icons/icons8-jigger-64.png";

export const Preloader = () => {
    return (
        <div className='App init_screen_container'>
            <img src={loader} id='loader' alt="" />
            <h1>Loading ...</h1>
        </div>
    )
}