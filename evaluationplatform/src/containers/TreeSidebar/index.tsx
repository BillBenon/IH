import React, { useEffect, useRef, useState } from 'react';
import { CategoryField } from '../../components';
import styled from 'styled-components';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { Search } from '@styled-icons/boxicons-regular/Search';
import SearchQueComponent from './searchQueComponent';
import { createPortal } from 'react-dom';
import {PDFPage} from 'pages/PDFPage/index';
import { Expert_Login } from 'utilities/constants';


const StyledTreeSidebar = styled.div`
  margin-left: 78px;
  overflow-y: auto;
  height: calc(100vh - 57px);
  width: 285px;
  opacity: ${(props: any) => (props.isMaximizeContent ? 0 : 1)};
  transition: opacity 1s;
  background: #eeeeee;
  text-align: left;
  position: fixed;
  .searchIcon{
    margin-left: 10px;
    cursor: pointer;
    width: 24px;
    color: #5b94e3;
  }
  .trackname {
    margin-left: 20px;
    margin-top: 30px;
    margin-bottom: 50px;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    position: relative;
  }
  .pdfIcon{
    width: 20px;
    height: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
  .pdfIcon path {
    color: red;
  }
`;

interface IProps {
  category: Array<any>;
  trackName: string;
  isMaximizeContent?: boolean;
  setCapability: any;
  setQuestionId: any;
  setScrollPosition: Function;
  setCurrentAnsVersionId: Function;
}

export const TreeSidebar: React.FC<IProps> = (props) => {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false)
  const searchIconRef = useRef<any>(null)
  const expertLogin = (getValueBrowserStorage(Expert_Login)== null)?false:true;
  let domNode = document.getElementById('searchComPortalDiv')
  useEffect(() => {
    if (isSearchEnabled) {
      let pos = searchIconRef.current?.getBoundingClientRect();
      (domNode?.firstChild as any).style.display = "block";
      (domNode?.firstChild as any).style.top = pos.top + 25 + 'px';
      (domNode?.firstChild as any).style.left = pos.left + 'px';
    }
  }, [isSearchEnabled]) //eslint-disable-line

  const downloadPDFProps = {PDFFromTreeSideBar : true}
  const toggleQueSearch = () => setIsSearchEnabled(flag => !flag)
  return (
    <StyledTreeSidebar {...props}>
      <div className="trackname">{props.trackName}
        {props.trackName && <Search
          ref={(ref) => searchIconRef.current = ref}
          title='search question/capability/category/sub-category'
          onClick={toggleQueSearch}
          className='searchIcon'
          width="20px">
        </Search>}
        {!expertLogin && props.trackName && <PDFPage {...downloadPDFProps}/>
        }
        {isSearchEnabled && createPortal(<SearchQueComponent
          setCapability={props.setCapability}
          setQuestionId={props.setQuestionId}
          setCurrentAnsVersionId={props.setCurrentAnsVersionId}
          toggleQueSearch={toggleQueSearch} />, domNode as HTMLElement)}
      </div>
      {props.category?.map((item, idx) => (
        <CategoryField
          value={item}
          key={idx}
          idx={idx}
          setScrollPosition={props.setScrollPosition}
          setCapability={props.setCapability} />
      ))}
    </StyledTreeSidebar>
  );
};
