import { Eye } from '@styled-icons/bootstrap/Eye';
import { Pencil } from '@styled-icons/boxicons-regular/Pencil';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import Resizable from 'components/ResizeabelePopup/Resizable';
import { AddOrEditCapabilityContainer } from 'containers/AddOrEditCapability/AddOrEditCapabilityContainer';
import {
  DataArrayProps,
  HybridListView,
  IdText,
} from 'containers/Common/HybridListView';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { useCapabilities } from 'features/capabilities/useCapabilities';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import {
  GetCapabilitiesRequest,
  TrackCapabilityTree,
  TrackQuestion,
} from 'types';
import { DefaultPaginationCount, Entity, View } from 'utils/constants';

export type TrackCapabilitiesProps = {
  setActiveView: Function;
  categoryId: string;
  subCategoryId?: string;
};

export const TrackCapabilities = ({
  setActiveView,
  categoryId,
  subCategoryId,
}: TrackCapabilitiesProps) => {
  const [
    {
      fetchCapabilities,
      setPaginationFilters,
      setCapabilityFilter,
      capabilities,
      totalCapabilities,
      loading,
      filterRequest,
    },
  ] = useCapabilities();
  const [prevRequest, setPrevRequest] = useState<
    GetCapabilitiesRequest | undefined
  >();
  const {
    findAndUpdateToBreadcrumbs,
    setTrackTree,
    addToBreadcrumbs,
    checkedCapabilities,
    breadcrumbs,
    trackTree,
    loading: trackLoading,
    setCheckedCapabilities,
    getCapabilityQuestions,
    insertQuestionsInTrack,
    updateAttachQuestionToCapability,
    updateCapabilitiesToAttach,
    setIsCapabilityAdd,
    capabilitiesToAttach,
  } = useAddOrEditTrack();
  const { initializeAddOrEditCapability } = useAddOrEditCapability();
  const [bottomsUp, setBottomsUp] = useState<string>();
  const [data, setData] = useState<DataArrayProps[]>([]);
  const [tree, setTree] = useState<any>();

  const onCapabilityView = (capabilityId: string) => {
    setBottomsUp(capabilityId);
  };
  const onCapabilityEdit = (capabilityId: string) => {
    setIsCapabilityAdd(false);
    addToBreadcrumbs(breadcrumbs.slice(), 'Edit Capability');
    setActiveView(View.EDITCAPABILITY, categoryId, subCategoryId, capabilityId);
  };

  const addCapabilityToTrack = (caps: string[]) => {
    caps.forEach((cap) => getCapabilityQuestions(cap));
    updateAttachQuestionToCapability(true);
    const capObj = {} as any;
    const newcapabilities = caps.map((cap) => {
      capObj[cap] = undefined;
      return {
        capabilityId: cap,
        capabilityText:
          capabilities?.find((c) => c.capabilityId === cap)?.capabilityText ??
          '',
        questions: [],
        entity: Entity.CAPABILITY,
      } as TrackCapabilityTree;
    });
    updateCapabilitiesToAttach(capObj);
    const categories = trackTree?.categories?.slice() ?? [];
    const inx = categories?.findIndex((cat) => cat.categoryId === categoryId);
    if (categories && inx != undefined && inx > -1) {
      const category = { ...categories[inx] };
      if (!subCategoryId) {
        category.capabilities = newcapabilities;
        categories.splice(inx, 1, category);
        const localtree = { ...trackTree, categories: categories ?? [] };
        setTree(localtree);
      } else {
        const subCatInx = category.subCategories?.findIndex(
          (sub) => sub?.subCategoryId === subCategoryId
        );
        if (subCatInx != undefined && subCatInx > -1) {
          const subcats = category.subCategories.slice();
          const subcategory = { ...subcats[subCatInx] };
          subcategory.capabilities = newcapabilities;
          subcats.splice(subCatInx, 1, subcategory);
          category.subCategories = subcats;
        }
        categories.splice(inx, 1, category);
        const localtree = { ...trackTree, categories: categories ?? [] };
        setTree(localtree);
      }
    }
  };

  const addNewCapability = () => {
    setIsCapabilityAdd(true);
    addToBreadcrumbs(breadcrumbs.slice(), 'Add New Capability');
    initializeAddOrEditCapability();
    setActiveView(View.EDITCAPABILITY, categoryId, subCategoryId, '1');
  };

  const onCancel = () => {
    setActiveView();
  };

  const prepareData = () => {
    const val = capabilities?.map((cap) => {
      const result: DataArrayProps = {
        id: cap?.capabilityId,
        text: cap.capabilityText ?? '',
        actionItems: [
          { icon: Eye, onClick: () => onCapabilityView(cap.capabilityId) },
          { icon: Pencil, onClick: () => onCapabilityEdit(cap.capabilityId) },
        ],
      };
      return result;
    });
    setData(val);
  };

  const onSearch = (textToSearch?: string) => {
    const request = {
      textToSearch: textToSearch ?? '',
      searchInTitle: true,
      searchInDescription: false,
      updatedDateFrom: filterRequest.updatedDateFrom,
      updatedDateTo: filterRequest.updatedDateTo,
      expertId: filterRequest.expertId,
      skipCount: filterRequest.skipCount,
      categoryId: categoryId ?? '',
      subCategoryId: subCategoryId ?? '',
      subcategoryCheck: true,
    };
    setCapabilityFilter(request);
  };

  const getPaginator = () => {
    return (
      <Paginator
        count={DefaultPaginationCount}
        total={totalCapabilities}
        skipcount={filterRequest.skipCount}
        onAction={setPaginationFilters}
        loading={loading}
      />
    );
  };

  useEffect(() => {
    if (
      !isEqual(prevRequest, filterRequest) &&
      filterRequest.categoryId &&
      ((subCategoryId && filterRequest?.subCategoryId) || !subCategoryId)
    ) {
      fetchCapabilities();
      setPrevRequest(filterRequest);
    }
  }, [filterRequest]);

  useEffect(() => {
    if (subCategoryId) {
      updatedSubCategoryCheckedItems();
    } else {
      updateCategoryCheckedItems();
    }
  }, [trackTree]);

  const updatedSubCategoryCheckedItems = () => {
    !checkedCapabilities?.length &&
      setCheckedCapabilities(
        trackTree?.categories
          ?.find((c) => c.categoryId == categoryId)
          ?.subCategories?.find((sub) => sub?.subCategoryId == subCategoryId)
          ?.capabilities.map((cap) => {
            return { id: cap.capabilityId, text: cap.capabilityText };
          }) ?? []
      );
  };

  const updateCategoryCheckedItems = () => {
    !checkedCapabilities?.length &&
      setCheckedCapabilities(
        trackTree?.categories
          ?.find((c) => c.categoryId == categoryId)
          ?.capabilities.map((cap) => {
            return { id: cap.capabilityId, text: cap.capabilityText };
          }) ?? []
      );
  };

  const handleOnChange = (checkedItems: IdText[]) => {
    setCheckedCapabilities(checkedItems);
  };

  useEffect(() => {
    if (trackTree && subCategoryId && categoryId) {
      updatedSubCategoryCheckedItems();
      onSearch();
    }
    if (trackTree && categoryId && !subCategoryId) {
      updateCategoryCheckedItems();
      onSearch();
    }
  }, [subCategoryId]);

  useEffect(() => {
    if (categoryId && trackTree && !subCategoryId) {
      updateCategoryCheckedItems();
      onSearch();
    }
  }, [categoryId]);

  useEffect(() => {
    prepareData();
  }, [capabilities]);

  useEffect(() => {
    const breadcrumb = breadcrumbs.slice();
    const inx = breadcrumb.findIndex(
      (b) => b.title == 'Add New Capability' || b.title == 'Edit Capability'
    );
    if (inx != -1) {
      breadcrumb.splice(inx, 1);
    }
    findAndUpdateToBreadcrumbs(breadcrumb, 'Add Capabilities');
  }, []);

  useEffect(() => {
    if (capabilitiesToAttach) {
      const keys = Object.keys(capabilitiesToAttach);
      let localtree = tree as any;
      if (!keys?.some((cap) => !capabilitiesToAttach[cap])) {
        keys.forEach((key, index) => {
          const newquestions =
            capabilitiesToAttach[key]?.map((q: any) => {
              return {
                questionId: q.questionId,
                title: q.title,
                entity: Entity.QUESTION,
              } as TrackQuestion;
            }) ?? [];
          localtree = insertQuestionsInTrack(
            newquestions,
            categoryId,
            key,
            subCategoryId,
            localtree
          );
          if (keys.length - 1 === index) {
            setTrackTree(localtree as any);
            setTree(undefined);
          }
        });
        updateAttachQuestionToCapability(false);
      }
    }
  }, [capabilitiesToAttach]);

  return (
    <div className="h-100">
      <BeatLoader
        css={LoaderStyles}
        color={'#3694D7'}
        loading={loading || trackLoading}
      />
      <HybridListView
        breadcrumbs={breadcrumbs}
        title={'Add Capability'}
        paginatorNode={totalCapabilities ? getPaginator() : undefined}
        data={data}
        save={{
          buttonText: 'Update Track',
          onClick: (capabilities: IdText[]) =>
            addCapabilityToTrack(capabilities?.map((c) => c.id) ?? []),
        }}
        create={{
          buttonText: '+ Add New Capability',
          onClick: () => addNewCapability(),
        }}
        onCancel={() => onCancel()}
        onSearch={(textToSearch: any) => onSearch(textToSearch.textToSearch)}
        checkedItems={checkedCapabilities}
        onChange={handleOnChange}
      />
      {bottomsUp && (
        <Resizable isOpen={!!bottomsUp} onClose={() => setBottomsUp('')}>
          <Col className="mt-4">
            <AddOrEditCapabilityContainer
              capabilityId={bottomsUp}
              masterDisable={true}
            />
          </Col>
        </Resizable>
      )}
    </div>
  );
};

export default TrackCapabilities;
