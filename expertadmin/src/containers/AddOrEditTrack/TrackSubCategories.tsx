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
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { SubCategory, TrackSubCategoryTree } from 'types';
import { Entity, View } from 'utils/constants';

export type TrackSubCategoriesProps = {
  setActiveView: Function;
  categoryId: string;
  lastUpdated?: string;
};

export const TrackSubCategories = ({
  setActiveView,
  categoryId,
  lastUpdated,
}: TrackSubCategoriesProps) => {
  const {
    findAndUpdateToBreadcrumbs,
    subCategories,
    checkedSubCategories,
    addToBreadcrumbs,
    getSubCategoriesByCategoryId,
    setCheckedSubCategories,
    setTrackTree,
    trackTree,
    loading: trackLoading,
    breadcrumbs,
  } = useAddOrEditTrack();
  const [bottomsUp, setBottomsUp] = useState<string>();
  const [data, setData] = useState<DataArrayProps[]>([]);

  const onSubCategoryView = (subCategoryId: string) => {
    setBottomsUp(subCategoryId);
  };
  const onSubCategoryEdit = (subCategoryId: string) => {
    setActiveView(View.EDITSUBCATEGORY, categoryId, subCategoryId);
    addToBreadcrumbs(breadcrumbs.slice(), 'Edit Sub-Category');
  };

  const addSubCategoriesToCategory = (subcategories: string[]) => {
    const newsubCategories = subcategories.map((subcat) => {
      const caps =
        trackTree?.categories
          ?.find((cat) => cat.categoryId === categoryId)
          ?.subCategories?.find((c) => c?.subCategoryId === subcat)
          ?.capabilities ?? [];
      return {
        subCategoryId: subcat,
        subCategoryName: subCategories?.find(
          (sc) => sc?.subCategoryId == subcat
        )?.title,
        capabilities: caps,
      } as TrackSubCategoryTree;
    });
    const categories = trackTree?.categories?.slice() ?? [];
    const inx = categories?.findIndex((cat) => cat.categoryId === categoryId);
    const category = { ...categories[inx] };
    if (categories && inx != undefined && inx > -1) {
      category.subCategories = newsubCategories;
      categories.splice(inx, 1, category);
      const tree = { ...trackTree, categories: categories ?? [] };
      setTrackTree(tree as any);
    }
  };

  const addNewSubCategory = () => {
    setActiveView(View.EDITSUBCATEGORY, categoryId);
    addToBreadcrumbs(breadcrumbs.slice(), 'Add New Sub-Category');
  };
  const onCancel = () => {
    setActiveView();
  };

  const onSearch = (filter: any) => {
    const filteredData = subCategories?.filter((sub) =>
      filter.textToSearch
        ? sub?.title.toLowerCase().includes(filter.textToSearch?.toLowerCase())
        : true
    );
    prepareData(filteredData ?? []);
  };

  const handleOnChange = (checkedItems: IdText[]) => {
    setCheckedSubCategories(checkedItems);
  };

  const prepareData = (subCategories: SubCategory[]) => {
    const val = subCategories?.map((subcat) => {
      const result: DataArrayProps = {
        id: subcat?.subCategoryId,
        text: subcat.title,
        actionItems: [
          {
            icon: Eye,
            onClick: () => onSubCategoryView(subcat?.subCategoryId),
          },
          {
            icon: Pencil,
            onClick: () => onSubCategoryEdit(subcat?.subCategoryId),
          },
        ],
      };
      return result;
    });
    setData(val);
  };

  useEffect(() => {
    if (lastUpdated) {
      const updatedSubCatName = subCategories?.find(
        (sub) => sub?.subCategoryId == lastUpdated
      )?.title;
      const treeSubCats = trackTree?.categories
        ?.find((cat) => cat.categoryId == categoryId)
        ?.subCategories?.slice();
      const subcatInx = treeSubCats?.findIndex(
        (cat) => cat?.subCategoryId == lastUpdated
      );
      if (
        subcatInx != undefined &&
        subcatInx > -1 &&
        treeSubCats &&
        updatedSubCatName
      ) {
        treeSubCats.splice(subcatInx, 1, {
          ...treeSubCats[subcatInx],
          subCategoryName: updatedSubCatName,
        });
      }
      const categories = trackTree?.categories?.slice() ?? [];
      const inx = categories?.findIndex((cat) => cat.categoryId === categoryId);
      const category = { ...categories[inx] };
      if (categories && inx != undefined && inx > -1 && treeSubCats) {
        category.subCategories = treeSubCats;
        categories.splice(inx, 1, category);
        const tree = { ...trackTree, categories: categories ?? [] };
        if (!isEqual(tree, trackTree)) {
          setTrackTree(tree as any);
        }
      }
    }
  }, [lastUpdated]);

  useEffect(() => {
    !checkedSubCategories?.length &&
      setCheckedSubCategories(
        trackTree?.categories
          ?.find((c) => c.categoryId == categoryId)
          ?.subCategories?.map((c) => {
            return { id: c?.subCategoryId, text: c.subCategoryName };
          }) ?? []
      );
  }, [trackTree]);

  useEffect(() => {
    if (subCategories) {
      !checkedSubCategories?.length &&
        setCheckedSubCategories(
          trackTree?.categories
            ?.find((c) => c.categoryId == categoryId)
            ?.subCategories?.map((c) => {
              return { id: c?.subCategoryId, text: c.subCategoryName };
            }) ?? []
        );
      prepareData(subCategories ?? []);
    }
  }, [subCategories || categoryId]);

  useEffect(() => {
    if (categoryId) {
      getSubCategoriesByCategoryId(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    const breadcrumb = breadcrumbs.slice();
    const inx = breadcrumb.findIndex(
      (b) => b.title == 'Add New Sub-Category' || b.title == 'Edit Sub-Category'
    );
    if (inx != -1) {
      breadcrumb.splice(inx, 1);
    }
    findAndUpdateToBreadcrumbs(breadcrumb, 'Add Sub-Categories');
  }, []);

  return (
    <div className="h-100">
      <BeatLoader css={LoaderStyles} color={'#3694D7'} loading={trackLoading} />
      <HybridListView
        title={'Add Sub-Category'}
        data={data}
        save={{
          buttonText: 'Update Track',
          onClick: (subCategories: IdText[]) =>
            addSubCategoriesToCategory(subCategories?.map((s) => s.id) ?? []),
        }}
        create={{
          buttonText: '+ Add New Sub-Category',
          onClick: () => addNewSubCategory(),
        }}
        onCancel={() => onCancel()}
        onSearch={(textToSearch: string) => onSearch(textToSearch)}
        checkedItems={checkedSubCategories}
        breadcrumbs={breadcrumbs}
        onChange={handleOnChange}
      />
      {bottomsUp && (
        <Resizable isOpen={!!bottomsUp} onClose={() => setBottomsUp('')}>
          <Col className="mt-4">
            <p className="h4 mb-3">{'View Sub-Category'}</p>
            <AddEditCategoryForm
              entity={Entity.SUBCATEGORY}
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

export default TrackSubCategories;
