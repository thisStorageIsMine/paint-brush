'use client'


import React, { useEffect, useRef, useState} from "react"
import { Brush, ControlsPanel, ColorPicker } from '../components'
import cn from 'classnames'





const Canvas = ()  => {

  const [brushColor, setBrushColor] = useState<string>('#000')
  const [brushSize, setBrushSize] = useState<number>(20);

  function resizeBrush(e: KeyboardEvent) {
    if(e.code === "BracketLeft") {
        if(brushSize - 4 <= 4) return

        setBrushSize(brushSize - 4)

    } else if (e.code === "BracketRight") {
        setBrushSize(brushSize + 4)

    }
  }

  useEffect(() => {
    window.addEventListener("keydown", resizeBrush);

    return () => window.removeEventListener("keydown", resizeBrush);
  }, [brushSize])

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false),
        canvasRef = useRef<HTMLCanvasElement>(null);

  
  let ctx: undefined | null | CanvasRenderingContext2D = (canvasRef.current) ? canvasRef.current.getContext("2d") : null;

  if(ctx) {
    ctx.strokeStyle = "#212121"
    ctx.lineCap = "round"
    ctx.lineWidth = brushSize;
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

        if( coord.x < coord.left 
          || coord.x > coord.right 
          || coord.y < coord.top 
          || coord.y > coord.bottom 
          ) {
              handleMouseUp()
          }
  }



  const handleMouseDown = (e:React.MouseEvent<HTMLCanvasElement>) => {
      setIsMouseDown(!isMouseDown)

      const coord = computePointInCanvas(e);

      if(!coord) return 
      if(!ctx) return

      ctx.strokeStyle = "#212121"
      ctx.lineCap = "round"
      ctx.lineJoin = 'round'
      ctx.lineWidth = brushSize;

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
      onMouseMove={handleMouseMove} // Вот он

      >
          <canvas 
              className="border-2 peer/canvas cursor-none"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              ref={canvasRef}
              width={800}
              height={600}
          >
          </canvas>
          <ColorPicker value={brushColor} setValue={setBrushColor}></ColorPicker>
         <Brush size={brushSize} className="hidden peer-hover/canvas:block"></Brush>
      </div>
  )
}

export default Canvas

