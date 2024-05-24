'use client'

import { ChangeEvent, useState, useContext } from "react";
import { ColorPickerProps } from "./ColorPicker.props";
import { BrushContext } from "@/app/context";
import cn from 'classnames';

const ColorPicker = ({ className, ...props }: ColorPickerProps) => {
    const { brush, setBrush } = useContext(BrushContext)

    const classes = {
        base: "flex justify-center items-center rounded-xl p-4 ",
        input: 'w-0 h-0 opacity-0',
        label: 'w-24 h-20 block rounded-xl relative',
        color: 'h-full rounded-lg',
        blur: "w-full h-full blur-md opacity-50 rounded-lg absolute inset-0",
        hexInput: ' h-10 w-20 text-lg border-b-2 outline-none'
    };

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const text = e.currentTarget.value
        setBrush({ ...brush, color: text });

    }

    function isValidHex(e: React.FocusEvent<HTMLInputElement>) {
        const text = e.currentTarget.value;
        if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(text)) {
            e.currentTarget.value = brush.color;
            return;
        };

        setBrush({ ...brush, color: text });

    }

    const pickerId = `color-picker`,
        hexPickerID = `hex-picker`;

    return (
        <section className={cn(classes.base, className)}
            {...props}
        >
            <input onChange={handleChange} type="color" name="" id={pickerId} className={classes.input} />

            <label htmlFor={pickerId} className={classes.label}>
                <div className={classes.color} style={{ backgroundColor: brush.color }} ></div>
                <div className={classes.blur} style={{ backgroundColor: brush.color }}></div>
            </label>

            <section className="relative pl-5" key={brush.color}>
                <div className="absolute -top-3 left-5 text-sm text-gray-300">Hex</div>
                <input className={classes.hexInput} type="text" onBlur={(e) => isValidHex(e)} id={hexPickerID} defaultValue={brush.color} style={{ borderColor: brush.color }} />
            </section>
        </section>
    )
}

export { ColorPicker };
