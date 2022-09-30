import { CloseCircleOutline } from '@styled-icons/evaicons-outline/CloseCircleOutline';
import { Edit } from '@styled-icons/material/Edit';
import AdvancedSelect, {
  AdvancedSearchOptionProps,
  AdvancedSelectProps,
} from 'components/AdvancedSelect';
import { Error } from 'components/Error';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

type CategorySubCategoryProps = {
  handleCategorySelect: Function;
  handleSubCategorySelect: Function;
  handleCategoryAdd: Function;
  handleSubCategoryAdd: Function;
  handleEditCategory: Function;
  handleEditSubCategory: Function;
  isDisabled?: boolean;
  categoryId?: string;
  subCategoryId?: string;
};

export const CategorySubCategory = ({
  handleCategorySelect,
  handleSubCategorySelect,
  handleCategoryAdd,
  handleSubCategoryAdd,
  handleEditCategory,
  handleEditSubCategory,
  isDisabled,
  categoryId,
  subCategoryId,
}: CategorySubCategoryProps) => {
  const {
    getAllCategoriesAndSubCategories,
    deleteCategory,
    deleteSubCategory,
    setSelectedSubCategory,
    categorySubcategoryList,
    selectedSubCategory,
    selectedCategory,
    categorysubCategoryLoading,
  } = useAddOrEditCapability();
  const [subCategories, setSubCategories] = useState<AdvancedSelectProps>({
    options: [],
  });
  const [categories, setCategories] = useState<AdvancedSelectProps>({
    options: [],
  });
  const { errors, setError } = useFormContext();
  const [scID, setScID] = useState<string>();
  const [sID, setSID] = useState<string>();

  useEffect(() => {
    getAllCategoriesAndSubCategories();
  }, []);

  const onCategoryChange = (id: string) => {
    const subCategories = categorySubcategoryList.find(
      (cat) => cat.categoryId == id
    )?.subCategories;
    const sc = prepareAdvancedSelect(
      'subCategoryId',
      '+ Add Sub-Category',
      subCategories?.map((sub) => {
        return { ...sub, id: sub?.subCategoryId };
      }) || [],
      () => handleSubCategoryAdd()
    );
    setSubCategories({
      showClear: true,
      options: sc,
      onClearSelection: () => setSelectedSubCategory(''),
    });
    handleSubCategorySelect('');
  };

  useEffect(() => {
    if (categorySubcategoryList?.length) {
      let subcategories = [];
      if (!sID) {
        subcategories = categorySubcategoryList
          .map((cat) => cat.subCategories)
          .reduce((cat1, cat2) => cat1.concat(cat2));
      } else {
        subcategories =
          categorySubcategoryList.find((cat) => cat.categoryId == sID)
            ?.subCategories || [];
      }
      const sc = prepareAdvancedSelect(
        'subCategoryId',
        '+ Add Sub-Category',
        subcategories.map((sub) => {
          return { ...sub, id: sub.subCategoryId };
        }),
        () => handleSubCategoryAdd()
      );
      const cat = prepareAdvancedSelect(
        'categoryId',
        '+ Add Category',
        categorySubcategoryList.map((cat) => {
          return { ...cat, id: cat.categoryId };
        }),
        () => handleCategoryAdd()
      );
      setSubCategories({
        showClear: true,
        options: sc,
        onClearSelection: () => setSelectedSubCategory(''),
      });
      setCategories({ options: cat });
    }
  }, [categorySubcategoryList]);

  useEffect(() => {
    if (sID) handleCategorySelect(sID);
  }, [sID]);

  useEffect(() => {
    if (scID != selectedSubCategory) handleSubCategorySelect(scID);
  }, [scID]);

  useEffect(() => {
    if (selectedCategory) setSID(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setScID(selectedSubCategory);
  }, [selectedSubCategory]);

  useEffect(() => {
    if (categoryId) setSID(categoryId);
  }, [categoryId]);

  useEffect(() => {
    if (subCategoryId) setScID(subCategoryId);
  }, [subCategoryId]);

  const prepareAdvancedSelect = (
    field: string,
    addText: string,
    options: any[],
    addAction?: Function
  ) => {
    const addItem: AdvancedSearchOptionProps = {
      id: '',
      leftItem: { text: addText, color: '#5B94E3', onClick: addAction },
    };
    const remainingOptions: AdvancedSearchOptionProps[] = options.map(
      (option) => {
        const data: AdvancedSearchOptionProps = {
          id: option.id,
          leftItem: {
            text: option.title,
            onClick: () => {
              switch (field) {
                case 'categoryId':
                  handleCategorySelect(option.id);
                  setError('categoryId', {});
                  onCategoryChange(option.id);
                  break;
                case 'subCategoryId':
                  handleSubCategorySelect(option.id);
                  break;
              }
            },
          },
          rightItems: [
            {
              id: 'edit',
              item: {
                icon: Edit,
                onClick: () => {
                  switch (field) {
                    case 'categoryId':
                      handleEditCategory(option.id);
                      break;
                    case 'subCategoryId':
                      handleEditSubCategory(option.id);
                      break;
                  }
                },
              },
            },
            {
              id: 'delete',
              item: {
                icon: CloseCircleOutline,
                color: '#E25252',
                onClick: () => {
                  switch (field) {
                    case 'categoryId':
                      deleteCategory(option.id);
                      break;
                    case 'subCategoryId':
                      deleteSubCategory(option.id);
                      break;
                  }
                },
              },
            },
          ],
        };
        return data;
      }
    );
    return [addItem, ...remainingOptions];
  };

  return (
    <>
      <Col className="pr-0" xs={12} md={6}>
        <div className="d-flex justify-content-between align-items-baseline">
          <Col className="p-0">
            <StyledFormLabel>{'Select Category'}</StyledFormLabel>
          </Col>
          {errors && errors?.categoryId && (
            <Col className="text-left">
              <Error errorMessage={errors.categoryId.message} />
            </Col>
          )}
        </div>
        <Col className="p-0">
          <AdvancedSelect
            {...categories}
            selectedId={sID}
            isDisabled={isDisabled || !!categoryId}
            loading={categorysubCategoryLoading}
          />
        </Col>
      </Col>
      <Col className="pr-0" xs={12} md={6}>
        <Col className="p-0">
          <StyledFormLabel>{'Select Sub-Category'}</StyledFormLabel>
          <AdvancedSelect
            {...subCategories}
            selectedId={scID}
            isDisabled={isDisabled || !!categoryId}
            loading={categorysubCategoryLoading}
          />
        </Col>
      </Col>
    </>
  );
};
