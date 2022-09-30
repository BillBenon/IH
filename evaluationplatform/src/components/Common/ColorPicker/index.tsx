import React, { useState } from 'react'
import { TwitterPicker } from 'react-color'
import styled from 'styled-components'

interface IColorPicker {
    onChange: Function;
}

const StyledColorPicker = styled.div<{ selectedColor?: string }>`
    display: inline;
    .currentColor{
        width: 20px;
        height: 20px;
        background: transparent;
        cursor: pointer;
        position: relative;
        outline: none;
        border-radius: 50%;
        box-shadow:  ${(props: any) => `${props.selectedColor} 0px 0px 0px 14px inset`};
        transition: box-shadow 100ms ease 0s;
        transform: scale(1);
    }
    .colorpicker{
        display: inline-block;
        position: relative;
        z-index: 9999;
        .twitter-picker{
            position: absolute !important;
        }
    }
    .cover{
        position: fixed;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
    }
`

export default (props: IColorPicker) => {
    const [pickerVisible, setPickerVisible] = useState(false)
    const [selectedColor, setSelectedColor] = useState('#000000')
    const handleColorChange = ({ hex }: any) => {
        setSelectedColor(hex)
        props.onChange && props.onChange(hex)
    }
    const handleClose = () => setPickerVisible(false)
    const onTogglePicker = () => setPickerVisible(!pickerVisible)

    return (
        <StyledColorPicker selectedColor={selectedColor}>
            <div className='colorpicker'>
                <div title='Select color' onClick={onTogglePicker}>
                    <div className='currentColor'></div>
                </div>
                {pickerVisible && (<>
                    <div className='cover' onClick={handleClose} />
                    <TwitterPicker
                        color={selectedColor}
                        onChangeComplete={handleColorChange} />
                        </>)}
            </div>
        </StyledColorPicker>
    )
}