import { Chip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./mailTool.css"

type IProps = {
    getEmails?: Function;
    items: any;
    setItems: any;
    value: any;
    setValue: any;
};

const MailBox = (props: IProps) => {

    const { items, setItems, value, setValue } = props;
    const [errors, setErrors] = useState<string | null>(null);
    const [isEmail, setIsEmail] = useState(true);

    const isInList = (email: string) => {
        email = email?.trim().toLowerCase();
        return items.includes(email);
    }

    const validEmail = (email: string) => {
        // eslint-disable-next-line
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }

    const handleDelete = (item: string) => {
        setItems((prevItems: any[]) => prevItems.filter(i => i !== item));
    };

    const isValid = (email: string) => {
        let error = null;
        if (!validEmail(email)) {
            setIsEmail(false);
            return;
        }
        if (isInList(email)) {
            error = `${email} has already been added.`;
        }
        if (error) {
            setErrors(error);
            return false;
        }
        return true;
    }

    const handleKeyDown = (evt: any) => {
        if (!value && ["Backspace"].includes(evt.key)) {
            setItems((items: any[]) => items.filter((val, idx) => idx != items.length - 1));
            return;
        }
        if (["Enter", "Tab", ";"].includes(evt.key)) {
            evt.preventDefault();
            addDataToItems();
        }
    };

    const addDataToItems = () => {
        setValue((prevVal: string) => prevVal?.trim())

        if (value && isValid(value)) {
            setItems((items: any) => [...items, value.toLowerCase()]);
            setValue("");
        }
    }

    const handleChange = (evt: any) => {
        setIsEmail(true);
        setErrors(null);
        setValue(evt.target.value);
    };

    useEffect(() => {
        props.getEmails && props.getEmails(items);
    }, [items])

    return (
        <>
            <div className={`email-box-wrapper d-flex flex-wrap ${!isEmail ? "invalidEmail" : ""}`}>
                {items.map((item: any, idx: any) => (
                    <Chip label={item} onDelete={() => handleDelete(item)} key={item + idx} className="m-1" />
                ))}

                <input
                    type="email"
                    value={value}
                    className="email-textArea flex-grow-1"
                    placeholder="Add ; seperated email address"
                    onKeyDown={handleKeyDown}
                    onChange={(eve) => {
                        handleChange(eve);
                    }}
                    required={items.length == 0}
                    pattern="[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+"
                />

            </div>
            {errors && <small className="email-box-error">{errors}</small>}
        </>
    )
}

export default MailBox;