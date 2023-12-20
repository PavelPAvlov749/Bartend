import { useDispatch } from "react-redux"
import { newCardActions } from "../../../Redux/NewCardReducer"

export const ConstructorPageDesktop: React.FC = () => {
    const dispatch: any = useDispatch()
    // SET NAME
    const onNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(newCardActions.setNewName(e.currentTarget.value))
    }
    return (
        <section>
            <h1>Recepie constructor</h1>
            <input type="text" placeholder="Наименование" id="name" onChange={(e) => { onNameChange(e) }} />
            <button>Next</button>
        </section>
    )
}