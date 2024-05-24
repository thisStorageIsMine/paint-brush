import { BrushContext } from "@/app/context"
import { useContext } from "react"


const BrushSizeInput = () => {
    const { brush, setBrush } = useContext(BrushContext)

    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if (/\D/.test(String(brush.size))) return;

        setBrush({ ...brush, size: +e.currentTarget.value })
    }

    function handleClick(n: number) {
        setBrush({ ...brush, size: brush.size + n })
    }

    return (
        <div className="flex gap-3 items-center">
            <button className="p-2 grid place-items-center  aspect-square" onClick={() => handleClick(-4)} title="press [">
                <svg width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" /></svg>
            </button>

            <input
                className="p-2 flex text-center items-center border-b-2 border-b-black w-12"
                value={brush.size}
                onChange={handleChange} />

            <button className="p-2 grid place-items-center aspect-square" onClick={() => handleClick(4)} title="press ]">
                <svg width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" /></svg>
            </button>
        </div>
    )
}

export { BrushSizeInput }