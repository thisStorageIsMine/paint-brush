import { ControlsPanelProps } from './ControlsPanel.props';
import {  MaterialPicker } from 'react-color';
import { useState } from 'react';
import cn from 'classnames';

const ControlsPanel = ({}: ControlsPanelProps) => {
    const [color, setColor] = useState<string>('#000')

    return (
        <div className='p-5'>
            <MaterialPicker color={color} onChange={(e) => setColor(e.hex)} className='w-[110px] h-fit' />
        </div>
    )
}


export { ControlsPanel }