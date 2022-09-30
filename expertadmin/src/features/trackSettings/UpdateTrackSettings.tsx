import { Plus, Refresh } from '@styled-icons/boxicons-regular';
import { Customize } from "@styled-icons/boxicons-regular/Customize";
import { Home } from "@styled-icons/feather/Home";
import { Dashboard } from "@styled-icons/zondicons/Dashboard";
import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { AddButton } from 'components/AddButton';
import { SmallSpan } from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { IconContainer } from 'components/IconContainer';
import { ModalComponent } from 'components/Modal';
import { SearchButton } from 'components/SearchButton';
import { SettingsTablStyles } from 'components/SettingsTablStyles';
import { DataTable } from 'containers/Common/DataTable';
import { TrackSettingForms, TrackSettingFormType } from 'containers/TrackSettings/TrackSettingForms';
import React, { useEffect, useState } from 'react';
import { Col, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getFolderPathAfterDomainName } from 'utils/commonutils';
import { TemplateTypes } from 'utils/constants';
import { getTrackLandingPageDetails, refreshDataFromTrackAndProduct, updateTrackLandingPageDetail } from './trackSettingsActions';
import {
    CapabilityCols,
    categoryCols, faqCols,
    freeBeeCols,
    landingPageInfoCols,
    nextLevelKeysCols,
    OurProcessCols,
    planDetailCols, relatedTrackCols, seoInfoCols, successStoriesCols,
    trackInfoCols,
    trackPitchCols
} from './trackSettingsHelper';


const UpdateTrackSettings = () => {
    const dispatch = useAppDispatch();
    const [opentracksettingsModal, setopentracksettingsModal] = useState<number | false>(false);
    const [defaultValue, setDefaultValue] = useState<any>();
    const [saveCallback, setSaveCallback] = useState<any>();
    const [visible, setvisible] = useState<boolean>(true);
    const params: { id: string } = useParams();
    const expert = useSelector((state: RootState) => state.auth.expert);
    const { expertId } = expert!;
    const [lp, setLP] = useState<any>();
    const { loading, trackLandingPageDetails, refershTrackPageDetails } = useSelector(
        (state: RootState) => state.trackSettings
    );

    const addSetvisibilityFunction = function (obj: any) {
        try {
            if (obj && obj.hasOwnProperty("visible")) {
                obj.invert = function () {
                    setvisible(false);
                    this.visible = !this.visible;
                };
                obj.onEditSave = function (data: any) {
                    Object.keys(data).forEach(key => {
                        if (this[key] && typeof this[key] == "object")
                            this[key] = { value: data[key], visible: this[key].visible };
                        else
                            this[key] = data[key];
                    });
                    setopentracksettingsModal(false);
                    setvisible(false);
                };
                obj.onAddSave = function (data: any, isObject: boolean) {
                    if (data.hasOwnProperty("planName")) { //temp fix
                        data.displayDescription = { values: [], visible: true };
                    }
                    if (data.hasOwnProperty("categoryName")) {
                        data.capabilities = { values: [], visible: true };
                    }
                    if (isObject) {
                        Object.keys(data).forEach(key => {
                            data[key] = { value: data[key], visible: true }
                        });
                    } else {
                        data.visible = true;
                    }
                    addSetvisibilityFunction(data);
                    if (!this.values) this.values = [];
                    this.values.push(data);
                    setopentracksettingsModal(false);
                    setvisible(false);
                };
                obj.onEdit = function (fieldType: number) {
                    const editObj = { ...this };
                    Object.keys(editObj).forEach(key => {
                        if (editObj[key] && typeof editObj[key] == "object") {
                            editObj[key] = editObj[key].value;
                        }
                    });
                    setDefaultValue(editObj);
                    setSaveCallback(() => (data: any) => this.onEditSave(data));
                    setopentracksettingsModal(fieldType);
                };
                obj.onAdd = function (fieldType: number, isObject: boolean) {
                    setDefaultValue({});
                    setSaveCallback(() => (data: any) => this.onAddSave(data, isObject));
                    setopentracksettingsModal(fieldType);
                };
                obj.onDelete = function () {
                    this.isDeleted = true;
                    setvisible(false);
                }
            }
            for (const i in obj) {
                if (typeof obj[i] == "object") {
                    addSetvisibilityFunction(obj[i]);
                }
            }
        }
        catch (e: any) {
            console.log(e);
        }

    };

    const handleSave = () => {
        let landingpage = JSON.parse(JSON.stringify(lp));
        removeFunctionsFromObj(landingpage);
        landingpage = parseAllS3Urls(landingpage);
        dispatch(updateTrackLandingPageDetail({ ...landingpage, expertId }));
    }

    const parseAllS3Urls = (lp: any) => {
        const lpParsedData = { ...lp };
        for (const i of lp?.freeBies?.values) {  // Updating freeBies to send path name
            i.logo = getFolderPathAfterDomainName(i.logo);
        }
        for (const i of lp?.successStories?.values) {  // Updating Success Stories to send path name
            i.companyLogo = getFolderPathAfterDomainName(i.companyLogo);
        }
        if (lp?.logo?.value) {  // Updating Logo to send path name
            lp.logo.value = getFolderPathAfterDomainName(lp.logo.value);
        }
        return lpParsedData;
    }

    const removeFunctionsFromObj = (obj: any) => {
        for (const i in obj) {
            if (obj.hasOwnProperty("values")) {
                obj.values = obj.values.filter((v: any) => !v.isDeleted);
            }
            if (typeof obj[i] == "function") {
                delete obj[i];
            }
            if (typeof obj[i] == "object") {
                removeFunctionsFromObj(obj[i]);
            }
        }
    }

    const onChangeTemplateType = (templateType: string) => {
        if (lp) {
            const landingpage = JSON.parse(JSON.stringify(lp));
            landingpage.templateType.value = templateType;
            setLP(landingpage);
        }
    }

    const onRefresh = () => {
        dispatch(refreshDataFromTrackAndProduct({ expertId, trackId: params.id, trackDataRefresh: true, productDataRefresh: true }))
    }

    useEffect(() => {
        if (!visible) {
            setvisible(true);
        }
    }, [visible])

    useEffect(() => {
        if (!params.id || trackLandingPageDetails) return;
        dispatch(getTrackLandingPageDetails({ expertId, trackId: params.id }))
    }, [])

    useEffect(() => {
        if (trackLandingPageDetails) {
            const landingpagedetails = JSON.parse(JSON.stringify(trackLandingPageDetails));
            addSetvisibilityFunction(landingpagedetails);
            setLP(landingpagedetails);
        }
    }, [trackLandingPageDetails])

    useEffect(() => {
        if (refershTrackPageDetails) {
            const landingpagedetails = JSON.parse(JSON.stringify(refershTrackPageDetails));
            addSetvisibilityFunction(landingpagedetails);
            setLP(landingpagedetails);
        }
    }, [refershTrackPageDetails])

    return (
        <>
            <div className="m-4 d-flex align-items-center justify-content-between">
                <u>{'Add/Edit Track Detail Page Components'}</u>
                <div className="d-flex align-items-center">
                    <Col className="d-flex justify-content-end align-items-center">
                        <SmallSpan>{'Template Type: '}</SmallSpan>
                        <CustomStyledIcon
                            onClick={() => onChangeTemplateType(TemplateTypes.DEFAULT)}
                            color={lp?.templateType?.value === TemplateTypes.DEFAULT ? '#5B94E3' : '#C4C4C4'}
                            icon={Home}
                            text={'Default'}
                        />
                        <CustomStyledIcon
                            onClick={() => onChangeTemplateType(TemplateTypes.MARKETING)}
                            color={lp?.templateType?.value === TemplateTypes.MARKETING ? '#5B94E3' : '#C4C4C4'}
                            icon={Dashboard}
                            text={'Marketing'}
                        />
                        <CustomStyledIcon
                            onClick={() => onChangeTemplateType(TemplateTypes.CUSTOMIZED)}
                            color={lp?.templateType?.value === TemplateTypes.CUSTOMIZED ? '#5B94E3' : '#C4C4C4'}
                            icon={Customize}
                            text={'Customized'}
                        />
                    </Col>
                    <AddButton style={{ marginRight: '1rem' }} onClick={() => onRefresh()} type="button">
                        <IconContainer icon={Refresh} />
                    </AddButton>
                    <AddButton onClick={handleSave} type="button">
                        {'Save'}
                    </AddButton>
                </div>
            </div>
            {lp && visible && <SettingsTablStyles>
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Track Pitch'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="trackPitchVisible"
                            type="checkbox"
                            label={""}
                            checked={lp?.trackPitch?.visible}
                            onChange={() => lp?.trackPitch?.invert()}
                        />
                    </div>
                </div>
                <DataTable
                    columns={trackPitchCols}
                    data={[{ ...lp?.trackPitch?.value, trackPitch: lp?.trackPitch.value }]}
                    loading={loading}
                    idKey="trackLandingPageId"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Landing Page Information'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="landingPageInformation"
                            type="checkbox"
                            label={""}
                            checked={lp?.landingPageInfo?.visible}
                            onChange={() => lp?.landingPageInfo?.invert()}
                        />
                    </div>
                </div>
                <DataTable
                    columns={landingPageInfoCols}
                    data={[{ ...lp?.landingPageInfo?.value, landingPageInfo: lp?.landingPageInfo.value }]}
                    loading={loading}
                    idKey="trackLandingPageId"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Track Information'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="description"
                            type="checkbox"
                            label={""}
                            checked={lp?.visible}
                            onChange={() => lp?.invert()}
                        />
                    </div>
                </div>
                <DataTable
                    columns={trackInfoCols}
                    data={[{
                        trackLandingPageId: lp?.trackLandingPageId,
                        trackId: lp?.trackId, title: lp?.title,
                        description: lp?.description,
                        detailsDescription: lp?.detailsDescription,
                        logo: lp?.logo,
                        track: lp,
                        tags: lp.tags,
                    }]}
                    loading={loading}
                    idKey="trackLandingPageId"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />

                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'SEO Information'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="description"
                            type="checkbox"
                            label={""}
                            checked={lp?.seo?.visible}
                            onChange={() => lp?.seo?.invert()}
                        />
                    </div>
                </div>
                <DataTable
                    columns={seoInfoCols}
                    data={[{
                        metaTitle: lp?.seo?.value?.metaTitle,
                        metaDescription: lp?.seo?.value?.metaDescription,
                        h1: lp?.seo?.value?.h1,
                        h2: lp?.seo?.value?.h2,
                        canonicalTag: lp?.seo?.value?.canonicalTag,
                        keywords: lp?.seo?.value?.keywords,
                        seo: lp?.seo.value,
                    }]}
                    loading={loading}
                    idKey="trackLandingPageId"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />

                {lp?.ourProcess && <> <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Our Process'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="description"
                            type="checkbox"
                            label={""}
                            checked={lp?.ourProcess?.visible}
                            onChange={() => lp.ourProcess?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.ourProcess?.onAdd(TrackSettingFormType.OurProcess)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                    <DataTable
                        columns={OurProcessCols}
                        data={lp?.ourProcess?.values.filter((v: any) => !v.isDeleted)}
                        loading={loading}
                        idKey="value"
                        cellClickFunc={() => { }}
                        hiddenColumns={[]}
                    /></>}
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Next Level Keys Points'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="description"
                            type="checkbox"
                            label={""}
                            checked={lp?.keyPoints?.visible}
                            onChange={() => lp.keyPoints?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.keyPoints?.onAdd(TrackSettingFormType.KeyPoint)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                <DataTable
                    columns={nextLevelKeysCols}
                    data={lp?.keyPoints?.values.filter((v: any) => !v.isDeleted)}
                    loading={loading}
                    idKey="value"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Plan Details'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="description"
                            type="checkbox"
                            label={""}
                            checked={lp?.productInfo?.visible}
                            onChange={() => lp.productInfo?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.productInfo?.onAdd(TrackSettingFormType.PlanDetail, true)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                <DataTable
                    columns={planDetailCols}
                    data={lp?.productInfo?.values.filter((v: any) => !v.isDeleted)}
                    loading={loading}
                    idKey="value"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                {lp?.capabilities && <>
                    <div className="d-flex align-items-center py-2 justify-content-between">
                        <span>{'Capabilities'}</span>
                        <div className="d-flex align-items-center">
                            <Form.Check
                                name="description"
                                type="checkbox"
                                label={""}
                                checked={lp?.capabilities?.visible}
                                onChange={() => lp.capabilities?.invert()}
                            />
                            <SearchButton
                                style={{ height: '15px', padding: '0' }}
                                type="button"
                                onClick={() => lp?.capabilities?.onAdd(TrackSettingFormType.Capability)}
                            >
                                <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                            </SearchButton>
                        </div>
                    </div>
                    <DataTable
                        columns={CapabilityCols}
                        data={lp?.capabilities.values.filter((v: any) => !v.isDeleted)}
                        loading={loading}
                        idKey="value"
                        cellClickFunc={() => { }}
                        hiddenColumns={[]}
                    />
                </>}
                <br />
                {lp?.categories && <>
                    <div className="d-flex align-items-center py-2 justify-content-between">
                        <span>{'Categories'}</span>
                        <div className="d-flex align-items-center">
                            <Form.Check
                                name="description"
                                type="checkbox"
                                label={""}
                                checked={lp?.categories?.visible}
                                onChange={() => lp.categories?.invert()}
                            />
                            <SearchButton
                                style={{ height: '15px', padding: '0' }}
                                type="button"
                                onClick={() => lp?.categories?.onAdd(TrackSettingFormType.Category)}
                            >
                                <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                            </SearchButton>
                        </div>
                    </div>
                    <DataTable
                        columns={categoryCols}
                        data={lp?.categories.values.filter((v: any) => !v.isDeleted)}
                        loading={loading}
                        idKey="value"
                        cellClickFunc={() => { }}
                        hiddenColumns={[]}
                    />
                </>}
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'FAQs'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="faqs"
                            type="checkbox"
                            label={""}
                            checked={lp?.faqs?.visible}
                            onChange={() => lp.faqs?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.faqs?.onAdd(TrackSettingFormType.FAQ)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                <DataTable
                    columns={faqCols}
                    data={lp?.faqs.values.filter((v: any) => !v.isDeleted)}
                    loading={loading}
                    idKey="value"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Success Stories'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="successStories"
                            type="checkbox"
                            label={""}
                            checked={lp?.successStories?.visible}
                            onChange={() => lp.successStories?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.successStories?.onAdd(TrackSettingFormType.SuccessStory)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                <DataTable
                    columns={successStoriesCols}
                    data={lp?.successStories.values.filter((v: any) => !v.isDeleted)}
                    loading={loading}
                    idKey="value"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'FreeBies'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="freeBies"
                            type="checkbox"
                            label={""}
                            checked={lp?.freeBies?.visible}
                            onChange={() => lp.freeBies?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.freeBies?.onAdd(TrackSettingFormType.FreeBee)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                <DataTable
                    columns={freeBeeCols}
                    data={lp?.freeBies.values.filter((v: any) => !v.isDeleted)}
                    loading={loading}
                    idKey="value"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
                <br />
                <div className="d-flex align-items-center py-2 justify-content-between">
                    <span>{'Related Tracks'}</span>
                    <div className="d-flex align-items-center">
                        <Form.Check
                            name="relatedTracks"
                            type="checkbox"
                            label={""}
                            checked={lp?.relatedTracks?.visible}
                            onChange={() => lp.relatedTracks?.invert()}
                        />
                        <SearchButton
                            style={{ height: '15px', padding: '0' }}
                            type="button"
                            onClick={() => lp?.relatedTracks?.onAdd(TrackSettingFormType.RelatedTrack)}
                        >
                            <IconContainer color={'#FFF'} style={{ backgroundColor: '#28a745' }} icon={Plus} height={'15px'} />
                        </SearchButton>
                    </div>
                </div>
                <DataTable
                    columns={relatedTrackCols}
                    data={lp?.relatedTracks.values.filter((v: any) => !v.isDeleted)}
                    loading={loading}
                    idKey="value"
                    cellClickFunc={() => { }}
                    hiddenColumns={[]}
                />
            </SettingsTablStyles>}
            {opentracksettingsModal && <ModalComponent
                show={!!opentracksettingsModal}
                handleClose={() => setopentracksettingsModal(false)}
                showCloseIcon={true}
                header={'Add Details'}
            >
                <TrackSettingForms formType={opentracksettingsModal} onSubmit={(data: any) => saveCallback(data)} defaultValue={defaultValue} />
            </ModalComponent>}
        </>
    )
}

export default UpdateTrackSettings;
