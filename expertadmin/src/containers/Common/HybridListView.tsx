import { StyledIcon } from '@styled-icons/styled-icon';
import { AddButton } from 'components/AddButton';
import { Breadcrumbs, BreadcrumbsContent } from 'components/Breadcrumbs';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { DisableButton } from 'components/DisableButton';
import { FilterInput } from 'components/FilterInput';
import { SearchButton } from 'components/SearchButton';
import { StyledRadio } from 'components/StyledRadio';
import { TableStyles } from 'components/TableStyles';
import { DataTable } from 'containers/Common/DataTable';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 0 1rem;
`;

const HybridViewWrapper = styled.div`
  height: calc(100% - 6rem) !important;
  overflow-y: auto;
`;

export type ActionItemProps = {
  icon: StyledIcon;
  onClick: Function;
};

export type ActionProps = {
  buttonText: string;
  onClick: Function;
};

export type IdText = {
  id: string;
  text: string;
};

export type DataArrayProps = IdText & {
  actionItems: ActionItemProps[];
};

export type HybridListViewProps = {
  onChange?: Function;
  title: string;
  checkedItems?: IdText[];
  data: DataArrayProps[];
  save: ActionProps;
  create: ActionProps;
  onCancel: Function;
  paginatorNode?: JSX.Element;
  onSearch: SubmitHandler<any>;
  breadcrumbs?: BreadcrumbsContent[];
};

export const HybridListView: FC<HybridListViewProps> = (props) => {
  const { selectedItems, setSelectedItems } = useAddOrEditTrack();
  const [content, setContent] = useState<DataArrayProps[]>([]);
  const { title, checkedItems, data, save, onCancel, create, onSearch } = props;
  const { handleSubmit, register, setValue } = useForm<{
    textToSearch: string;
  }>();

  const onCheckboxChange = (event: any, val: IdText) => {
    const checkedvals = selectedItems.slice();
    if (event.target.checked) {
      checkedvals.push(val);
    } else {
      const inx = checkedvals.findIndex(
        (checkedval) => checkedval.id === val.id
      );
      if (inx != undefined && inx > -1) {
        checkedvals.splice(inx, 1);
      }
    }
    setSelectedItems(checkedvals);
    props.onChange && props.onChange(checkedvals);
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'text',
      Cell: function cell(data: any) {
        return (
          <StyledRadio className="mr-4"
            id={data.row.values.id}
            onChange={(event: any) => onCheckboxChange(event, data.row.values)}
            defaultChecked={selectedItems
              ?.map((item) => item.id)
              .includes(data.row.values.id)}
            style={{ color: 'rgba(22, 22, 22, 1)' }}
            aria-setsize={30}
            name={'searchInTitle' + data.row.values.id}
            type="checkbox"
            label={data.cell?.value}
          />
        );
      },
      style: {
        width: '90%',
      },
    },
    {
      Header: '',
      accessor: 'id',
      Cell: (data: any) => {
        return (
          <div className="d-flex align-items-center">
            {data.row.values.actionItems?.map(
              (item: ActionItemProps, index: number) => (
                <CustomStyledIcon
                  key={index}
                  height={'20px'}
                  color={'rgba(0, 0, 0, 0.6)'}
                  onClick={item.onClick}
                  icon={item.icon}
                />
              )
            )}
          </div>
        );
      },
      style: {
        width: '10%',
      },
    },
    {
      Header: '',
      accessor: 'actionItems',
    },
    {
      Header: '',
      accessor: 'onChange',
    },
  ];

  useEffect(() => {
    setSelectedItems(checkedItems || []);
    setValue('textToSearch', '');
  }, [checkedItems]);

  useEffect(() => {
    setContent(data);
  }, [data]);

  return (
    <>
      <HybridViewWrapper>
        <FormWrapper>
          <Form style={{ padding: '10px 0' }} onSubmit={handleSubmit(onSearch)}>
            {!!props.breadcrumbs && (
              <Breadcrumbs data={props.breadcrumbs}></Breadcrumbs>
            )}
            <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
              <Col
                md={9}
                lg={9}
                sm={12}
                className="d-flex align-items-center mr-0 pr-0 pl-0"
              >
                <p className="h4">{title}</p>
                <Col className="d-flex pl-0">
                  <Col className="mr-0 pr-0" md={6} lg={6} sm={6}>
                    <FilterInput
                      ref={register}
                      name="textToSearch"
                      type="text"
                      placeholder="Search"
                    />
                  </Col>
                  <Col md={2} lg={2} sm={2}>
                    <SearchButton type="submit" style={{ width: '90px' }}>
                      {'Search'}
                    </SearchButton>
                  </Col>
                </Col>
              </Col>
              <Col
                md={3}
                lg={3}
                sm={12}
                className="d-flex flex-row-reverse pr-0"
              >
                <AddButton
                  style={{ marginRight: '.5rem' }}
                  type="button"
                  onClick={() => create.onClick()}
                >
                  {create.buttonText}
                </AddButton>
              </Col>
            </Row>
          </Form>
        </FormWrapper>

        <TableStyles>
          {!!props.paginatorNode && props.paginatorNode}
          <DataTable
            trStyle={{ height: '52px' }}
            tdClassName="pb-0 pt-0 pl-0"
            columns={columns}
            data={content}
            loading={false}
            idKey={'id'}
            hiddenColumns={['actionItems']}
          />
        </TableStyles>
      </HybridViewWrapper>
      <Row className="m-0 mt-2">
        <Col className="p-0">
          <Col
            className="p-0 pt-3 pb-3 d-flex justify-content-between"
            style={{ borderTop: '1px solid rgba(91, 148, 227, 0.2)' }}
          >
            <Col className="text-right">
              <DisableButton
                style={{ marginRight: '.5rem' }}
                type="button"
                onClick={() => onCancel()}
              >
                {'Cancel'}
              </DisableButton>
              <AddButton
                type="button"
                onClick={() => save.onClick(selectedItems)}
              >
                {save.buttonText}
              </AddButton>
            </Col>
          </Col>
        </Col>
      </Row>
    </>
  );
};
