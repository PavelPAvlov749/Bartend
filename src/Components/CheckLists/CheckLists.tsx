import React, { useState } from "react";
import  "../../Styles/CheckLists.css"


const checkLists : {name : string,toDos : string[]} | null = null


export const NewCheckList = () => {
    const [inputs, setInputs] = useState([<input type="text" placeholder="Задача" />])
    const addInputHandler = () => {
        setInputs([...inputs, <input type="text" placeholder="Название" />])
    }
    return (
        <section className="new_check_list_container">
            <div className="styles.new_check_list_controls">
                <span onClick={addInputHandler}>+</span>
            </div>
            <input type="text" placeholder="Название" />

        </section>
    )
}

export const EmptyCheckLists = () => {
return (
    <>
        <h1>
            Чек листов нет
        </h1>
        <span>Добавить</span>

    </>
)
}
export const CheckListsList = (props : {checkLists : Array<{name : string,toDos : string[] | []}>}) => {
    return (
        <div className="single_check_list">
            {props.checkLists.map((el : {name : string,toDos : string[]}) => {
                return (
                    <>
                        <span>{el.name}</span>
                    </>
                )
            })}

        </div>
    )
}


export const CheckLists = () => {
    
    return (
        <section className="check_lists_container page_apperas_animation">
            <h1>Чек листы</h1>
            {checkLists === null ? <EmptyCheckLists/> : <CheckListsList checkLists={checkLists}/>
            }


        </section>
    )
}