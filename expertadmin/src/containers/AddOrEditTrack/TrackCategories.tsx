import { Eye } from '@styled-icons/bootstrap/Eye';
import { Pencil } from '@styled-icons/boxicons-regular/Pencil';
import { LoaderStyles } from 'components/LoaderStyles';
import Resizable from 'components/ResizeabelePopup/Resizable';
import { AddEditCategoryForm } from 'containers/AddOrEditCapability/AddEditCategoryForm';
import {
  DataArrayProps,
  HybridListView,
  IdText,
} from 'containers/Common/HybridListView';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import {
  GetAllCategoriesAndSubCategoriesResponse,
  TrackCategoryTree,
} from 'types';
import { Entity, View } from 'utils/constants';

export type TrackCategoriesProps = {
  setActiveView: Function;
  lastUpdated?: string;
};

export const TrackCategories = ({
  setActiveView,
  lastUpdated,
}: TrackCategoriesProps) => {
  const {
    categorySubcategoryList,
    getAllCategoriesAndSubCategories,
    categorysubCategoryLoading,
  } = useAddOrEditCapability();
  const {
    findAndUpdateToBreadcrumbs,
    checkedCategories,
    setCheckedCategories,
    setTrackTree,
    trackTree,
    loading: trackLoading,
    breadcrumbs,
    addToBreadcrumbs,
  } = useAddOrEditTrack();
  const [bottomsUp, setBottomsUp] = useState<string>();
  const [data, setData] = useState<DataArrayProps[]>([]);

  const onCategoryView = (categoryId: string) => {
    setBottomsUp(categoryId);
  };
  const onCategoryEdit = (categoryId: string) => {
    setActiveView(View.EDITCATEGORY, categoryId);
    addToBreadcrumbs(breadcrumbs.slice(), 'Edit Category');
  };

  const addCategoriesToTrack = (categories: string[]) => {
    const newcategories = categories.map((cat) => {
      const caps =
        trackTree?.categories?.find((c) => c.categoryId === cat)
          ?.capabilities ?? [];
      const subcats =
        trackTree?.categories?.find((c) => c.categoryId === cat)
          ?.subCategories ?? [];
      return {
        categoryId: cat,
        categoryName: categorySubcategoryList.find((c) => c.categoryId === cat)
          ?.title,
        capabilities: caps,
        subCategories: subcats,
      } as TrackCategoryTree;
    });

    const tree = { ...trackTree, categories: newcategories };
    setTrackTree(tree as any);
  };

  const addNewCategory = () => {
    setActiveView(View.EDITCATEGORY);
    addToBreadcrumbs(breadcrumbs.slice(), 'Add New Category');
  };
  const onCancel = () => {
    setActiveView();
  };
  const onSearch = (filter: any) => {
    const filteredData = categorySubcategoryList?.filter((cat) =>
      filter.textToSearch
        ? cat?.title.toLowerCase().includes(filter.textToSearch?.toLowerCase())
        : true
    );
    prepareData(filteredData);
  };

  const handleOnChange = (checkedItems: IdText[]) => {
    setCheckedCategories(checkedItems);
  };

  const prepareData = (
    categories: GetAllCategoriesAndSubCategoriesResponse[]
  ) => {
    const val = categories?.map((cat) => {
      const result: DataArrayProps = {
        id: cat.categoryId,
        text: cat.title,
        actionItems: [
          { icon: Eye, onClick: () => onCategoryView(cat.categoryId) },
          { icon: Pencil, onClick: () => onCategoryEdit(cat.categoryId) },
        ],
      };
      return result;
    });
    setData(val);
  };

  useEffect(() => {
    if (lastUpdated) {
      const updatedCatName = categorySubcategoryList?.find(
        (cat) => cat.categoryId == lastUpdated
      )?.title;
      const treecats = trackTree?.categories?.slice();
      const catinx = treecats?.findIndex(
        (cat) => cat.categoryId == lastUpdated
      );
      if (catinx != undefined && catinx > -1 && treecats && updatedCatName) {
        treecats.splice(catinx, 1, {
          ...treecats[catinx],
          categoryName: updatedCatName,
        });
      }
      const tree = { ...trackTree, categories: treecats } as any;
      if (!isEqual(tree, trackTree)) {
        setTrackTree(tree);
      }
    }
  }, [lastUpdated && categorySubcategoryList]);

  useEffect(() => {
    !checkedCategories?.length &&
      setCheckedCategories(
        trackTree?.categories?.map((c) => {
          return { id: c.categoryId, text: c.categoryName };
        }) ?? []
      );
  }, [trackTree]);

  useEffect(() => {
    getAllCategoriesAndSubCategories();
  }, []);

  useEffect(() => {
    prepareData(categorySubcategoryList);
  }, [categorySubcategoryList]);

  useEffect(() => {
    const breadcrumb = breadcrumbs.slice();
    const inx = breadcrumb.findIndex(
      (b) => b.title == 'Add New Category' || b.title == 'Edit Category'
    );
    if (inx != -1) {
      breadcrumb.splice(inx, 1);
    }
    findAndUpdateToBreadcrumbs(breadcrumb, 'Add Categories');
  }, []);

  return (
    <div className="h-100">
      <BeatLoader
        css={LoaderStyles}
        color={'#3694D7'}
        loading={categorysubCategoryLoading || trackLoading}
      />
      <HybridListView
        breadcrumbs={breadcrumbs}
        title={'Add Category'}
        data={data}
        save={{
          buttonText: 'Update Track',
          onClick: (categories: IdText[]) =>
            addCategoriesToTrack(categories?.map((c) => c.id) ?? []),
        }}
        create={{
          buttonText: '+ Add New Category',
          onClick: () => addNewCategory(),
        }}
        onCancel={() => onCancel()}
        onSearch={(textToSearch: string) => onSearch(textToSearch)}
        checkedItems={checkedCategories}
        onChange={handleOnChange}
      />
      {bottomsUp && (
        <Resizable isOpen={!!bottomsUp} onClose={() => setBottomsUp('')}>
          <Col className="mt-4">
            <p className="h4 mb-3">{'View Category'}</p>
            <AddEditCategoryForm
              entity={Entity.CATEGORY}
              entityId={bottomsUp}
              hideFooter={true}
              disabled={true}
            />
          </Col>
        </Resizable>
      )}
    </div>
  );
};

export default TrackCategories;
