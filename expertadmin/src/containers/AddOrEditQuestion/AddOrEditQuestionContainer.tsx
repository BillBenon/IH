import 'react-quill/dist/quill.snow.css';

import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, Search } from '@styled-icons/boxicons-regular';
import { AddButton } from 'components/AddButton';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Chip } from 'components/Chip';
import { ColShrink } from 'components/ColShrink';
import { BigSpan, DragIndicatorIcon, SmallSpan } from 'components/CommonStyles';
import { DisableButton } from 'components/DisableButton';
import { DropdownIcon } from 'components/DropdownIcon';
import { DropupIcon } from 'components/DropupIcon';
import { Error } from 'components/Error';
import { GrayedButton } from 'components/GrayedButton';
import { Heading } from 'components/Heading';
import { Heading2 } from 'components/Heading2';
import { IconContainer } from 'components/IconContainer';
import { LoaderStyles } from 'components/LoaderStyles';
import { ModalComponent } from 'components/Modal';
import RichTextEditor from 'components/RichtTextEditor';
import { SearchButton } from 'components/SearchButton';
import { StatusIndicator } from 'components/StatusIndicator';
import { StyledFormArea } from 'components/StyledFormArea';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledInput } from 'components/StyledInput';
import { StyledLinkText } from 'components/StyledLinkText';
import { StyledRadio } from 'components/StyledRadio';
import { StyledSelect } from 'components/StyledSelect';
import { DisabledHandler } from 'containers/Common/DisabledHandler';
import { useAppHistory } from 'context/appHistory';
import { useAddOrEditQuestion } from 'features/addOrEditQuestion/useAddOrEditQuestion';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { debounce } from 'lodash';
import React, { FC, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Col, Collapse, Form, Row } from 'react-bootstrap';
import { useFieldArray, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { AddOrEditQuestionResponse, Capability } from 'types';
import { isNumeric, trimContent } from 'utils/commonutils';
import {
  AnswerType,
  AnswerTypeEnum,
  Entity,
  Market,
  MenuItems,
  QuestionType,
  QuestionTypeEnum,
  Routes,
  State,
} from 'utils/constants';
import * as Yup from 'yup';

import { SearchHints } from './SearchHints';
import RouteLeavingGuard from 'components/RouteGourd/ReactLeavingGourd';

const questionSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  questionType: Yup.string().required('Question type is required'),
  answerType: Yup.string().required('Answer type is required'),
  level: Yup.string().required('Difficulty is required'),
});

type AddOrEditQuestionContainerProps = {
  onSave?: Function;
  onAdd?: Function;
  onCancel?: Function;
  questionId?: string;
  masterDisable?: boolean;
  showBreadcrumbs?: boolean;
};

export const AddOrEditQuestionContainer: FC<AddOrEditQuestionContainerProps> = ({
  onSave,
  onAdd,
  onCancel,
  masterDisable,
  questionId,
  showBreadcrumbs,
}) => {
  const {
    handleAddSampleSolution,
    fetQuestionDetails,
    publishQuestionDetails,
    saveQuestionDetails,
    getAllHints,
    setHintsToAdd,
    handleAddHint,
    handleUpdateHint,
    handleUpdateSampleSolution,
    clearSolutionsToAdd,
    updateQuestionState,
    params,
    question,
    loading,
    saveSuccess,
    hintsToAdd,
    solutionsToAdd,
  } = useAddOrEditQuestion();
  const { breadcrumbs } = useAddOrEditTrack();
  const [paramId, setParamId] = useState<string>();
  const [expandHint, setExpandHint] = useState<boolean>(false);
  const [state, setState] = useState<boolean>(false);
  const [expandSS, setExpandSS] = useState<boolean>(false);
  const [openSearchHint, setOpenSearchHint] = useState<boolean>(false);
  const [goBackOnSave, setGoBackOnSave] = useState<boolean>(false);
  const [markCompleteOnSave, setMarkCompleteOnSave] = useState<boolean>(false);
  const [isSavedNew, setIsSavedNew] = useState<boolean>(false);
  const [disabledAlert, setDisabledAlert] = useState<boolean | undefined>();
  const [showDisableAlert, setShowDisableAlert] = useState<boolean>(true);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const disabledHandlerRef = useRef(null);
  const debouncedSave = useRef(
    debounce(
      (nextValue: { hintId: string; description: string; title: string }) =>
        handleUpdateHint(nextValue),
      500
    )
  ).current;
  const debouncedSaveSS = useRef(
    debounce(
      (nextValue: {
        sampleSolutionId: string;
        description: string;
        hints: string[];
        title: string;
      }) => handleUpdateSampleSolution(nextValue),
      1000
    )
  ).current;
  const history = useHistory();
  const { deleteHistory } = useAppHistory()!;
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    watch,
    trigger,
    control,
    errors,
    formState,
  } = useForm<AddOrEditQuestionResponse>({
    resolver: yupResolver(questionSchema),
    defaultValues: question,
    mode: 'onChange',
    shouldFocusError: false,
  });

  const {
    fields: hintFields,
    remove: hintRemove,
    move: hintMove,
    insert: hintInsert,
  } = useFieldArray({ control, name: 'hints' });
  const {
    fields: solutionFields,
    remove: solutionRemove,
    insert: solutionInsert,
    move: solutionMove,
  } = useFieldArray({ control, name: 'sampleSolutions' });

  const searchHintsRef = useRef();

  useEffect(() => {
    if (saveSuccess) {
      setIsDirty(false);
      onSave && onSave();
      if (onAdd && isNumeric(questionId)) {
        onAdd({ ...getValues(), questionId: question.questionId });
      }
      if (goBackOnSave) {
        goBack();
        setGoBackOnSave(false);
      }
      if (markCompleteOnSave) {
        publishQuestionDetails();
        setMarkCompleteOnSave(false);
      }
    }
  }, [saveSuccess]);

  const goBack = () => {
    if (onCancel) {
      onCancel(question.questionId);
      return;
    }
    history.push(Routes[MenuItems.questions]);
    if (paramId) {
      deleteHistory(MenuItems.questions, paramId);
    }
  };

  const onDragEnd = (result: any) => {
    const hints = hintFields.slice();
    setValue('hints', hints);
    hintMove(result.source.index, result.destination.index);
  };

  const onSSDragEnd = (result: any) => {
    const sampleSolutions = solutionFields.slice();
    setValue('sampleSolutions', sampleSolutions);
    solutionMove(result.source.index, result.destination.index);
  };

  const handleDisableQuestion = (isdisabled: boolean) => {
    if (isdisabled) {
      updateQuestionState(State.DISABLED);
      setShowDisableAlert(false);
    } else updateQuestionState(State.INPROGRESS);
  };

  const saveAndGoback = () => {
    const data = getValues();
    if (!Object.keys(errors).length) {
      handleSaveQuestionDetails(data as any);
      setGoBackOnSave(true);
    }
  };

  const saveAndMarkComplete = () => {
    const data = getValues();
    if (!Object.keys(errors).length) {
      handleSaveQuestionDetails(data as any);
      setMarkCompleteOnSave(true);
    }
  };

  const handleSearchHint = () => {
    setOpenSearchHint(true);
    getAllHints();
    setHintsToAdd([]);
  };

  const handleHintAdd = () => {
    const hints = (searchHintsRef.current as any).getHints();
    setHintsToAdd(hints);
    setOpenSearchHint(false);
    setExpandHint(true);
  };

  const updateHint = (key: string, value: string, hint: any) => {
    hint[key] = value;
    const { id, title, description } = hint;
    setValue('hints', hintFields);
    if (id && title && description) {
      debouncedSave({ title, description, hintId: id });
    }
  };

  const updateSampleSolution = (
    key: string,
    value: string,
    sampleSolution: any,
    index?: number
  ) => {
    if (index != undefined) {
      const sampleSolutionHints = sampleSolution[key].slice();
      if (sampleSolutionHints.length >= index + 1) {
        sampleSolutionHints.splice(index, 1, value);
      } else {
        sampleSolutionHints.push(value);
        setState(!state);
      }
      sampleSolution[key] = sampleSolutionHints;
    } else {
      sampleSolution[key] = value;
    }
    const { id, title, description, hints } = sampleSolution;
    //setValue('sampleSolutions', solutionFields);
    if (
      id &&
      title &&
      description &&
      (hints.length == 0 || hints.every((h: string) => !!h))
    ) {
      debouncedSaveSS({ title, description, hints, sampleSolutionId: id });
    }
  };

  const handleSaveQuestionDetails = (data: any) => {
    data.hints = hintFields;
    data.sampleSolutions = solutionFields;
    Object.keys(data).forEach((key: any) => {
      if (typeof data[key] == 'string') {
        data[key] = trimContent(data[key]);
      }
    });
    saveQuestionDetails(data, questionId);
    setIsSavedNew(true);
  };

  async function setQuestionData() {
    if (
      question.questionId &&
      paramId != question.questionId &&
      isSavedNew &&
      !goBackOnSave
    ) {
      if (onAdd) {
        return;
      }
      history.push(Routes[MenuItems.questions] + `/${question.questionId}`);
      return;
    }
    const keys = Object.keys(question);
    keys.forEach((key: string) => {
      const val = (question as any)[key]; //inx != undefined && inx != -1 && values[inx]?.data && values[inx]?.data[key] ? values[inx].data[key] :
      if (key != 'disabled') {
        setValue(key, val);
      } else {
        if (question.disabled) {
          setDisabledAlert(true);
          setValue('disabled', true);
        }
      }
    });
    watch('hints', question.hints);
    watch('sampleSolutions', question.sampleSolutions);
    trigger();
  }

  useEffect(() => {
    if (question) {
      setQuestionData();
      if (question.state === State.DISABLED && showDisableAlert && paramId == question.questionId) {
        setDisabledAlert(true);
        setValue('disabled', true);
        setShowDisableAlert(false);
      }
    }
  }, [question]);

  const addHint = () => {
    handleAddHint();
    setExpandHint(true);
  };

  const addSolution = () => {
    handleAddSampleSolution();
    setExpandSS(true);
  };

  useEffect(() => {
    if (hintsToAdd.length) {
      // const hints = getValues('hints');
      setValue('hints', hintFields);
      hintInsert(hintFields.length, hintsToAdd);
      setHintsToAdd([]);
    }
  }, [hintsToAdd]);

  useEffect(() => {
    if (solutionsToAdd.length) {
      setValue('sampleSolutions', solutionFields);
      solutionInsert(solutionFields.length, solutionsToAdd);
      clearSolutionsToAdd();
    }
  }, [solutionsToAdd]);

  useEffect(() => {
    if (!questionId) {
      setParamId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (questionId) setParamId(questionId);
  }, [questionId]);

  useEffect(() => {
    if (paramId) {
      fetQuestionDetails(paramId);
    }
  }, [paramId]);
  const handlePopupEdit = () => {
    disabledHandlerRef && (disabledHandlerRef.current as any).edit();
    updateQuestionState(State.INPROGRESS);
    setDisabledAlert(false);
  };

  return (
    <>
      <RouteLeavingGuard
        when={isDirty && !(masterDisable || question.state === State.DISABLED) && !goBackOnSave && !isNumeric(paramId)}
        navigate={(path) => history.push(path)}
        shouldBlockNavigation={() => isDirty && !(masterDisable || question.state === State.DISABLED) && !goBackOnSave && !isNumeric(paramId)}
      />
      <Form
        onChange={() => setIsDirty(true)}
        onSubmit={handleSubmit(handleSaveQuestionDetails)}
      >
        <Col className="p-2 mt-2 mb-2">
          {showBreadcrumbs && !!breadcrumbs && (
            <div className="pl-3">
              <Breadcrumbs data={breadcrumbs} />
            </div>
          )}
          <Row className="align-items-center m-0">
            <Col>
              <Heading>
                {!isNumeric(paramId)
                  ? masterDisable
                    ? 'View Question'
                    : 'Edit Question'
                  : 'Add Question'}
              </Heading>
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
                <AddButton
                  style={{ marginRight: '.5rem' }}
                  type="submit"
                  disabled={!formState.isValid}
                >
                  {'Save'}
                </AddButton>
                <AddButton
                  type="button"
                  disabled={!formState.isValid}
                  onClick={saveAndGoback}
                >
                  {'Save and Close'}
                </AddButton>
              </Col>
            )}
          </Row>
          <fieldset
            disabled={question.state === State.DISABLED || masterDisable}
          >
            <Row className="justify-content-start m-0 mt-3">
              <ColShrink>
                <Col>
                  <SmallSpan>{'Created by'}</SmallSpan>
                </Col>
                <Col className="mt-1">
                  <BigSpan>{question?.createdBy || 'You'}</BigSpan>
                </Col>
              </ColShrink>
              {question?.state && (
                <ColShrink>
                  <Col>
                    <SmallSpan>{'Status'}</SmallSpan>
                  </Col>
                  <Col className="mt-1">
                    {question && (
                      <StatusIndicator
                        variant={question.state}
                        text={question.state}
                      />
                    )}
                  </Col>
                </ColShrink>
              )}
              <ColShrink>
                <Col>
                  <SmallSpan>{'Capability'}</SmallSpan>
                </Col>
                <Col className="mt-1">
                  <Chip
                    variant={'Capability'}
                    text={'View Capabilities'}
                    clamp={false}
                    hoverContent={
                      question?.capabilities?.length &&
                      question?.capabilities?.map((capability: Capability) => (
                        <Chip
                          key={capability.capabilityId}
                          variant={'Capability'}
                          text={capability.capabilityName}
                        />
                      ))
                    }
                  />
                </Col>
              </ColShrink>
              <ColShrink>
                <Col>
                  <SmallSpan>{'Track'}</SmallSpan>
                </Col>
                <Col className="mt-1">
                  <Chip variant={'Track'} text={'Track'} />
                </Col>
              </ColShrink>
              <ColShrink>
                <Col>
                  <SmallSpan>{'Market'}</SmallSpan>
                </Col>
                <Col className="mt-1">
                  <Chip variant={'Market'} text={Market.INTERVIEWHELP} />
                </Col>
              </ColShrink>
            </Row>
            <Row className="m-0 mt-3">
              <Col>
                <Row className="align-items-baseline">
                  <Col>
                    <StyledFormLabel>{'Title'}</StyledFormLabel>
                  </Col>
                  <Col className="text-left">
                    {errors && errors.title && (
                      <Error errorMessage={errors.title.message} />
                    )}
                  </Col>
                </Row>
                <StyledFormArea
                  ref={register}
                  name="title"
                  minRows={1}
                  placeholder={'Question Title'}
                ></StyledFormArea>
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
                  onFocus={() => setIsDirty(true)}
                  name="description"
                  control={control}
                  error={errors.description}
                  disabled={
                    question.state === State.DISABLED || !!masterDisable
                  }
                  id={'question-description'}
                  placeholder={`Description`}
                />
              </Col>
            </Row>
            <Row className="m-0 mt-3">
              <Col>
                <Col className="p-0">
                  <StyledFormLabel>{'Question Type'}</StyledFormLabel>
                </Col>
                <Col className="p-0">
                  <StyledSelect
                    ref={register}
                    name="questionType"
                    placeholder="Last Modified"
                  >
                    <option value={QuestionTypeEnum[0]}>
                      {QuestionType.TRAINING}
                    </option>
                    <option value={QuestionTypeEnum[1]}>
                      {QuestionType.EVALUATION}
                    </option>
                    <option value={QuestionTypeEnum[2]}>
                      {QuestionType.FREESAMPLE}
                    </option>
                  </StyledSelect>
                  {errors && errors.questionType && (
                    <Error errorMessage={errors.questionType.message} />
                  )}
                </Col>
              </Col>
              <Col>
                <Col className="p-0">
                  <StyledFormLabel>{'Answer Type'}</StyledFormLabel>
                </Col>
                <Col className="p-0">
                  <StyledSelect
                    custom
                    name="answerType"
                    ref={register}
                    placeholder="Answer Type"
                  >
                    <option value={AnswerTypeEnum[0]}>
                      {AnswerType.RICH_TEXT}
                    </option>
                    <option value={AnswerTypeEnum[1]}>{AnswerType.CODE}</option>
                    <option value={AnswerTypeEnum[2]}>
                      {AnswerType.DRAWING}
                    </option>
                    <option value={AnswerTypeEnum[3]}>
                      {AnswerType.AUDIO}
                    </option>
                    <option value={AnswerTypeEnum[4]}>
                      {AnswerType.VIDEO}
                    </option>
                  </StyledSelect>
                  {errors && errors.answerType && (
                    <Error errorMessage={errors.answerType.message} />
                  )}
                </Col>
              </Col>
              <Col>
                <Col>
                  <StyledFormLabel>{'Difficulty'}</StyledFormLabel>
                </Col>
                <Col>
                  <StyledRadio className="mr-4"
                    ref={register}
                    type="radio"
                    label={'Easy'}
                    name={'level'}
                    value={'0'}
                    id="levelEasy"
                  />
                  <StyledRadio className="mr-4"
                    ref={register}
                    type="radio"
                    label={'Medium'}
                    name={'level'}
                    value={'1'}
                    id="levelMedium"
                  />
                  <StyledRadio className="mr-4"
                    ref={register}
                    type="radio"
                    label={'Hard'}
                    name={'level'}
                    value={'2'}
                    id="levelHard"
                  />
                  {errors && errors.level && (
                    <Error errorMessage={errors.level.message} />
                  )}
                </Col>
              </Col>
            </Row>
            <Row className="m-0 mt-3">
              <Col>
                <Col
                  className="p-0"
                  style={{ borderTop: '1px solid rgba(91, 148, 227, 0.2)' }}
                >
                  <Col className="p-0 d-flex align-items-center justify-content-between">
                    <div className="p-0 d-flex align-items-center">
                      <Heading2>{`Hints (${hintFields.length || 0})`}</Heading2>
                      {expandHint && (
                        <DropupIcon
                          onClick={() => setExpandHint(!expandHint)}
                        />
                      )}
                      {!expandHint && (
                        <DropdownIcon
                          onClick={() => setExpandHint(!expandHint)}
                        />
                      )}
                    </div>
                    <div className="p-0 d-flex align-items-center">
                      <AddButton
                        disabled={
                          question.state === State.DISABLED || masterDisable
                        }
                        style={{ width: '4em', marginRight: '.5rem' }}
                        type="button"
                        onClick={handleSearchHint}
                      >
                        <IconContainer color={'#5B94E3'} icon={Search} />
                      </AddButton>
                      <SearchButton
                        disabled={
                          question.state === State.DISABLED || masterDisable
                        }
                        style={{ width: '4em' }}
                        type="button"
                        onClick={addHint}
                      >
                        <IconContainer color={'#FFF'} icon={Plus} />
                      </SearchButton>
                    </div>
                  </Col>
                  <Collapse in={expandHint}>
                    <div>
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppableSS">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {hintFields.map((hint, index) => (
                                <Draggable
                                  isDragDisabled={
                                    masterDisable ||
                                    question.state === State.DISABLED ||
                                    hintFields.length <= 1
                                  }
                                  key={hint?.id || index}
                                  draggableId={'' + hint?.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="d-flex"
                                    >
                                      <DragIndicatorIcon />
                                      <Col className="p-0 mb-3">
                                        <Row className="align-items-center">
                                          <Col className="mb-2">
                                            <StyledInput
                                              type="text"
                                              style={{ width: '190px' }}
                                              defaultValue={hint?.title}
                                              ref={register()}
                                              name={`hints[${index}].title`}
                                              onChange={(event: any) =>
                                                updateHint(
                                                  'title',
                                                  event.target.value,
                                                  hint
                                                )
                                              }
                                            />
                                          </Col>
                                          <Col className="text-right">
                                            <StyledLinkText
                                              style={{
                                                pointerEvents:
                                                  question.state ===
                                                    State.DISABLED ||
                                                    masterDisable
                                                    ? 'none'
                                                    : 'all',
                                              }}
                                              size={12}
                                              onClick={() => hintRemove(index)}
                                            >
                                              {'Remove Hint'}
                                            </StyledLinkText>
                                          </Col>
                                        </Row>
                                        <RichTextEditor
                                          onFocus={() => setIsDirty(true)}
                                          id={`hints[${index}].description`}
                                          control={control}
                                          name={`hints[${index}].description`}
                                          defaultValue={hint?.description}
                                          error={
                                            (errors as any)[
                                            `hints[${index}].description`
                                            ]
                                          }
                                          disabled={
                                            masterDisable ||
                                            question.state === State.DISABLED
                                          }
                                          placeholder={`Hint ${index + 1}`}
                                          onChangeCallback={(data: string) =>
                                            updateHint(
                                              'description',
                                              data,
                                              hint
                                            )
                                          }
                                        />
                                      </Col>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </Collapse>
                </Col>
              </Col>
            </Row>
            <Row className="m-0 mt-3">
              <Col>
                <Col
                  className="p-0"
                  style={{ borderTop: '1px solid rgba(91, 148, 227, 0.2)' }}
                >
                  <Col className="p-0 d-flex align-items-center justify-content-between">
                    <div className="p-0 d-flex align-items-center">
                      <Heading2>{`Sample Solution (${solutionFields.length || 0
                        })`}</Heading2>
                      {expandSS && (
                        <DropupIcon onClick={() => setExpandSS(!expandSS)} />
                      )}
                      {!expandSS && (
                        <DropdownIcon onClick={() => setExpandSS(!expandSS)} />
                      )}
                    </div>
                    <div className="p-0 d-flex align-items-center">
                      <SearchButton
                        disabled={
                          question.state === State.DISABLED || masterDisable
                        }
                        style={{ width: '4em' }}
                        type="button"
                        onClick={addSolution}
                      >
                        <IconContainer color={'#FFF'} icon={Plus} />
                      </SearchButton>
                    </div>
                  </Col>
                  <Collapse in={expandSS}>
                    <div>
                      <DragDropContext onDragEnd={onSSDragEnd}>
                        <Droppable droppableId="droppable">
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {solutionFields.map((ss, index) => (
                                <Draggable
                                  isDragDisabled={
                                    masterDisable ||
                                    question.state === State.DISABLED ||
                                    solutionFields.length <= 1
                                  }
                                  key={ss?.id || index}
                                  draggableId={'' + ss?.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      key={ss.id}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="d-flex"
                                    >
                                      <DragIndicatorIcon />
                                      <Col className="p-0 mb-3">
                                        <Row className="align-items-center">
                                          <Col className="mb-2">
                                            <StyledInput
                                              type="text"
                                              defaultValue={ss.title}
                                              style={{ width: '190px' }}
                                              ref={register()}
                                              name={`sampleSolutions[${index}].title`}
                                              onChange={(event: any) =>
                                                updateSampleSolution(
                                                  'title',
                                                  event.target.value,
                                                  ss
                                                )
                                              }
                                            />
                                          </Col>
                                          <Col className="text-right">
                                            <StyledLinkText
                                              style={{
                                                pointerEvents:
                                                  question.state ===
                                                    State.DISABLED ||
                                                    masterDisable
                                                    ? 'none'
                                                    : 'all',
                                              }}
                                              size={12}
                                              onClick={() =>
                                                solutionRemove(index)
                                              }
                                            >
                                              {'Remove Sample Solution'}
                                            </StyledLinkText>
                                          </Col>
                                        </Row>
                                        <RichTextEditor
                                          id={`sampleSolutions[${index}].description`}
                                          control={control}
                                          name={`sampleSolutions[${index}].description`}
                                          defaultValue={ss.description}
                                          valueHack={true}
                                          error={
                                            (errors as any)[
                                            `sampleSolutions[${index}].description`
                                            ]
                                          }
                                          disabled={
                                            masterDisable ||
                                            question.state === State.DISABLED
                                          }
                                          placeholder={'Sample Solution'}
                                          onChangeCallback={(data: string) =>
                                            updateSampleSolution(
                                              'description',
                                              data,
                                              ss
                                            )
                                          }
                                        />
                                        {!ss?.hints?.length && (
                                          <GrayedButton
                                            type="button"
                                            onClick={() =>
                                              updateSampleSolution(
                                                'hints',
                                                '',
                                                ss,
                                                0
                                              )
                                            }
                                          >
                                            {
                                              '+ Add Hint to this Sample Solution'
                                            }
                                          </GrayedButton>
                                        )}
                                        <Col>
                                          {ss?.hints?.map(
                                            (hint: string, hinx: number) => (
                                              <>
                                                <div key={hinx}>
                                                  <StyledFormLabel className="mt-2">{`Hint ${hinx + 1
                                                    }`}</StyledFormLabel>
                                                  <RichTextEditor
                                                    onFocus={() =>
                                                      setIsDirty(true)
                                                    }
                                                    id={`sampleSolutions[${index}].hints[${hinx}]`}
                                                    control={control}
                                                    name={`sampleSolutions[${index}].hints[${hinx}]`}
                                                    defaultValue={hint}
                                                    valueHack={true}
                                                    error={
                                                      (errors as any)[
                                                      `sampleSolutions[${index}].hints[${hinx}]`
                                                      ]
                                                    }
                                                    disabled={
                                                      masterDisable ||
                                                      question.state ===
                                                      State.DISABLED
                                                    }
                                                    placeholder={`Hint ${hinx + 1
                                                      }`}
                                                    onChangeCallback={(
                                                      data: string
                                                    ) =>
                                                      updateSampleSolution(
                                                        'hints',
                                                        data,
                                                        ss,
                                                        hinx
                                                      )
                                                    }
                                                  />
                                                </div>
                                                {hinx ===
                                                  (ss?.hints?.length || 0) -
                                                  1 && (
                                                    <GrayedButton
                                                      onClick={() =>
                                                        updateSampleSolution(
                                                          'hints',
                                                          '',
                                                          ss,
                                                          ss?.hints?.length
                                                        )
                                                      }
                                                    >
                                                      {'+ Add Hint'}
                                                    </GrayedButton>
                                                  )}
                                              </>
                                            )
                                          )}
                                        </Col>
                                      </Col>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </div>
                  </Collapse>
                </Col>
              </Col>
            </Row>
          </fieldset>

          {paramId && (
            <Row className="m-0 mt-3">
              <Col>
                <Col
                  className="p-0 pt-3 pb-3 d-flex justify-content-between"
                  style={{ borderTop: '1px solid rgba(91, 148, 227, 0.2)' }}
                >
                  <DisabledHandler
                    hidden={!question.questionId}
                    disabled={question.state === State.DISABLED}
                    reason={question.disableReason}
                    onChange={handleDisableQuestion}
                    type={Entity.QUESTION}
                    id={question.questionId}
                    ref={disabledHandlerRef}
                  />
                  <SearchButton
                    disabled={
                      !formState.isValid || question.state === State.DISABLED
                    }
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
      {openSearchHint && (
        <ModalComponent
          show={openSearchHint}
          handleClose={() => setOpenSearchHint(false)}
          showCloseIcon={true}
          header={'Add hint to question'}
          footer={
            <SearchButton onClick={handleHintAdd} type="button">
              {'Add Hint'}
            </SearchButton>
          }
        >
          <SearchHints existingHints={hintFields} ref={searchHintsRef} />
        </ModalComponent>
      )}
      {!masterDisable && (
        <ModalComponent
          show={!!disabledAlert}
          handleClose={() => setDisabledAlert(false)}
          showCloseIcon={true}
          header={'Update question state'}
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
          {'Question is disabled. Do you want to edit it anyway?'}
        </ModalComponent>
      )}
      {loading && (
        <BeatLoader
          css={{ ...LoaderStyles, position: 'absolute' }}
          color={'#3694D7'}
          loading={loading}
        ></BeatLoader>
      )}
    </>
  );
};

export default AddOrEditQuestionContainer;
