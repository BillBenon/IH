import { AddButton } from 'components/AddButton';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { DisableButton } from 'components/DisableButton';
import { AddEditCategoryForm } from 'containers/AddOrEditCapability/AddEditCategoryForm';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React, { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Entity, View } from 'utils/constants';

type AddOrEditCategoryFormProps = {
  setActiveView: Function;
  categoryId?: string;
};

export const AddOrEditCategoryForm = ({
  setActiveView,
  categoryId,
}: AddOrEditCategoryFormProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { breadcrumbs } = useAddOrEditTrack();

  const handleSaveTrackDetails = () => {
    (ref.current as any).onSave();
  };

  const saveAndGoback = () => {
    (ref.current as any).onSaveAndGoBack();
  };

  const saveCallback = (catId?: string, callbackOnSave?: boolean) => {
    if (!callbackOnSave) {
      setActiveView(View.EDITCATEGORY, catId ?? categoryId);
      return;
    }
    setActiveView(Entity.CATEGORY, categoryId);
  };

  return (
    <Col className="h-100">
      {!!breadcrumbs && <Breadcrumbs data={breadcrumbs} />}
      <Row>
        <Col className="d-flex mb-3 align-items-center">
          <p className="h4">
            {categoryId ? 'Edit Category' : 'Add New Category'}
          </p>
          <Col className="p-0">
            <Col className="p-0 pt-3 pb-3 d-flex justify-content-between">
              <Col className="p-0 text-right">
                <DisableButton
                  style={{ marginRight: '.5rem' }}
                  type="button"
                  onClick={() => saveCallback(categoryId, true)}
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
        entity={Entity.CATEGORY}
        entityId={categoryId}
        hideFooter={true}
        saveCallBack={saveCallback}
      />
    </Col>
  );
};

export default AddOrEditCategoryForm;
