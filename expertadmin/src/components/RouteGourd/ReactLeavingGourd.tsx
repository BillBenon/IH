import { DisableButton } from 'components/DisableButton';
import { ModalComponent } from 'components/Modal';
import { SearchButton } from 'components/SearchButton';
import { Location } from 'history';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Prompt } from 'react-router-dom';

interface Props {
  when?: boolean | undefined;
  navigate: (path: string) => void;
  shouldBlockNavigation: (location: Location) => boolean;
}
const RouteLeavingGuard = ({
  when,
  navigate,
  shouldBlockNavigation,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLocation] = useState<Location | null>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const handleBlockedNavigation = (nextLocation: Location): boolean => {
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      setModalVisible(true);
      setLastLocation(nextLocation);
      return false;
    }
    return true;
  };
  const handleConfirmNavigationClick = () => {
    setModalVisible(false);
    setConfirmedNavigation(true);
  };
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      // Navigate to the previous blocked location with your navigate function
      navigate(lastLocation.pathname + lastLocation.search);
    }
  }, [confirmedNavigation, lastLocation]);
  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      {/* Your own alert/dialog/modal component */}
      <ModalComponent
        header={'Leave without saving?'}
        showCloseIcon={true}
        body={
          'You have unsaved changes. Are you sure you want to leave this page without saving?'
        }
        handleClose={closeModal}
        show={modalVisible}
        isStatic={true}
        footer={
          <Row>
            <Col className="p-0">
              <DisableButton
                style={{ marginRight: '.5rem' }}
                type="button"
                onClick={closeModal}
              >
                {'Cancel'}
              </DisableButton>
            </Col>
            <Col className="p-0">
              <SearchButton
                onClick={handleConfirmNavigationClick}
                type="button"
              >
                {'Confirm'}
              </SearchButton>
            </Col>
          </Row>
        }
      ></ModalComponent>
    </>
  );
};
export default RouteLeavingGuard;
