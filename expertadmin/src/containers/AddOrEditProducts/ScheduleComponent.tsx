import { AdvancedForm } from 'components/AdvancedComponents/AdvancedForm'
import { useAddOrEditProduct } from 'features/addOrEditProducts/useAddOrEditProduct';
import React, { useEffect, useState } from 'react';
import { scheduleDefaultValues, scheduleFieldSize, scheduleLocalization, schedulePlaceholder, scheduleType } from './AddOrEditProductHelper';


type ScheduleComponentProps = {
    schedule: any;
    prefix: string;
}

export const ScheduleComponent = (props: ScheduleComponentProps) => {
    const { schedule, prefix } = props;
    const [{ expertList }] = useAddOrEditProduct();
    const [defaultValue, setDefaultValue] = useState<any>();
    const [options, setOptions] = useState<any>();
    const [type, setType] = useState<any>();
    const [localization, setLocaliztion] = useState<any>();
    const [fieldSize, setFieldSize] = useState<any>();
    const [placeHolder, setPlaceholder] = useState<any>();

    useEffect(() => {
        setDefaultValue(scheduleDefaultValues(prefix, schedule));
        setType(scheduleType(prefix));
        setLocaliztion(scheduleLocalization(prefix));
        setFieldSize(scheduleFieldSize(prefix));
        setPlaceholder(schedulePlaceholder(prefix));
    }, [])

    useEffect(() => {
        setOptions({ [prefix + '.' + 'expertId']: expertList });
    }, [expertList])

    return (
        <div>
            {defaultValue && <AdvancedForm
                hideFooter={true}
                defaultValue={defaultValue}
                type={type}
                options={options}
                localization={localization}
                fieldsize={fieldSize}
                placeholder={placeHolder}
            />}
            <hr />
        </div>
    )
}
