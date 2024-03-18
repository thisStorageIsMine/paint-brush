'use client'

import React, { useRef, useState } from "react"





const Canvas = ()  => {

    const [isMouseDown, setIsMouseDown] = useState<boolean>(false),
          canvasRef = useRef<HTMLCanvasElement>(null);

    
    let ctx: undefined | null | CanvasRenderingContext2D = (canvasRef.current) ? canvasRef.current.getContext("2d") : null;

    if(ctx) {
        ctx.strokeStyle = "#212121"
        ctx.lineCap = "round";
    }

    // Получаем координаты канваса
    const computePointInCanvas = (e: React.MouseEvent<HTMLCanvasElement> | React.MouseEvent<HTMLDivElement>) => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.x,
              y = e.clientY - rect.y;

        return {
            x,
            y,
            top: 0,
            right: rect.width,
            bottom: rect.bottom ,
            left: 0
        }

    }

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): any {
        if(!isMouseDown) return;
        if(!ctx) return;

        const coord = computePointInCanvas(e);
        if(!coord) return

        ctx.lineTo(coord.x, coord.y)
        ctx.stroke()

         if( coord.x < coord.left + 1
            || coord.x > coord.right - 1
            || coord.y < coord.top + 1
            || coord.y > coord.bottom - 1
            ) {
                handleMouseUp()
            }
    }



    const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>) => {
        setIsMouseDown(!isMouseDown)

        const coord = computePointInCanvas(e);

        if(!coord) return 

        ctx?.beginPath()
        ctx?.moveTo(coord.x, coord.y)
    }


    const handleMouseUp = () => {
        setIsMouseDown(false)

        if(!ctx) return;

        ctx.closePath()
    };


    return (
        <div className="w-full min-h-screen grid place-items-center justify-items-center"
        onMouseMove={handleMouseMove}
        >
            <canvas 
                className={"border-2"}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={canvasRef}
                width={800}
                height={600}
            >

            </canvas>
        </div>
    )
}

export default Canvas