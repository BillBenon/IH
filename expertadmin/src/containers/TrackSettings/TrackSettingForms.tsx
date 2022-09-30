import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { AdvancedForm, AdvancedFormLocalization } from 'components/AdvancedComponents/AdvancedForm';
import { S3ImagePicker } from 'components/S3ImagePicker';
import { getTracksForComboBox } from 'features/trackSettings/trackSettingsActions';
import React, { ElementType, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

type TrackSettingFormsProps = {
    formType: number;
    onSubmit: SubmitHandler<any>,
    defaultValue?: any,
    advanceFormFieldChildren?: any,
}

export const TrackSettingFormType = {
    TrackInformation: 1,
    KeyPoint: 2,
    PlanDetail: 3,
    Capability: 4,
    FAQ: 5,
    SuccessStory: 6,
    FreeBee: 7,
    RelatedTrack: 8,
    Category: 9,
    OurProcess: 10,
    SEO: 11,
    LandingPage: 12,
    TrackPitch: 13,
}

const yupTrackSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    detailsDescription: Yup.string(),
});

const yupKeyPointSchema = Yup.object().shape({
    value: Yup.string().required('Title is required'),
});

const yupPlanDetailSchema = Yup.object().shape({
    planName: Yup.string().required('Plan name is required'),
    displayName: Yup.string().required('Display name is required'),
    description: Yup.string(),
});

const categorySchema = Yup.object().shape({
    categoryName: Yup.string().required('category Name is required'),
});

const capabilitySchema = Yup.object().shape({
    capabilityText: Yup.string().required('Capability text is required'),
    capabilityDescription: Yup.string(),
});

const faqSchema = Yup.object().shape({
    question: Yup.string().required('Question is required'),
    answer: Yup.string().required('Answer is required'),
});

const successStorySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    profile: Yup.string().required('Profile is required'),
    description: Yup.string(),
    videoURL: Yup.string().url(),
    companyLogo: Yup.string().url(),
});

const freebeeSchema = Yup.object().shape({
    logo: Yup.string().url(),
    title: Yup.string().required('Title is required'),
    url: Yup.string().url(),
});

const relatedTrackSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string(),
    detailsDescription: Yup.string(),
});

const trackInputType = {
    title: 'input' as ElementType,
    description: 'rte' as ElementType,
    detailsDescription: 'rte' as ElementType,
};

const keyPointInputType = {
    value: 'input' as ElementType,
};

const planDetailInputType = {
    planName: 'input' as ElementType,
    displayName: 'input' as ElementType,
    description: 'rte' as ElementType,
};

const capabilityInputType = {
    capabilityText: 'input' as ElementType,
    capabilityDescription: 'rte' as ElementType,
};

const categoryInputType = {
    categoryName: 'input' as ElementType,
};

const faqInputType = {
    question: 'input' as ElementType,
    answer: 'rte' as ElementType,
};

const successStoryInputType = {
    name: 'input' as ElementType,
    profile: 'rte' as ElementType,
    description: 'rte' as ElementType,
    videoURL: 'input' as ElementType,
    companyLogo: 'file' as ElementType,
};

const freebeeInputType = {
    logo: 'file',
    title: 'input' as ElementType,
    url: 'input' as ElementType,
};

const relatedTrackInputType = {
    title: 'select' as ElementType,
    description: 'rte' as ElementType,
    detailsDescription: 'rte' as ElementType,
};

const trackLocalization = {
    title: 'Title',
    description: 'Description',
    detailsDescription: "Detailed Description",
};

const keyPointLocalization = {
    value: 'Title',
};

const planDetailLocalization = {
    planName: 'Plan Name',
    displayName: 'Display Name',
    description: 'Description',
};

const capabilityLocalization = {
    capabilityText: 'Capability Text',
    capabilityDescription: 'Description',
};

const categoryLocalization = {
    categoryName: "Category Name",
}

const faqLocalization = {
    question: 'Question',
    answer: 'Answer',
};

const successStoryLocalization = {
    name: "Name",
    profile: "Profile",
    description: "Description",
    videoURL: "Video URL",
    companyLogo: "Company Logo"
};


const freebeeLocalization = {
    logo: "Logo",
    title: "Title",
    url: "URL",
};

const relatedTrackLocalization = {
    title: 'Title',
    description: 'Description',
    detailsDescription: "Detailed Description",
};

const yupOurProcessSchema = Yup.object().shape({
    stepTitle: Yup.string().required('Step title is required'),
    stepDescription: Yup.string().required('Description is required'),
});

const OurProcessLocalization = {
    stepTitle: 'Step Title',
    stepDescription: 'Description',
};

const OurProcessInputType = {
    stepTitle: 'input' as ElementType,
    stepDescription: 'input' as ElementType,
};

const yupSEOSchema = Yup.object().shape({
    h1: Yup.string(),
    h2: Yup.string(),
    metaDescription: Yup.string(),
    metaTitle: Yup.string().required('Title is required'),
    canonicalTag: Yup.string(),
    keywords: Yup.string(),
});

const seoInputType = {
    metaTitle: 'input' as ElementType,
    h1: 'input' as ElementType,
    h2: 'input' as ElementType,
    metaDescription: 'rte' as ElementType,
    canonicalTag: 'input' as ElementType,
    keywords: 'input' as ElementType,
};

const seoLocalization: AdvancedFormLocalization = {
    metaTitle: 'Meta Title',
    metaDescription: 'Meta Description',
    h1: 'Heading 1(H1)',
    h2: "Heading 2(H2)",
    canonicalTag: 'Canonical Tag',
    keywords: 'Keywords',
};


const yupLandingPageInfoSchema = Yup.object().shape({
    heading: Yup.string(),
    subHeading: Yup.string(),
    description: Yup.string(),
});

const landingPageInfoInputType = {
    heading: 'input' as ElementType,
    subHeading: 'input' as ElementType,
    description: 'rte' as ElementType,
};

const landingPageInfoLocalization: AdvancedFormLocalization = {
    heading: 'Heading',
    subHeading: 'Sub Heading',
    description: 'Description',
};

const yupTrackPitchSchema = Yup.object().shape({
    title: Yup.string(),
    description: Yup.string(),
});

const trackPitchInputType = {
    title: 'input' as ElementType,
    description: 'input' as ElementType,
};

const trackPitchLocalization: AdvancedFormLocalization = {
    title: 'Title',
    description: 'Description',
};

export const TrackSettingForms = (props: TrackSettingFormsProps) => {
    const dispatch = useAppDispatch();
    const { tracksForCombobox } = useSelector(
        (state: RootState) => state.trackSettings
    );
    const expert = useSelector((state: RootState) => state.auth.expert);
    const { expertId } = expert!;
    const [yupSchema, setyupSchema] = useState<any>({});
    const [localization, setlocalization] = useState<any>({});
    const [type, settype] = useState<any>({});
    const [placeholder, setplaceholder] = useState<any>({});
    const [options, setOptions] = useState<any>([]);
    const [defaultValue, setDefaultValue] = useState<any>(props.defaultValue);
    const [advanceFormFieldChildren, setAdvanceFormFieldChildren] = useState<any>();
    useEffect(() => {
        if (props.formType == TrackSettingFormType.RelatedTrack) {
            dispatch(getTracksForComboBox({ expertId }));
        }
    }, [])

    useEffect(() => {
        if (tracksForCombobox?.length) {
            setOptions({ title: tracksForCombobox?.map(t => { return { value: t.trackId, label: t.title } }) });
        }
    }, [tracksForCombobox])


    const setProps = (formType: number) => {
        switch (formType) {
            case TrackSettingFormType.TrackInformation:
                setyupSchema(yupTrackSchema);
                settype(trackInputType);
                setlocalization(trackLocalization);
                setplaceholder(trackLocalization);
                break;
            case TrackSettingFormType.KeyPoint:
                setyupSchema(yupKeyPointSchema);
                settype(keyPointInputType);
                setlocalization(keyPointLocalization);
                setplaceholder(keyPointLocalization);
                break;
            case TrackSettingFormType.PlanDetail:
                setyupSchema(yupPlanDetailSchema);
                settype(planDetailInputType);
                setlocalization(planDetailLocalization);
                setplaceholder(planDetailLocalization);
                break;
            case TrackSettingFormType.Category:
                setyupSchema(categorySchema);
                settype(categoryInputType);
                setlocalization(categoryLocalization);
                setplaceholder(categoryLocalization);
                break;
            case TrackSettingFormType.Capability:
                setyupSchema(capabilitySchema);
                settype(capabilityInputType);
                setlocalization(capabilityLocalization);
                setplaceholder(capabilityLocalization);
                break;
            case TrackSettingFormType.FAQ:
                setyupSchema(faqSchema);
                settype(faqInputType);
                setlocalization(faqLocalization);
                setplaceholder(faqLocalization);
                break;
            case TrackSettingFormType.SuccessStory:
                setyupSchema(successStorySchema);
                settype(successStoryInputType);
                setlocalization(successStoryLocalization);
                setplaceholder(successStoryLocalization);
                setAdvanceFormFieldChildren({ companyLogo: <S3ImagePicker handleImageClick={(url: string) => setDefaultValue({ ...props.defaultValue, companyLogo: url })} /> })
                break;
            case TrackSettingFormType.FreeBee:
                setyupSchema(freebeeSchema);
                settype(freebeeInputType);
                setlocalization(freebeeLocalization);
                setplaceholder(freebeeLocalization);
                break;
            case TrackSettingFormType.RelatedTrack:
                setyupSchema(relatedTrackSchema);
                settype(relatedTrackInputType);
                setlocalization(relatedTrackLocalization);
                setplaceholder(relatedTrackLocalization);
                setOptions({ title: tracksForCombobox?.map(t => { return { value: t.trackId, label: t.title } }) });
                break;
            case TrackSettingFormType.OurProcess:
                setyupSchema(yupOurProcessSchema);
                settype(OurProcessInputType);
                setlocalization(OurProcessLocalization);
                setplaceholder(OurProcessLocalization);
                break;
            case TrackSettingFormType.SEO:
                setyupSchema(yupSEOSchema);
                settype(seoInputType);
                setlocalization(seoLocalization);
                setplaceholder(seoLocalization);
                break
            case TrackSettingFormType.TrackPitch:
                setyupSchema(yupTrackPitchSchema);
                settype(trackPitchInputType);
                setlocalization(trackPitchLocalization);
                setplaceholder(trackPitchLocalization);
                break;
            case TrackSettingFormType.LandingPage:
                setyupSchema(yupLandingPageInfoSchema);
                settype(landingPageInfoInputType);
                setlocalization(landingPageInfoLocalization);
                setplaceholder(landingPageInfoLocalization);
                break;
        }
    }

    useEffect(() => {
        if (props.formType) {
            setProps(props.formType);
        }
    }, [props.formType])

    const methods = useForm<any>({
        resolver: yupResolver(yupSchema),
        defaultValues: defaultValue,
        mode: 'onChange',
        shouldFocusError: true,
    });

    const onSubmit = (data: any) => {
        if (props.formType == TrackSettingFormType.RelatedTrack) {
            data.trackId = data.title;
            data.title = options.title.find((p: any) => p.value == data.title)?.label || "";
        }
        props.onSubmit(data);
    }

    return (
        <FormProvider {...methods}>
            <Form>
                {props.formType && <AdvancedForm
                    {...{
                        defaultValue,
                        type,
                        localization,
                        placeholder,
                        options,
                        onSubmit: onSubmit,
                        hideFooter: false,
                        disabled: false,
                        advanceFormFieldChildren
                    }}
                />}
            </Form>
        </FormProvider>
    )
}
