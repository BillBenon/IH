import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IStatusScore, ICapabilityViewSS, ISubCategorySS, ICapabilitySS } from 'types/ScorePage';
import { RowModel, TreeState, TreeTable } from 'cp-react-tree-table';
import { useDispatch } from 'react-redux';
import { saveCandidateLastActivity } from 'store/evaluationPlatform';
import { useHistory } from 'react-router';
import { CollapseCircle, ExpandCircle } from 'assets';
import { camelize } from 'utilities';
import { Badge, Col, Row } from 'react-bootstrap';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 14px;
  .cp_tree-table {
    width: 100% !important;
    min-height: 300px;
    font-size: 12px;
    color: #040402;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  }
  .cp_tree-table_header {
    color: rgba(55, 53, 47, 0.6);
  }
  .cp_tree-table .cp_tree-table_header-cell>.t-right {
    width: 100%;
  }
  .cp_tree-table_cell{
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /* Cells */
  .cp_tree-table .cp_tree-table_cell,
  .cp_tree-table .cp_tree-table_header-cell {
    >a, .without-children>a{
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
  .cp_tree-table .cp_tree-table_cell>input {
    font-size: 14px;    outline: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    box-shadow: inset 0 0 0 1px rgba(55, 53, 47, 0.16);
    border: 1px solid transparent;
  }
  .cp_tree-table .cp_tree-table_cell>input:hover {
    box-shadow: inset 0 0 0 1px #0f55eb;
  }

  .cp_tree-table .cp_tree-table_cell>input:focus {
    background: #edf6fc;
    box-shadow: inset 0 0 0 1px #0f55eb;
  }
  .cp_tree-table .cp_tree-table_cell .toggle-button {
    position: relative;
    display: inline-block;
    border: none;
    vertical-align: middle;
    padding: 0 5px 0 0;
    margin: 0;
    cursor: pointer;
    background-color: transparent;
    outline: none;
  }
  .cp_tree-table .cp_tree-table_cell .toggle-button::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-style: solid;
    border-width: 2px;
    transform: rotate(45deg);
    border-color: #040402 #040402 transparent transparent;
    vertical-align: middle;
    margin-bottom: 5px;
    margin-right: 5px;
  }
  .cp_tree-table .cp_tree-table_cell .toggle-button.open::before{
    transform: rotate(135deg);
  }
  .cp_tree-table .cp_tree-table_cell .toggle-button+span {
    vertical-align: middle;
  }
  .cp_tree-table .cp_tree-table_cell>.with-children>span {
    font-weight: 600;
  }
  .cp_tree-table .cp_tree-table_cell>.data-cell {
    width: 100%;
    text-align: right;
  }
  .cp_tree-table .cp_tree-table_cell>.expenses-cell {
    font-family: 'SF Mono', 'Segoe UI Mono', 'Roboto Mono', Menlo, Courier, monospace;
    font-weight: 400;
    width: 100%;
    padding-right: 10px;
  }
  .controls {
    width: 100%;
  }
  .capitalize{
    text-transform: capitalize;
  }
  .cp_tree-table_header-cell{
    padding: 0px !important;
  }
  .controls{
    img{
      height: 25px;
      width: 25px;
      cursor: pointer;
    }
  }
  .cp_tree-table_row{
    border-bottom: 2px solid rgb(55 53 46 / 8%);
  }
  .cp_tree-table_row:hover{
    background: #5b94e342;
  }
  .row{
    padding: 10px;
    span{
      padding-right: 10px;
    }
  }
  .viewselector{
    padding-left: 5px;
    padding-right: 5px;
    label{
      text-transform: capitalize;
      padding-left 10px;
    }
  }
  .data-cell{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .trackstatus{
    justify-content: center;
    border-bottom: 1px solid rgb(55 53 46 / 8%);
  }
  .badge{
    background-color: #5b94e3 !important;
  }
  h5 {
    display: inline;
  }
`;

interface IScorePageProps {
  statusScore: IStatusScore;
  setCapability: Function;
  setQuestionId: Function;
}

export const ScorePage = (props: IScorePageProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [scoreData, setScoreData] = useState<any>([]);
  const treeOperations = { expand: 'expand', collapse: 'collapse' }
  const nodes: any = {
    capability: {
      treeNodes: [{
        colName: `category`,
        width: '200px'
      }, {
        colName: `subCategory`,
        width: '200px'
      }, {
        colName: `capability`,
        width: '200px'
      }],
      dataNodes: [{
        colName: `score`,
        width: '50px'
      }, {
        colName: `probability`,
        width: '50px'
      }],
    }
  }
  useEffect(() => {
    if (props.statusScore) {
      let _scoreData = props.statusScore.capabilityViews.reduce((catAcc: any, currCat: ICapabilityViewSS) => {
        let catData = { data: {}, children: [] };
        catData.data = {
          categoryId: currCat.categoryId,
          categoryTitle: currCat.categoryTitle,
          ...currCat.categoryStatus
        }
        catData.children = currCat.subCategories.reduce((subCatAcc: any, currSubCategory: ISubCategorySS) => {
          let subCatData = { data: {}, children: [] }
          subCatData.data = {
            subCategoryId: currSubCategory.subCategoryId,
            subCategoryTitle: currSubCategory.subCategoryTitle,
            ...currSubCategory.subCategoryStatus
          }
          subCatData.children = currSubCategory.capabilities.reduce((capAcc: any, currCap: ICapabilitySS) => {
            let capData = { data: {} }
            capData.data = {
              capabilityId: currCap.capabilityId,
              capabilityTitle: currCap.capabilityTitle,
              ...currCap.capabilityStatus
            }
            capAcc.push(capData)
            return capAcc
          }, [])
          subCatAcc.push(subCatData)
          return subCatAcc;
        }, [])
        catAcc.push(catData)
        return catAcc
      }, [])
      setScoreData(TreeState.create(_scoreData))
    }
  }, [props.statusScore])

  const renderTreeCell = (row: any, dataName: string) => {
    return (
      <div
        className={row.metadata.hasChildren ? 'with-children' : 'without-children'}>
        {(row.data[`${dataName}Title`] && row.metadata.hasChildren)
          ? (
            <button className={`toggle-button ${row.$state.isExpanded ? 'open' : ''}`} onClick={row?.toggleChildren}>
              <span className='capitalize' title={camelize(row.data[`${dataName}Title`])}>
                {camelize(row.data[`${dataName}Title`])} {row.data.count ? `(${row.data.count})` : ''}
              </span>
            </button>
          )
          : dataName === 'capability' ?
            <a
              onClick={(e) => handleNavigation(e, row, dataName)}
              title={row.data[`${dataName}Title`]}
              className={`${row.data[`${dataName}Title`] ? `${dataName}Title` : ''} data-cell`}>
              {row.data[`${dataName}Title`]}
            </a>
            : <span title={camelize(row.data[`${dataName}`])} className='capitalize'>{camelize(row.data[`${dataName}`])}</span>
        }

        {(row.data.subCategoryTitle === '' && !row.$state.isExpanded) && (row.toggleChildren())}
      </div>
    );
  }

  const renderDataCell = (row: RowModel, dataName: string) => {
    // if (dataName === 'questionTitle') {
    //   return <a onClick={(e) => handleNavigation(e, row, dataName)} title={row.data[dataName]} className={`${row.data[dataName] ? `${dataName}` : ''} data-cell`}>{row.data[dataName]}</a>
    // }
    return (
      <span
        style={{ textAlignLast: typeof row.data[dataName] === 'string' ? 'left' : 'center' }}
        title={row.data[dataName]}
        className='data-cell'>
        {typeof row.data[dataName] === 'string' ? camelize(row.data[dataName]) : row.data[dataName]}
      </span>
    );
  }

  const handleNavigation = (e: any, row: RowModel, field: string) => {
    e.preventDefault();
    props.setCapability(row.data?.capabilityId)
    if (field === 'questionTitle') {
      props.setQuestionId(row.data?.questionId)
    }
    dispatch(saveCandidateLastActivity({
      selectedCapabilityId: row.data?.capabilityId,
      currentQuestionId: field === 'questionTitle' ? row.data?.questionId : ''
    }))
    history.push('/question')
  }


  const handleTreeClick = (newValue: any) => setScoreData(newValue)

  const handleOnChange = (value: any, btnClick: string) => {
    let newValue = value;
    if (btnClick === treeOperations.expand) {
      newValue = TreeState.expandAll(scoreData);
    }
    else if (btnClick === treeOperations.collapse) {
      newValue = TreeState.collapseAll(scoreData);
    }
    setScoreData(newValue)
  }

  return (
    <StyledContainer>
      <div className='trackstatus'>
        <Row>
          <Col className='text-md-right' md={6}>
            <h5>Your overall score is:</h5>
          </Col>
          <Col className='text-md-left' md={6}>
            <h5>
              <Badge pill variant="primary">
                {`${Number((props.statusScore.trackStatus.score * props.statusScore.trackStatus.probability).toFixed(2))} / 10`}
              </Badge>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col className='text-md-right' md={6}>
            <h5>Score for the completed question is:</h5>
          </Col>
          <Col className='text-md-left' md={6}>
            <h5>
              <Badge pill variant="primary">
                {`${props.statusScore.trackStatus.score} / 10`}
              </Badge>
            </h5>
          </Col>
        </Row>
        <Row>
          <Col className='text-md-right' md={6}>
            <h5>Probability is:</h5>
          </Col>
          <Col className='text-md-left' md={6}>
            <h5>
              <Badge pill variant="primary">
                {`${props.statusScore.trackStatus.probability} / 1`}
              </Badge>
            </h5>
          </Col>
        </Row>
      </div>
      <Row className='controls ml-0'>
        <img title={'Expand All'} onClick={() => handleOnChange(null, treeOperations.expand)} src={ExpandCircle} />&nbsp;
        &nbsp;<img title={'Collapse All'} onClick={() => handleOnChange(null, treeOperations.collapse)} src={CollapseCircle} />
        <TreeTable
          value={scoreData}
          height={500}
          headerHeight={38}
          onChange={handleTreeClick}>
          {nodes.capability.treeNodes.map((treeLevel: any) => <TreeTable.Column
            basis={treeLevel.width}
            key={treeLevel.colName}
            renderCell={(row: any) => renderTreeCell(row, treeLevel.colName)}
            renderHeaderCell={() => <span className='capitalize'>{treeLevel.colName}</span>} />)}

          {nodes.capability.dataNodes.map((statusLevel: any) => <TreeTable.Column
            key={statusLevel.colName}
            basis={statusLevel.width}
            renderCell={(row: any) => renderDataCell(row, statusLevel.colName)}
            renderHeaderCell={() => <span className='t-right capitalize'>{statusLevel.colName}</span>} />)}
        </TreeTable>
      </Row>
    </StyledContainer>
  );
};
