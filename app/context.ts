import { Dispatch, SetStateAction, createContext } from "react";


export interface IBrushContextInterface {
    brush: {
        color: string;
        size: number;
    };
    setBrush: React.Dispatch<React.SetStateAction<{ color: string; size: number; }>>;
}

const initialContext: IBrushContextInterface = {
    brush: {
        color: '#000',
        size: 20,
    },
    setBrush: () => { }
}

export const BrushContext = createContext(initialContext)