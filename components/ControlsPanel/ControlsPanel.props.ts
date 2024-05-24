import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";


export interface ControlsPanelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    onBtnClick: () => void
}