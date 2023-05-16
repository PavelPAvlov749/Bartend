import React from "react";
import { useDispatch } from "react-redux";

export const NewProduct = () => {
    const dispatch = useDispatch()
    console.log("render")
    let newProduct = {}
    let currentKey = ""

    const onNameChange = (e : any) => {
        newProduct = {name : e.currentTarget.value }
    }
    let addComponentName = (e : any) => {
        newProduct = {...NewProduct}
        currentKey = e.currentTarget.value
    }
    let addComponentValue = (e : any) => {
        newProduct = {...newProduct,[currentKey] : e.currentTarget.value}
}
    return (
        <section className="new_product_container">
            <input type="text" placeholder="Name" onChange={onNameChange}/>
            <input type="text" placeholder="Ingridient" onClick={addComponentName}/><input onChange={addComponentValue} type="text" placeholder="Value"/>
            <input type="text" placeholder="Ingridient" onClick={addComponentName}/><input onChange={addComponentValue} type="text" placeholder="Value"/>

            <button onClick={() => {
                console.log(newProduct)
                console.log(currentKey)
            }}>Show</button>
        </section>
    )
}