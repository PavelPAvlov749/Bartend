import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { NavLink } from "react-router-dom";





export const CheckListPreview = (props: { name: string, tasks: string[], id: string }) => {
    let jsxTasks: ReactJSXElement[] = [];
    function renderTasksPreview(tasks: string[]) {
        if (tasks.length <= 4) {
            for (let i = 0; i < tasks.length; i++) {

                jsxTasks.push(<span className="preview__item__task">{tasks[i]}</span>);

            }
        }
        if (tasks.length > 4) {
            for (let i = 0; i < 4; i++) {

                jsxTasks.push(<span className="preview__item__task">{tasks[i]}</span>);

            }
        }
        if (tasks.length == 0) {
            jsxTasks.push(<span className="preview__item--no-task">No tasks added ...</span>)
        }

    }
    renderTasksPreview(props.tasks);
    return (
        <li key={props.id} className="cheklist-preview__item">
            <NavLink key={props.id} to={`/check-lists/id=${props.id}`}>
                <h3>{props.name}</h3>
                {jsxTasks.map((el: ReactJSXElement) => {
                    return (
                        <>
                            {el}
                            <br />
                        </>
                    )
                })}
            </NavLink>

        </li>
    )
}