import { ColShrink } from 'components/ColShrink';
import { DisableButton } from 'components/DisableButton';
import { StyledInput } from 'components/StyledInput';
import { StyledRadio } from 'components/StyledRadio';
import { useHome } from 'features/home/useHome';
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { Col, Row } from 'react-bootstrap';

type DisableHandlerProps = {
  hidden?: boolean;
  disabled: boolean;
  reason?: string
  onChange: Function;
  type: string;
  id: string;
};

export const DisabledHandler = forwardRef(({
  disabled,
  reason,
  onChange,
  type,
  id,
  hidden,
}: DisableHandlerProps, ref) => {
  const { updateEntityState } = useHome();
  const reasonRef = useRef<HTMLDivElement>(null);
  const [disableReason, showDisableReason] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean | undefined>();

  const handleDisableChange = () => {
    setIsDisabled(!isDisabled);
  };

  useImperativeHandle(ref, () => ({
    edit() {
      setIsDisabled(false);
      showDisableReason("");
      save(false, "");
    },
  }));


  const save = (disableState?: boolean, disableReasonState?: string) => {
    updateEntityState([{ type, id, isDisabled: disableState ?? !!isDisabled, disableReason: disableReasonState ?? disableReason }]);
    onChange(isDisabled);
  };

  useEffect(() => {
    if (isDisabled) (reasonRef?.current as any)?.focus();
    if (!isDisabled) {
      showDisableReason("")
    }
  }, [isDisabled]);

  useEffect(() => {
    setIsDisabled(disabled);
    reason && showDisableReason(reason);
  }, [disabled]);

  return !hidden ? (
    <Col className="d-flex align-items-center p-0">
      <ColShrink>
        <StyledRadio className="mr-4"
          checked={isDisabled}
          type="checkbox"
          label={'Disable'}
          name="disabled"
          onChange={() => {
            handleDisableChange();
          }}
        />
      </ColShrink>
      <Row>
        <StyledInput
          ref={reasonRef}
          style={{ width: '190px' }}
          name="disableReason"
          disabled={!isDisabled || disabled}
          placeholder="Disable reason"
          value={disableReason}
          onChange={(e: any) => {
            showDisableReason(e.target.value);
          }}
        />
        <div className="ml-2" style={{ visibility: disabled == isDisabled ? 'hidden' : 'visible' }}>
          <DisableButton
            style={{ height: '40px', marginRight: '.5rem' }}
            type="button"
            onClick={() => save()}
          >
            {isDisabled ? 'Disable' : 'Enable'}
          </DisableButton>
        </div>
      </Row>
    </Col>
  ) : (
    <div></div>
  );
});
