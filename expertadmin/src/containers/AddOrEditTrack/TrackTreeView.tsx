import { Pencil } from '@styled-icons/bootstrap';
import { MinusCircle, Plus, Refresh } from '@styled-icons/boxicons-regular';
import { SaveOutline } from '@styled-icons/evaicons-outline/SaveOutline';
import { BreadcrumbsContent } from 'components/Breadcrumbs';
import { LoaderStyles } from 'components/LoaderStyles';
import {
  ActionItemProps,
  makeTreeNode,
} from 'components/TreeView/MakeTreeNode';
import TreeViewComponent from 'components/TreeView/TreeViewComponent';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import { useAddOrEditQuestion } from 'features/addOrEditQuestion/useAddOrEditQuestion';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { useCapabilities } from 'features/capabilities/useCapabilities';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { CreateTreeRequest } from 'types';
import { isNumeric, reorderByRef } from 'utils/commonutils';
import { ColorCode, Entity, View } from 'utils/constants';
import { LockFill, UnlockFill } from "@styled-icons/bootstrap";

export type TrackTreeViewProps = {
  setActiveView: Function;
  activeView?: string;
  setFreeQuestion: Function;
};

export const TrackTreeView = ({
  setActiveView,
  activeView,
  setFreeQuestion,
}: TrackTreeViewProps) => {
  const legend = [
    { text: 'Category', color: ColorCode[Entity.CATEGORY] },
    { text: 'SubCategory', color: ColorCode[Entity.SUBCATEGORY] },
    { text: 'Capability', color: ColorCode[Entity.CAPABILITY] },
    { text: 'Question', color: ColorCode[Entity.QUESTION] },
  ];

  const {
    loading,
    params,
    isPendingSave,
    trackId,
    trackTree,
    expandedKeys,
    insertTreeSuccess,
    getTrackTreeLoading,
    updatingHierarchy,
    updatingHierarchySuccess,
    initializeValidation,
    initializeTrack,
    updateBreadcrumbs,
    getTrackTree,
    setTrackTree,
    updateHierarchy,
    handleExpandedKeys,
    appendTrackTree,
  } = useAddOrEditTrack();

  const {
    deleteQuestionToCapability,
    initializeAddOrEditCapability,
    removeQuestionToCapabilitySuccess,
  } = useAddOrEditCapability();
  const [{ initializeCapability }] = useCapabilities();
  const { initializeAddOrEditQuestion } = useAddOrEditQuestion();
  const [treeData, setTreeData] = useState<any>();
  const [selectedNode, setSelectedNode] = useState<string | undefined>(
    activeView
  );
  const [
    deleteQuestionCapabilityCallback,
    setDeleteQuestionCapabilityCallback,
  ] = useState<Function>();
  const [keys, setKeys] = useState<string[]>([]);

  const RefreshTrackTree = () => {
    return {
      icon: Refresh,
      height: '22px',
      isStatic: true,
      color: ColorCode.Default,
      onClick: () => updateHierarchy(),
      tooltip: 'Refresh Tree',
    } as ActionItemProps;
  };

  const SaveTrackTree = () => {
    return {
      icon: SaveOutline,
      isStatic: true,
      height: '22px',
      color: ColorCode.Default,
      onClick: () => trackTree && setTrackTree(trackTree),
      tooltip: 'Save Changes',
    } as ActionItemProps;
  };

  const MarkTrackFree = () => {
    return {
      icon: trackTree?.isLocked ? LockFill : UnlockFill,
      isStatic: true,
      height: '22px',
      color: ColorCode.Default,
      onClick: () => trackTree && setTrackTree({ ...trackTree, isLocked: !trackTree.isLocked }),
      tooltip: trackTree?.isLocked ? 'Mark Not Free' : 'Mark Free Track',
    } as ActionItemProps;
  }

  const rootActionItems = () => {
    const actionItems = [RefreshTrackTree(), MarkTrackFree()];
    if (isPendingSave) {
      actionItems.splice(0, 0, SaveTrackTree());
    }
    return actionItems;
  };

  const rootNode: any = (
    <div
      style={{
        cursor: 'pointer',
        pointerEvents: isNumeric(params.id) ? 'none' : 'all',
      }}
      className="position-relative"
    >
      {makeTreeNode({
        title: 'Track Overview',
        onClick: () => onRootClick(),
        isSelected: !selectedNode,
        actionItems: rootActionItems(),
      })}
    </div>
  );

  const handleBreadcrumbs = (
    categoryId?: string,
    categoryTitle?: string,
    capabilityId?: string,
    capabilityTitle?: string,
    subCategoryId?: string,
    subCategoryTitle?: string,
    extra?: BreadcrumbsContent
  ) => {
    const bcrb: BreadcrumbsContent[] = [];
    if (categoryId && categoryTitle) {
      bcrb.push({
        title: categoryTitle,
        action: () => {
          {
            initializeTrack();
            handleBreadcrumbs(
              categoryId,
              categoryTitle,
              undefined,
              undefined,
              undefined,
              undefined,
              { title: 'View Category' }
            );
          }
          setActiveView(View.VIEWCATEGORY, categoryId);
        },
      });
    }
    if (subCategoryId && subCategoryTitle) {
      bcrb.push({
        title: subCategoryTitle,
        action: () => {
          {
            initializeTrack();
            handleBreadcrumbs(
              categoryId,
              categoryTitle,
              undefined,
              undefined,
              undefined,
              undefined,
              { title: 'View Sub-Category' }
            );
          }
          setActiveView(View.VIEWSUBCATEGORY, undefined, subCategoryId);
        },
      });
    }
    if (capabilityId && capabilityTitle) {
      bcrb.push({
        title: capabilityTitle,
        action: () => {
          {
            initializeTrack();
            handleBreadcrumbs(
              categoryId,
              categoryTitle,
              undefined,
              undefined,
              subCategoryId,
              subCategoryTitle,
              { title: 'View Capability' }
            );
          }
          setActiveView(
            View.VIEWCAPABILITY,
            undefined,
            undefined,
            capabilityId
          );
        },
      });
    }
    !!extra && bcrb.push(extra);
    //bcrb.push({ title: 'Add Questions', action: () => setActiveView(View.QUESTION, categoryId, subCategoryId, capabilityId) });
    updateBreadcrumbs(bcrb);
  };

  const onAddCategory = (key: string) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    setSelectedNode(key);
    handleBreadcrumbs(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      { title: 'Add Categories' }
    );
    setActiveView(View.CATEGORY);
  };

  const onAddSubcategory = (
    key: string,
    categoryId: string,
    categoryTitle: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    initializeAddOrEditCapability();
    setSelectedNode(key);
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      undefined,
      undefined,
      {
        title: 'Add Sub-Categories',
        action: () => setActiveView(View.SUBCATEGORY, categoryId),
      }
    );
    setActiveView(View.SUBCATEGORY, categoryId);
  };
  const onAddCapability = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    initializeAddOrEditCapability();
    setSelectedNode(key);
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      subCategoryId,
      subCategoryTitle,
      {
        title: 'Add Capabilities',
        action: () => setActiveView(View.CAPABILITY, categoryId, subCategoryId),
      }
    );
    setActiveView(View.CAPABILITY, categoryId, subCategoryId);
  };

  const onAddQuestion = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    capabilityId: string,
    capabilityTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    setSelectedNode(key);
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      capabilityId,
      capabilityTitle,
      subCategoryId,
      subCategoryTitle,
      {
        title: 'Add Questions',
        action: () =>
          setActiveView(View.QUESTION, categoryId, subCategoryId, capabilityId),
      }
    );
    setActiveView(View.QUESTION, categoryId, subCategoryId, capabilityId);
  };

  const onEditTrack = (key: string) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    setSelectedNode(key);
    setActiveView(View.TRACK);
  };

  const onViewTrack = (key: string) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    setSelectedNode(key);
    setActiveView(View.TRACK);
  };

  const onViewCategory = (
    key: string,
    catId: string,
    categoryTitle: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    setSelectedNode(key);
    handleBreadcrumbs(
      catId,
      categoryTitle,
      undefined,
      undefined,
      undefined,
      undefined,
      { title: 'View Category' }
    );
    setActiveView(View.VIEWCATEGORY, catId);
  };

  const onViewSubCategory = (
    key: string,
    subcategoryId: string,
    categoryId: string,
    categoryTitle: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
      initializeAddOrEditCapability();
      initializeCapability();
    }
    setSelectedNode(key);
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      undefined,
      undefined,
      { title: 'View Sub-Category' }
    );
    setActiveView(View.VIEWSUBCATEGORY, undefined, subcategoryId);
  };

  const onViewCapability = (
    key: string,
    capId: string,
    categoryId: string,
    categoryTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      subCategoryId,
      subCategoryTitle,
      { title: 'View Capability' }
    );
    setSelectedNode(key);
    setActiveView(View.VIEWCAPABILITY, undefined, undefined, capId);
  };

  const onViewQuestion = (
    key: string,
    quesId: string,
    categoryId: string,
    categoryTitle: string,
    capabilityId: string,
    capabilityTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    setSelectedNode(key);
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      capabilityId,
      capabilityTitle,
      subCategoryId,
      subCategoryTitle,
      { title: 'View Questions' }
    );
    setActiveView(View.VIEWQUESTION, undefined, undefined, undefined, quesId);
  };

  const onEditCategory = (
    key: string,
    categoryId: string,
    categoryTitle: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      undefined,
      undefined,
      { title: 'Edit Category' }
    );
    setSelectedNode(key);
    setActiveView(View.EDITCATEGORY, categoryId);
  };
  const onEditSubcategory = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      subCategoryId,
      subCategoryTitle,
      { title: 'Edit Sub-Category' }
    );
    setSelectedNode(key);
    setActiveView(View.EDITSUBCATEGORY, categoryId, subCategoryId);
  };

  const onAddFreeQuestion = (
    categoryId: string,
    subCategoryId: string,
    capabilityId: string,
    questionId: string,
    isFree: boolean
  ) => {
    setFreeQuestion(categoryId, subCategoryId, capabilityId, questionId, !isFree);
  }

  const onEditCapability = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    capabilityId: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      undefined,
      undefined,
      subCategoryId,
      subCategoryTitle,
      { title: 'Edit Capability' }
    );
    setSelectedNode(key);
    setActiveView(View.EDITCAPABILITY, categoryId, subCategoryId, capabilityId);
  };

  const onEditQuestion = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    capabilityId: string,
    capabilityTitle: string,
    questionId: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    if (selectedNode != key) {
      initializeTrack();
    }
    if (!key.includes(questionId)) {
      initializeAddOrEditQuestion();
    }
    handleBreadcrumbs(
      categoryId,
      categoryTitle,
      capabilityId,
      capabilityTitle,
      subCategoryId,
      subCategoryTitle,
      { title: 'Edit Question' }
    );
    setSelectedNode(key);
    setActiveView(
      View.EDITQUESTION,
      categoryId,
      subCategoryId,
      capabilityId,
      questionId
    );
  };

  const onDeleteCategory = (categoryId: string) => {
    const tree: any = { ...trackTree };
    const categories = tree.categories?.slice();
    const inx = categories?.findIndex((c: any) => c.categoryId == categoryId);
    if (inx != undefined && inx != -1) {
      categories?.splice(inx, 1);
      if (!categories?.length) {
        setActiveView(View.TRACK);
      }
    }
    tree.categories = categories;
    setTrackTree(tree as any);
  };

  const onDeleteSubcategory = (categoryId: string, subCategoryId: string) => {
    const tree: any = { ...trackTree };
    const categories = tree.categories?.slice();
    const inx = categories?.findIndex((c: any) => c.categoryId == categoryId);
    if (inx != undefined && inx != -1 && categories) {
      const category = { ...categories[inx] };
      const subCategories = category.subCategories?.slice();
      const subinx = subCategories?.findIndex(
        (c: any) => c?.subCategoryId == subCategoryId
      );
      if (subinx != undefined && subinx != -1) {
        subCategories?.splice(subinx, 1);
        category.subCategories = subCategories;
        categories.splice(inx, 1, category);
        if (!subCategories.length) {
          setActiveView(View.CATEGORY, categoryId);
        }
      }
    }
    tree.categories = categories;
    setTrackTree(tree as any);
  };

  const onDeleteCapability = (
    categoryId: string,
    capabilityId: string,
    subCategoryId?: string
  ) => {
    const tree: any = { ...trackTree };
    const categories = tree.categories?.slice();
    const inx = categories?.findIndex((c: any) => c.categoryId == categoryId);
    if (inx != undefined && inx != -1 && categories) {
      const category = { ...categories[inx] };
      if (subCategoryId) {
        const subCategories = category.subCategories?.slice();
        const subinx = subCategories?.findIndex(
          (c: any) => c?.subCategoryId == subCategoryId
        );
        if (subinx != undefined && subinx != -1) {
          const subcategory = { ...subCategories[subinx] };
          const capabilities = subcategory.capabilities?.slice();
          const capinx = capabilities?.findIndex(
            (c: any) => c.capabilityId == capabilityId
          );
          if (capinx != undefined && capinx != -1) {
            capabilities.splice(capinx, 1);
            subcategory.capabilities = capabilities;
            subCategories.splice(subinx, 1, subcategory);
            category.subCategories = subCategories;
            categories.splice(inx, 1, category);
            if (!capabilities.length) {
              setActiveView(View.SUBCATEGORY, categoryId, subCategoryId);
            }
          }
        }
      } else {
        const capabilities = category.capabilities?.slice();
        const capinx = capabilities?.findIndex(
          (c: any) => c.capabilityId == capabilityId
        );
        if (capinx != undefined && capinx != -1) {
          capabilities?.splice(capinx, 1);
          category.capabilities = capabilities;
          categories.splice(inx, 1, category);
          if (!capabilities.length) {
            setActiveView(View.CATEGORY, categoryId);
          }
        }
      }
    }
    tree.categories = categories;
    setTrackTree(tree as any);
  };

  const onDeleteQuestionCallback = (
    categoryId: string,
    capabilityId: string,
    questionId: string,
    subCategoryId?: string
  ) => {
    const tree: any = { ...trackTree };
    const categories = tree.categories?.slice();
    const inx = categories?.findIndex((c: any) => c.categoryId == categoryId);
    if (inx != undefined && inx != -1 && categories) {
      const category = { ...categories[inx] };
      if (subCategoryId) {
        const subCategories = category.subCategories?.slice();
        const subinx = subCategories?.findIndex(
          (c: any) => c?.subCategoryId == subCategoryId
        );
        if (subinx != undefined && subinx != -1) {
          const subcategory = { ...subCategories[subinx] };
          const capabilities = subcategory.capabilities?.slice();
          const capinx = capabilities?.findIndex(
            (c: any) => c.capabilityId == capabilityId
          );
          if (capinx != undefined && capinx != -1) {
            const capability = { ...capabilities[capinx] };
            const questions = capability.questions?.slice();
            const quesinx = questions?.findIndex(
              (c: any) => c.questionId == questionId
            );
            if (quesinx != undefined && quesinx != -1) {
              questions.splice(quesinx, 1);
              capability.questions = questions;
              capabilities.splice(capinx, 1, capability);
              subcategory.capabilities = capabilities;
              subCategories.splice(subinx, 1, subcategory);
              category.subCategories = subCategories;
              categories.splice(inx, 1, category);
              if (!capabilities.length) {
                setActiveView(View.SUBCATEGORY, categoryId, subCategoryId);
              }
            }
          }
        }
      } else {
        const capabilities = category.capabilities?.slice();
        const capinx = capabilities?.findIndex(
          (c: any) => c.capabilityId == capabilityId
        );
        if (capinx != undefined && capinx != -1) {
          const capability = { ...capabilities[capinx] };
          const questions = capability.questions?.slice();
          const quesinx = questions?.findIndex(
            (c: any) => c.questionId == questionId
          );
          if (quesinx != undefined && quesinx != -1) {
            questions.splice(quesinx, 1);
            capability.questions = questions;
            capabilities.splice(capinx, 1, capability);
            category.capabilities = capabilities;
            categories.splice(inx, 1, category);
            if (!capabilities.length) {
              setActiveView(View.SUBCATEGORY, categoryId, subCategoryId);
            }
          }
        }
      }
    }
    tree.categories = categories;
    setTrackTree(tree as any);
  };

  const onDeleteQuestion = (
    categoryId: string,
    capabilityId: string,
    questionId: string,
    subCategoryId?: string
  ) => {
    deleteQuestionToCapability({ questionId, capabilityId });
    setDeleteQuestionCapabilityCallback(() =>
      onDeleteQuestionCallback(
        categoryId,
        capabilityId,
        questionId,
        subCategoryId
      )
    );
  };

  const AddCategoryMenu = (trackId: string) => {
    return {
      icon: Plus,
      color: ColorCode[Entity.CATEGORY],
      onClick: () => onAddCategory(trackId),
      tooltip: 'Add Category',
    } as ActionItemProps;
  };

  const AddSubcategoryMenu = (
    key: string,
    categoryId: string,
    categoryTitle: string
  ) => {
    return {
      icon: Plus,
      color: ColorCode[Entity.SUBCATEGORY],
      onClick: () => onAddSubcategory(key, categoryId, categoryTitle),
      tooltip: 'Add Sub-Category',
    } as ActionItemProps;
  };

  const AddCapabilityMenu = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    return {
      icon: Plus,
      color: ColorCode[Entity.CAPABILITY],
      onClick: () =>
        onAddCapability(
          key,
          categoryId,
          categoryTitle,
          subCategoryId,
          subCategoryTitle
        ),
      tooltip: 'Add Capability',
    } as ActionItemProps;
  };

  const AddQuestionMenu = (
    key: string,
    categoryId: string,
    categoryTitle: string,
    capabilityId: string,
    capabilityTitle: string,
    subCategoryId?: string,
    subCategoryTitle?: string
  ) => {
    return {
      icon: Plus,
      color: ColorCode[Entity.QUESTION],
      onClick: () =>
        onAddQuestion(
          key,
          categoryId,
          categoryTitle,
          capabilityId,
          capabilityTitle,
          subCategoryId,
          subCategoryTitle
        ),
      tooltip: 'Add Question',
    } as ActionItemProps;
  };

  const EditTrackMenu: ActionItemProps = {
    icon: Pencil,
    color: ColorCode[Entity.QUESTION],
    onClick: onEditTrack,
    tooltip: 'Edit Track',
  };

  const EditCategoryMenu = (
    key: string,
    categoryId: string,
    categoryTitle: string
  ) => {
    return {
      icon: Pencil,
      color: ColorCode[Entity.QUESTION],
      onClick: () => onEditCategory(key, categoryId, categoryTitle),
      tooltip: 'Edit Category',
    } as ActionItemProps;
  };

  const EditSubcategoryMenu = (
    key: string,
    categoryId: string,
    categoryName: string,
    subcategoryId?: string,
    subcategoryTitle?: string
  ) => {
    return {
      icon: Pencil,
      color: ColorCode[Entity.QUESTION],
      onClick: () =>
        onEditSubcategory(
          key,
          categoryId,
          categoryName,
          subcategoryId,
          subcategoryTitle
        ),
      tooltip: 'Edit Sub-Category',
    } as ActionItemProps;
  };

  const EditCapabilityMenu = (
    key: string,
    categoryId: string,
    categoryName: string,
    capabilityId: string,
    subcategoryId?: string,
    subcategoryName?: string
  ) => {
    return {
      icon: Pencil,
      color: ColorCode[Entity.QUESTION],
      tooltip: 'Edit Capability',
      onClick: () =>
        onEditCapability(
          key,
          categoryId,
          categoryName,
          capabilityId,
          subcategoryId,
          subcategoryName
        ),
    } as ActionItemProps;
  };

  const AddToFreeQuestion = (
    categoryId: string,
    subcategoryId: string,
    capabilityId: string,
    questionId: string,
    isFree: boolean
  ) => {
    return {
      icon: isFree ? UnlockFill : LockFill,
      color: ColorCode[Entity.QUESTION],
      tooltip: isFree ? 'Mark Not Free' : 'Mark Free Question',
      isStatic: isFree,
      onClick: () =>
        onAddFreeQuestion(
          categoryId,
          subcategoryId,
          capabilityId,
          questionId,
          isFree
        ),
    } as ActionItemProps;
  };

  const EditQuestionMenu = (
    key: string,
    categoryId: string,
    categoryName: string,
    capabilityId: string,
    capabilityName: string,
    questionId: string,
    subcategoryId?: string,
    subcategoryName?: string
  ) => {
    return {
      icon: Pencil,
      color: ColorCode[Entity.QUESTION],
      onClick: () =>
        onEditQuestion(
          key,
          categoryId,
          categoryName,
          capabilityId,
          capabilityName,
          questionId,
          subcategoryId,
          subcategoryName
        ),
      tooltip: 'Edit Question',
    } as ActionItemProps;
  };

  const DeleteCategoryMenu = (categoryId: string) => {
    return {
      icon: MinusCircle,
      color: ColorCode[Entity.QUESTION],
      onClick: () => onDeleteCategory(categoryId),
      tooltip: 'Remove Category',
    } as ActionItemProps;
  };

  const DeleteSubcategoryMenu = (categoryId: string, subCategoryId: string) => {
    return {
      icon: MinusCircle,
      color: ColorCode[Entity.QUESTION],
      onClick: () => onDeleteSubcategory(categoryId, subCategoryId),
      tooltip: 'Remove Sub-Category',
    } as ActionItemProps;
  };

  const DeleteCapabilityMenu = (
    categoryId: string,
    capabilityId: string,
    subcategoryId?: string
  ) => {
    return {
      icon: MinusCircle,
      color: ColorCode[Entity.QUESTION],
      onClick: () =>
        onDeleteCapability(categoryId, capabilityId, subcategoryId),
      tooltip: 'Remove Capability',
    } as ActionItemProps;
  };

  const DeleteQuestionMenu = (
    categoryId: string,
    capabilityId: string,
    questionId: string,
    subcategoryId?: string
  ) => {
    return {
      icon: MinusCircle,
      color: ColorCode[Entity.QUESTION],
      onClick: () =>
        onDeleteQuestion(categoryId, capabilityId, questionId, subcategoryId),
      tooltip: 'Remove Question',
    } as ActionItemProps;
  };

  const setDefaultTree = () => {
    const tree = [];
    tree.push({
      key: trackId,
      id: trackId,
      title: makeTreeNode({
        title: 'Track Title',
        isSelected: !selectedNode,
      }),
    });
    setTreeData(tree);
    appendTrackTree();
  };

  const onRootClick = () => {
    setSelectedNode(undefined);
    setActiveView();
  };

  const onDrop = (info: any) => {
    //return if drag and drop nodes are not on the same level
    const dragpos: string = info.dragNode.pos;
    const droppos: string = info.node.pos;
    const dragKeyArr: string = info.dragNode.key.split('-');
    const dropKeyArr: string = info.node.key.split('-');
    const dragPathArr: number[] = info.dragNode.pos.split('-');
    const dropPathArr: number[] = info.node.pos.split('-');
    const dragEntity = dragKeyArr[dragKeyArr.length - 1];
    const dropEntity = dropKeyArr[dropKeyArr.length - 1];
    if (
      dragpos.split('-').length != droppos.split('-').length ||
      dragEntity != dropEntity
    )
      return;
    dropPathArr.splice(0, 2);
    const keys = ['categories', 'capabilities', 'questions'];
    switch (dropEntity) {
      case Entity.CAPABILITY:
        if (dropPathArr.length == 3) {
          keys.splice(1, 0, 'subCategories');
        }
        break;
      case Entity.SUBCATEGORY:
        {
          // subtract capabilities index
          const capabilityCount =
            trackTree?.categories &&
            trackTree?.categories.length &&
            trackTree?.categories[dropPathArr[0]].capabilities.length;
          if (capabilityCount && capabilityCount > 0) {
            dropPathArr[dropPathArr.length - 1] =
              +dropPathArr[dropPathArr.length - 1] - capabilityCount;
            dragPathArr[dragPathArr.length - 1] =
              +dragPathArr[dragPathArr.length - 1] - capabilityCount;
          }
          keys.splice(1, 0, 'subCategories');
        }
        break;
      case Entity.QUESTION:
        if (dropPathArr.length == 4) {
          const capabilityCount =
            trackTree?.categories &&
            trackTree?.categories.length &&
            trackTree?.categories[dropPathArr[0]].capabilities.length;
          if (capabilityCount && capabilityCount > 0) {
            dropPathArr[1] = +dropPathArr[1] - capabilityCount;
            dragPathArr[1] = +dragPathArr[1] - capabilityCount;
          }
          keys.splice(1, 0, 'subCategories');
        }
        break;
    }
    if (trackTree) {
      const data = cloneDeep(trackTree);
      reorderTree(data, dropPathArr, dragPathArr[dragPathArr.length - 1], keys);
      appendTrackTree(data);
    }
  };

  const reorderTree = (
    data: any,
    dropPathArr: number[],
    dragInx: number,
    keys: string[]
  ) => {
    const key = keys.shift();
    if (key) {
      if (dropPathArr.length == 1) {
        reorderByRef(data[key], dragInx, dropPathArr[0]);
      } else {
        const dropinx = dropPathArr.shift();
        dropinx && reorderTree(data[key][dropinx], dropPathArr, dragInx, keys);
      }
    }
  };

  const setTree = (trackTree: CreateTreeRequest) => {
    const treekeys: string[] = [];
    const tree = [];
    const categoryTree = trackTree.categories?.map((cat) => {
      const capabilities = cat.capabilities?.map((cap) => {
        const capkey =
          cat.categoryId + '-' + cap.capabilityId + '-' + Entity.CAPABILITY;
        treekeys.push(capkey);
        return {
          id: cap.capabilityId,
          key: capkey,
          title: makeTreeNode({
            title: cap.capabilityText,
            isSelected: selectedNode == capkey,
            onClick: () =>
              onViewCapability(
                capkey,
                cap.capabilityId,
                cat.categoryId,
                cat.categoryName
              ),
            style: { color: ColorCode[Entity.CAPABILITY], fontSize: '12px' },
            actionItems: [
              AddQuestionMenu(
                capkey,
                cat.categoryId,
                cat.categoryName,
                cap.capabilityId,
                cap.capabilityText
              ),
              EditCapabilityMenu(
                capkey,
                cat.categoryId,
                cat.categoryName,
                cap.capabilityId
              ),
              DeleteCapabilityMenu(cat.categoryId, cap.capabilityId),
            ],
          }),
          children: cap.questions?.map((ques) => {
            const queKey =
              capkey + '-' + ques.questionId + '-' + Entity.QUESTION;
            treekeys.push(queKey);
            return {
              id: ques.questionId,
              key: queKey,
              title: makeTreeNode({
                onClick: () =>
                  onViewQuestion(
                    queKey,
                    ques.questionId,
                    cat.categoryId,
                    cat.categoryName,
                    cap.capabilityId,
                    cap.capabilityText
                  ),
                isSelected: selectedNode == queKey,
                title: ques.title,
                style: { color: ColorCode[Entity.QUESTION], fontSize: '12px' },
                actionItems: [
                  EditQuestionMenu(
                    queKey,
                    cat.categoryId,
                    cat.categoryName,
                    cap.capabilityId,
                    cap.capabilityText,
                    ques.questionId
                  ),
                  DeleteQuestionMenu(
                    cat.categoryId,
                    cap.capabilityId,
                    ques.questionId
                  ),
                ],
              }),
            };
          }),
        };
      });

      const categories = cat.subCategories?.map((subcat) => {
        const subcatkey =
          cat.categoryId +
          '-' +
          subcat?.subCategoryId +
          '-' +
          Entity.SUBCATEGORY;
        treekeys.push(subcatkey);
        return {
          key: subcatkey,
          id: subcat?.subCategoryId,
          title: makeTreeNode({
            title: subcat.subCategoryName,
            isSelected: selectedNode == subcatkey,
            onClick: () =>
              onViewSubCategory(
                subcatkey,
                subcat?.subCategoryId,
                cat.categoryId,
                cat.categoryName
              ),
            style: { color: ColorCode[Entity.SUBCATEGORY], fontSize: '14px' },
            actionItems: [
              AddCapabilityMenu(
                subcatkey,
                cat.categoryId,
                cat.categoryName,
                subcat?.subCategoryId,
                subcat.subCategoryName
              ),
              EditSubcategoryMenu(
                subcatkey,
                cat.categoryId,
                cat.categoryName,
                subcat?.subCategoryId,
                subcat?.subCategoryName
              ),
              DeleteSubcategoryMenu(cat.categoryId, subcat?.subCategoryId),
            ],
          }),
          children: subcat.capabilities?.map((cap) => {
            const capkey =
              subcatkey + '-' + cap.capabilityId + '-' + Entity.CAPABILITY;
            treekeys.push(capkey);
            return {
              id: cap.capabilityId,
              key: capkey,
              title: makeTreeNode({
                isSelected: selectedNode == capkey,
                onClick: () =>
                  onViewCapability(
                    capkey,
                    cap.capabilityId,
                    cat.categoryId,
                    cat.categoryName,
                    subcat?.subCategoryId,
                    subcat.subCategoryName
                  ),
                title: cap.capabilityText,
                style: {
                  color: ColorCode[Entity.CAPABILITY],
                  fontSize: '12px',
                },
                actionItems: [
                  AddQuestionMenu(
                    capkey,
                    cat.categoryId,
                    cat.categoryName,
                    cap.capabilityId,
                    cap.capabilityText,
                    subcat?.subCategoryId,
                    subcat?.subCategoryName
                  ),
                  EditCapabilityMenu(
                    capkey,
                    cat.categoryId,
                    cat.categoryName,
                    cap.capabilityId,
                    subcat?.subCategoryId,
                    subcat?.subCategoryName
                  ),
                  DeleteCapabilityMenu(
                    cat.categoryId,
                    cap.capabilityId,
                    subcat?.subCategoryId
                  ),
                ],
              }),
              children: cap.questions?.map((ques) => {
                const queKey =
                  capkey + '-' + ques.questionId + '-' + Entity.QUESTION;
                treekeys.push(queKey);
                return {
                  id: ques.questionId,
                  key: queKey,
                  title: makeTreeNode({
                    isSelected: selectedNode == queKey,
                    title: ques.title,
                    onClick: () =>
                      onViewQuestion(
                        queKey,
                        ques.questionId,
                        cat.categoryId,
                        cat.categoryName,
                        cap.capabilityId,
                        cap.capabilityText,
                        subcat?.subCategoryId,
                        subcat?.subCategoryName
                      ),
                    style: {
                      color: ColorCode[Entity.QUESTION],
                      fontSize: '12px',
                    },
                    actionItems: [
                      EditQuestionMenu(
                        queKey,
                        cat.categoryId,
                        cat.categoryName,
                        cap.capabilityId,
                        cap.capabilityText,
                        ques.questionId,
                        subcat?.subCategoryId,
                        subcat?.subCategoryName
                      ),
                      DeleteQuestionMenu(
                        cat.categoryId,
                        cap.capabilityId,
                        ques.questionId,
                        subcat?.subCategoryId
                      ),
                      AddToFreeQuestion(
                        cat.categoryId,
                        subcat.subCategoryId,
                        cap.capabilityId,
                        ques.questionId,
                        ques.isFree,
                      ),
                    ],
                  }),
                };
              }),
            };
          }),
        };
      });

      const children = capabilities.concat(categories as any);
      const catkey = cat.categoryId + '-' + Entity.CATEGORY;
      treekeys.push(catkey);
      return {
        key: catkey,
        id: cat.categoryId,
        title: makeTreeNode({
          title: cat.categoryName,
          isSelected: selectedNode == catkey,
          onClick: () =>
            onViewCategory(catkey, cat.categoryId, cat.categoryName),
          style: { color: ColorCode[Entity.CATEGORY], fontSize: '16px' },
          actionItems: [
            AddSubcategoryMenu(catkey, cat.categoryId, cat.categoryName),
            EditCategoryMenu(catkey, cat.categoryId, cat.categoryName),
            DeleteCategoryMenu(cat.categoryId),
          ],
        }),
        children,
      };
    });
    tree.push({
      key: trackTree.trackId,
      entity: Entity.TRACK,
      title: makeTreeNode({
        title: trackTree.trackName,
        isSelected: selectedNode == trackTree.trackId,
        onClick: () => onViewTrack(trackTree.trackId),
        actionItems: [AddCategoryMenu(trackTree.trackId), EditTrackMenu],
      }),
      children: categoryTree,
    });
    treekeys.push(trackTree.trackId);
    const difference = treekeys.filter((x) => keys.indexOf(x) === -1);
    let xpandedkeys = expandedKeys?.slice();
    xpandedkeys = xpandedkeys?.concat(difference);
    handleExpandedKeys(xpandedkeys);
    setKeys(treekeys);
    setTreeData(tree);
  };

  useEffect(() => {
    handleExpandedKeys([]);
  }, []);

  useEffect(() => {
    if (trackTree) {
      setTree(trackTree);
    }
  }, [trackTree]);

  useEffect(() => {
    if (trackTree) {
      setTree(trackTree);
    }
  }, [selectedNode]);

  useEffect(() => {
    setSelectedNode(activeView);
  }, [activeView]);

  useEffect(() => {
    if (isNumeric(params.id)) setDefaultTree();
  }, [params]);

  useEffect(() => {
    if (insertTreeSuccess && !isNumeric(params.id)) {
      getTrackTree();
    }
  }, [insertTreeSuccess]);

  useEffect(() => {
    if (removeQuestionToCapabilitySuccess) {
      deleteQuestionCapabilityCallback && deleteQuestionCapabilityCallback();
    }
  }, [removeQuestionToCapabilitySuccess]);

  useEffect(() => {
    if (updatingHierarchySuccess) {
      getTrackTree();
    }
  }, [updatingHierarchySuccess]);

  useEffect(() => {
    if (!isNumeric(params.id)) {
      initializeValidation();
    }
  }, [params.id]);

  return (
    <>
      <TreeViewComponent
        disabled={getTrackTreeLoading}
        draggable={true}
        expandedKeys={expandedKeys?.length ? expandedKeys : keys}
        handleExpandedKeys={handleExpandedKeys}
        rootNode={rootNode}
        legend={legend}
        selectedNode={selectedNode}
        onRootClick={() => onRootClick()}
        onDrop={onDrop}
        data={treeData}
      />
      {(updatingHierarchy || loading) && (
        <BeatLoader
          css={LoaderStyles}
          color={'#3694D7'}
          loading={updatingHierarchy || getTrackTreeLoading || loading}
        />
      )}
    </>
  );
};
