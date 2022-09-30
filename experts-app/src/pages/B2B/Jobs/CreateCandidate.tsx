import React from 'react';
import { Form, Formik, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ModalComponent } from 'components/Modals/Modal';
import { FieldSet, Label, ModalFormWrapper, SubmitButton, Title } from './Jobs.styled';
import { TextField } from 'components/Common/TextField';
import useJobDispatcher from 'containers/HiringManager/Jobs.util';

type props = {
    setShowCreateCandidate: React.Dispatch<React.SetStateAction<boolean>>;
    jobId: string;
}

const ValidationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
});

export const CreateCandidate = ({ setShowCreateCandidate, jobId }: props) => {
    const { createCandidate } = useJobDispatcher();
    const disableSubmit = (formik: FormikProps<any>) => !formik.isValid;

    const handleSubmit = (values: any) => {
        const { email } = values;
        createCandidate({email, jobId})
        setShowCreateCandidate(false);
    }

    return (
        <ModalComponent
            handleClose={() => setShowCreateCandidate(false)}
            show={true}
            showCloseIcon={true}
        >
            <ModalFormWrapper>
                <Formik
                    initialValues={{ track: "", openPositions: "", jobType: "" }}
                    onSubmit={handleSubmit}
                    validationSchema={ValidationSchema}
                >
                    {(formik) => (
                        <Form>
                            <Title>Add Candidate</Title>
                            <FieldSet className="mt-4 mb-4">
                                <Label className="font-weight-bold">Email Id</Label>
                                <Field name="email" type="email" placeholder="Email" component={TextField} />
                            </FieldSet>
                            <SubmitButton disabled={disableSubmit(formik)} type="submit" style={{ marginTop: '40px' }}>Submit</SubmitButton>
                        </Form>
                    )}
                </Formik>
            </ModalFormWrapper>
        </ModalComponent>
    );
};