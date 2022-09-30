import { Plus } from '@styled-icons/boxicons-regular';
import { BigSpan } from 'components/CommonStyles';
import { DropdownIcon } from 'components/DropdownIcon';
import { DropupIcon } from 'components/DropupIcon';
import { Heading } from 'components/Heading';
import { Heading2 } from 'components/Heading2';
import { IconContainer } from 'components/IconContainer';
import { SearchButton } from "components/SearchButton";
import { StyledLinkText } from 'components/StyledLinkText';
import React, { useState } from 'react';
import { Col, Collapse, Row } from 'react-bootstrap';
import { Control, useFieldArray } from 'react-hook-form';
import { ClassInfo } from 'types';
import { ScheduleComponent } from './ScheduleComponent';
type ClassScheduleComponentProps = {
    control: Control<ClassInfo>;
    name: string;
}

export const ClassScheduleComponent = (props: ClassScheduleComponentProps) => {
    const { control, name } = props;

    const [expandedSession, setExpandedSession] = useState<any>({});

    const { fields, append, remove } = useFieldArray({ control, name });

    const onAddSchedule = () => {
        append({}, true);
        setExpandedSession({ ...expandedSession, ["session" + fields.length]: true })
    }

    return (
        <Col>
            <Col className="d-flex p-0 align-items-center justify-content-between">
                <BigSpan>{'Sessions'}</BigSpan>
                <SearchButton
                    style={{ width: '4em' }}
                    type="button"
                    onClick={() => onAddSchedule()}
                >
                    <IconContainer color={'#FFF'} icon={Plus} />
                </SearchButton>
            </Col>
            {fields?.map((s, inx) => <div key={inx} className="col-12 p-0">
                <Row className="m-0">
                    <Col className="p-0 d-flex align-items-center">
                        <Heading2>{'Session ' + (inx + 1)}</Heading2>
                        {expandedSession["session" + inx] && (
                            <DropupIcon onClick={() => setExpandedSession({ ...expandedSession, ["session" + inx]: false })} />
                        )}
                        {!expandedSession["session" + inx] && (
                            <DropdownIcon
                                onClick={() => setExpandedSession({ ...expandedSession, ["session" + inx]: true })}
                            />
                        )}
                    </Col>
                    <Heading>
                        <div className="justify-content-sm-around">
                            <StyledLinkText
                                className="pr-2"
                                size={12}
                                color={'rgba(0, 0, 0, 0.4)'}
                                onClick={() => remove(inx)}
                            >
                                {'Remove'}
                            </StyledLinkText>
                        </div>
                    </Heading>
                </Row>
                <Collapse in={expandedSession["session" + inx]}>
                    <div>
                        <ScheduleComponent schedule={s} prefix={`schedule[${inx}]`} />
                    </div>
                </Collapse>
            </div>)
            }
        </Col >
    )
}
