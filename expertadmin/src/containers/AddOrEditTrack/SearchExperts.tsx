import { Search } from '@styled-icons/boxicons-regular';
import { BoldSpan, SmallSpan, LighSpan } from 'components/CommonStyles';
import { Error } from 'components/Error';
import { FilterInput } from 'components/FilterInput';
import { IconContainer } from 'components/IconContainer';
import { ImageCircle } from 'components/ImageCircle';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import { SearchButton } from 'components/SearchButton';
import { TitleWrapper } from 'components/SmallCard/SmallCardStyled';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { ExpertAllDetail } from 'types';
import { validURL } from 'utils/commonutils';
import { DefaultPaginationCount } from 'utils/constants';

import { QuestionCardsView } from '../Question/QuestionCardsView';

const ExpertsWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  padding: 0.5rem;
`;

interface SearchExpertProps {
  existingExperts: any[]; // must have expertId
}

export const SearchExperts = forwardRef(
  ({ existingExperts }: SearchExpertProps, ref) => {
    const {
      experts,
      totalExperts,
      loading,
      expertRequest,
      handleExpertSearchSkipCount,
      handleExpertSearchText,
      getAllExperts,
    } = useAddOrEditTrack();
    const [highlightedExperts, setHighlightedExpert] = useState<
      ExpertAllDetail[]
    >([]);
    const [activeExpert, setActiveExpert] = useState<string>('');

    const handleSkipCount = (skipcount: number) => {
      handleExpertSearchSkipCount(skipcount);
      handleExpertSearchText(expertRequest.textToSearch);
      getAllExperts(expertRequest.textToSearch, skipcount);
    };

    const handleHighlightedExpert = (expert: ExpertAllDetail) => {
      setActiveExpert(expert.expertId);
      const existinginx = existingExperts.findIndex(
        (hh) => hh.expertId === expert.expertId
      );
      if (existinginx != -1) return;
      const inx = highlightedExperts.findIndex(
        (hh) => hh.expertId === expert.expertId
      );
      if (inx === -1) highlightedExperts.push(expert);
      else highlightedExperts.splice(inx, 1);
      setHighlightedExpert([...highlightedExperts]);
    };

    useImperativeHandle(ref, () => ({
      getExperts() {
        return highlightedExperts;
      },
    }));

    return (
      <ExpertsWrapper>
        <Col className="p-0">
          {'Search for an existing expert'}
          <Row className="align-items-center justify-content-between">
            <Col lg={10} md={10} sm={10} className="pr-0">
              <FilterInput
                onKeyDown={(event: any) =>
                  event.keyCode === 13 &&
                  getAllExperts(expertRequest.textToSearch)
                }
                className="mt-2 mb-2"
                value={expertRequest.textToSearch}
                onChange={(e: any) => handleExpertSearchText(e.target.value)}
                placeholder={'Search...'}
              />
            </Col>
            <Col lg={2} md={2} sm={2} className="pl-0 text-right">
              <SearchButton type="submit" style={{ width: '4em' }}>
                <IconContainer
                  onClick={() => getAllExperts(expertRequest.textToSearch)}
                  color={'##FFF'}
                  icon={Search}
                />
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
                total={totalExperts}
                skipcount={expertRequest.skipCount}
                onAction={handleSkipCount}
                loading={loading}
              />
            </Col>
          </Row>
          {experts.map((expert: ExpertAllDetail) => (
            <>
              {existingExperts.findIndex(
                (hh) => hh.expertId === expert.expertId
              ) != -1 &&
                activeExpert == expert.expertId && (
                  <Error errorMessage={'Expert is already in use.'} />
                )}
              <QuestionCardsView
                key={expert.expertId}
                isSelected={
                  highlightedExperts.findIndex(
                    (hh) => hh.expertId === expert.expertId
                  ) != -1
                }
                onClick={() => handleHighlightedExpert(expert)}
                id={expert.expertId}
                clampText={true}
                disabled={
                  existingExperts.findIndex(
                    (hh) => hh.expertId === expert.expertId
                  ) != -1
                }
              >
                <Card className="border-0 bg-transparent">
                  <div className="d-flex">
                    <ImageCircle
                      image={
                        validURL(expert.photoURL) ? expert.photoURL : undefined
                      }
                      initials={expert.fullname.charAt(0)}
                    />
                    <TitleWrapper>
                      <BoldSpan>{expert.fullname}</BoldSpan>
                      {expert.roleType && (
                        <SmallSpan>
                          {expert.roleType + ' at ' + expert.workingAt}
                        </SmallSpan>
                      )}
                      <SmallSpan>{expert.domain}</SmallSpan>
                    </TitleWrapper>
                  </div>
                  <LighSpan>{expert.profile}</LighSpan>
                </Card>
              </QuestionCardsView>
            </>
          ))}
        </Col>
        <BeatLoader
          css={LoaderStyles}
          color={'#3694D7'}
          loading={loading}
        ></BeatLoader>
      </ExpertsWrapper>
    );
  }
);
