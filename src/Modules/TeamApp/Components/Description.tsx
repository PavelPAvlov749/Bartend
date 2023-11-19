import React from "react";




export const Desctiption: React.FC<{ description: string, name: string }> = (props) => {
    return (
        <section className="team_page_info">
            <h2>{props.name}</h2>
            <section className="team_page_info__team-description">

                <h3>Описание </h3>
                <p>{props.description ? props.description : "No description"}</p>
            </section>
        </section>
    )
}