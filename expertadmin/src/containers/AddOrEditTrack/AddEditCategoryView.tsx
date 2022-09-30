import { Breadcrumbs } from 'components/Breadcrumbs';
import { AddEditCategoryForm } from 'containers/AddOrEditCapability/AddEditCategoryForm';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React from 'react';
import { Col } from 'react-bootstrap';

type AddEditCategoryViewProps = {
  title: string;
  entity: string;
  entityId: string;
};
export const AddEditCategoryView = ({
  title,
  entity,
  entityId,
}: AddEditCategoryViewProps) => {
  const { breadcrumbs } = useAddOrEditTrack();
  return (
    <Col className="mt-2">
      <Breadcrumbs data={breadcrumbs}></Breadcrumbs>
      <p className="h4 mb-3">{title}</p>
      <AddEditCategoryForm
        entity={entity}
        entityId={entityId}
        hideFooter={true}
        disabled={true}
      />
    </Col>
  );
};

export default AddEditCategoryView;
