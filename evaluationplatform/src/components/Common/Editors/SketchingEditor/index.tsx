
import React, { useCallback, useEffect, useRef, useState } from 'react';
// @ts-ignore
import { SketchField, Tools } from 'react-sketch';
import { Pencil } from '@styled-icons/boxicons-regular/Pencil';
import { FlowLine } from '@styled-icons/entypo/FlowLine';
import { Rectangle } from '@styled-icons/boxicons-regular/Rectangle';
import { Circle } from '@styled-icons/boxicons-regular/Circle';
import { Pointer } from '@styled-icons/boxicons-solid/Pointer';
import { Undo2 } from '@styled-icons/icomoon/Undo2';
import { Plus } from '@styled-icons/boxicons-regular/Plus';
import { Redo2 } from '@styled-icons/icomoon/Redo2';
import { ZoomIn } from '@styled-icons/boxicons-regular/ZoomIn';
import { ZoomOut } from '@styled-icons/boxicons-regular/ZoomOut';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import ColorPicker from 'components/Common/ColorPicker';
import { IconContainer } from 'components/Common/IconContainer';
import { Button } from 'components';

const StyledSketchingEditor = styled.div<{ disabled: boolean }>`
    #overlay {
        position: absolute;
        display: flex;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgb(255 255 255 / 0%);
        z-index: 2;
    }
    text-align: center;
    overflow: hidden;
    width: 100%;
    .MuiIconButton-root:focus{
        outline: 0 !important
    }
    .rightsection{
        float: right;
    }
    .sketchingCanvas{
        overflow: auto;
        height: ${(props: any) => `calc(100% - ${props.disabled ? '2.5em' : '5em'})}`};
        ::-webkit-scrollbar {
            height: 10px; 
            width: 10px;
          }
          
          /* Track */
          ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px white; 
            border-radius: 5px;
          }
           
          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #b0b0b0; 
            border-radius: 5px;
          }
          
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: darkgrey; 
          }
    }
    .MuiButton-label:focus, .MuiButtonBase-root:focus{
        outline: none !important;
    }
    .MuiInput-formControl{
        margin-top: 0 !important;
    }
    .sketchWrapper{
        transform-origin: 34% 0%;
        transform-style: preserve-3d;
        transition: all 0.5s linear;
        display: inline-flex;
    }
    .sketchWrapper>div{
        border: 1px solid darkgrey;
        background-color: white;
    }
    .sketchingCanvas{
        border: 1px solid darkgrey;
        background-color: lightgrey;
    }
    .options{
        text-align: left;
    }
    
    .sketch-bottom{
        width:100%;
        margin-top: 5px;
        .operations{
            float: right;
        }
        button{
            z-index:3;
            background: white;
            border-radius: 12px;
            border: 1px solid #ccc;
            margin-right: 10px;
            width: 100px;
            height: 30px;
            line-height: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
        .saveandclose, .zoomcontrol>button{
            width: auto !important;
        }
        .zoomcontrol{
            position: absolute;
        }
    }
`

interface ISketch {
    CloseModal?: Function;
    handleSketchSave?: (payload: any) => Promise<any>;
    getSketch: any;
    isSketchAvailable: boolean;
    sketchData?: { objects: Array<any> } | undefined;
    disabled: boolean;
    id: string;
    height?: number;
    width?: number;
    isViewOnly?: boolean;
}

const emptySketch = { objects: [] };
const getParsedSketchValue = (sketchString: string | undefined) => {
    const emptySketch = { objects: [] };
    let parsedSketch = null;
    try {
        if (!sketchString)
            return emptySketch;
        parsedSketch = JSON.parse(sketchString);
    }
    catch {
        parsedSketch = emptySketch
    }
    return parsedSketch
}

export default (props: ISketch) => {
    const { CloseModal, handleSketchSave, getSketch, isSketchAvailable, sketchData, disabled } = props;
    const sketchRef = useRef<any>({})
    const [lineColor, setLineColor] = useState('#000');
    const [sketchText, setsketchText] = useState('');
    const [Tool, setTool] = useState(Tools.Pencil)
    const [previousSketch, setPreviousSketch] = useState(sketchData || emptySketch)
    const [historyStack, updateHistoryStack] = useState<any>([])
    const [stackPointer, updateStackPointer] = useState(0)
    const [canOps, setcanOps] = useState({
        canUndo: false,
        canRedo: false
    });
    const cdmRef = useRef(true);
    const dependencyVal = [lineColor, sketchText, Tool, previousSketch, historyStack, props.sketchData, stackPointer, canOps]
    const deleteSelectedDawing = useCallback(function (event: any) {
        if (event.keyCode === 46) {
            sketchRef.current.removeSelected();
            onSketchChange('deleteSketch')
        }
    }, dependencyVal)

    const undoRedo = useCallback(function (event: any) {
        if (event.keyCode === 90 && event.ctrlKey) _undo();
        if (event.keyCode === 89 && event.ctrlKey) _redo();
    }, [dependencyVal])

    useEffect(() => {
        const handleMouseScroll = (event: any) => {
            if (event.ctrlKey) {
                event.preventDefault()
                event.wheelDelta > 0 ? handleZoom(true) : handleZoom(false)

            }
            return false
        }

        document.addEventListener('mousewheel', handleMouseScroll, { passive: false })
        document.addEventListener('keydown', deleteSelectedDawing)
        document.addEventListener('keyup', undoRedo)
        return () => {
            document.removeEventListener("mousewheel", handleMouseScroll)
            document.removeEventListener('keydown', deleteSelectedDawing)
            document.removeEventListener('keyup', undoRedo)
        }
    }, [deleteSelectedDawing, undoRedo])

    useEffect(() => {
        if (isSketchAvailable) {
            getSketch().then((res: any) => {
                let parsedSketch = getParsedSketchValue(res?.output?.sketchData);
                setPreviousSketch(parsedSketch)
                sketchRef.current.fromJSON(parsedSketch)
                updateHistoryStack([parsedSketch])
            })
        }
        else {
            updateHistoryStack([emptySketch])
        }
    }, [])

    useEffect(() => {
        if (!cdmRef.current) {
            if (props.sketchData && (JSON.stringify(props.sketchData) !== JSON.stringify(historyStack[stackPointer]))) {
                const parsedSketch = sketchData || emptySketch
                setPreviousSketch(parsedSketch);
                sketchRef.current.fromJSON(parsedSketch)
                onSketchChange('newSketch', parsedSketch)
            }
        }
        else
            cdmRef.current = false;// mimicking component did update 
    }, [props.sketchData])


    const handleChangeColor = (color: string) => setLineColor(color)

    const handleToolClick = (tool: any) => setTool(tool)

    const handleZoom = (zoomIn: boolean) => {
        let canvasDiv = document.querySelector(`#${props.id}>.sketchWrapper`) as any;
        let curVal = Number(canvasDiv.style.transform.replace('scale(', '').replace(')', ''))
        if (zoomIn) {
            if (curVal < 1)
                canvasDiv.style.transform = `scale(${(Number(curVal) + 0.1)})`;
        }
        else {
            //down
            if (curVal > 0.2)
                canvasDiv.style.transform = `scale(${(Number(curVal) - 0.1)})`;
        }
    }

    const _undo = () => {
        if (canOps.canUndo) {
            updateStackPointer(stackPointer - 1)
            sketchRef.current.fromJSON(historyStack[stackPointer - 1])
            setcanOps({
                canUndo: historyStack[stackPointer - 2] ? true : false,
                canRedo: true
            })
        }
    }

    const _redo = () => {
        if (canOps.canRedo) {
            sketchRef.current.redo()
            updateStackPointer(stackPointer + 1)
            sketchRef.current.fromJSON(historyStack[stackPointer + 1])
            setcanOps({
                canUndo: true,
                canRedo: historyStack[stackPointer + 2] ? true : false
            })
        }
    }

    const saveSketch = (isSaveClose = false) => {
        let currentSketch = sketchRef.current.toJSON();
        setPreviousSketch(currentSketch)
        handleSketchSave && handleSketchSave(sketchRef.current.toJSON().objects.length !== 0 ? JSON.stringify(sketchRef.current.toJSON()) : '')
            .finally(() => {
                if (isSaveClose) {
                    CloseModal && CloseModal()
                }
            });
    }

    const onSketchChange = (value: any, latestSketch = sketchRef.current.toJSON()) => {
        if (value?.type === 'mouseup' || value === 'newText' || value === 'newSketch' || value === 'deleteSketch') {
            if (JSON.stringify(historyStack?.[historyStack.length - 1]) !== JSON.stringify(latestSketch)) {
                if (canOps.canRedo) {
                    let tempStack = JSON.parse(JSON.stringify(historyStack))
                    updateHistoryStack([...tempStack.slice(0, stackPointer + 1), latestSketch])
                }
                else
                    updateHistoryStack([...historyStack, latestSketch])
                updateStackPointer(stackPointer + 1)
                setcanOps({
                    canRedo: false,
                    canUndo: true
                })
            }
        }
    }

    const handleClose = () => {
        if (previousSketch.objects.length !== sketchRef.current.toJSON().objects.length) {
            let confirmation = window.confirm('You have unsaved changes. Would you like to save changes ?')
            if (confirmation) {
                saveSketch(true);
            }
            else {
                CloseModal && CloseModal()
            }
        }
        else {
            CloseModal && CloseModal()
        }
    }

    const handleAddText = () => {
        if (sketchText) {
            let currentSketchLastElem = sketchRef.current.toJSON()?.objects || []
            let lastKnownPosition = currentSketchLastElem?.[currentSketchLastElem.length - 1]
            const options = {
                left: lastKnownPosition?.left ? lastKnownPosition.left : 200,
                top: lastKnownPosition?.top ? lastKnownPosition.top : 200,
                stroke: lineColor,
                fill: lineColor
            }
            sketchRef.current.addText(sketchText, options);
            onSketchChange('newText')
            setTool(Tools.Select)
        }
    }

    return (<StyledSketchingEditor disabled={disabled}>
        {!disabled && <div className='align-items-center options'>
            <span className='d-flex align-items-center Tools leftsection'>
                <IconContainer className="mx-2" tooltip='Pencil' onClick={() => handleToolClick(Tools.Pencil)} icon={Pencil}></IconContainer>
                <IconContainer className="mx-2" tooltip='Line' onClick={() => handleToolClick(Tools.Line)} icon={FlowLine}></IconContainer>
                <IconContainer className="mx-2" tooltip='Rectangle' onClick={() => handleToolClick(Tools.Rectangle)} icon={Rectangle}></IconContainer>
                <IconContainer className="mx-2" tooltip='Circle' onClick={() => handleToolClick(Tools.Circle)} icon={Circle}></IconContainer>
                <IconContainer className="mx-2" tooltip='Select' onClick={() => handleToolClick(Tools.Select)} icon={Pointer}></IconContainer>
                <ColorPicker
                    onChange={handleChangeColor}
                />
                <IconContainer className="mx-2" tooltip='Undo' disabled={!canOps.canUndo} onClick={_undo} icon={Undo2}>
                </IconContainer>
                <IconContainer className="mx-2" tooltip='Redo' disabled={!canOps.canRedo} onClick={_redo} icon={Redo2}>
                </IconContainer>
                <span className='d-flex addText'>
                    <Form.Control
                        type="text"
                        placeholder='Add Text'
                        onChange={(e) => setsketchText(e.target.value)}
                        value={sketchText} />
                    <IconContainer className="mx-2" tooltip='Add Text' onClick={handleAddText} icon={Plus}>
                    </IconContainer>
                </span>
            </span>
        </div>
        }
        <div id={props.id} className='sketchingCanvas'>
            <div className='sketchWrapper' style={{ transform: 'scale(1)' }}>
                {disabled && <div id="overlay" ></div>}
                <SketchField
                    ref={sketchRef}
                    tool={Tool}
                    height={props.height || 3000}
                    width={props.width || 3000}
                    lineColor={lineColor}
                    forceValue
                    onChange={onSketchChange}
                    lineWidth={3} />
            </div>
        </div>
        <div className='sketch-bottom'>
            <span className='zoomcontrol'>
                <div className="d-flex align-items-center">
                    <IconContainer className="mx-2" tooltip='Zoom In' onClick={() => handleZoom(true)} icon={ZoomIn}>
                    </IconContainer>
                    <IconContainer className="mx-2" tooltip='Zoom Out' onClick={() => handleZoom(false)} icon={ZoomOut}>
                    </IconContainer>
                </div>
            </span>
            {!props.isViewOnly && <span className='operations'>
                {!disabled && (<>
                    <Button onClick={() => saveSketch()}>Save</Button>
                    <Button className='saveandclose' onClick={() => saveSketch(true)}>Save & Close</Button>
                </>)}
                <Button onClick={handleClose}>Close</Button>
            </span>}
        </div>
    </StyledSketchingEditor>)
}