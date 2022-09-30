import React from 'react';
import styled from 'styled-components';

const StyledBreadcrumb = styled.div`
  cursor: pointer;
  font-size: x-small;
  letter-spacing: 0px;
  font-weight: 600;
  &:hover {
    color: #5b94e3;
    text-decoration: underline;
  }
`;

export type BreadcrumbsContent = {
  title: string;
  action?: Function;
};

export type BreadcrumbsProp = {
  data: BreadcrumbsContent[];
};

export const Breadcrumbs = ({ data }: BreadcrumbsProp) => {
  return (
    <div className="d-flex align-items-center">
      {data.map((d: BreadcrumbsContent, index: number) => (
        <>
          <StyledBreadcrumb
            onClick={() => d.action && d.action()}
            key={'title' + index}
          >
            {d.title}
          </StyledBreadcrumb>
          {data.length - 1 > index && (
            <span key={'span' + index} className="p-1 mb-1">
              &nbsp;{'>'}&nbsp;
            </span>
          )}
        </>
      ))}
    </div>
  );
};
