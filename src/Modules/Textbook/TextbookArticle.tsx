import { useEffect, useState } from "react";
import { Router, useLocation } from "react-router-dom";
import textbookAPI from "../../services/Firebase/TextbookAPI";

const TextboolArticle = () => {
    // get article name from URL parameters
    const article : string = useLocation().pathname.split('=')[1];
    // Get article data from firebase
    const [articleDoc,setArticle] = useState('')
    useEffect(() => {
        // get data ...
       
    },[]);
    
    return ( 
        <article>

        </article>
     );
}
 
export default TextboolArticle;