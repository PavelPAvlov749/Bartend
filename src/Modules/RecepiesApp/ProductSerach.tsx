
type SearchPropsType = {
    filterProducts : (event : string) => void
}
export const RecepiesSearch : React.FC<SearchPropsType> = (props) => {
    // On search params change handler
    function searchHandler (event : React.SyntheticEvent<HTMLInputElement>) {
        props.filterProducts(event.currentTarget.value);
    }
    return (
        <>
            <input onChange={searchHandler} type="text" placeholder="Find by name " />
        </>
    )
}