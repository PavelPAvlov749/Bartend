import React from 'react';

// Define the props type for ShiftPreview component
type ShiftPreviewType = {
    employee: string;
    date: string;
    count: number;
    onClickHandler: (shiftID: string) => void;
    shiftID: string | undefined;
};

/**
 * A component for displaying shift preview information.
 * @param props - The properties for the ShiftPreview component.
 * @returns The ShiftPreview component.
 */
export const ShiftPreview = (props: ShiftPreviewType) => {
    return (
        <li key={props.shiftID} className="passed_shift_preview_item" onClick={() => props.onClickHandler(props.shiftID as string)}>
            <span>Date: {props.date}</span>
            <span>Employee: {props.employee}</span>
            <span>Number of Positions: {props.count}</span>
            <span id={`showMore`} onClick={() => props.onClickHandler(props.shiftID as string)} >Show More</span>
        </li>
    );
};