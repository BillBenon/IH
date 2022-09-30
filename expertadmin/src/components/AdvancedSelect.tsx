import { Clear } from '@styled-icons/material-outlined/Clear';
import { IconContainerProps } from 'components/IconContainer';
import React, { FC, useEffect, useRef, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

import { DropdownIcon } from './DropdownIcon';
import { DropupIcon } from './DropupIcon';
import { IconContainer } from './IconContainer';
import { StyledInput } from './StyledInput';
import useOnClickOutside from './UtilityComponents/useOnclickOutside';

const Wrapper = styled.div`
  font-size: 14px;
  line-height: 20px;
  user-select: none;
  letter-spacing: 0.16px;
  color: rgba(0, 0, 0, 0.6);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  background-color: white;
  cursor: pointer;
  background: #f4f4f4;
  border-radius: 4px;
  height: 40px;
`;

const HeaderText = styled.div`
  padding: 0 10px;
  margin-right: 30px;
`;

const ListWrapper = styled.div`
  position: absolute;
  z-index: 10;
  border: 1px solid rgb(223, 223, 223);
  border-top: none;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12),
    0px 4px 5px rgba(0, 0, 0, 0.2);
  max-height: 300px;
  overflow: auto;
  background-color: white;
  text-align: left;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 2em;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: default;
  cursor: pointer;
  background: ${(props) => props.theme.selected && '#F4F4F4'};
  &:hover {
    background: #f4f4f4;
  }
`;

const ActionMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftMenuItem = styled.div`
  color: ${(props) => props.theme.color};
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
`;

const RightItem = styled.div`
  display: flex;
`;

type LeftItemProps = {
  text: string;
  color?: string;
  onClick?: Function;
};

export type AdvancedSearchOptionProps = {
  id: string;
  leftItem: LeftItemProps;
  rightItems?: RightItemProps[];
};

export type RightItemProps = {
  id: string;
  item: IconContainerProps;
};

export type AdvancedSelectProps = {
  selectionActionItems?: IconContainerProps[];
  options: AdvancedSearchOptionProps[];
  selectedId?: string;
  showClear?: boolean;
  onClearSelection?: Function;
  isDisabled?: boolean;
  loading?: boolean;
};

const AdvancedSelect: FC<AdvancedSelectProps> = (props) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string>();
  const [searchText, setSearchText] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<
    AdvancedSearchOptionProps[]
  >([]);

  useOnClickOutside(ref, () => setListOpen(false));

  const toggleList = () => {
    if (props.isDisabled) return;
    setListOpen(!listOpen);
  };

  const handleOptionSelect = (selectedOption: AdvancedSearchOptionProps) => {
    if (selectedOption.id) {
      setSelected(selectedOption.id);
      setListOpen(false);
    }
    if (selectedOption.leftItem.onClick) selectedOption.leftItem.onClick();
  };

  const handleClearSelection = (event: any) => {
    props.onClearSelection && props.onClearSelection();
    event.stopPropagation();
  };

  useEffect(() => {
    setSelected(props.selectedId);
  }, [props.selectedId]);

  useEffect(() => {
    const opts = props.options.filter((opt) =>
      opt.leftItem?.text?.toLowerCase().includes(searchText?.toLowerCase())
    );
    setFilteredOptions(opts);
  }, [searchText || props.options]);

  return (
    <Wrapper ref={ref}>
      <Header onClick={() => toggleList()}>
        <HeaderText>
          {
            filteredOptions?.find((option) => option.id == selected)?.leftItem
              .text
          }
        </HeaderText>
        <div className="d-flex align-items-center">
          {props.showClear && !props.isDisabled && !!selected && (
            <IconContainer
              color={'#E25252'}
              icon={Clear}
              onClick={(event: any) => handleClearSelection(event)}
            />
          )}
          {props.loading && (
            <MoonLoader size={19} color={'#E25252'} loading={props.loading} />
          )}
          {listOpen ? (
            <DropupIcon className="ml-0" />
          ) : (
            <DropdownIcon className="ml-0" />
          )}
        </div>
      </Header>
      {listOpen && (
        <ListWrapper>
          <StyledInput
            className="m-2"
            style={{ width: 'calc(100% - 20px)' }}
            placeholder={'Search'}
            type="text"
            value={searchText}
            onChange={(event: any) => setSearchText(event.target.value)}
            name={'Search'}
          />
          {filteredOptions.map((item) => (
            <ListItem
              theme={{ selected: item.id === selected }}
              style={{ width: ref?.current?.clientWidth }}
              key={item.id}
            >
              <ActionItem
                item={item}
                handleOptionSelect={() => handleOptionSelect(item)}
              />
            </ListItem>
          ))}
        </ListWrapper>
      )}
    </Wrapper>
  );
};

const ActionItem = (props: any) => {
  const { leftItem, rightItems } = props.item;
  const { text, color } = leftItem;
  return (
    <ActionMenu>
      <LeftMenuItem theme={{ color }} onClick={props.handleOptionSelect}>
        {text}
      </LeftMenuItem>
      <RightItem>
        {rightItems?.map((action: RightItemProps) => (
          <IconContainer
            key={action.id}
            color={action.item.color}
            icon={action.item.icon}
            onClick={() =>
              !!action?.item?.onClick && action.item.onClick(action.id)
            }
          />
        ))}
      </RightItem>
    </ActionMenu>
  );
};

export default AdvancedSelect;
