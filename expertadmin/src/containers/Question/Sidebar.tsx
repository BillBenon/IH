import { Dashboard } from '@styled-icons/boxicons-solid/Dashboard';
import { Youtube } from '@styled-icons/entypo-social/Youtube'
import { ThList } from "@styled-icons/fa-solid/ThList";
import { QuestionAnswer } from '@styled-icons/remix-fill/QuestionAnswer';
import { MenuItem } from 'components/MenuItem';
import { useAppHistory } from 'context/appHistory';
import { DashboardCustomize } from '@styled-icons/material-rounded/DashboardCustomize';
import { useMenuVisibility } from 'context/menuVisibility';
import { useHome } from 'features/home/useHome';
import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Expert } from 'types';
import { getCurrentPathWithoutLastPart, isMarketingExpert, isSuperAdmin, isExpertAdmin } from 'utils/commonutils';
import { MenuItems, Routes } from 'utils/constants';
import { Group } from 'styled-icons/boxicons-solid';

const StyledSidebar = styled.div`
  position: fixed;
  top: 4em;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: ${(props: any) => props.theme.width + 'px'};
  transition: 0.5s;
  height: 100%;
  background: rgba(91, 148, 227, 0.08);
`;

export const Sidebar: FC = () => {
  const [pathName, setPathName] = useState<string>();
  const [state, setState] = useState<boolean>(false);
  const { menuWidthPx } = useMenuVisibility()!;
  const location = useLocation();
  const { expert } = useHome()
  const { recentItems, deleteHistory } = useAppHistory()!;

  useEffect(() => {
    setPathName(getCurrentPathWithoutLastPart(location));
  }, [location]);

  const onSubmenuClose = (param: string, menu?: string) => {
    if (menu) {
      deleteHistory(menu, param);
      setState(!state);
    }
  };

  return (
    <StyledSidebar theme={{ width: menuWidthPx }}>
      {!!menuWidthPx && (
        <>
          {!isMarketingExpert(expert as Expert) && (<><MenuItem
            to={Routes[MenuItems.tracks]}
            icon={ThList}
            isActive={pathName === Routes[MenuItems.tracks]}
            text={'Tracks'}
            recentItems={recentItems[MenuItems.tracks]}
            onSubmenuClose={(param: string) =>
              onSubmenuClose(param, MenuItems.tracks)
            }
          />
            <MenuItem
              to={Routes[MenuItems.capabilities]}
              icon={Dashboard}
              isActive={pathName === Routes[MenuItems.capabilities]}
              text={'Capabilities'}
              recentItems={recentItems[MenuItems.capabilities]}
              onSubmenuClose={(param: string) =>
                onSubmenuClose(param, MenuItems.capabilities)
              }
            />
            <MenuItem
              to={Routes[MenuItems.questions]}
              icon={QuestionAnswer}
              isActive={pathName === Routes[MenuItems.questions]}
              text={'Questions'}
              recentItems={recentItems[MenuItems.questions]}
              onSubmenuClose={(param: string) =>
                onSubmenuClose(param, MenuItems.questions)
              }
            />
            <MenuItem
              to={Routes[MenuItems.yourCandidates]}
              icon={Group}
              isActive={pathName === Routes[MenuItems.yourCandidates]}
              text={'Your Candidates'}
              recentItems={recentItems[MenuItems.yourCandidates]}
              onSubmenuClose={(param: string) =>
                onSubmenuClose(param, MenuItems.yourCandidates)
              }
            /></>)
          }
          {
            (isMarketingExpert(expert as Expert) || isSuperAdmin(expert as Expert) || isExpertAdmin(expert as Expert)) && (<MenuItem
              to={Routes[MenuItems.trackSettings]}
              icon={DashboardCustomize}
              isActive={pathName === Routes[MenuItems.trackSettings]}
              text={'Track Settings'}
            />
            )}
          {
            !isMarketingExpert(expert as Expert) && isSuperAdmin(expert as Expert) && (
              <MenuItem
                to={Routes[MenuItems.experts]}
                icon={Youtube}
                isActive={pathName === Routes[MenuItems.experts]}
                text={'Experts'}
              />
            )
          }
          {

            isSuperAdmin(expert as Expert) && (
              <MenuItem
                to={Routes[MenuItems.products]}
                icon={QuestionAnswer}
                isActive={pathName === Routes[MenuItems.products]}
                text={'Products'}
                recentItems={recentItems[MenuItems.products]}
                onSubmenuClose={(param: string) =>
                  onSubmenuClose(param, MenuItems.products)
                }
              />
            )
          }
          {/* {
            isSuperAdmin(expert as Expert) && (
              <MenuItem
                to={Routes[MenuItems.mailTool]}
                icon={QuestionAnswer}
                isActive={pathName === Routes[MenuItems.mailTool]}
                text={'Tools'}
              />
            )
          } */}
        </>
      )}
    </StyledSidebar>
  );
};
