
// Define Props Type
type registrationFormType = {
    touched: boolean | undefined,
    handleChange : (e : React.ChangeEvent<any>) => void,
    errors : string | undefined,
    type : string,
    id : string,
    callback? : () => {},

}
/**
 * This component return input and span component containig error message
 * If error was thrown
 * 
 * @param props registrationFormType
 * @returns React.Ellemet
 */
export const RegistrationFormInput: React.FC<registrationFormType> = (props : registrationFormType) => {
    return (
        <>
            <input type={props.type} id={props.id} autoComplete="off" onChange={props.handleChange} placeholder={props.id} />
            <span className="onInputError">{props.touched ? props.errors : null}</span>
        </>
    )
}
