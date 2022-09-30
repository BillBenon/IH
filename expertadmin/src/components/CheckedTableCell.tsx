import React, { ChangeEventHandler } from 'react';
import { Form } from 'react-bootstrap';
import { Plus } from '@styled-icons/boxicons-regular';
import { IconContainer } from './IconContainer';
import { SearchButton } from 'components/SearchButton';

type CheckedTableCellProps = {
    children: any;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    name: string;
    label?: string;
    className?: string;
    showAdd?: boolean;
    onAdd?: Function;
}

export const CheckedTableCell = (props: CheckedTableCellProps) => {
    return (
        <div className={props.className || "d-flex align-items-center"} style={{ backgroundColor: 'rgb(91 148 227 / 4%)' }}>
            <Form.Check className="mx-2"
                name={props.name}
                type="checkbox"
                label={props.label || ""}
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.showAdd &&
                <SearchButton
                    style={{ height: '15px', padding: '0' }}
                    type="button"
                    onClick={() => props.onAdd && props.onAdd()}
                >
                    <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                </SearchButton>
            }
            {props.children}
        </div>
    )
}
