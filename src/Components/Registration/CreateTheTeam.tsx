import { Formik } from "formik"
import styles from "../../Styles/CreateTeamContainer.module.css"


export const CreateTheTeam = () => {
    const Submit = () => {

    }
    return (
        <section className={styles.create_the_team_container}>
            <h1>Create teams and <span>Join</span> your coworkers</h1>
            <Formik enableReinitializet={true}
                initialValues={{ nickName: "", companyName: "" }}
                onSubmit={Submit}
                // validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => {
                    return (
                        <div className={styles.create_team_inputs}>
                            <input type="text" id="nickName" autoComplete="off" onChange={handleChange} placeholder="Nickname"/>
                            <input type="nujoin-teammber" id="companyName" autoComplete="off" onChange={handleChange} placeholder="Company name "/>
                            <button
                                //@ts-ignore 
                                onClick={handleSubmit} id="next_join_step" type="submit">Next</button>


                        </div>
                    )}}
                </Formik>
        </section>
    )
}