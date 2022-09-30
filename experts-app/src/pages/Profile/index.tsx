import './styles.css';

import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getExpertDetails, updateExpert } from '../../actions/auth/authActions';
import { RootState } from '../../store';
import { StorageClient } from '../../utilities/constants';
import { AwsUploader } from '../../components/Uploader/AwsUploader';
import RichTextEditor from '../../components/Common/Editors/RichTextEditor';

// Messages
const required = "This field is required";
const maxLength = "Your input exceed maximum length";
const invalidURL = "Invalid Meeting URL";
const invalidEmail = "Invalid email address";

// Error Component
const errorMessage = (error: any) => {
    return <div className="invalid-feedback">{error}</div>;
};

const validateName = (value: any) => {
    let error;
    if (!value) {
        error = required;
    } else if (value.length > 20) {
        error = maxLength;
    }
    return error;
};

const validateEmail = (value: any) => {
    let error;
    if (!value) {
        error = required;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = invalidEmail;
    }
    return error;
};

const validateURL = (value: string) => {
    let error;
    if (value && !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i.test(value)) {
        error = invalidURL;
    }
    return error;
}

const validateCategory = (value: string) => {
    if (!value) {
        return required;
    }
}

export default function Profile() {
    const dispatch = useDispatch();
    const { user, expertProfile, loading, loadingProfile } = useSelector((state: RootState) => state.auth);
    const { EXPERTLOGODIRECTORY } = StorageClient;

    useEffect(() => {
        dispatch(getExpertDetails(user.expertId));
    }, [])

    return (
        (expertProfile && !loadingProfile) ? <Formik
            initialValues={expertProfile}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    dispatch(updateExpert(values));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ errors, touched, isValidating }) => (
                <div className="container mt-5 pt-5">
                    <div className="col-sm-12 text-center">
                        <h3>{'Expert Profile'}</h3>
                    </div>
                    <div className="col-sm-12">
                        <Form>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <br />
                                <Field
                                    className="form-control"
                                    type="text"
                                    placeholder="Name"
                                    name="fullname"
                                    validate={validateName}
                                />
                                {errors.fullname && touched.fullname && errorMessage(errors.fullname)}
                            </div>
                            <div className="form-group">
                                <label>Email *</label>
                                <br />
                                <Field
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    validate={validateEmail}
                                />
                                {errors.email && touched.email && errorMessage(errors.email)}
                            </div>
                            <div className="form-group">
                                <label>Category *</label>
                                <br />
                                <Field
                                    className="form-control"
                                    type="text"
                                    placeholder="Category"
                                    name="expertCategory"
                                    validate={validateCategory}
                                />
                                {errors.expertCategory &&
                                    touched.expertCategory &&
                                    errorMessage(errors.expertCategory)}
                            </div>
                            <div className="form-group">
                                <label>Current Company</label>
                                <br />
                                <Field
                                    className="form-control"
                                    type="text"
                                    placeholder="Working At"
                                    name="workingAt"
                                />
                            </div>
                            <div className="form-group">
                                <label>Profile Photo</label>
                                <br />
                                <Field
                                    className="form-control"
                                    name={'photoURL'} id={'photoURL'} type="text">
                                    {({ field, form }: any) => (
                                        <AwsUploader onUpload={(url: string) => form.setFieldValue('photoURL', url)} url={field.value} directory={EXPERTLOGODIRECTORY}
                                            expertId={user.expertId} />
                                    )}
                                </Field>
                                {errors.photoURL &&
                                    touched.photoURL &&
                                    errorMessage(errors.photoURL)}
                            </div>
                            <div className="form-group">
                                <label>Profile</label>
                                <br />
                                <Field
                                    className="form-control"
                                    name={'profile'}
                                    id={'profile'}
                                    type="text"
                                >
                                    {({ field, form }: any) => (
                                        <RichTextEditor
                                            value={field.profile ?? expertProfile.profile}
                                            disabled={false}
                                            onChange={(data: string) => form.setFieldValue('profile', data)}
                                            id={'profile'}
                                            placeholder='Enter your profile here...'
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className="form-group">
                                <label>Your Meeting URL</label>
                                <br />
                                <Field
                                    type="text"
                                    name="calendlyURL"
                                    className="form-control"
                                    placeholder="Meeting URL"
                                    validate={validateURL}
                                />
                                {errors.calendlyURL && touched.calendlyURL && errorMessage(errors.calendlyURL)}
                            </div>

                            <div className="form-group text-right">
                                <button className="btn btn-primary" type="submit">
                                    {loading ? "Saving..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            )}
        </Formik> : <></>
    );
}