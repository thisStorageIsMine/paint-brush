'use client'

import { useEffect, useRef } from "react";
import { BrushProps } from "./Brush.props"
import cn from 'classnames';

const Brush = ({size, className, ...props}: BrushProps) => {

    const brushRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        window.addEventListener("mousemove", brushHandleMouseMove)

        return () => window.removeEventListener("mousemove", brushHandleMouseMove)
    }, [])

    function brushHandleMouseMove({clientX: x, clientY: y}: MouseEvent) {
        if(!brushRef.current) return

        // brushRef.current.style.transform = `translate(${x}px, ${y}px)`;
        brushRef.current.style.top = `${y}px`;
        brushRef.current.style.left = `${x}px`;

    }



    return (
        <span
            ref={brushRef}
            className={cn(`absolute left-0 top-0 pointer-events-none border-2 rounded-full aspect-square -translate-x-1/2 -translate-y-1/2`, className)}
            style={{width: `${size+ 6}px`}}
            {...props}
        >

        </span>
    )
}


export { Brush }