import { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from "react";


export interface ColorPickerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    value: string; // Это будет state
    setValue: Dispatch<SetStateAction<string>>; // Это будет setState
}