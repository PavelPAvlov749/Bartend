import "../../Styles/BlamkShift.css"

export const ProgressBar = (props: { absoluteFullCount: number,absolureReadyCount : number, percent: number }) => {
    return (
        <div className={`progress_bar `}>
            <span>{props.absolureReadyCount + "/" + props.absoluteFullCount}</span>
            <span>{props.percent.toFixed(1)+ "%"}</span>
        </div>
    )
}