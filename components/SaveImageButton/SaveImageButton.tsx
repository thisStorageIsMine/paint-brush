import { ISaveImageButtonProps } from "./SaveImageButton.props"

const SaveImageButton = ({ children, onClick }: ISaveImageButtonProps) => {

    return (
        <button
            className={`h-14 p-4 text-lg relative hover:text-red-400 transition-all duration-300 z-20`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export { SaveImageButton }