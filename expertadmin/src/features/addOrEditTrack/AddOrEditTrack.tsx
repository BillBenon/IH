import ResizableSidebar from 'components/ResizeableSidebar/ResizableSidebar';
import { TrackTreeView } from 'containers/AddOrEditTrack/TrackTreeView';
import { useMenuVisibility } from 'context/menuVisibility';
import queryString from 'query-string';
import React, { Suspense, useEffect, useState, lazy } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Question } from 'types';
import { isNumeric } from 'utils/commonutils';
import { Entity, MenuItems, Routes, View } from 'utils/constants';

import { useAddOrEditTrack } from './useAddOrEditTrack';

export const AddOrEditTrack = () => {
    const history = useHistory();
    const { search } = useLocation();
    const { menuWidthPx } = useMenuVisibility()!;
    const [collapse, setCollapse] = useState<boolean>(false);
    const {
        params,
        trackTree,
        appendTrackTree,
        getTrackTree,
        initializeTrack,
        updateHierarchy,
        handleExpandedKeys,
    } = useAddOrEditTrack();
    const [activeView, setActiveView] = useState<string | undefined>('');
    const [secondChild, setSecondChild] = useState<JSX.Element | undefined>();
    useEffect(() => {
        setCollapse(!menuWidthPx);
    }, [menuWidthPx]);

    useEffect(() => {
        if (params.id && !isNumeric(params.id)) getTrackTree(params.id);
        initializeTrack();
        handleExpandedKeys(undefined);
    }, [params]);

    useEffect(() => {
        const trackParams: any = queryString.parse(search);
        if (!trackParams.view && isNumeric(params.id))
            trackParams.view = View.TRACK;
        importCallback(trackParams).then((componentDetails) => {
            setSecondChild(componentDetails);
        });
    }, [search]);

    useEffect(() => {

    }, [])

    const handleSaveCapability = (eventProp: string) => {
        if (eventProp) {
            updateHierarchy();
        }
    };

    const handleSaveQuestion = (eventProp: string) => {
        if (eventProp) {
            updateHierarchy();
        }
    };

    const importCallback = async ({
        view = View.TRACKSUMMARY,
        id,
        subid,
        capid,
        quesid,
    }: {
        view?: string;
        id?: string;
        subid?: string;
        capid?: string;
        quesid?: string;
    }) => {
        setActiveView(view);
        if (view == View.TRACK) {
            const AddEditTrackForm = lazy(() => import('containers/AddOrEditTrack/AddEditTrackForm'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddEditTrackForm setActiveView={handleActiveView} />
                </Suspense>
            );
        }
        if (view == View.CATEGORY) {
            const TrackCategories = lazy(() => import('containers/AddOrEditTrack/TrackCategories'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <TrackCategories setActiveView={handleActiveView} lastUpdated={id} />
                </Suspense>
            );
        }
        if (view == View.VIEWCATEGORY && id) {
            const AddEditCategoryView = lazy(() => import('containers/AddOrEditTrack/AddEditCategoryView'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddEditCategoryView
                        title={'View Category'}
                        entity={Entity.CATEGORY}
                        entityId={id}
                    />
                </Suspense>
            );
        }
        if (view == View.SUBCATEGORY && id) {
            const TrackSubCategories = lazy(() => import('containers/AddOrEditTrack/TrackSubCategories'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <TrackSubCategories
                        setActiveView={handleActiveView}
                        lastUpdated={subid}
                        categoryId={id}
                    />
                </Suspense>
            );
        }
        if (view == View.VIEWSUBCATEGORY && subid) {
            const AddEditCategoryView = lazy(() => import('containers/AddOrEditTrack/AddEditCategoryView'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddEditCategoryView
                        title={'View Sub-Category'}
                        entity={Entity.SUBCATEGORY}
                        entityId={subid}
                    />
                </Suspense>
            );
        }
        if (view == View.EDITCATEGORY) {
            const AddOrEditCategoryForm = lazy(() => import('containers/AddOrEditTrack/AddOrEditCategoryForm'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddOrEditCategoryForm
                        setActiveView={handleActiveView}
                        categoryId={id}
                    />
                </Suspense>
            );
        }
        if (view == View.EDITSUBCATEGORY) {
            const AddOrEditSubCategoryForm = lazy(() => import('containers/AddOrEditTrack/AddOrEditSubCategoryForm'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddOrEditSubCategoryForm
                        setActiveView={handleActiveView}
                        categoryId={id}
                        subCategoryId={subid}
                    />
                </Suspense>
            );
        }
        if (view == View.CAPABILITY && id) {
            const TrackCapabilities = lazy(() => import('containers/AddOrEditTrack/TrackCapabilities'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <TrackCapabilities
                        setActiveView={handleActiveView}
                        categoryId={id}
                        subCategoryId={subid}
                    />
                </Suspense>
            );
        }

        if (view == View.VIEWCAPABILITY && capid) {
            const AddOrEditCapabilityContainer = lazy(() => import('containers/AddOrEditCapability/AddOrEditCapabilityContainer'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddOrEditCapabilityContainer
                        showBreadcrumbs={true}
                        capabilityId={capid}
                        masterDisable={true}
                    />
                </Suspense>
            );
        }
        if (view == View.EDITCAPABILITY && capid) {
            const AddOrEditCapabilityContainer = lazy(() => import('containers/AddOrEditCapability/AddOrEditCapabilityContainer'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddOrEditCapabilityContainer
                        showBreadcrumbs={true}
                        categoryId={id}
                        subCategoryId={subid}
                        capabilityId={capid}
                        onSave={handleSaveCapability}
                        onSaveNew={(capId: string) => {
                            if (id) handleActiveView(View.EDITCAPABILITY, id, subid, capId);
                        }}
                        onCancel={(capId?: string) => {
                            if (!id) {
                                handleActiveView(View.TRACKSUMMARY);
                                return;
                            }
                            handleActiveView(View.CAPABILITY, id, subid, capId);
                        }}
                    />
                </Suspense>
            );
        }
        if (view == View.QUESTION && id && capid) {
            const TrackQuestions = lazy(() => import('containers/AddOrEditTrack/TrackQuestions'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <TrackQuestions
                        setActiveView={handleActiveView}
                        categoryId={id}
                        subCategoryId={subid}
                        capabilityId={capid}
                    />
                </Suspense>
            );
        }
        if (view == View.VIEWQUESTION && quesid) {
            const AddOrEditQuestionContainer = lazy(() => import('containers/AddOrEditQuestion/AddOrEditQuestionContainer'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddOrEditQuestionContainer
                        showBreadcrumbs={true}
                        questionId={quesid}
                        masterDisable={true}
                    />
                </Suspense>
            );
        }
        if (view == View.EDITQUESTION && quesid) {
            const AddOrEditQuestionContainer = lazy(() => import('containers/AddOrEditQuestion/AddOrEditQuestionContainer'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <AddOrEditQuestionContainer
                        showBreadcrumbs={true}
                        questionId={quesid}
                        onSave={handleSaveQuestion}
                        onAdd={(question: Question) => {
                            if (id && capid) {
                                handleActiveView(
                                    View.EDITQUESTION,
                                    id,
                                    subid,
                                    capid,
                                    question.questionId
                                );
                            }
                        }}
                        onCancel={(questionId: string | undefined) => {
                            if (!(id && capid)) {
                                handleActiveView(View.TRACKSUMMARY);
                                return;
                            }
                            handleActiveView(View.QUESTION, id, subid, capid, questionId);
                        }}
                    />
                </Suspense>
            );
        }
        if (view == View.TRACKSUMMARY) {
            const TrackSummary = lazy(() => import('containers/AddOrEditTrack/TrackSummary'));
            return (
                <Suspense fallback={<p>Loading...</p>}>
                    <TrackSummary setActiveView={handleActiveView} />
                </Suspense>
            );
        }

    };

    const handleActiveView = (
        view?: string,
        id?: string,
        subid?: string,
        capid?: string,
        quesid?: string
    ) => {
        if (!view) view = View.TRACKSUMMARY;
        let param = `?view=${view}`;
        if (id) param = param + `&id=${id}`;
        if (subid) param = param + `&subid=${subid}`;
        if (capid) param = param + `&capid=${capid}`;
        if (quesid) param = param + `&quesid=${quesid}`;
        history.push(Routes[MenuItems.tracks] + `/${params.id}` + `${param}`);
    };

    const setFreeQuestion = (
        id: string,
        subid: string,
        capid: string,
        questionId: string,
        isFree: boolean
    ) => {
        const categories = trackTree?.categories?.slice() ?? [];
        const inx = categories?.findIndex((cat) => cat.categoryId === id);
        if (categories && inx != undefined && inx > -1) {
            const category = { ...categories[inx] };
            const subCatInx = category.subCategories?.findIndex(
                (sub) => sub.subCategoryId === subid
            );
            if (subCatInx != undefined && subCatInx > -1) {
                const subcats = category.subCategories.slice();
                const subcategory = { ...subcats[subCatInx] };
                const capabilities = subcategory.capabilities?.slice();
                const capInx = capabilities?.findIndex(
                    (cap) => cap.capabilityId == capid
                );
                if (capInx != undefined && capInx > -1) {
                    const capability = { ...capabilities[capInx] };
                    const questions = capability.questions.slice();
                    const questionInx = questions.findIndex(q => q.questionId == questionId);
                    if (questionInx != undefined && questionInx > -1) {
                        const question = { ...questions[questionInx] };
                        question.isFree = isFree
                        questions.splice(questionInx, 1, question)
                        capability.questions = questions;
                    }
                    capabilities.splice(capInx, 1, capability);
                }
                subcategory.capabilities = capabilities;
                subcats.splice(subCatInx, 1, subcategory);
                category.subCategories = subcats;
            }
            categories.splice(inx, 1, category);
            appendTrackTree({ ...trackTree, categories: categories ?? [] } as any);
        }
    }

    const firstChild = (
        <TrackTreeView activeView={activeView} setActiveView={handleActiveView} setFreeQuestion={setFreeQuestion} />
    );

    return (
        <ResizableSidebar
            firstChild={firstChild}
            secondChild={secondChild}
            collapse={collapse}
        />
    );
};

export default AddOrEditTrack;
