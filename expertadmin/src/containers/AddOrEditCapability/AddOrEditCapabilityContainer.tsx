import 'react-quill/dist/quill.snow.css';

import { css } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, Search } from '@styled-icons/boxicons-regular';
import { AddButton } from 'components/AddButton';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { ColShrink } from 'components/ColShrink';
import { BigSpan, SmallSpan } from 'components/CommonStyles';
import { DisableButton } from 'components/DisableButton';
import { DropdownIcon } from 'components/DropdownIcon';
import { DropupIcon } from 'components/DropupIcon';
import { Error } from 'components/Error';
import { Heading } from 'components/Heading';
import { Heading2 } from 'components/Heading2';
import { IconContainer } from 'components/IconContainer';
import { ModalComponent } from 'components/Modal';
import RichTextEditor from 'components/RichtTextEditor';
import RouteLeavingGuard from 'components/RouteGourd/ReactLeavingGourd';
import { SearchButton } from 'components/SearchButton';
import { StatusIndicator } from 'components/StatusIndicator';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledInput } from 'components/StyledInput';
import { AddOrEditQuestionContainer } from 'containers/AddOrEditQuestion/AddOrEditQuestionContainer';
import { DisabledHandler } from 'containers/Common/DisabledHandler';
import { useAppHistory } from 'context/appHistory';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { useQuestions } from 'features/questions/useQuestions';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Col, Collapse, Form, Row } from 'react-bootstrap';
import { ErrorOption, FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { CapabilityQuestionsType, Evaluation, GetCapabilityResponse, Question } from 'types';
import { isNumeric, trimContent } from 'utils/commonutils';
import { Entity, EventProps, MenuItems, Routes, State } from 'utils/constants';
import { initialCapability } from 'utils/defaults';
import * as Yup from 'yup';

import { AddEditCategoryForm, AddEditCategoryFormProps } from './AddEditCategoryForm';
import { AttachEvaluation } from './AttachEvaluation';
import { CapabilityEvaluations } from './CapabilityEvaluations';
import { CapabilityQuestions } from './CapabilityQuestions';
import { CategoryOverview } from './CategoryOverview';
import { CategorySubCategory } from './CategorySubCategory';
import { SampleEvaluation } from './SampleEvaluation';
import { SearchQuestions } from './SearchQuestions';

//import { debounce } from 'lodash';
const evaluationSchema = Yup.object().shape({
  evalText: Yup.string().required('Title is required'),
  level: Yup.number().required('Level is required'),
  points: Yup.number().required('Point is required'),
  hint: Yup.string().required('Hint is required'),
});

const capabilitySchema = Yup.object().shape({
  capabilityText: Yup.string().required('Title is required'),
  weight: Yup.number().required('Weight is required').typeError('Weight must be a number'),
  description: Yup.string().required('Description is required'),
  disabled: Yup.boolean(),
  categoryId: Yup.string(),
  subCategoryId: Yup.string(),
  evaluations: Yup.array().of(evaluationSchema),
});

const LoaderStyles = css`
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 1051;
`;

type AddOrEditCapabilityContainerProps = {
  capabilityId?: string;
  masterDisable?: boolean;
  categoryId?: string;
  subCategoryId?: string;
  onCancel?: Function;
  onSaveNew?: Function;
  showBreadcrumbs?: boolean;
  onSave?: Function;
};

export const AddOrEditCapabilityContainer: FC<AddOrEditCapabilityContainerProps> = ({
  capabilityId,
  masterDisable,
  categoryId,
  subCategoryId,
  onCancel,
  onSaveNew,
  showBreadcrumbs,
  onSave,
}) => {
  const {
    fetCapabilityDetails,
    publishCapabilityDetails,
    saveCapabilityDetails,
    updateCapabilityState,
    setSelectedCategory,
    setSelectedSubCategory,
    setOpenAddEditCategory,
    updateOverview,
    addQuestionToCapability,
    deleteQuestionToCapability,
    attachEvaluation,
    params,
    capability,
    loading,
    saveSuccess,
    openAddEditCategory,
    selectedCategory,
    selectedSubCategory,
    attachEvaluationSuccess,
    insertQuestiontoCapabilitySuccess,
    removeQuestionToCapabilitySuccess,
  } = useAddOrEditCapability();

  const [{ selectedQuestion }] = useQuestions();

  const { breadcrumbs } = useAddOrEditTrack();
  const borderTop = { borderTop: '1px solid rgba(91, 148, 227, 0.2)' };

  const [goBackOnSave, setGoBackOnSave] = useState<boolean>(false);
  const [markCompleteOnSave, setMarkCompleteOnSave] = useState<boolean>(false);
  const [attachEvaluationOnSave, setAttachEvaluationOnSave] = useState<boolean>(
    false
  );
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSavedNew, setIsSavedNew] = useState<boolean>(false);
  const [disabledAlert, setDisabledAlert] = useState<boolean | undefined>();
  const [showDisableAlert, setShowDisableAlert] = useState<boolean>(true);
  const [expandCSC, setExpandCSC] = useState<boolean>(true);
  const [expandedEval, setExpandedEval] = useState<boolean>(true);
  const [expandedQuestion, setExpandedQuestion] = useState<boolean>(true);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [showSearchQuestion, setShowSearchQuestion] = useState<boolean>(false);
  const [showAddQuestion, setShowAddQuestion] = useState<boolean>(false);
  const [entity, setEntity] = useState<AddEditCategoryFormProps | undefined>();
  const [showCategoryOverview, setShowCategoryOverview] = useState<boolean>(
    false
  );
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [showAttachModal, setShowAttachModal] = useState<boolean>(false);
  const [activeQuestion, setActiveQuestion] = useState<
    CapabilityQuestionsType | undefined
  >();
  const [questionToRemove, setQuestionToRemove] = useState<
    string | undefined
  >();
  const [evaluationsToAdd, setEvaluationsToAdd] = useState<string[]>([]);
  const [questionToEdit, setQuestionToEdit] = useState<string | undefined>();
  const [openAddQuestion, setOpenAddQuestion] = useState<boolean | undefined>();
  const [viewSample, showViewSample] = useState<boolean>(false);
  const [paramId, setParamId] = useState<string>();
  const [questionToAdd, setQuestionToAdd] = useState<Question>();
  const history = useHistory();
  const { deleteHistory } = useAppHistory()!;
  const methods = useForm<GetCapabilityResponse>({
    resolver: yupResolver(capabilitySchema),
    defaultValues: capability,
    mode: 'onChange',
    shouldFocusError: true,
  });
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    watch,
    errors,
    control,
    reset,
    setError,
  } = methods;

  const useQuestionFieldMethods = useFieldArray({ control, name: 'questions' });
  const disabledHandlerRef = useRef(null);
  const capabilityEvalRef = useRef(null);
  const attachEvaluationRef = useRef(null);

  const goBack = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    history.push(Routes[MenuItems.capabilities]);
    if (paramId) deleteHistory(MenuItems.capabilities, paramId);
  };

  const handleDisableCapability = (isdisabled: boolean) => {
    if (isdisabled) {
      updateCapabilityState(State.DISABLED);
      setShowDisableAlert(false);
    } else updateCapabilityState(State.INPROGRESS);
  };

  const saveAndGoback = () => {
    const data = getValues();
    if (!Object.keys(errors).length) {
      handleSaveCapabilityDetails(data as any);
      setGoBackOnSave(true);
    }
  };

  const saveAndMarkComplete = () => {
    const data = getValues();
    if (!Object.keys(errors).length) {
      handleSaveCapabilityDetails(data as any);
      setMarkCompleteOnSave(true);
    }
  };

  const handleSaveCapabilityDetails = (data: any) => {
    data.categoryId = categoryId ?? selectedCategory;
    data.subCategoryId = subCategoryId ?? selectedSubCategory;
    if (!data.categoryId) {
      const errorOptions: ErrorOption = {
        message: 'Category is required',
        shouldFocus: true,
      };
      setError('categoryId', errorOptions);
      return;
    }
    data.evaluations = evaluations;
    Object.keys(data).forEach((key: any) => {
      if (typeof data[key] == 'string') {
        data[key] = trimContent(data[key]);
      }
    });
    saveCapabilityDetails(data, capabilityId);
    setIsSavedNew(true);
  };

  const handlePopupEdit = () => {
    disabledHandlerRef && (disabledHandlerRef.current as any).edit();
    updateCapabilityState(State.INPROGRESS);
    setDisabledAlert(false);
  };

  const handleOverviewClose = () => {
    setShowCategoryOverview(false);
    updateOverview();
  };

  const handleQuestionClose = () => {
    setShowQuestion(false);
  };

  const hndleAttachEvaluation = () => {
    // check if newly created evals
    if (
      !capability.capabilityId ||
      evaluations?.some(
        (ev) => !capability?.evaluations?.map((e) => e.id).includes(ev.id)
      )
    ) {
      handleSaveCapabilityDetails(getValues());
      setAttachEvaluationOnSave(true);
    } else {
      const evalstoAdd = (attachEvaluationRef?.current as any)?.attachEvaluation();
      setEvaluationsToAdd(evalstoAdd);
    }
  };

  const handleQuestionAdd = () => {
    if (selectedQuestion && capability.capabilityId) {
      addQuestionToCapability({
        questionId: selectedQuestion.questionId,
        capabilityId: capability.capabilityId,
      });
    }
  };

  async function setCapabilityData() {
    if (
      capability.capabilityId &&
      paramId != capability.capabilityId &&
      isSavedNew
    ) {
      // const title: string = getValues('capabilityText');
      //updateHistory(MenuItems.capabilities, paramId, capability.capabilityId, title);
      if (onSaveNew) {
        onSaveNew(capability.capabilityId);
        return;
      }
      history.push(
        Routes[MenuItems.capabilities] + `/${capability.capabilityId}`
      );
      return;
    }
    const keys = Object.keys(capability);
    keys.forEach((key: string) => {
      const val = (capability as any)[key]; //inx != undefined && inx != -1 && values[inx]?.data && values[inx]?.data[key] ? values[inx].data[key] :
      if (key != 'disabled') {
        setValue(key, val);
        if (key === 'evaluations') setEvaluations(val);
      }
      if (key === 'subCategoryId') {
        setSelectedSubCategory(val);
      }
      if (key === 'categoryId') {
        setSelectedCategory(val);
      }
    });
    watch('questions', capability.questions);
    trigger();
  }
  const handleCategorySelect = (id: string) => {
    setValue('categoryId', id);
    setSelectedCategory(id);
  };

  const handleSubCategorySelect = (id: string) => {
    setValue('subCategoryId', id);
    setSelectedSubCategory(id);
  };

  const hideOpenAddEditEntity = () => {
    setEntity(undefined);
    setOpenAddEditCategory(false);
  };

  const handleCategoryAdd = () => {
    setEntity({ entity: Entity.CATEGORY });
    setOpenAddEditCategory(true);
    setIsDirty(true);
  };

  const handleSubCategoryAdd = () => {
    setEntity({ entity: Entity.SUBCATEGORY });
    setOpenAddEditCategory(true);
    setIsDirty(true);
  };

  const handleEditCategory = (entityId: string) => {
    setEntity({ entity: Entity.CATEGORY, entityId });
    setOpenAddEditCategory(true);
    setIsDirty(true);
  };

  const handleEditSubCategory = (entityId: string) => {
    setEntity({ entity: Entity.SUBCATEGORY, entityId });
    setOpenAddEditCategory(true);
    setIsDirty(true);
  };

  const handleAddEval = () => {
    (capabilityEvalRef?.current as any).addEvaluation();
  };

  const handleAddQuestion = () => {
    if (
      errors.capabilityText ||
      errors.description ||
      !(selectedCategory || categoryId)
    )
      return;
    if (!capability.capabilityId) {
      setOpenAddQuestion(true);
      setQuestionToAdd(undefined);
      handleSaveCapabilityDetails(getValues());
    } else {
      setShowAddQuestion(true);
    }
  };

  const handleSaveQuestion = (question: Question) => {
    if (capability.capabilityId) {
      const inx = useQuestionFieldMethods.fields?.findIndex(
        (q) => q.questionId === question.questionId
      );
      if (inx === -1) {
        setQuestionToEdit(question.questionId);
        addQuestionToCapability({
          questionId: question.questionId,
          capabilityId: capability.capabilityId,
        });
        setQuestionToAdd(question);
      } else {
        handleEditQuestion(question);
      }
    }
  };

  const handleAddQuestionCancel = () => {
    setShowAddQuestion(false);
    setQuestionToEdit(undefined);
  };

  const handleEditQuestion = (question: any) => {
    const questions: any = useQuestionFieldMethods.fields.slice();
    const inx = questions.findIndex(
      (q: any) => q.questionId === questionToEdit
    );
    if (inx !== -1) {
      const ques = { ...questions[inx] };
      ques.title = question.title;
      questions.splice(inx, 1, ques);
      setValue('questions', questions);
      watch('questions', questions);
    }
  };

  const onEvaluationRemove = (questionId: string, evaluationId: string) => {
    //get evals of the question
    const ques: any = useQuestionFieldMethods.fields?.find(
      (question) => question.questionId === questionId
    );
    const inx = ques.evaluations?.findIndex(
      (e: any) => e.evaluationId === evaluationId
    );
    if (
      inx != undefined ||
      (inx !== -1 &&
        capability.evaluations?.findIndex((ev) => ev.id === evaluationId) != -1)
    ) {
      const questioneval = ques.evaluations?.slice();
      questioneval?.splice(inx, 1);
      const evalstoAdd = questioneval?.map((q: any) => q.evaluationId) || [];
      const data = [
        { capabilityId: capability.capabilityId, evaluationIds: evalstoAdd },
      ];
      attachEvaluation(data, questionId);
      setEvaluationsToAdd(evalstoAdd);
      setActiveQuestion(ques as any);
    }
  };

  const handleAttachEvaluations = (questionId: string) => {
    setShowAttachModal(true);
    const ques = useQuestionFieldMethods.fields?.find(
      (question) => question.questionId === questionId
    );
    setActiveQuestion(ques as any);
  };

  const handleShowQuestion = () => {
    if (
      errors.capabilityText ||
      errors.description ||
      !(selectedCategory || categoryId)
    )
      return;
    if (!capability.capabilityId) {
      setShowSearchQuestion(true);
      handleSaveCapabilityDetails(getValues());
    } else {
      setShowQuestion(true);
    }
  };

  const handleEvaluationUpdate = (evals: Evaluation[]) => {
    setEvaluations(evals);
    setValue('evaluations', evals);
    const questions: any = useQuestionFieldMethods.fields;
    questions?.forEach((ques: any) => {
      const qevals = ques.evaluations?.map((qe: any) => qe.evaluationId);
      evals = evals.filter((e) => (qevals ?? []).includes(e.id));
      ques.evaluations = evals.map((e) => {
        return { evaluationId: e.id, evalText: e.evalText, hint: e.hint };
      });
    });
    setValue('questions', questions);
    watch('questions', questions);
  };

  const onQuestionRemove = (questionId: string) => {
    if (capability.capabilityId) {
      deleteQuestionToCapability({
        questionId,
        capabilityId: capability.capabilityId,
      });
      setQuestionToRemove(questionId);
    } else {
      handleSaveCapabilityDetails(getValues());
      setQuestionToRemove(questionId);
    }
  };

  useEffect(() => {
    if (capability) {
      setCapabilityData();
      if (capability.state === State.DISABLED && showDisableAlert && paramId == capability.capabilityId) {
        setDisabledAlert(true);
        setValue('disabled', true);
        setShowDisableAlert(false);
      }
    }
  }, [capability]);

  useEffect(() => {
    if (insertQuestiontoCapabilitySuccess) {
      onSave && onSave(EventProps.QUESTIONADDEDFROMCAPABILITY);
      if (selectedQuestion && !questionToAdd) {
        useQuestionFieldMethods.append(selectedQuestion);
      } else if (questionToAdd) {
        useQuestionFieldMethods.append(questionToAdd);
      }
      setActiveQuestion(undefined);
      setShowQuestion(false);
    }
  }, [insertQuestiontoCapabilitySuccess]);

  useEffect(() => {
    if (attachEvaluationSuccess) {
      setShowAttachModal(false);
      setActiveQuestion(undefined);
      const qevals = evaluations
        .filter((e) => evaluationsToAdd.includes(e.id))
        .map((e) => {
          return { evaluationId: e.id, evalText: e.evalText, hint: e.hint };
        });
      const questions: any = [...useQuestionFieldMethods.fields];
      const inx = questions.findIndex(
        (q: any) => q.questionId === activeQuestion?.questionId
      );
      if (questions[inx]) questions[inx].evaluations = qevals;
      setValue('questions', questions);
      watch('questions', questions);
    }
  }, [attachEvaluationSuccess]);

  useEffect(() => {
    if (questionToRemove && removeQuestionToCapabilitySuccess) {
      onSave && onSave(EventProps.QUESTIONREMOVED);
      const inx = useQuestionFieldMethods.fields.findIndex(
        (q: any) => q.questionId === questionToRemove
      );
      useQuestionFieldMethods.remove(inx);
      setQuestionToRemove(undefined);
    }
  }, [removeQuestionToCapabilitySuccess]);

  useEffect(() => {
    if (!capabilityId) {
      setParamId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (capabilityId) setParamId(capabilityId);
  }, [capabilityId]);

  useEffect(() => {
    if (paramId) {
      fetCapabilityDetails(paramId);
      reset(initialCapability);
    }
  }, [paramId]);

  useEffect(() => {
    if (saveSuccess) {
      setIsDirty(false);
      onSave && onSave(EventProps.CAPABILITYUPDATED);
      if (goBackOnSave) {
        if (onCancel) {
          onCancel(capability.capabilityId);
          return;
        }
        goBack();
        setGoBackOnSave(false);
      }
      if (markCompleteOnSave) {
        publishCapabilityDetails();
        setMarkCompleteOnSave(false);
      }
      if (attachEvaluationOnSave) {
        const evalstoAdd = (attachEvaluationRef?.current as any)?.attachEvaluation();
        setEvaluationsToAdd(evalstoAdd);
        setAttachEvaluationOnSave(false);
      }
      if (questionToRemove) {
        deleteQuestionToCapability({
          questionId: questionToRemove,
          capabilityId: capability.capabilityId,
        });
      }
      if (openAddQuestion) {
        setShowAddQuestion(true);
        setOpenAddQuestion(undefined);
      }
      if (showSearchQuestion) {
        setShowQuestion(true);
        setShowSearchQuestion(false);
      }
    }
  }, [saveSuccess]);

  useEffect(() => {
    if (questionToEdit) {
      setShowAddQuestion(true);
    }
  }, [questionToEdit]);

  return (
    <>
      <FormProvider {...methods}>
        <Form
          onChange={() => setIsDirty(true)}
          onSubmit={handleSubmit(handleSaveCapabilityDetails)}
        >
          <Col className="p-2 mt-2 mb-2">
            {showBreadcrumbs && !!breadcrumbs && (
              <div className="pl-3">
                <Breadcrumbs data={breadcrumbs} />
              </div>
            )}
            <Row className="align-items-center m-0">
              <Col xs={12} lg={8} md={8}>
                <Row className="align-items-center">
                  <div className="ml-3 mr-3">
                    <Heading>
                      {!isNumeric(paramId)
                        ? masterDisable
                          ? 'View Capability'
                          : 'Edit Capability'
                        : 'Add Capability'}
                    </Heading>
                  </div>
                  <ColShrink>
                    <Col>
                      <SmallSpan>{'Created by'}</SmallSpan>
                    </Col>
                    <Col className="mt-1">
                      <BigSpan>{capability?.createdBy || 'You'}</BigSpan>
                    </Col>
                  </ColShrink>
                  <ColShrink>
                    <Col>
                      <SmallSpan>{'Last Modified by'}</SmallSpan>
                    </Col>
                    <Col className="mt-1">
                      <BigSpan>{capability?.updatedBy || 'You'}</BigSpan>
                    </Col>
                  </ColShrink>
                  {capability?.state && (
                    <ColShrink>
                      <Col>
                        <SmallSpan>{'Status'}</SmallSpan>
                      </Col>
                      <Col className="mt-1">
                        {capability && (
                          <StatusIndicator
                            variant={capability.state}
                            text={capability.state}
                          />
                        )}
                      </Col>
                    </ColShrink>
                  )}
                </Row>
              </Col>
              {!masterDisable && (
                <Col className="text-right">
                  <DisableButton
                    style={{ marginRight: '.5rem' }}
                    type="button"
                    onClick={() => goBack()}
                  >
                    {'Cancel'}
                  </DisableButton>
                  <AddButton style={{ marginRight: '.5rem' }} type="submit">
                    {'Save'}
                  </AddButton>
                  <AddButton type="button" onClick={saveAndGoback}>
                    {'Save and Close'}
                  </AddButton>
                </Col>
              )}
            </Row>
            <fieldset
              disabled={capability.state === State.DISABLED || masterDisable}
            >
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Title'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.capabilityText && (
                        <Error errorMessage={errors.capabilityText.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledInput
                    ref={register}
                    name="capabilityText"
                    minRows={1}
                    placeholder={'Capability Title'}
                  ></StyledInput>
                </Col>
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Weight'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.weight && (
                        <Error errorMessage={errors.weight.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledInput
                    type="number"
                    ref={register}
                    name="weight"
                    minRows={1}
                    placeholder={'Question Weight'}
                  ></StyledInput>
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Description'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.description && (
                        <Error errorMessage={errors.description.message} />
                      )}
                    </Col>
                  </Row>
                  <RichTextEditor
                    id={'capability-description'}
                    control={control}
                    name={`description`}
                    error={(errors as any)['description']}
                    onFocus={() => setIsDirty(true)}
                    disabled={
                      capability.state === State.DISABLED || !!masterDisable
                    }
                    placeholder={`Description`}
                  />
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="m-0" style={borderTop}>
                    <Col className="p-0 d-flex align-items-center">
                      <Heading2>{'Category & Sub-Category'}</Heading2>
                      {expandCSC && (
                        <DropupIcon onClick={() => setExpandCSC(!expandCSC)} />
                      )}
                      {!expandCSC && (
                        <DropdownIcon
                          onClick={() => setExpandCSC(!expandCSC)}
                        />
                      )}
                    </Col>

                    <Col className="d-flex p-0 align-items-center justify-content-end">
                      <AddButton
                        style={{ marginRight: '.5rem' }}
                        type="button"
                        onClick={() => setShowCategoryOverview(true)}
                      >
                        {'Overview'}
                      </AddButton>
                    </Col>
                  </Row>
                  <Collapse in={expandCSC}>
                    <Row>
                      <CategorySubCategory
                        {...{
                          handleCategorySelect,
                          handleSubCategorySelect,
                          handleCategoryAdd,
                          handleEditCategory,
                          handleSubCategoryAdd,
                          handleEditSubCategory,
                          isDisabled:
                            masterDisable ||
                            capability.state === State.DISABLED,
                          categoryId: categoryId,
                          subCategoryId: subCategoryId,
                        }}
                      />
                    </Row>
                  </Collapse>
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="m-0" style={borderTop}>
                    <Col className="p-0 d-flex align-items-center">
                      <Heading2>{'Evaluations'}</Heading2>
                      {expandedEval && (
                        <DropupIcon
                          onClick={() => setExpandedEval(!expandedEval)}
                        />
                      )}
                      {!expandedEval && (
                        <DropdownIcon
                          onClick={() => setExpandedEval(!expandedEval)}
                        />
                      )}
                    </Col>
                    <Col className="d-flex p-0 align-items-center justify-content-end">
                      <AddButton
                        style={{ marginRight: '.5rem' }}
                        type="button"
                        onClick={() => showViewSample(true)}
                      >
                        {'View Sample'}
                      </AddButton>
                      <SearchButton
                        style={{ width: '4em' }}
                        type="button"
                        onClick={() => handleAddEval()}
                      >
                        <IconContainer color={'#FFF'} icon={Plus} />
                      </SearchButton>
                    </Col>
                  </Row>
                  <Collapse in={expandedEval}>
                    <Row>
                      <CapabilityEvaluations
                        isDisabled={
                          masterDisable || capability.state === State.DISABLED
                        }
                        evaluations={evaluations}
                        updateEvaluations={handleEvaluationUpdate}
                        ref={capabilityEvalRef}
                      />
                    </Row>
                  </Collapse>
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="m-0" style={borderTop}>
                    <Col className="p-0 d-flex align-items-center">
                      <Heading2>{'Questions'}</Heading2>
                      {expandedQuestion && (
                        <DropupIcon
                          onClick={() => setExpandedQuestion(!expandedQuestion)}
                        />
                      )}
                      {!expandedQuestion && (
                        <DropdownIcon
                          onClick={() => setExpandedQuestion(!expandedQuestion)}
                        />
                      )}
                    </Col>
                    <Col className="d-flex p-0 align-items-center justify-content-end">
                      <AddButton
                        style={{ marginRight: '.5rem' }}
                        type="button"
                        onClick={() => handleShowQuestion()}
                      >
                        <IconContainer color={'#5B94E3'} icon={Search} />
                      </AddButton>
                      <SearchButton
                        style={{ width: '4em' }}
                        type="button"
                        onClick={() => handleAddQuestion()}
                      >
                        <IconContainer color={'#FFF'} icon={Plus} />
                      </SearchButton>
                    </Col>
                  </Row>
                  <Collapse in={expandedQuestion}>
                    <Row>
                      <CapabilityQuestions
                        isDisabled={
                          masterDisable || capability.state === State.DISABLED
                        }
                        onEvaluationRemove={onEvaluationRemove}
                        onEditQuestion={setQuestionToEdit}
                        onAttachEvaluation={handleAttachEvaluations}
                        onQuestionRemove={onQuestionRemove}
                        useQuestionFieldMethods={useQuestionFieldMethods}
                      />
                    </Row>
                  </Collapse>
                </Col>
              </Row>
            </fieldset>
            {!capabilityId && (
              <Row className="m-0 mt-3">
                <Col>
                  <Col
                    className="p-0 pt-3 pb-3 d-flex justify-content-between"
                    style={borderTop}
                  >
                    <DisabledHandler
                      hidden={!capability.capabilityId}
                      disabled={
                        capability.state === State.DISABLED || !!masterDisable
                      }
                      onChange={handleDisableCapability}
                      reason={capability.disableReason}
                      type={Entity.CAPABILITY}
                      id={capability.capabilityId}
                      ref={disabledHandlerRef}
                    />
                    <SearchButton
                      onClick={saveAndMarkComplete}
                      type="button"
                      style={{ width: '150px', height: '40px' }}
                    >
                      {'Mark as completed'}
                    </SearchButton>
                  </Col>
                </Col>
              </Row>
            )}
          </Col>
        </Form>
      </FormProvider>
      {!masterDisable && !!disabledAlert && (
        <ModalComponent
          show={!!disabledAlert}
          handleClose={() => setDisabledAlert(false)}
          showCloseIcon={true}
          header={'Update capability state'}
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
          {'Capability is disabled. Do you want to edit it anyway?'}
        </ModalComponent>
      )}
      {entity && (
        <ModalComponent
          show={openAddEditCategory}
          handleClose={hideOpenAddEditEntity}
          showCloseIcon={true}
          header={
            entity.entity === Entity.CATEGORY
              ? entity.entityId
                ? 'Edit Category'
                : 'Add Category'
              : entity.entityId
                ? 'Edit Sub-category'
                : 'Add Sub-category'
          }
        >
          <AddEditCategoryForm {...entity} />
        </ModalComponent>
      )}
      {showCategoryOverview && (
        <ModalComponent
          isStatic={true}
          show={showCategoryOverview}
          handleClose={() => handleOverviewClose()}
          showCloseIcon={true}
          header={'Overview'}
        >
          <CategoryOverview categoryId={categoryId ?? selectedCategory} />
        </ModalComponent>
      )}
      {viewSample && (
        <ModalComponent
          isStatic={false}
          show={viewSample}
          handleClose={() => showViewSample(false)}
          showCloseIcon={true}
          header={'Sample Evaluations'}
        >
          <SampleEvaluation />
        </ModalComponent>
      )}
      {showQuestion && (
        <ModalComponent
          show={showQuestion}
          handleClose={() => handleQuestionClose()}
          showCloseIcon={true}
          header={'Add Question To Capability'}
          footer={
            <SearchButton onClick={handleQuestionAdd} type="button">
              {'Add Question'}
            </SearchButton>
          }
        >
          <SearchQuestions existingQuestions={useQuestionFieldMethods.fields} />
        </ModalComponent>
      )}
      {showAttachModal && (
        <ModalComponent
          show={showAttachModal}
          handleClose={() => setShowAttachModal(false)}
          showCloseIcon={true}
          header={'Attach evaluations to question'}
          footer={
            <SearchButton onClick={hndleAttachEvaluation} type="button">
              {'Add Evaluations'}
            </SearchButton>
          }
        >
          {activeQuestion && (
            <AttachEvaluation
              capabilityId={capability.capabilityId}
              activeQuestion={activeQuestion}
              evaluations={evaluations?.filter((e) => !!e.evalText)}
              ref={attachEvaluationRef}
            />
          )}
        </ModalComponent>
      )}
      {showAddQuestion && (
        <ModalComponent
          show={showAddQuestion}
          width={'70rem'}
          handleClose={() => {
            setQuestionToEdit(undefined);
            setShowAddQuestion(false);
          }}
        >
          <AddOrEditQuestionContainer
            onAdd={handleSaveQuestion}
            questionId={questionToEdit ?? '1'}
            onCancel={handleAddQuestionCancel}
          />
        </ModalComponent>
      )}
      {loading && (
        <BeatLoader
          css={LoaderStyles}
          color={'#3694D7'}
          loading={loading}
        ></BeatLoader>
      )}
      <RouteLeavingGuard
        when={
          isDirty && !goBackOnSave && !(capability.state === State.DISABLED || masterDisable) && !isNumeric(paramId)
        }
        navigate={(path) => history.push(path)}
        shouldBlockNavigation={() => isDirty && !goBackOnSave && !(capability.state === State.DISABLED || masterDisable) && !isNumeric(paramId)}
      />
    </>
  );
};

export default AddOrEditCapabilityContainer;