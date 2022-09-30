import { ImageSearch } from '@styled-icons/material/ImageSearch';
import React, { useRef, useState } from 'react';
import Ripples from 'react-ripples';
import styled from 'styled-components';

import { IconContainer } from './IconContainer';
import { SearchButton } from './SearchButton';
import useOnClickOutside from './UtilityComponents/useOnclickOutside';

export type ImagePickerObject = {
  label: string;
  id: string;
  background: string;
  onClick: Function;
};

type ImagePickerProps = {
  activeItem?: string;
  items: ImagePickerObject[];
  itemStyle?: any;
};

const StyledImagePicker = styled.div`
  .react-grid-dropdown__container {
    display: flex !important;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 15px;
    position: relative;
    font-weight: 500;
    align-items: center;
  }
  .react-grid-dropdown__dropdown {
    right: 0;
    top: -328px !important;
    padding: 7px;
    width: 637px;
    max-height: 275px;
    height: auto;
    overflow-y: auto;
    border-radius: 4px;
    position: absolute;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
    background-color: rgba(255, 255, 255);
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    transition: 450ms ease;

    &.active {
      right: 0;
      opacity: 1;
      pointer-events: auto;
    }

    /* width */
    &::-webkit-scrollbar {
      width: 13px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #c3c3c3;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #949494;
    }
  }
  .image-item {
    float: left;
    margin: 5px;
    &:hover {
      transform: scale(1.02);
    }
  }
  .react-grid-dropdown__item-container {
    margin: 6px;
    display: inline-block;
  }
  .react-grid-dropdown__item {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    cursor: pointer;
    background-size: cover;
    border: 1px solid #ccc;
  }
  .react-grid-dropdown__label {
    width: 100%;
    height: 100%;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    text-transform: uppercase;
    font-size: 18px;
    text-shadow: 1px 1px 7px black;

    &.active {
      background-color: rgba(255, 255, 255, 0.4);
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.87);
      text-shadow: none;
      cursor: auto;
    }
  }
  .react-grid-dropdown__section-label {
    margin-left: 5px;
    padding: 5px 10px 5px 10px;
    background: #fff;
    border: 1px solid #c7c7c7;
    border-radius: 4px;
    display: table;
    color: #272727;
  }
`;

export const ImagePicker = (props: ImagePickerProps) => {
  const { activeItem, items, itemStyle = {} } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => setDropdown(!dropdown);

  useOnClickOutside(ref, () => setDropdown(false));

  const getItemStyle = (itemStyle: any, item: any) => {
    if (item.background) {
      return { itemStyle, ...{ backgroundImage: `url(${item.background})` } };
    }
  };

  const itemsJSX = items.map((section, index) => (
    <div className="image-item" key={index}>
      <div key={index} className={'react-grid-dropdown__item-container'}>
        <Ripples during={800}>
          <div
            className={'react-grid-dropdown__item'}
            style={getItemStyle(itemStyle, section)}
            onClick={() => {
              if (activeItem != section.id) {
                setTimeout(() => {
                  section.onClick();
                  toggleDropdown();
                }, 0);
              }
            }}
          ></div>
        </Ripples>
      </div>
    </div>
  ));

  return (
    <StyledImagePicker ref={ref}>
      <SearchButton
        style={{ width: '4em' }}
        type="button"
        onClick={() => toggleDropdown()}
      >
        <IconContainer
          color={'#FFF'}
          style={{ transform: 'scale(1.5)' }}
          icon={ImageSearch}
        />
      </SearchButton>
      <div className="react-grid-dropdown__container">
        <div
          className={
            'react-grid-dropdown__dropdown' + (dropdown ? ' active' : '')
          }
        >
          {itemsJSX}
        </div>
      </div>
    </StyledImagePicker>
  );
};
