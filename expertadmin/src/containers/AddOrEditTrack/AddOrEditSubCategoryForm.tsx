import { AddButton } from 'components/AddButton';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { DisableButton } from 'components/DisableButton';
import { AddEditCategoryForm } from 'containers/AddOrEditCapability/AddEditCategoryForm';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React, { useRef, useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { Entity, View } from 'utils/constants';

const StyledRow = styled(Row)`
  display: block;
  bottom: 0;
  position: absolute;
  width: calc(100% - 30px);
`;

type AddOrEditSubCategoryFormProps = {
  setActiveView: Function;
  subCategoryId?: string;
  categoryId?: string;
};

export const AddOrEditSubCategoryForm = ({
  setActiveView,
  subCategoryId,
  categoryId,
}: AddOrEditSubCategoryFormProps) => {
  const [catId, setCatId] = useState<string | undefined>(categoryId);

  const { breadcrumbs } = useAddOrEditTrack();

  const ref = useRef<HTMLDivElement>(null);

  const handleSaveTrackDetails = () => {
    (ref.current as any).onSave();
  };

  const saveAndGoback = () => {
    (ref.current as any).onSaveAndGoBack();
  };

  const saveCallBack = (subcatId?: string, callbackOnSave?: boolean) => {
    if (!callbackOnSave) {
      setActiveView(View.EDITSUBCATEGORY, catId, subcatId ?? subCategoryId);
      return;
    }
    setActiveView(Entity.SUBCATEGORY, catId, subCategoryId);
  };

  useEffect(() => {
    setCatId(categoryId);
  }, [categoryId]);

  return (
    <Col className="h-100">
      <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
      <Row>
        <Col className="d-flex mb-3 align-items-center">
          <p className="h4">
            {subCategoryId ? 'Edit Sub-Category' : 'Add New Sub-Category'}
          </p>
          <Col className="p-0">
            <Col className="p-0 pt-3 pb-3 d-flex justify-content-between">
              <Col className="p-0 text-right">
                <DisableButton
                  style={{ marginRight: '.5rem' }}
                  type="button"
                  onClick={() => saveCallBack(subCategoryId, true)}
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
        </Col>
      </Row>
      <AddEditCategoryForm
        ref={ref}
        entity={Entity.SUBCATEGORY}
        entityId={subCategoryId}
        hideFooter={true}
        saveCallBack={saveCallBack}
        relatedEntityId={catId}
      />
      <StyledRow className="m-0 mt-3"></StyledRow>
    </Col>
  );
};

export default AddOrEditSubCategoryForm;