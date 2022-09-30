import { AwsUploader } from 'components/AwsUploader';
import { Error } from 'components/Error';
import { SearchButton } from 'components/SearchButton';
import { StyledFormArea } from 'components/StyledFormArea';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledInput } from 'components/StyledInput';
import { isEmpty } from 'lodash';
import React, { ElementType, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';
import { LabelValueType } from 'types';
import { StorageClient } from 'utils/constants';
import { DisableButton } from '../DisableButton';
import RichTextEditor, { processInput } from '../RichtTextEditor';
import { StyledRadio } from '../StyledRadio';
import { StyledSelect } from '../StyledSelect';
import "./Advanced.css";

export type FormProps = {
  [x: string]: any;
};

export type AdvancedFormControlProps = {
  [x: string]: ElementType | "file" | "multiselect" | "radio" | "number" | "date" | "datetime" | "password" | 'rte'
};

export type AdvancedFormLocalization = {
  [x: string]: string;
};

export type AdvanceFormOptions = {
  [x: string]: LabelValueType<string>[];
};

export type AdvanceFormFieldSize = {
  [x: string]: number;
};

export type AdvanceFormOnChangeHandlers = {
  [x: string]: Function;
};

export type AdvanceFormFieldChildren = {
  [x: string]: any;
};

export type AdvanceFormDisabledFields = {
  [x: string]: boolean;
};

export type AdvnaceFormHiddenFields = {
  [x: string]: boolean;
};

export type AdvancedFormProps = {
  onSubmit?: SubmitHandler<any>;
  defaultValue: FormProps;
  type: AdvancedFormControlProps;
  localization: AdvancedFormLocalization;
  placeholder: AdvancedFormLocalization;
  options?: AdvanceFormOptions;
  fieldsize?: AdvanceFormFieldSize;
  handleCancel?: Function;
  hideFooter?: boolean;
  children?: any;
  disabled?: boolean;
  rteOnFocus?: Function;
  onChangeHandlers?: AdvanceFormOnChangeHandlers;
  advanceFormFieldChildren?: AdvanceFormFieldChildren;
  hiddenFields?: AdvnaceFormHiddenFields;
  disabledFields?: AdvanceFormDisabledFields;
};

export const AdvancedForm = ({
  onSubmit,
  defaultValue,
  type,
  localization,
  placeholder,
  options,
  fieldsize,
  handleCancel,
  hideFooter,
  children,
  disabled,
  rteOnFocus,
  onChangeHandlers = {},
  advanceFormFieldChildren = {},
  hiddenFields = {},
  disabledFields = {},
}: AdvancedFormProps) => {
  const {
    register,
    setValue,
    getValues,
    trigger,
    errors,
    control,
  } = useFormContext();

  useEffect(() => {
    const keys = Object.keys(defaultValue);
    keys.forEach((key: string) => {
      setValue(key, defaultValue[key]);
    });
    trigger();
  }, [defaultValue]);

  const onSubmitClick = () => {
    const data = getValues();
    if (isEmpty(errors) && onSubmit) onSubmit(data);
  };

  const handleImageUpload = (url: string, key: string) => {
    setValue(key, url);
  };
  return (
    <>
      <Row className="mb-2">
        {Object.keys(type).map((key) => (
          <React.Fragment key={key}>
            {!hiddenFields[key] && <Col
              xs={fieldsize && fieldsize[key] ? fieldsize[key] : 12}
              className="mb-2"
            >
              <div className="d-flex justify-content-between align-items-center pb-1">
                <Col className="p-0">
                  <StyledFormLabel>{localization[key]}</StyledFormLabel>
                </Col>
                {errors && errors[key] && (
                  <Col className="text-left">
                    <Error errorMessage={errors[key]?.message} />
                  </Col>
                )}
                {advanceFormFieldChildren[key]}
              </div>
              <Col className="p-0 pb-2">
                {type[key] === 'rte' && (
                  <RichTextEditor
                    id={'advanced-form' + key}
                    control={control}
                    name={key}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    defaultValue={
                      defaultValue[key] ? processInput(defaultValue[key]) : ''
                    }
                    error={(errors as any)[key]}
                    disabled={disabled || disabledFields[key]}
                    placeholder={placeholder[key]}
                    onFocus={rteOnFocus}
                  />
                )}
                {type[key] === 'textarea' && (
                  <StyledFormArea
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    ref={register}
                    disabled={disabledFields[key]}
                    name={key}
                  />
                )}
                {type[key] === 'input' && (
                  <StyledInput
                    type="text"
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    ref={register}
                    disabled={disabledFields[key]}
                    name={key}
                  />
                )}
                {type[key] === 'password' && (
                  <StyledInput
                    type="password"
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    ref={register}
                    disabled={disabledFields[key]}
                    name={key}
                  />
                )}
                {type[key] === 'number' && (
                  <StyledInput
                    type="number"
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    ref={register}
                    disabled={disabledFields[key]}
                    name={key}
                  />
                )}
                {type[key] === 'radio' && (
                  options &&
                  options[key]?.length &&
                  options[key].map((opt: any) => (
                    <StyledRadio
                      type="radio"
                      key={opt.value}
                      label={opt.label}
                      name={key}
                      value={opt.value}
                      ref={register}
                      id={opt.value}
                      disabled={disabledFields[key]}
                      onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    />
                  ))
                )}
                {type[key] === 'select' && (
                  <StyledSelect
                    custom
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    ref={register}
                    disabled={disabledFields[key]}
                    name={key}
                  >
                    <option value={undefined || ''}>{placeholder[key]}</option>
                    {options &&
                      options[key]?.length &&
                      options[key].map((opt: any) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                  </StyledSelect>
                )}
                {type[key] === 'multiselect' && options && options[key] && (
                  <Controller
                    as={Select}
                    options={options[key]}
                    isMulti={true}
                    name={key}
                    onChange={(event: any) => { onChangeHandlers[key] && onChangeHandlers[key](event) }}
                    ref={register}
                    control={control}
                    defaultValue={defaultValue[key]}
                    isDisabled={disabledFields[key]}
                    placeholder={placeholder[key]}
                  />
                )}
                {type[key] === 'date' && (
                  <input
                    type="date"
                    className="date"
                    id={key}
                    name={key}
                    ref={register}
                    disabled={disabledFields[key]}
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                  />
                )}
                {type[key] === 'datetime' && (
                  <input
                    type="datetime-local"
                    className="date"
                    id={key}
                    name={key}
                    ref={register}
                    disabled={disabledFields[key]}
                    defaultValue={defaultValue[key]}
                    placeholder={placeholder[key]}
                  />
                )}
                {type[key] === 'file' && (
                  <Controller
                    control={control}
                    name={key}
                    error={(errors as any)[key]}
                    defaultValue={defaultValue[key]}
                    render={({ value }: any) => (
                      <AwsUploader
                        onUpload={(url: string) => handleImageUpload(url, key)}
                        url={value}
                        directory={StorageClient.OTHERIMAGES}
                      />
                    )}
                  />
                )}
              </Col>
            </Col>}
          </React.Fragment>
        ))}
        {children}
      </Row>
      {!hideFooter && (
        <Row className="text-right">
          <Col>
            {handleCancel && (
              <DisableButton
                style={{ marginRight: '.5rem' }}
                type="button"
                onClick={() => handleCancel()}
              >
                {'Cancel'}
              </DisableButton>
            )}
            <SearchButton onClick={onSubmitClick} type="button">
              {'Save'}
            </SearchButton>
          </Col>
        </Row>
      )}
    </>
  );
};
