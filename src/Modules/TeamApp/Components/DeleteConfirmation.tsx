import "../../../Assets/Styles/modal.css"
// Defina a props type 
type ModalPropsType = {
    setState : () => void
    confirmCallback? : () => void
}

export const ModalWindow : React.FC<ModalPropsType> = (props) => {
    
    return (
        <div className="modal-container">
        <section className="modal">
            <h1 className="alert">Are you shure you want to delete this user?</h1>
            <div className="alert-selection">
            <span onClick={props.confirmCallback}>Yes</span>
            <span onClick={props.setState}>No</span>
            </div>
        </section>
        </div>

    )
}