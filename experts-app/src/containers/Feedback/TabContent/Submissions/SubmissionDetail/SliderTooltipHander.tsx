import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const { Handle } = Slider;

export const toolTipValues: any = {
    val: (num: number) => {
        switch (num) {
            case -10:
                return "No Evaluation";
            case 0:
                return "Doesn't Know";
            case 10:
                return "Knows";
            default:
                return "Partially Knows - " + num;
        }
    }
}


export const handle = (props: any) => {
    const { value, index, dragging, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            defaultVisible={false}
            overlay={toolTipValues.val(value)}
            placement="top"
            overlayInnerStyle={{ background: '#393939' }}
            key={Math.random()}
        >
            <Handle value={value} {...restProps} />
        </Tooltip >
    );
};