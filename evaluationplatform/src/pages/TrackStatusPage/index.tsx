import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import Chart from 'react-google-charts';
import { TreeTable, TreeState, RowModel } from 'cp-react-tree-table';
import { Col, Row } from 'react-bootstrap';
import { IAnswerInfo, ICapability, ICapabilityView, IDashboardData, ISubCategory } from 'types/Dashboard';
import { useHistory } from 'react-router';
import { saveCandidateLastActivity } from 'store/evaluationPlatform';
import { camelize } from 'utilities';
import { CollapseCircle, ExpandCircle } from 'assets';

import 'react-tabs/style/react-tabs.css';


const StyledContainer = styled.div`
  .row{
    width: 100%;
  }
  text-align:left;
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
  .cp_tree-table_header-cell{
    padding: 0px !important;
  }
  .cp_tree-table_cell{
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cp_tree-table_row:hover{
    background: #5b94e342;
  }
  /* Cells */
  .cp_tree-table .cp_tree-table_cell,
  .cp_tree-table .cp_tree-table_header-cell {
    text-align-last: left !important;
    >a, .without-children>a{
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    padding: 0 10px;
    text-align-last: center;
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
    text-align: right;
    padding-right: 10px;
  }
  .controls {
    width: 100%;
  }
  .capitalize{
    text-transform: capitalize;
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
  .trackdetails{
    top: 25px;
    font-weight: bolder;
  }
  .data-cell{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .react-tabs__tab-panel{
    display: flex !important
  }
  .react-tabs{
    width: 100% !important
  }
  .react-tabs__tab:hover{
    background: rgb(227, 227, 227);
  }
  .react-tabs__tab--selected{
    border-radius: 0;
    border:0;
    border-bottom: 2px solid blue !important;
  }
  .react-tabs__tab{
    border-bottom: 1px solid #aaa;
  }
  .react-tabs__tab-list{
    border-bottom: 0;
    margin: 10px;
  }
  .trackdetails{
    >h5 {
      display: contents;
      > span{
        padding-left: 20px;
      } 
    }
  }
`;

interface ITrackStatusProps {
  dashboardData: IDashboardData;
  setCapability: Function;
  setQuestionId: Function;
}

export const TrackStatusPage = (props: ITrackStatusProps) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const viewsType = ['capability', 'status'];
  const [treeData, setTreeData] = useState<any>([])
  const [trackData, setTrackData] = useState<any>({})
  const [trackChartData, setTrackChartData] = useState<any>([])
  const [catChartData, setCatChartData] = useState<any>([])
  const [currentChart, setCurrentChart] = useState<any>({});
  const [treeState, setTreeState] = useState<any>({ capability: [], status: [] })
  const [currentView, setCurrentView] = useState<any>(viewsType[0])
  const nameMapper: any = {
    totalQuestion: 'All',
    totalUnAnswered: 'Unanswered',
    totalSavedAnswer: 'InProgress',
    totalSendForReview: 'Submitted',
    totalUnderReview: 'Under Review',
    totalFeedbackReceived: 'Feedback Received',
    totalFeedbackViewed: 'Feedback Reviewed',
    questionTitle: 'Question',
    capabilityTitle: 'Capability',
    categoryTitle: 'Category',
    subCategoryTitle: 'SubCategory',
    'category:subCategory:capability': 'Category : Sub-Category : Capability'

  }
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
        colName: `totalQuestion`,
        width: '10px'
      }, {
        colName: `totalUnAnswered`,
        width: '10px'
      }, {
        colName: `totalSavedAnswer`,
        width: '10px'
      }, {
        colName: `totalSendForReview`,
        width: '10px'
      }, {
        colName: `totalUnderReview`,
        width: '10px'
      }, {
        colName: `totalFeedbackReceived`,
        width: '10px'
      }, {
        colName: `totalFeedbackViewed`,
        width: '10px'
      }],
    },
    status: {
      treeNodes: [
        {
          colName: `status`,
          width: '150px'
        }],
      dataNodes: [
        {
          colName: `questionTitle`,
          width: '600px'
        }, {
          colName: `category:subCategory:capability`,
          width: '250px'
        }],
    }
  }

  useEffect(() => {
    if (props.dashboardData) {

      setTrackData(props.dashboardData)

      let capviewData = props.dashboardData.capabilityViews.reduce((catAcc: any, currCat: ICapabilityView) => {
        let catData = { data: {}, children: [] };
        catData.data = {
          categoryId: currCat.categoryId,
          categoryTitle: currCat.categoryTitle,
          ...currCat.categoryStatus
        }
        catData.children = currCat.subCategories.reduce((subCatAcc: any, currSubCategory: ISubCategory) => {
          let subCatData = { data: {}, children: [] }
          subCatData.data = {
            subCategoryId: currSubCategory.subCategoryId,
            subCategoryTitle: currSubCategory.subCategoryTitle,
            ...currSubCategory.subCategoryStatus
          }
          subCatData.children = currSubCategory.capabilities.reduce((capAcc: any, currCap: ICapability) => {
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

      let statusViewData = Object.keys(props.dashboardData.statusView).reduce((statusAcc: any, status: string) => {
        if (props.dashboardData.statusView[status].length > 0) {
          statusAcc.push({
            data: { statusTitle: status, count: props.dashboardData.statusView[status]?.length },
            children: props.dashboardData.statusView[status].map((qData: IAnswerInfo) => ({ data: qData }))
          })
        }
        return statusAcc;
      }, [])

      let chartEntities: Array<string> = [`totalUnAnswered`, `totalSavedAnswer`, `totalSendForReview`, `totalUnderReview`, `totalFeedbackReceived`, `totalFeedbackViewed`]

      let trackChartData = chartEntities.reduce((acc: Array<any>, entityName: string) => {
        acc.push([nameMapper[entityName], props.dashboardData.trackStatus[entityName]]);
        return acc;
      }, [['status', 'qty']])

      setCurrentChart({
        name: 'trackChart',
        chartValue: [{
          chartTitle: `The question status for ${props.dashboardData.trackTitle} track.`,
          chartData: trackChartData
        }]
      })

      setTrackChartData([{
        chartTitle: `The question status for ${props.dashboardData.trackTitle} track`,
        chartData: trackChartData
      }])

      setCatChartData(props.dashboardData.capabilityViews.reduce((acc: Array<any>, currCap: any) => {
        let isChartEmpty = true;
        let tempCatChartData = {
          chartTitle: currCap.categoryTitle,
          chartData: chartEntities.reduce((statusAcc, entityName) => {
            if (isChartEmpty && currCap.categoryStatus[entityName] > 0) {
              isChartEmpty = false
            }
            statusAcc.push([nameMapper[entityName], currCap.categoryStatus[entityName]]);
            return statusAcc;
          }, [['status', 'qty']])
        }
        acc.push({ ...tempCatChartData, isChartEmpty })
        return acc
      }, []))

      let tempCapState = TreeState.create(capviewData)
      setTreeData(tempCapState)
      setTreeState({
        capability: tempCapState,
        status: TreeState.create(statusViewData),
      })
    }
  }, [props.dashboardData])

  const handleOnChange = (value: any, btnClick: string) => {
    let newValue = value;
    if (btnClick === treeOperations.expand) {
      newValue = TreeState.expandAll(treeData);
    }
    else if (btnClick === treeOperations.collapse) {
      newValue = TreeState.collapseAll(treeData);
    }
    setTreeState({
      ...treeState,
      [currentView]: newValue
    })
    setTreeData(newValue)
  }


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
    if (dataName === 'questionTitle') {
      return <a onClick={(e) => handleNavigation(e, row, dataName)} title={row.data[dataName]} className={`${row.data[dataName] ? `${dataName}` : ''} data-cell`}>{row.data[dataName]}</a>
    }
    if (row.data['capabilityTitle'] && dataName === 'category:subCategory:capability') {
      return <a onClick={(e) => handleNavigation(e, row, 'capabilityTitle')} title={row.data['capabilityTitle']} className={`data-cell`}>
        {`${row.data['categoryTitle']} : ${camelize(row.data['subCategoryTitle'])} : ${camelize(row.data['capabilityTitle'])}`}
      </a>
    }
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
      selectedCapabilityId:row.data?.capabilityId,
      currentQuestionId: field === 'questionTitle' ? row.data?.questionId : ''
     }))
    history.push('/question')
  }

  const handleTreeClick = (newValue: any) => {
    setTreeState({
      ...treeState,
      [currentView]: newValue
    })
    setTreeData(newValue)
  }

  const getTreeView = () => {
    return <>
      <div className='controls'>
        <img title={'Expand All'} onClick={() => handleOnChange(null, treeOperations.expand)} src={ExpandCircle} />&nbsp;
          &nbsp;<img title={'Collapse All'} onClick={() => handleOnChange(null, treeOperations.collapse)} src={CollapseCircle} />
        <TreeTable
          value={treeData}
          height={460}
          headerHeight={38}
          onChange={handleTreeClick}>
          {nodes[currentView].treeNodes.map((treeLevel: any) => <TreeTable.Column
            basis={treeLevel.width}
            key={treeLevel.colName}
            renderCell={(row: any) => renderTreeCell(row, treeLevel.colName)}
            renderHeaderCell={() => <span className='capitalize'>{treeLevel.colName}</span>} />)}

          {nodes[currentView].dataNodes.map((statusLevel: any) => <TreeTable.Column
            key={statusLevel.colName}
            basis={statusLevel.width}
            renderCell={(row: any) => renderDataCell(row, statusLevel.colName)}
            renderHeaderCell={() => <span className='t-right'>{nameMapper[statusLevel.colName]}</span>} />)}
        </TreeTable>
      </div>
    </>
  }

  const getChartView = () => {
    return currentChart?.chartValue?.map((chr: any) => (chr.isChartEmpty ? null : <Chart
      key={chr.chartTitle}
      width={currentChart.name === 'catChart' ? '420px' : '600px'}
      height={'300px'}
      chartType='PieChart'
      loader={<div>Loading Chart</div>}
      data={chr.chartData}
      options={{ title: chr.chartTitle, legend: 'bottom' }}
    />))
  }

  const handleTabChange = (index: number) => {
    switch (index) {
      case 0:
        setCurrentChart({
          name: 'trackChart',
          chartValue: trackChartData
        })
        break;
      case 1:
        setCurrentChart({
          name: 'catChart',
          chartValue: catChartData
        })
        break;
      case 2:
        setTreeData(treeState.capability)
        setCurrentView('capability')
        break;
      case 3:
        setTreeData(treeState.status)
        setCurrentView('status')
        break;
    }
  }

  return (
    <StyledContainer>
      <Row>
        <Tabs onSelect={handleTabChange}>
          <TabList>
            <Tab>Track View</Tab>
            <Tab>Category View</Tab>
            <Tab>Capability View </Tab>
            <Tab>Status View</Tab>
          </TabList>
          <TabPanel>
            <Row>
              <Col>{getChartView()}</Col>
              {/* <Col className="trackdetails">
                <h5>Your track consists of
                <span>{trackData?.trackStatus?.totalCategory < 10 ? `  0${trackData?.trackStatus?.totalCategory}` : trackData?.trackStatus?.totalCategory || ''} Categories</span>
                  <span>{trackData?.trackStatus?.totalSubCategory || ''} Subcategories</span>
                  <span>{trackData?.trackStatus?.totalCapability || ''} Capabilities</span>
                  <span>{trackData?.trackStatus?.totalQuestion || ''} Questions</span>
                </h5>
              </Col> */}
            </Row>
          </TabPanel>
          <TabPanel>
            {getChartView()}
          </TabPanel>
          <TabPanel>
            {getTreeView()}
          </TabPanel>
          <TabPanel>
            {getTreeView()}
          </TabPanel>
        </Tabs>
      </Row>
    </StyledContainer>
  );
};
