import { DisableButton } from 'components/DisableButton';
import { Error } from 'components/Error';
import { LoaderStyles } from 'components/LoaderStyles';
import RichTextEditor from 'components/RichtTextEditor';
import { SearchButton } from 'components/SearchButton';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledInput } from 'components/StyledInput';
import { StyledSelect } from 'components/StyledSelect';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { Evaluation } from 'types';

export type EvaluationFormProps = {
  handleCancel: Function;
  onSubmit: Function;
  evaluation: Evaluation;
  index: number;
  disabled?: boolean;
};

export const EvaluationForm = ({
  evaluation,
  handleCancel,
  onSubmit,
  index,
  disabled,
}: EvaluationFormProps) => {
  const { loading } = useAddOrEditCapability();

  const evalTextRef = useRef<HTMLInputElement>(null);
  const { register, getValues, trigger, errors, control } = useFormContext();

  const [defaultValue, setDefaultValue] = useState<Evaluation>(evaluation);

  const createOptionArray = (limit: number) => {
    return Array.from(Array(limit), (x, index) => {
      return { value: index + 1, label: index + 1 };
    });
  };

  const onSubmitClick = () => {
    const data = getValues();
    const { evalText, point, level, hint } = data.evaluations[index];
    if (evalText && point && level && hint)
      onSubmit({ evalText, point, level, hint });
  };

  const placeholder = {
    evalText: 'Add Title',
    level: 'Select',
    point: 'Select',
    hint: 'Enter Hint',
  };
  const options = { point: createOptionArray(10), level: createOptionArray(3) };

  useEffect(() => {
    setDefaultValue(evaluation);
    trigger();
    (evalTextRef?.current as any).focus();
  }, [evaluation]);

  return (
    <Col className="p-0">
      <Row className="mb-2">
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Title'}</StyledFormLabel>
            </Col>
            {errors?.evaluations && errors?.evaluations[index] && (
              <Col className="text-left">
                <Error
                  errorMessage={errors.evaluations[index].evalText?.message}
                />
              </Col>
            )}
          </div>
          <Col className="p-0 pb-2">
            <>
              <StyledInput
                type="text"
                defaultValue={defaultValue.evalText}
                placeholder={placeholder.evalText}
                ref={(e: HTMLInputElement) => {
                  register(e);
                  (evalTextRef.current as any) = e;
                }}
                name={`evaluations[${index}].evalText`}
              />
            </>
          </Col>
        </Col>
        <Col xs={3}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Level'}</StyledFormLabel>
            </Col>
            {errors?.evaluations && errors?.evaluations[index] && (
              <Col className="text-left">
                <Error
                  errorMessage={errors.evaluations[index].level?.message}
                />
              </Col>
            )}
          </div>
          <Col className="p-0 pb-2">
            <StyledSelect
              custom
              defaultValue={defaultValue.level}
              placeholder={placeholder.level}
              ref={register}
              name={`evaluations[${index}].level`}
            >
              {options.level.map((opt: any) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </StyledSelect>
          </Col>
        </Col>
        <Col xs={3}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Point'}</StyledFormLabel>
            </Col>
            {errors?.evaluations && errors?.evaluations[index] && (
              <Col className="text-left">
                <Error
                  errorMessage={errors.evaluations[index].point?.message}
                />
              </Col>
            )}
          </div>
          <Col className="p-0 pb-2">
            <StyledSelect
              custom
              defaultValue={defaultValue.point}
              placeholder={placeholder.point}
              ref={register}
              name={`evaluations[${index}].point`}
            >
              {options.point.map((opt: any) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </StyledSelect>
          </Col>
        </Col>
        <Col xs={12}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Hint'}</StyledFormLabel>
            </Col>
            {errors?.evaluations && errors?.evaluations[index] && (
              <Col className="text-left">
                <Error errorMessage={errors.evaluations[index].hint?.message} />
              </Col>
            )}
          </div>
          <Col className="p-0 pb-2">
            <RichTextEditor
              id={`evaluations[${index}].hint`}
              control={control}
              name={`evaluations[${index}].hint`}
              error={errors.evaluations && errors.evaluations[index]?.hint}
              defaultValue={defaultValue.hint}
              disabled={!!disabled}
              placeholder={placeholder.hint}
            />
          </Col>
        </Col>
      </Row>
      <Row className="text-right">
        <Col>
          {
            <DisableButton
              style={{ marginRight: '.5rem' }}
              type="button"
              onClick={() => handleCancel()}
            >
              {'Cancel'}
            </DisableButton>
          }
          <SearchButton onClick={onSubmitClick} type="button">
            {'Save'}
          </SearchButton>
        </Col>
      </Row>
      {loading && (
        <BeatLoader
          css={{
            ...LoaderStyles,
          }}
          color={'#3694D7'}
          loading={loading}
        />
      )}
    </Col>
  );
};
