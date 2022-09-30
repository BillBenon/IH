import React from 'react';
import { ModalComponent } from 'components/Modals/Modal';
import { FieldSet, Label, ModalFormWrapper, SubmitProfile, Title } from './styles';
import { Form, Formik, Field } from 'formik';
import { validateEmail, validateText, validateURL } from './Profile.util';
import { SubmitButton } from 'pages/B2B/Jobs/Jobs.styled';
import useJobDispatcher from 'containers/HiringManager/Jobs.util';

type ExpertProfileProps = {
    show: boolean;
}

const ProfileModal = ({ show }: ExpertProfileProps) => {
    const { updateHiringManager } = useJobDispatcher();

    return (
        <ModalComponent
            showCloseIcon={false}
            show={show}
            size='lg'
            handleClose={(e: any) => e?.preventDefault()}
        >
            <ModalFormWrapper>
                <Formik
                    initialValues={{ fullname: "", email: "", mobile: "", companyInfo: "", location: "", companySize: "", funding: "", calendlyURL: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        updateHiringManager(values);
                    }}
                >
                    {({ errors, touched }) => {
                        return (
                            <Form>
                                <Title>Update Profile</Title>
                                <ProfileField label='Name' name='fullname' error={errors.fullname} touched={touched.fullname} required validate={(value) => validateText(value, 'Name')} />
                                <ProfileField label='Email Id' name='email' error={errors.email} touched={touched.email} required validate={validateEmail} />
                                <ProfileField label='Phone' name='mobile' />
                                <ProfileField label='About Company' name='companyInfo' error={errors.companyInfo} touched={touched.companyInfo} required validate={(value) => validateText(value, 'About Company')} />
                                <ProfileField label='Location' name='location' error={errors.location} touched={touched.location} required validate={(value) => validateText(value, 'Location')} />
                                <ProfileField label='Company Size' name='companySize' error={errors.companySize} touched={touched.companySize} required validate={(value) => validateText(value, 'Company Size')} />
                                <ProfileField label='Funding rounds if any' name='funding' />
                                <ProfileField label='Your Meeting URL' name='calendlyURL' error={errors.calendlyURL} touched={touched.calendlyURL} required validate={validateURL} />
                                <SubmitProfile>
                                    <SubmitButton type='submit'>Save Profile</SubmitButton>
                                </SubmitProfile>
                            </Form>
                        )
                    }}
                </Formik>
            </ModalFormWrapper>
        </ModalComponent>
    );
};

type ProfileFieldProps = {
    validate?: (value: any) => string | undefined;
    name: string;
    label: string;
    required?: boolean;
    error?: string;
    touched?: boolean;
}

const ProfileField = ({ label, name, required, validate, error, touched }: ProfileFieldProps) => (
    <FieldSet className="mt-4 mb-4">
        <Label className="font-weight-bold">
            {label}
            {required && <span className='required'>&nbsp;*</span>}
        </Label>
        <Field
            className="form-control"
            type="text"
            placeholder={label}
            name={name}
            validate={validate}
        />
        {required && error && touched && (
            <div className="invalid-feedback">{error}</div>
        )}
    </FieldSet>
)

export default ProfileModal;