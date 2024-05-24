import { ControlsPanelProps } from './ControlsPanel.props';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { BrushSizeInput } from '../BrushSizeInput/BrushSizeInput';
import { SaveImageButton } from '../SaveImageButton/SaveImageButton';

const ControlsPanel = ({ onBtnClick }: ControlsPanelProps) => {

    return (
        <section className='flex p-4 justify-between items-center rounded-xl  bg-white shadow-md'>
            <ColorPicker></ColorPicker>
            <BrushSizeInput></BrushSizeInput>
            <SaveImageButton onClick={onBtnClick}>Download</SaveImageButton>
        </section>
    )
}


export { ControlsPanel }