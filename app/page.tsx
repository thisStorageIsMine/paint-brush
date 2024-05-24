'use client'
import React, { useEffect, useRef, useState } from "react"
import { Brush, ColorPicker, ControlsPanel } from '../components'
import { BrushContext } from "./context"
import cn from 'classnames'

const Canvas = () => {
  const [brush, setBrush] = useState({ color: '#000', size: 20 })


  function resizeBrush(e: KeyboardEvent) {
    if (e.code === "BracketLeft") {
      if (brush.size - 4 <= 4) return

      let nextSize = brush.size - 4
      setBrush({ ...brush, size: nextSize })

    } else if (e.code === "BracketRight") {


      setBrush({ ...brush, size: brush.size + 4 })
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", resizeBrush);

    return () => window.removeEventListener("keydown", resizeBrush);
  }, [brush])

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false),
    canvasRef = useRef<HTMLCanvasElement>(null);


  let ctx: undefined | null | CanvasRenderingContext2D = (canvasRef.current) ? canvasRef.current.getContext("2d") : null;

  if (ctx) {
    ctx.strokeStyle = "#212121"
    ctx.lineCap = "round"
    ctx.lineJoin = 'round'
    ctx.strokeStyle = brush.color

  }

  // Получаем координаты канваса
  const computePointInCanvas = (e: React.MouseEvent<HTMLCanvasElement> | React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.x,
      y = e.clientY - rect.y;

    return {
      x,
      y,
      top: 0,
      right: rect.width,
      bottom: rect.bottom,
      left: 0
    }

  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>): any {
    if (!isMouseDown) return;
    if (!ctx) return;

    const coord = computePointInCanvas(e);
    if (!coord) return

    ctx.lineWidth = brush.size

    ctx.lineTo(coord.x, coord.y)
    ctx.stroke()


    if (coord.x < coord.left
      || coord.x > coord.right
      || coord.y < coord.top
      || coord.y > coord.bottom
    ) {
      handleMouseUp()
    }
  }



  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsMouseDown(!isMouseDown)

    const coord = computePointInCanvas(e);

    if (!coord) return
    if (!ctx) return

    ctx.lineWidth = brush.size;

    ctx.beginPath()
    ctx.moveTo(coord.x, coord.y)
    ctx.lineTo(coord.x, coord.y)
    ctx.stroke()
  }


  const handleMouseUp = () => {
    setIsMouseDown(false)

    if (!ctx) return;

    ctx.closePath()
  };

  function saveImage() {
    if (!canvasRef.current) return;

    const img = canvasRef.current.toDataURL('png');
    const a = document.createElement('a');
    a.href = img;
    a.download = "image.png";
    a.click();
    a.remove()
  }


  return (

    <BrushContext.Provider value={{ brush, setBrush }}>

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
        <ControlsPanel onBtnClick={saveImage}></ControlsPanel>
        <Brush className="hidden peer-hover/canvas:block"></Brush>
      </div>
    </BrushContext.Provider>
  )
}

export default Canvas

