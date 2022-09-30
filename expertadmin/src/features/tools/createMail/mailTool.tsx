import { Backdrop, makeStyles } from '@material-ui/core';
import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { LoaderStyles } from 'components/LoaderStyles';
import MuiSnackBar from 'components/MuiSnackBar';
import RichTextEditor from 'components/RichtTextEditor';
import { useAddOrEditProduct } from 'features/addOrEditProducts/useAddOrEditProduct';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { sendEmailsToUsers } from '../tools.Actions';
import { reset } from '../toolsSlice';
import MailBox from './mailBox';
import "./mailTool.css";

interface FormData {
    toEmailType: string,
    trackId: string,
    emailType: string,
    toEmails: string[],
    subject: string,
    body: string,
    pourpose: string
}

type IOptionProps = {
    label: string, value: any, dropDownOption: any, optionChanged: Function
}

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        background: '#00000042',
    }
}));

const MailTool = () => {
    const classes = useStyles();
    const unsubscribeLink = "<p><a href=\"https://codepen.io/alexkrolick/pen/BRyMNb\"  target=\"_blank\">unsubscribe</a></p>";
    const expertId = useSelector((state: RootState) => state.auth.expert?.expertId);
    const dispatch = useAppDispatch();
    const tools = useSelector((state: RootState) => state.tools);
    const [{ product, getInitialTracks }] = useAddOrEditProduct();
    const rowClassName = "row justify-content-center align-items-center my-4";
    const labelClassName = "col-md-2 text-md-right";
    const bodyClassName = "col-md-8 offset-md-1";

    const segmentOptions: any = [
        { "value": "ALL_CANDIDATE", "label": "Candidates" }, { "value": "ALL_EXPERT", "label": "Experts" },
        { "value": "ALL_CANDIDATE_FROM_TRACK", "label": "All Candidate from track" },
        { "value": "SPECIFIC_USERS", "label": "Custom" }, { "value": "ALL_EXPERT_CANDIDATE", "label": "All Expert Candidate" },
        { "value": "ALL_EXPERT_TRACK_CANDIDATE", "label": "All Expert Track Candidate" },
        { "value": "ALL_EXPERT_MEETING_CANDIDATE", "label": "All Expert Meeting Candidate" },
        { "value": "ALL_EXPERT_CLASSES_CANDIDATE", "label": "All Expert Classes Candidate" },
    ];
    const emailTypes: any = [{ "value": "TRANSACTIONAL", "label": "TRANSACTIONAL" }, { "value": "NON_TRANSACTIONAL", "label": "NON_TRANSACTIONAL" }]

    // States
    const [trackList, setTrackList] = useState<any>(product.trackList);
    const [formData, setFormData] = useState<FormData>({
        toEmailType: segmentOptions[0].value,
        emailType: emailTypes[0].value,
        trackId: "",
        toEmails: [],
        subject: "",
        body: "",
        pourpose: ""
    });
    const [items, setItems] = useState<string[]>([]);
    const [value, setValue] = useState<string>("");
    const { control } = useForm();
    const [error, setError] = useState<string>("");

    const valuesChanged = (fieldName: string, value: any) => {
        setFormData((data) => {
            return { ...data, [fieldName]: value };
        });
        setError("");
    }

    const handleEmails = () => {
        let emails = items;
        if (value) {
            emails = [...emails, value.toLowerCase()];
            setItems(() => emails);
            setValue("");
        }
        return emails
    }

    const getSubmitVal = () => {
        const emails = handleEmails();
        const submitVal = { ...formData, toEmails: emails };
        return submitVal;
    }

    const validateBody = () => {
        if (formData.body?.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            setError("Email Content field is required");
            return false;
        }
        setError("");
        return true;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validateBody()) {
            return;
        }
        const submitVal: any = getSubmitVal();
        dispatch(sendEmailsToUsers({ ...submitVal, expertId: expertId || '' }));
    }

    const resetFields = (fields: string[]) => {
        const temp: any = {};
        fields.map((val: string) => {
            if (val === 'toEmails') {
                temp[val] = [];
            } else {
                temp[val] = "";
            }
        })
        setFormData(data => {
            return { ...data, ...temp };
        })
        setItems([]);
        setValue("");
    }

    const InputOptions = (props: IOptionProps) => {
        const { label, value, dropDownOption, optionChanged } = props;
        if (!dropDownOption) return <></>;
        return (
            <div className={rowClassName}>
                <div className={labelClassName}>
                    <label>{label} </label>
                </div>
                <div className={bodyClassName}>
                    <select value={value} onChange={(e) => { optionChanged(e.target.value) }} required>
                        <option value="">Select</option>
                        {dropDownOption.map((val: { value: string, label: string }, index: number) =>
                            <option key={val.value + val.label + index} value={val.value} >{val.label}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }

    const addUnsubscribeLink = () => {
        valuesChanged("body", formData.body + unsubscribeLink);
    }

    useEffect(() => {
        if (product.trackList != trackList) {
            setTrackList(product.trackList);
        }
        if (formData.toEmailType == segmentOptions[2].value && (!product.trackList || product.trackList?.length == 0)) {
            getInitialTracks({ enrollType: "" });
        }
    }, [formData.toEmailType, product.trackList])

    return (
        <div className='mail-tool-container p-5'>
            <MuiSnackBar open={tools.success} onSnakBarClose={() => { dispatch(reset()) }} message={"Email Sent !!"} severity="success" />
            {<Backdrop className={classes.backdrop} open={product.loading || tools.loading}>
                <BeatLoader css={LoaderStyles} color={'#3694D7'} loading={true} />
            </Backdrop>}

            <form onSubmit={(e) => { handleSubmit(e); }}>

                <InputOptions label={"Select Segment:"} value={formData.toEmailType} dropDownOption={segmentOptions}
                    optionChanged={(value: any) => {
                        valuesChanged("toEmailType", value); resetFields(['toEmails', 'trackId']);
                    }} />

                <InputOptions label={"Email Type:"} value={formData.emailType} dropDownOption={emailTypes}
                    optionChanged={(value: any) => { valuesChanged("emailType", value); }} />

                {formData.toEmailType == segmentOptions[2].value &&
                    <InputOptions label={"Select Track Id:"} value={formData.trackId} dropDownOption={trackList}
                        optionChanged={(value: any) => { valuesChanged("trackId", value); }} />}

                <div className={rowClassName}>
                    <div className={labelClassName}> <label>{"Email Pourpose:"}</label> </div>
                    <div className={bodyClassName}>
                        <input type='text' className='w-100' required value={formData.pourpose}
                            onChange={(e) => valuesChanged("pourpose", e.target.value)} />
                    </div>
                </div>

                {formData.toEmailType == segmentOptions[3].value && (
                    <div className={rowClassName}>
                        <div className={labelClassName}> <label>Add Email Ids: </label> </div>
                        <div className={bodyClassName}>
                            <MailBox getEmails={(mails: string[]) => { valuesChanged("toEmails", [...mails]) }} items={items}
                                setItems={setItems} value={value} setValue={setValue}
                            />
                        </div>
                    </div>)
                }

                <div className={rowClassName}>
                    <div className={labelClassName}> <label>{"Email Subject:"}</label> </div>
                    <div className={bodyClassName}>
                        <input type='text' className='w-100' required value={formData.subject}
                            onChange={(e) => valuesChanged("subject", e.target.value)} />
                    </div>
                </div>

                <div className={rowClassName}>
                    <div className={labelClassName}> <label>Email Content: </label> </div>
                    <div className={bodyClassName}>
                        <RichTextEditor
                            name="body"
                            id={'email-body'}
                            placeholder={`Email Content`}
                            control={control}
                            defaultValue={formData.body}
                            valueHack={true}
                            onChangeCallback={(data: any) => { valuesChanged("body", data) }}
                        />
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    <small className='email-box-error'>{error}</small>
                </div>

                <div className={rowClassName}>
                    <div className='col-md-2'></div>
                    <div className={`col-md-8 offset-md-1 text-md-right`}>
                        <button type='button' className='btn email-unsubscribe-link mr-2' onClick={addUnsubscribeLink}> Add Unsubscribe Link </button>
                        <button type='submit' className='btn btn-primary'> Send Email </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default MailTool;