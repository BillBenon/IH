import React from 'react';
import { HorizontalCard } from '../../components';
import { BulbIcon, HumanHeadIcon, WebDevelopmentIcon } from '../../assets';
import styled from 'styled-components';

const StyledHorizontalBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
`;

export const HorizontalBar: React.FC = () => {
  return (
    <StyledHorizontalBar>
      <HorizontalCard icon={WebDevelopmentIcon} title="SDE" detailsDescription="Software Development Manager" />
      <HorizontalCard icon={BulbIcon} title="SDM" detailsDescription="Software Development Manager" />
      <HorizontalCard icon={HumanHeadIcon} title="TPM" detailsDescription="Software Development Manager" />
      <HorizontalCard icon={WebDevelopmentIcon} title="SDE" detailsDescription="Software Development Manager" />
      <HorizontalCard icon={BulbIcon} title="SDM" detailsDescription="Software Development Manager" />
    </StyledHorizontalBar>
  );
};
