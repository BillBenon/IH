import { yupResolver } from '@hookform/resolvers/yup';
import { AdvancedForm } from 'components/AdvancedComponents/AdvancedForm';
import { LoaderStyles } from 'components/LoaderStyles';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import React, {
  ElementType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { Form } from 'react-bootstrap';
import { FormProvider, useForm } from 'react-hook-form';
import { BeatLoader } from 'react-spinners';
import { TitleDescription } from 'types';
import { trimContent } from 'utils/commonutils';
import { Entity } from 'utils/constants';
import * as Yup from 'yup';

export type AddEditCategoryFormProps = {
  entity: string;
  entityId?: string;
  hideFooter?: boolean;
  saveCallBack?: Function;
  disabled?: boolean;
  relatedEntityId?: string;
};

const initialValue = { title: '', description: '' };

const yupSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
});

export const AddEditCategoryForm = forwardRef(
  (
    {
      entity,
      entityId,
      hideFooter,
      saveCallBack,
      disabled,
      relatedEntityId,
    }: AddEditCategoryFormProps,
    ref
  ) => {
    const {
      createCategory,
      updateCategory,
      createSubCategory,
      updateSubCategory,
      getCategory,
      getSubCategory,
      resetCategorySuccess,
      categoryDetail,
      subCategoryDetail,
      loading,
      categorysuccess,
      selectedCategory,
      selectedSubCategory,
    } = useAddOrEditCapability();

    const [defaultValue, setDefaultValue] = useState<TitleDescription>(
      initialValue
    );
    const [callbackOnSave, setCallbackOnSave] = useState<boolean>(false);

    const methods = useForm<TitleDescription>({
      resolver: yupResolver(yupSchema),
      defaultValues: defaultValue,
      mode: 'onChange',
      shouldFocusError: true,
    });

    useImperativeHandle(ref, () => ({
      onSave() {
        onSubmit();
        setCallbackOnSave(false);
      },
      onSaveAndGoBack() {
        onSubmit();
        setCallbackOnSave(true);
      },
    }));

    const type = {
      title: 'input' as ElementType,
      description: 'rte' as ElementType,
    };
    const localization = { title: 'Title', description: 'Description' };
    const placeholder = { title: 'Add a title', description: 'Description' };

    const onSubmit = (data?: any) => {
      if (hideFooter) {
        if (Object.keys(methods.errors).length) {
          return;
        }
        data = methods.getValues();
        Object.keys(data).forEach((key: any) => {
          if (typeof data[key] == 'string') {
            data[key] = trimContent(data[key]);
          }
        });
      }
      switch (entity) {
        case Entity.CATEGORY:
          if (!entityId) createCategory(data);
          else updateCategory({ ...data, categoryId: entityId });
          break;
        case Entity.SUBCATEGORY:
          if (!entityId)
            createSubCategory({ ...data, categoryId: relatedEntityId });
          else
            updateSubCategory({
              ...data,
              categoryId: relatedEntityId,
              subCategoryId: entityId,
            });
          break;
      }
    };

    useEffect(() => {
      if (entityId) {
        switch (entity) {
          case Entity.CATEGORY:
            getCategory(entityId);
            break;
          case Entity.SUBCATEGORY:
            getSubCategory(entityId);
            break;
        }
      }
    }, [entityId]);

    useEffect(() => {
      if (categorysuccess && saveCallBack) {
        resetCategorySuccess();
        saveCallBack(selectedSubCategory || selectedCategory, callbackOnSave);
      }
    }, [categorysuccess]);

    useEffect(() => {
      setDefaultValue(
        entityId && categoryDetail ? categoryDetail : initialValue
      );
    }, [categoryDetail]);

    useEffect(() => {
      setDefaultValue(
        entityId && subCategoryDetail ? subCategoryDetail : initialValue
      );
    }, [subCategoryDetail]);

    return (
      <>
        <FormProvider {...methods}>
          <Form>
            <fieldset disabled={disabled}>
              <AdvancedForm
                {...{
                  defaultValue,
                  type,
                  localization,
                  placeholder,
                  onSubmit,
                  hideFooter,
                  disabled,
                }}
              />
            </fieldset>
          </Form>
        </FormProvider>
        {loading && (
          <BeatLoader
            css={{
              ...LoaderStyles,
            }}
            color={'#3694D7'}
            loading={loading}
          />
        )}
      </>
    );
  }
);
