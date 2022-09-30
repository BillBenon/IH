import 'react-quill/dist/quill.snow.css';

import { css } from '@emotion/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddButton } from 'components/AddButton';
import { AwsUploader } from 'components/AwsUploader';
import { DisableButton } from 'components/DisableButton';
import { Error } from 'components/Error';
import { Heading } from 'components/Heading';
import { ImagePicker, ImagePickerObject } from 'components/ImagePicker';
import { ModalComponent } from 'components/Modal';
import RichTextEditor from 'components/RichtTextEditor';
import RouteLeavingGuard from 'components/RouteGourd/ReactLeavingGourd';
import { SearchButton } from 'components/SearchButton';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledInput } from 'components/StyledInput';
import { StyledSelect } from 'components/StyledSelect';
import { useAppHistory } from 'context/appHistory';
import { useAddOrEditExpert } from 'features/addOrEditExpert/useAddOrEditExpert';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { GetExpertResponse } from 'types';
import { isNumeric, trimContent } from 'utils/commonutils';
import { emailRegEx, EventProps, MenuItems, RoleType, Routes, State, StorageClient } from 'utils/constants';
import { initialExpert } from 'utils/defaults';
import * as Yup from 'yup';
// import { BucketItem, Client } from 'minio';
import { StyledInputDate } from 'components/StyledInputDate';
import { StyledLinkText } from 'components/StyledLinkText';
import { evaluationPlatformExpertAdminService as expPlatSer } from 'services/evaluationPlatformAdmin';

const getExpertSchema = (expertId: string) => {
  return Yup.object().shape({
    fullname: Yup.string().required('Name is required'),
    email: Yup.string().required('email is required').matches(emailRegEx, 'Email should be in proper format'),
    roleType: Yup.string().required('role type is required'),
    ...(isNumeric(expertId) && {
      password: Yup.string().required('Password is required.'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
    }),
    ...(!isNumeric(expertId) && { expertId: Yup.string() }),
    expertCategory: Yup.string(),
    photoURL: Yup.string(),
    workingAt: Yup.string(),
    profile: Yup.string(),
    reviews: Yup.array().of(Yup.object().shape({
      date: Yup.string().required('Date is mandatory'),
      reviewBy: Yup.string().required('Review By is mandatory'),
      comment: Yup.string().required('Comment is mandatory'),
    })),
    calendlyURL: Yup.string(),
  });
}

const LoaderStyles = css`
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 1051;
`;

type AddOrEditExpertContainerProps = {
  masterDisable?: boolean;
  expertId?: string;
  onCancel?: Function;
  onSaveNew?: Function;
  onSave?: Function;
};

export const AddOrEditExpertContainer: FC<AddOrEditExpertContainerProps> = ({
  expertId,
  masterDisable,
  onCancel,
  onSaveNew,
  onSave,
}) => {
  const {
    saveExpertDetails,
    fetchExpertDetails,
    updateExpertState,
    params,
    expert,
    loading,
    saveSuccess,
  } = useAddOrEditExpert();
  const { deleteHistory } = useAppHistory()!;
  const [goBackOnSave, setGoBackOnSave] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSavedNew, setIsSavedNew] = useState<boolean>(false);
  const [disabledAlert, setDisabledAlert] = useState<boolean | undefined>();
  const [showDisableAlert, setShowDisableAlert] = useState<boolean>(true);
  const [images, setImages] = useState<ImagePickerObject[]>([]);
  const [paramId, setParamId] = useState<string>();
  const [_photourl, _setphotourl] = useState<string | undefined>();
  const history = useHistory();
  const methods = useForm<GetExpertResponse>({
    resolver: yupResolver(getExpertSchema(params.id)),
    defaultValues: expert,
    mode: 'onChange',
    shouldFocusError: true,
  });
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    trigger,
    errors,
    reset,
    control
  } = methods;
  const { TRACKLOGODIRECTORY } = StorageClient;
  const disabledHandlerRef = useRef(null);

  const goBack = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    history.push(Routes[MenuItems.experts]);
    if (paramId) deleteHistory(MenuItems.experts, paramId);
  };

  const saveAndGoback = () => {
    const data = getValues();
    if (!Object.keys(errors).length) {
      handleSaveExpertDetails(data as any);
      setGoBackOnSave(true);
    }
  };

  const handleSaveExpertDetails = (data: any) => {
    Object.keys(data).forEach((key: any) => {
      if (typeof data[key] == 'string') {
        data[key] = trimContent(data[key]);
      }
    });
    saveExpertDetails({ ...data, photoURL: _photourl }, expertId);
    setIsSavedNew(true);
  };

  const handlePopupEdit = () => {
    disabledHandlerRef && (disabledHandlerRef.current as any).edit();
    updateExpertState(State.INPROGRESS);
    setDisabledAlert(false);
  };

  const {
    fields: reviewFields,
    insert: insertReview,
    remove: removeReview
  } = useFieldArray({ control, name: 'reviews' });

  async function setExpertData() {
    if (
      expert.expertId &&
      paramId != expert.expertId &&
      isSavedNew
    ) {
      if (onSaveNew) {
        onSaveNew(expert.expertId);
        return;
      }
      history.push(
        Routes[MenuItems.experts] + `/${expert.expertId}`
      );
      return;
    }
    const keys = Object.keys(expert);
    keys.forEach((key: string) => {
      const val = (expert as any)[key]; //inx != undefined && inx != -1 && values[inx]?.data && values[inx]?.data[key] ? values[inx].data[key] :
      if (key != 'disabled') {
        setValue(key, val);
      }
    });
    trigger();
  }

  const handleImageUpload = (url: string) => {
    setValue('photoURL', url);
    trigger();
    _setphotourl(url);
  };

  useEffect(() => {
    if (expert) {
      setExpertData();
      if (expert.state === State.DISABLED && showDisableAlert && paramId == expert.expertId) {
        setDisabledAlert(true);
        setValue('disabled', true);
        setShowDisableAlert(false);
      }
    }
  }, [expert]);

  useEffect(() => {
    if (!expertId) {
      setParamId(params.id);
    }
  }, [params]);

  useEffect(() => {
    if (expertId) setParamId(expertId);
  }, [expertId]);

  useEffect(() => {
    if (paramId) {
      fetchExpertDetails(paramId);
      reset(initialExpert);
    }
  }, [paramId]);

  useEffect(() => {
    if (saveSuccess) {
      setIsDirty(false);
      onSave && onSave(EventProps.CAPABILITYUPDATED);
      if (goBackOnSave) {
        if (onCancel) {
          onCancel(expert.expertId);
          return;
        }
        goBack();
        setGoBackOnSave(false);
      }
    }
  }, [saveSuccess]);

  useEffect(() => {
    if (!images.length) {
      const img = images.slice();
      expPlatSer.getS3FolderFiles({
        path: TRACKLOGODIRECTORY, expertId: expert.expertId
      }).then((res) => {
        res.data.output.files.map((url: string, index: number) => {
          img.push({
            label: '' + img.length,
            id: url + index,
            background: url,
            onClick: () => handleImageUpload(url),
          });
        })
        setImages(img);
      }).catch(e => {
        console.log('failed loading images from aws', e);
      });
    }
  }, []);

  useEffect(() => {
    _setphotourl(expert.photoURL);
  }, [expert.photoURL]);

  const handleAddReview = () => {
    setValue('reviews', reviewFields as any);
    insertReview(reviewFields.length, [{ reviewBy: '', date: '', comment: '' }]);
  }

  return (
    <>
      <FormProvider {...methods}>
        <Form
          onChange={() => setIsDirty(true)}
          onSubmit={handleSubmit(handleSaveExpertDetails)}
        >
          <Col className="p-2 mt-2 mb-2">
            <Row className="align-items-center m-0">
              <Col xs={12} lg={8} md={8}>
                <Row className="align-items-center">
                  <div className="ml-3 mr-3">
                    <Heading>
                      {!isNumeric(paramId)
                        ? masterDisable
                          ? 'View Expert'
                          : 'Edit Expert'
                        : 'Add Expert'}
                    </Heading>
                  </div>
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
              disabled={expert.state === State.DISABLED || masterDisable}
            >
              <Row className="m-0 mt-3">
                {!isNumeric(paramId) && <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Expert Id'}</StyledFormLabel>
                    </Col>
                  </Row>
                  <StyledInput
                    disabled
                    type="text"
                    ref={register}
                    name="expertId"
                  // minRows={1}
                  ></StyledInput>
                </Col>}
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Full Name'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.fullname && (
                        <Error errorMessage={errors.fullname.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledInput
                    ref={register}
                    name="fullname"
                    // minRows={1}
                    placeholder={'Expert Full Name'}
                  ></StyledInput>
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Email'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.email && (
                        <Error errorMessage={errors.email.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledInput
                    type="text"
                    ref={register}
                    name="email"
                    // minRows={1}
                    placeholder={'Expert e-mail'}
                  ></StyledInput>
                </Col>
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Role Type'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.roleType && (
                        <Error errorMessage={errors.roleType.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledSelect
                    custom
                    placeholder={'Role Type'}
                    ref={register}
                    name='roleType'
                  >
                    <option value={undefined || ''}>Expert Role </option>
                    {RoleType.map((opt: any) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </StyledSelect>
                </Col>
              </Row>
              {isNumeric(paramId) && <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Password'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.password && (
                        <Error errorMessage={errors.password.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledInput
                    type="password"
                    ref={register}
                    name="password"
                    // minRows={1}
                    placeholder={'Expert Pasword'}
                  ></StyledInput>
                </Col>
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Confirm Password'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.passwordConfirmation && (
                        <Error errorMessage={errors.passwordConfirmation.message} />
                      )}
                    </Col>
                  </Row>
                  <StyledInput
                    type="password"
                    ref={register}
                    name="passwordConfirmation"
                    // minRows={1}
                    placeholder={'Expert Confirm Pasword'}
                  ></StyledInput>
                </Col>
              </Row>
              }
              <Row className="m-0 mt-3">
                <Col>
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Col className="p-0 mb-2 d-flex align-items-center">
                      <StyledFormLabel>{'Photo URL'}</StyledFormLabel>
                      {!!images.length && <ImagePicker items={images} />}
                    </Col>
                  </div>
                  <AwsUploader
                    onUpload={handleImageUpload}
                    url={_photourl}
                    directory={TRACKLOGODIRECTORY}
                  />

                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Working At'}</StyledFormLabel>
                    </Col>
                  </Row>
                  <StyledInput
                    ref={register}
                    name="workingAt"
                    // minRows={1}
                    placeholder={'Expert is working at'}
                  ></StyledInput>
                </Col>
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Calendly Url'}</StyledFormLabel>
                    </Col>
                  </Row>
                  <StyledInput
                    ref={register}
                    name="calendlyURL"
                    // minRows={1}
                    placeholder={'Expert Calendly URL'}
                  ></StyledInput>
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col>
                      <StyledFormLabel>{'Profile'}</StyledFormLabel>
                    </Col>
                    <Col className="text-left">
                      {errors && errors.profile && (
                        <Error errorMessage={errors.profile.message} />
                      )}
                    </Col>
                  </Row>
                  <RichTextEditor
                    id={'expert-profile'}
                    control={control}
                    name={`profile`}
                    onFocus={() => setIsDirty(true)}
                    disabled={
                      expert.state === State.DISABLED || !!masterDisable
                    }
                    placeholder={`Expert Profile`}
                  />
                </Col>
              </Row>
              <Row className="m-0 mt-3">
                <Col>
                  <Row className="align-items-baseline">
                    <Col><StyledFormLabel>{'Expert Reviews'}</StyledFormLabel></Col>
                  </Row>

                  {reviewFields?.map((rev, idx) => {
                    return (
                      <React.Fragment key={idx + rev.reviewBy}>
                        <Row className="m-0 mt-3">
                          <Col>
                            <Row className="align-items-baseline">
                              <Col>
                                <StyledFormLabel>{'Date'}</StyledFormLabel>
                              </Col>
                              <Col className="text-left">
                                {errors && errors.reviews && (
                                  <Error errorMessage={errors.reviews[idx]?.date?.message} />
                                )}
                              </Col>
                            </Row>
                            <StyledInputDate
                              defaultValue={rev.date}
                              ref={register()}
                              name={`reviews[${idx}].date`}
                            />
                          </Col>
                          <Col>
                            <Row className="align-items-baseline">
                              <Col>
                                <StyledFormLabel>{'Review by'}</StyledFormLabel>
                              </Col>
                              <Col className="text-left">
                                {errors && errors.reviews && (
                                  <Error errorMessage={errors.reviews[idx]?.reviewBy?.message} />
                                )}
                              </Col>
                            </Row>
                            <StyledInput
                              defaultValue={rev.reviewBy}
                              ref={register()}
                              name={`reviews[${idx}].reviewBy`}
                            ></StyledInput>
                          </Col>
                        </Row>
                        <Row className="m-0 mt-3">
                          <Col>
                            <Row className="align-items-baseline">
                              <Col>
                                <StyledFormLabel>{'Comment'}</StyledFormLabel>
                              </Col>
                              <Col className="text-left">
                                {errors && errors.reviews && (
                                  <Error errorMessage={errors.reviews[idx]?.comment?.message} />
                                )}
                              </Col>
                            </Row>
                            <RichTextEditor
                              id={`expert-comment-${idx}`}
                              control={control}
                              defaultValue={rev.comment}
                              name={`reviews[${idx}].comment`}
                              onFocus={() => setIsDirty(true)}
                              disabled={expert.state === State.DISABLED || !!masterDisable}
                              placeholder={`Comment`}
                            />
                          </Col>
                        </Row>
                        <div style={{ paddingRight: '16px' }} className="text-right">
                          <StyledLinkText
                            style={{
                              pointerEvents:
                                expert.state ===
                                  State.DISABLED ||
                                  masterDisable
                                  ? 'none'
                                  : 'all',
                            }}
                            size={12}
                            onClick={() => removeReview(idx)}
                          >
                            {'Remove Review'}
                          </StyledLinkText>
                        </div>
                      </React.Fragment>
                    )
                  })}

                  <Row className="align-items-baseline">
                    <Col className="text-right">
                      <AddButton style={{ marginTop: '1rem' }} onClick={handleAddReview}>Add Review</AddButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </fieldset>
          </Col>
        </Form>
      </FormProvider>
      {!masterDisable && !!disabledAlert && (
        <ModalComponent
          show={!!disabledAlert}
          handleClose={() => setDisabledAlert(false)}
          showCloseIcon={true}
          header={'Update Expert state'}
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
          {'Expert is disabled. Do you want to edit it anyway?'}
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
          isDirty && !goBackOnSave && !(expert.state === State.DISABLED || masterDisable) && !isNumeric(paramId)
        }
        navigate={(path) => history.push(path)}
        shouldBlockNavigation={() => isDirty && !goBackOnSave && !(expert.state === State.DISABLED || masterDisable) && !isNumeric(paramId)}
      />
    </>
  );
};

export default AddOrEditExpertContainer;