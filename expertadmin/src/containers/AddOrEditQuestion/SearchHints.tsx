import { Search } from '@styled-icons/boxicons-regular';
import { Error } from 'components/Error';
import { FilterInput } from 'components/FilterInput';
import { IconContainer } from 'components/IconContainer';
import { LastModifiedDetail } from 'components/LastModifiedDetail';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import { SearchButton } from 'components/SearchButton';
import { useAddOrEditQuestion } from 'features/addOrEditQuestion/useAddOrEditQuestion';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { GetAllHintResponse } from 'types';
import { DefaultPaginationCount } from 'utils/constants';

import { QuestionCardsView } from '../Question/QuestionCardsView';

const HintsWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 0.5rem;
`;

interface SearchHintProps {
  existingHints: any[]; // must have id
}

export const SearchHints = forwardRef(
  ({ existingHints }: SearchHintProps, ref) => {
    const {
      hints,
      totalHints,
      loading,
      hintRequest,
      handleHintSearchSkipCount,
      handleHintSearchText,
      getAllHints,
    } = useAddOrEditQuestion();
    const [highlightedHints, setHighlightedHint] = useState<
      GetAllHintResponse[]
    >([]);
    const [activeHint, setActiveHint] = useState<string>('');

    const handleSkipCount = (skipcount: number) => {
      handleHintSearchSkipCount(skipcount);
      handleHintSearchText(hintRequest.hintSearch);
      getAllHints(hintRequest.hintSearch, skipcount);
    };

    const handleHighlightedHint = (hint: GetAllHintResponse) => {
      setActiveHint(hint.id);
      const existinginx = existingHints.findIndex((hh) => hh.id === hint.id);
      if (existinginx != -1) return;
      const inx = highlightedHints.findIndex((hh) => hh.id === hint.id);
      if (inx === -1) highlightedHints.push(hint);
      else highlightedHints.splice(inx, 1);
      setHighlightedHint([...highlightedHints]);
    };

    useImperativeHandle(ref, () => ({
      getHints() {
        return highlightedHints;
      },
    }));

    return (
      <HintsWrapper>
        <Col className="p-0">
          {'Search for an existing hint'}
          <Row className="align-items-center justify-content-between">
            <Col lg={10} md={10} sm={10} className="pr-0">
              <FilterInput
                onKeyDown={(event: any) =>
                  event.keyCode === 13 && getAllHints(hintRequest.hintSearch)
                }
                className="mt-2 mb-2"
                value={hintRequest.hintSearch}
                onChange={(e: any) => handleHintSearchText(e.target.value)}
                placeholder={'Search...'}
              />
            </Col>
            <Col lg={2} md={2} sm={2} className="pl-0 text-right">
              <SearchButton
                type="button"
                style={{ width: '4em' }}
                onClick={() => getAllHints(hintRequest.hintSearch)}
              >
                <IconContainer color={'##FFF'} icon={Search} />
              </SearchButton>
            </Col>
          </Row>
        </Col>
        <Col className="p-0 mt-2">
          <Row>
            <Col>{'Search Results'}</Col>
            <Col>
              <Paginator
                count={DefaultPaginationCount}
                total={totalHints}
                skipcount={hintRequest.skipCount}
                onAction={handleSkipCount}
                loading={loading}
              />
            </Col>
          </Row>
          {hints.map((hint: GetAllHintResponse) => (
            <>
              {existingHints.findIndex((hh) => hh.id === hint.id) != -1 &&
                activeHint == hint.id && (
                  <Error errorMessage={'Hint is already in use.'} />
                )}
              <QuestionCardsView
                key={hint.id}
                isSelected={
                  highlightedHints.findIndex((hh) => hh.id === hint.id) != -1
                }
                onClick={() => handleHighlightedHint(hint)}
                id={hint.id}
                clampText={true}
                disabled={
                  existingHints.findIndex((hh) => hh.id === hint.id) != -1
                }
                title={hint.title}
                description={hint.description}
                footer={
                  <LastModifiedDetail
                    by={hint.updatedBy || hint.createdBy}
                    datetime={hint.updatedAt}
                  />
                }
              ></QuestionCardsView>
            </>
          ))}
        </Col>
        <BeatLoader
          css={LoaderStyles}
          color={'#3694D7'}
          loading={loading}
        ></BeatLoader>
      </HintsWrapper>
    );
  }
);
