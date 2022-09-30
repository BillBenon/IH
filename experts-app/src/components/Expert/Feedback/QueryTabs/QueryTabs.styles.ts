import styled from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/Close';

export const StyledTab = styled.div`
    display: flex;
    height: 100%;
    color: ${(props: any) => { return props.index === props.activeIndex ? '#000' : '#1122ff' }};
    background: ${(props: any) => props.index === props.activeIndex ? '#fff' : ''};
    cursor: pointer;
    &:hover{
    background: #E3E3E3;
  }
`;

export const StyledIcon = styled.div`
 &:hover {
    background-color: #DCDCDC; 
  }
  display: inline-block;
  cursor: pointer;
  margin-right: 0.5rem;
  padding-bottom: 5px;
`;

export const StyledCloseIcon = styled(Close)`
  width: 1rem;
  height: 1rem;
  color: #525252;
  vertical-align: bottom;
`;

export const StyledNavTabs = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
  list-style: none;
`;

export const TabContent = styled.div`
  padding: 5px 10px;
  color: ${(props: any) => { return props.index === props.activeIndex ? '#161616' : '#525252' }};
  font-style: normal;
  font-weight: ${(props: any) => { return props.index === props.activeIndex ? 600 : 'normal' }};;
  font-size: 14px;
  letter-spacing: 0.16px;
  letter-spacing: 0.16px; 
`;

export const ListContent = styled.li`
  border-bottom: ${(props: any) => { return props.index === props.activeIndex || (props.tabslength == props.index + 1 && isNaN(props.activeIndex)) ? '2px solid #0F62FE' : '2px solid #E0E0E0' }};
  cursor: pointer;
  &:hover{
    background: #E3E3E3;
  }
`;