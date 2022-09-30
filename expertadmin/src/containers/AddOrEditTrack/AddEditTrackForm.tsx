import { yupResolver } from '@hookform/resolvers/yup';
import { AddButton } from 'components/AddButton';
import { AdvancedForm, AdvanceFormOptions } from 'components/AdvancedComponents/AdvancedForm';
import { AwsUploader } from 'components/AwsUploader';
import { DisableButton } from 'components/DisableButton';
import { Heading } from 'components/Heading';
import { LoaderStyles } from 'components/LoaderStyles';
import { ModalComponent } from 'components/Modal';
import RouteLeavingGuard from 'components/RouteGourd/ReactLeavingGourd';
import { S3ImagePicker } from 'components/S3ImagePicker';
import { SearchButton } from 'components/SearchButton';
import SmallCard from 'components/SmallCard/SmalCard';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { DisabledHandler } from 'containers/Common/DisabledHandler';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React, { ElementType, useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { ExpertAllDetail, TrackDetails, TrackVideo } from 'types';
import { isNumeric, trimContent, validURL } from 'utils/commonutils';
import { Entity, Enum, MenuItems, Routes, State, StorageClient } from 'utils/constants';
import { initialTrack } from 'utils/defaults';
import * as Yup from 'yup';
import { SearchExperts } from './SearchExperts';
import { TrackVideoComponent } from "./TrackVideoComponent";


const yupSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    detailsDescription: Yup.string().required('Detailed Description is required'),
    trackType: Yup.string().required('Track Type is required'),
    trackSubType: Yup.string().required('Track Sub-Type is required'),
    state: Yup.string(),
    market: Yup.string().required('Market is required'),
    trackEnrollType: Yup.string().required('Enrollment Type is required'),
    expertIds: Yup.array().of(Yup.string()),
});

type AddEditTrackFormProps = {
    setActiveView: Function;
};

export const AddEditTrackForm = ({ setActiveView }: AddEditTrackFormProps) => {
    const history = useHistory();

    const {
        TRACKLOGODIRECTORY,
    } = StorageClient;

    const {
        saveTrackDetails,
        getTracksDetails,
        fetchEnums,
        setExpertsToAdd,
        getAllExperts,
        getAllMarkets,
        updateTrackState,
        handleExpertSearchText,
        getTrackTags,
        loading,
        track,
        trackTypes,
        trackSubTypes,
        params,
        markets,
        saveSuccess,
        expertsToAdd,
        trackTags,
    } = useAddOrEditTrack();

    const [defaultValue, setDefaultValue] = useState<TrackDetails>(initialTrack);
    const [logo, setLogo] = useState<string | undefined>();
    const [options, setAdvanceFormOptions] = useState<AdvanceFormOptions>({
        trackEnrollType: [{
            value: 'MUST_BUY', label: 'MUST BUY'
        }, {
            value: 'CAN_ENROLL', label: 'CAN ENROLL'
        }, {
            value: 'FOR_PLACEMENT', label: 'FOR PLACEMENT'
        }],
        tags: trackTags?.map(tag => {
            return { value: tag.name, label: tag.name }
        }) || [],
    });
    const [openSearchExpert, setOpenSearchExpert] = useState<boolean>(false);
    const [showDisableAlert, setShowDisableAlert] = useState<boolean>(true);
    const [goBackOnSave, setGoBackOnSave] = useState<boolean>(false);
    const [isSavedNew, setIsSavedNew] = useState<boolean>(false);
    const [disabledAlert, setDisabledAlert] = useState<boolean | undefined>();
    const [addedExperts, setAddedExperts] = useState<ExpertAllDetail[]>([]);
    const [trackVideos, setTrackVideos] = useState<TrackVideo[]>([]);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const disabledHandlerRef = useRef(null);
    const searchExpertsRef = useRef();

    const methods = useForm<TrackDetails>({
        resolver: yupResolver(yupSchema),
        defaultValues: defaultValue,
        mode: 'onChange',
        shouldFocusError: true,
    });

    const type = {
        title: 'input' as ElementType,
        description: 'rte' as ElementType,
        detailsDescription: 'rte' as ElementType,
        market: 'select' as ElementType,
        trackEnrollType: 'select' as ElementType,
        trackType: 'select' as ElementType,
        trackSubType: 'select' as ElementType,
        tags: 'multiselect' as ElementType
    };
    const localization = {
        title: 'Title',
        description: 'Description',
        detailsDescription: 'Detailed Description  ',
        market: 'Market',
        trackEnrollType: 'Enrollment Type',
        trackType: 'Track Type',
        trackSubType: 'Track Sub-Type',
        tags: 'Tags',
    };

    const placeholder = {
        title: 'Add a title',
        description: 'Add Description',
        detailsDescription: 'Add Detailed Description  ',
        market: 'Select',
        trackEnrollType: 'Select',
        trackType: 'Select',
        trackSubType: 'Select',
        tags: "Select Tags"
    };

    const fieldsize = {
        market: 4,
        trackType: 4,
        trackSubType: 6,
        trackEnrollType: 4,
        tags: 6
    };

    const handleOpenExpertModal = () => {
        setOpenSearchExpert(true);
        getAllExperts();
        setExpertsToAdd([]);
    };

    const onSubmit = (data: TrackDetails) => {
        saveTrackDetails(
            { ...data, logo },
            addedExperts.map((ex) => ex.expertId)
        );
    };

    const handleExpertAdd = () => {
        const experts = (searchExpertsRef.current as any).getExperts();
        setExpertsToAdd(experts);
        setOpenSearchExpert(false);
        handleExpertSearchText('');
    };

    const handleDisableTrack = (isdisabled: boolean) => {
        if (isdisabled) {
            updateTrackState(State.DISABLED);
            setShowDisableAlert(false);
        } else updateTrackState(State.INPROGRESS);
    };

    const saveAndGoback = () => {
        handleSaveTrackDetails();
        setGoBackOnSave(true);
    };

    const handleSaveTrackDetails = () => {
        const data: any = methods.getValues();
        if (data.tags) {
            data.tags = data.tags?.map((tag: { value: string; label: string }) => tag.value);
        }
        data.videos = trackVideos;
        Object.keys(data).forEach((key: any) => {
            if (typeof data[key] == 'string') {
                data[key] = trimContent(data[key]);
            }
        });
        if (!Object.keys(methods.errors).length) {
            saveTrackDetails(
                { ...data, logo },
                addedExperts.map((ex) => ex.expertId)
            );
            setIsSavedNew(true);
        }
    };

    const goBack = () => {
        if (!isNumeric(params.id)) {
            setActiveView();
        }
    };

    const handlePopupEdit = () => {
        disabledHandlerRef && (disabledHandlerRef.current as any).edit();
        updateTrackState(State.INPROGRESS);
        setDisabledAlert(false);
    };

    const handleRemoveExpert = (id: string) => {
        const experts = addedExperts?.slice();
        const inx = experts?.findIndex((e) => e.expertId === id);
        if (inx != undefined && inx != -1) {
            experts.splice(inx, 1);
            setAddedExperts(experts);
        }
    };

    const handleRemoveVideo = (videoInx: number) => {
        const videos = trackVideos?.slice();
        if (videos != undefined && videoInx != undefined && videoInx != -1) {
            videos.splice(videoInx, 1);
            setTrackVideos(videos);
        }
    }
    const handleAddVideo = (video: TrackVideo) => {
        let videos = trackVideos;
        videos = [...videos, video];
        setTrackVideos(videos);
    }

    const handleReplaceVideo = (idx: number, newVideo: TrackVideo) => {
        const videos = trackVideos?.slice();
        if (videos != undefined && idx != undefined && idx != -1) {
            videos.splice(idx, 1, newVideo);
            setTrackVideos(videos);
        }
    }

    const handleImageUpload = (url: string) => {
        methods.setValue('logo', url);
        setLogo(url);
    };

    useEffect(() => {
        if (track && !openSearchExpert) {
            if (track.trackId && params.id != track.trackId && isSavedNew) {
                history.push(Routes[MenuItems.tracks] + `/${track.trackId}`);
                if (saveSuccess) {
                    if (goBackOnSave) {
                        setActiveView();
                        setGoBackOnSave(false);
                    }
                }
                return;
            }
            setAddedExperts(track.expertIds);
            setTrackVideos(track.videos);
            if (isNumeric(params.id)) return;
            const trackCopy = { ...track };
            if (trackCopy.tags) {
                trackCopy.tags = trackCopy.tags?.map(tag => {
                    return { label: tag, value: tag }
                });
            }
            setDefaultValue(trackCopy);
            if (track.disabled) {
                setDisabledAlert(true);
                methods.setValue('disabled', true);
            }
            if (showDisableAlert) setShowDisableAlert(false);
        }
    }, [track]);

    useEffect(() => {
        fetchEnums([Enum.TrackType, Enum.TrackSubType]);
        getAllMarkets();
        getTracksDetails();
        getTrackTags();
    }, [params]);

    useEffect(() => {
        options.trackType = trackTypes.map((type) => {
            return { value: type.value, label: type.description };
        });
        setAdvanceFormOptions(options);
    }, [trackTypes]);

    useEffect(() => {
        options.trackSubType = trackSubTypes.map((type) => {
            return { value: type.value, label: type.description };
        });
        setAdvanceFormOptions(options);
    }, [trackSubTypes]);

    useEffect(() => {
        options.market = markets.map((market) => {
            return { value: market.textId, label: market.name };
        });
        setAdvanceFormOptions(options);
    }, [markets]);

    useEffect(() => {
        if (trackTags) {
            options.tags = trackTags.map(tag => {
                return { value: tag.name, label: tag.name };
            });
            setAdvanceFormOptions(options);
        }
    }, [trackTags]);


    useEffect(() => {
        if (saveSuccess && params.id == track.trackId) {
            setIsDirty(false);
            setExpertsToAdd([]);
            if (goBackOnSave) {
                setActiveView();
                setGoBackOnSave(false);
            }
        }
    }, [saveSuccess]);

    useEffect(() => {
        if (expertsToAdd?.length) {
            let experts = addedExperts.slice();
            experts = experts.concat(expertsToAdd);
            setAddedExperts(experts);
        }
    }, [expertsToAdd]);

    useEffect(() => {
        if (isNumeric(params.id)) {
            setLogo(undefined);
            setAddedExperts([]);
        }
    }, [params]);

    useEffect(() => {
        setLogo(track.logo);
    }, [track.logo]);

    return (
        <Col>
            <FormProvider {...methods}>
                <Form onChange={() => setIsDirty(true)}>
                    <Row className="align-items-center m-0">
                        <Heading>
                            {isNumeric(params.id)
                                ? 'Add Track Details'
                                : 'Edit Track Details'}
                        </Heading>
                    </Row>
                    <fieldset disabled={track.state === State.DISABLED}>
                        <AdvancedForm
                            {...{
                                defaultValue,
                                type,
                                localization,
                                fieldsize,
                                placeholder,
                                options,
                                onSubmit,
                                hideFooter: true,
                                disabled: track.state === State.DISABLED,
                            }}
                            rteOnFocus={() => setIsDirty(true)}
                        ></AdvancedForm>
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Col className="p-0">
                                <StyledFormLabel>{'Experts'}</StyledFormLabel>
                            </Col>
                        </div>
                        <Row>
                            {addedExperts?.map((expert) => (
                                <SmallCard
                                    key={expert.expertId}
                                    id={expert.expertId}
                                    image={
                                        validURL(expert.photoURL) ? expert.photoURL : undefined
                                    }
                                    title={expert.fullname}
                                    subTitle={expert.roleType + ' at ' + expert.workingAt}
                                    onDelete={(id: string) => handleRemoveExpert(id)}
                                />
                            ))}
                            <SmallCard
                                disabled={track.state === State.DISABLED}
                                image={undefined}
                                title={'Add Expert'}
                                onClick={() => handleOpenExpertModal()}
                            />
                        </Row>
                        <TrackVideoComponent handleRemoveVideo={handleRemoveVideo}
                            trackVideos={trackVideos}
                            handleAddVideo={handleAddVideo}
                            handleReplaceVideo={handleReplaceVideo} />
                        <div className="d-flex justify-content-between align-items-baseline">
                            <Col className="p-0 mb-2 d-flex align-items-center">
                                <StyledFormLabel>{'Logo'}</StyledFormLabel>
                                <S3ImagePicker handleImageClick={handleImageUpload} />
                            </Col>
                        </div>
                        <AwsUploader
                            onUpload={handleImageUpload}
                            url={logo}
                            directory={TRACKLOGODIRECTORY}
                        />
                    </fieldset>
                    <Row className="m-0 mt-3">
                        <Col className="p-0">
                            <Col
                                className="p-0 pt-3 pb-3 d-flex justify-content-between"
                                style={{ borderTop: '1px solid rgba(91, 148, 227, 0.2)' }}
                            >
                                <DisabledHandler
                                    hidden={!track.trackId}
                                    disabled={track.state === State.DISABLED}
                                    onChange={handleDisableTrack}
                                    type={Entity.TRACK}
                                    reason={track.disableReason}
                                    id={track.trackId}
                                    ref={disabledHandlerRef}
                                />
                                <Col className="p-0 text-right">
                                    <DisableButton
                                        style={{ marginRight: '.5rem' }}
                                        type="button"
                                        onClick={() => goBack()}
                                    >
                                        {'Cancel'}
                                    </DisableButton>
                                    <AddButton
                                        style={{ marginRight: '.5rem' }}
                                        type="button"
                                        onClick={() => handleSaveTrackDetails()}
                                    >
                                        {'Save'}
                                    </AddButton>
                                    <AddButton type="button" onClick={saveAndGoback}>
                                        {'Save and Close'}
                                    </AddButton>
                                </Col>
                            </Col>
                        </Col>
                    </Row>
                </Form>
            </FormProvider>
            {loading && (
                <BeatLoader
                    css={{
                        ...LoaderStyles,
                    }}
                    color={'#3694D7'}
                    loading={loading}
                />
            )}
            {openSearchExpert && (
                <ModalComponent
                    show={openSearchExpert}
                    handleClose={() => setOpenSearchExpert(false)}
                    showCloseIcon={true}
                    header={'Select Experts'}
                    footer={
                        <SearchButton onClick={handleExpertAdd} type="button">
                            {'Add Experts'}
                        </SearchButton>
                    }
                >
                    <SearchExperts
                        existingExperts={addedExperts}
                        ref={searchExpertsRef}
                    />
                </ModalComponent>
            )}
            <ModalComponent
                show={!!disabledAlert}
                handleClose={() => setDisabledAlert(false)}
                showCloseIcon={true}
                header={'Update track state'}
                isStatic={true}
                footer={
                    <Row>
                        <Col className="p-0">
                            <DisableButton
                                style={{ marginRight: '.5rem' }}
                                type="button"
                                onClick={() => setDisabledAlert(false)}
                            >
                                {'Cancel'}
                            </DisableButton>
                        </Col>
                        <Col className="p-0">
                            <SearchButton
                                style={{ width: '4rem' }}
                                onClick={() => handlePopupEdit()}
                                type="button"
                            >
                                {'Edit'}
                            </SearchButton>
                        </Col>
                    </Row>
                }
            >
                {'Track is disabled. Do you want to edit it anyway?'}
            </ModalComponent>
            <RouteLeavingGuard
                when={(isDirty || !!expertsToAdd?.length) && !goBackOnSave && !isNumeric(params?.id)}
                navigate={(path) => history.push(path)}
                shouldBlockNavigation={() => (isDirty || !!expertsToAdd?.length) && !goBackOnSave && !isNumeric(params?.id)}
            />
        </Col>
    );
};

export default AddEditTrackForm;
