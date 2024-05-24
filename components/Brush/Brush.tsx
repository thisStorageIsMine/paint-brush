'use client'

import { useEffect, useRef, useContext } from "react";
import { BrushProps } from "./Brush.props"
import { BrushContext } from "@/app/context";
import cn from 'classnames';

const Brush = ({ className, ...props }: BrushProps) => {
    const { brush } = useContext(BrushContext)

    const brushRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        window.addEventListener("mousemove", brushHandleMouseMove)

        return () => window.removeEventListener("mousemove", brushHandleMouseMove)
    }, [])

    function brushHandleMouseMove({ clientX: x, clientY: y }: MouseEvent) {
        if (!brushRef.current) return

        // brushRef.current.style.transform = `translate(${x}px, ${y}px)`;
        brushRef.current.style.top = `${y}px`;
        brushRef.current.style.left = `${x}px`;

    }



    return (
        <span
            ref={brushRef}
            className={cn(`absolute left-0 top-0 pointer-events-none border-2 rounded-full aspect-square -translate-x-1/2 -translate-y-1/2`, className)}
            style={{ width: `${brush.size + 6}px` }}
            {...props}
        >

        </span>
    )
}


export { Brush }