import { Eye } from '@styled-icons/bootstrap/Eye';
import { Pencil } from '@styled-icons/boxicons-regular/Pencil';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import Resizable from 'components/ResizeabelePopup/Resizable';
import { AddOrEditQuestionContainer } from 'containers/AddOrEditQuestion/AddOrEditQuestionContainer';
import {
  DataArrayProps,
  HybridListView,
  IdText,
} from 'containers/Common/HybridListView';
import { useAddOrEditQuestion } from 'features/addOrEditQuestion/useAddOrEditQuestion';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import { useQuestions } from 'features/questions/useQuestions';
import { isEqual } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { GetResultForQuestionRequest, TrackQuestion } from 'types';
import { DefaultPaginationCount, Entity, View } from 'utils/constants';

export type TrackQuestionsProps = {
  setActiveView: Function;
  categoryId: string;
  subCategoryId?: string;
  capabilityId: string;
};

export const TrackQuestions = ({
  setActiveView,
  categoryId,
  subCategoryId,
  capabilityId,
}: TrackQuestionsProps) => {
  const [
    {
      fetchQuestions,
      setPaginationFilters,
      setQuestionFilter,
      questions,
      totalQuestions,
      loading,
      filterRequest,
    },
  ] = useQuestions();
  const { initializeAddOrEditQuestion } = useAddOrEditQuestion();
  const [prevRequest, setPrevRequest] = useState<
    GetResultForQuestionRequest | undefined
  >();
  const {
    findAndUpdateToBreadcrumbs,
    checkedQuestions,
    setCheckedQuestions,
    loading: trackLoading,
    getCapabilityQuestions,
    capabilityQuestions,
    insertQuestionsInTrack,
    setTrackTree,
    addQuestionsToCapability,
    updateBreadcrumbs,
    addCapabilityQuestionsSuccess,
    getQuestionsFromCapabilitySuccess,
    breadcrumbs,
  } = useAddOrEditTrack();
  const [bottomsUp, setBottomsUp] = useState<string>();
  const [data, setData] = useState<DataArrayProps[]>([]);
  const [addCapSuccess, setAddCapSuccess] = useState<boolean>();

  const onQuestionView = (questionId: string) => {
    setBottomsUp(questionId);
  };
  const onQuestionEdit = (questionId: string) => {
    const brcb = breadcrumbs.slice();
    brcb.push({ title: 'Edit Question' });
    updateBreadcrumbs(brcb);
    setActiveView(
      View.EDITQUESTION,
      categoryId,
      subCategoryId,
      capabilityId,
      questionId
    );
  };

  const addQuestionToTrack = (ques: IdText[]) => {
    setCheckedQuestions(ques);
    addQuestionsToCapability(
      capabilityId,
      ques.map((q) => q.id)
    );
    setAddCapSuccess(true);
  };

  const addNewQuestion = () => {
    const brcb = breadcrumbs.slice();
    brcb.push({ title: 'Add New Question' });
    updateBreadcrumbs(brcb);
    initializeAddOrEditQuestion();
    setActiveView(
      View.EDITQUESTION,
      categoryId,
      subCategoryId,
      capabilityId,
      '1'
    );
  };
  const onCancel = () => {
    setActiveView();
  };

  const prepareData = () => {
    const val = questions?.map((q) => {
      const result: DataArrayProps = {
        id: q?.questionId,
        text: q.title ?? '',
        actionItems: [
          { icon: Eye, onClick: () => onQuestionView(q.questionId) },
          { icon: Pencil, onClick: () => onQuestionEdit(q.questionId) },
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
      flags: { exact_match: false, case_sensitive: false },
    };
    setQuestionFilter(request);
  };

  const handleOnChange = (checkedItems: IdText[]) => {
    setCheckedQuestions(checkedItems);
  };

  const getPaginator = () => {
    return (
      <Paginator
        count={DefaultPaginationCount}
        total={totalQuestions}
        skipcount={filterRequest.skipCount}
        onAction={setPaginationFilters}
        loading={loading}
      />
    );
  };

  useEffect(() => {
    prepareData();
  }, [questions]);

  useEffect(() => {
    if (!isEqual(prevRequest, filterRequest)) {
      getCapabilityQuestions(capabilityId);
      fetchQuestions();
      setPrevRequest(filterRequest);
    }
  }, [filterRequest]);

  useEffect(() => {
    getCapabilityQuestions(capabilityId);
    onSearch();
  }, [capabilityId]);

  useEffect(() => {
    !checkedQuestions?.length &&
      capabilityQuestions &&
      setCheckedQuestions(
        capabilityQuestions?.map((c) => {
          return { id: c.questionId, text: c.title };
        })
      );
  }, [getQuestionsFromCapabilitySuccess]);

  useEffect(() => {
    if (addCapabilityQuestionsSuccess && addCapSuccess) {
      const newquestions = checkedQuestions.map((q) => {
        return {
          questionId: q.id,
          title: q.text,
          entity: Entity.QUESTION,
        } as TrackQuestion;
      });
      const tree = insertQuestionsInTrack(
        newquestions,
        categoryId,
        capabilityId,
        subCategoryId
      );
      setTrackTree(tree as any);
      setAddCapSuccess(false);
    }
  }, [addCapabilityQuestionsSuccess]);

  useEffect(() => {
    const breadcrumb = breadcrumbs.slice();
    const inx = breadcrumb.findIndex(
      (b) => b.title == 'Add New Question' || b.title == 'Edit Question'
    );
    if (inx != -1) {
      breadcrumb.splice(inx, 1);
    }
    findAndUpdateToBreadcrumbs(breadcrumb, 'Add Questions');
  }, []);

  return (
    <div className="h-100">
      <BeatLoader
        css={LoaderStyles}
        color={'#3694D7'}
        loading={loading || trackLoading}
      />
      <HybridListView
        breadcrumbs={breadcrumbs}
        title={'Add Question'}
        paginatorNode={totalQuestions ? getPaginator() : undefined}
        data={data}
        save={{
          buttonText: 'Update Track',
          onClick: (questions: IdText[]) => addQuestionToTrack(questions),
        }}
        create={{
          buttonText: '+ Add New Question',
          onClick: () => addNewQuestion(),
        }}
        onCancel={() => onCancel()}
        onSearch={(textToSearch: any) => onSearch(textToSearch.textToSearch)}
        checkedItems={checkedQuestions}
        onChange={handleOnChange}
      />
      {bottomsUp && (
        <Resizable isOpen={!!bottomsUp} onClose={() => setBottomsUp('')}>
          <Col className="mt-4">
            <AddOrEditQuestionContainer
              questionId={bottomsUp}
              masterDisable={true}
            />
          </Col>
        </Resizable>
      )}
    </div>
  );
};

export default TrackQuestions;
