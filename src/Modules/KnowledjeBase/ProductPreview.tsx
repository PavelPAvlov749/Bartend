import React from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../Assets/Icons/icons8-cocktail-96.png";

interface IPreview {
    name: string,
    img: string | null,
    id: string,
    type : string
}


export const ProductPreview: React.FC<IPreview> = (props) => {
    const navigate = useNavigate();
    // Set icon dependin on props.img
    let src = props.img ? props.img : icon;
    // onClick hadler navigate to full product information by product id
    // from html id attr
    function goToProductCard(event: React.SyntheticEvent<HTMLDivElement>) {
        switch(props.type){
            case "premix" : {
                navigate(`/card/id=${event.currentTarget.id}`);
                break;
            }
            case "spirit" : {
                navigate("/ingridient/id=" + event.currentTarget.id);
                break;
            }
            case "cocktail" : {
                navigate("/cocktail/id=" + event.currentTarget.id);
                break;
            }
        }
       
    }
    return (
        <div key={props.id} id={props.id} className="cocktail_card" onClick={goToProductCard}>
            <img className="cocktail_preview" src={src} alt="" />
            <span>{props.name}</span>
        </div>
    )
}
