import React, { createContext, useContext, useEffect, useState } from 'react';
import BrowserStorage from 'utils/broswer-storage';
import { isNumeric } from 'utils/commonutils';
import { MenuItems } from 'utils/constants';

type AppHistoryType = {
  pushHistory: (menu: string, param: string, data: any) => void;
  deleteHistory: (menu: string, params: string) => void;
  updateHistory: (
    menu: string,
    oldParam: string,
    newParam: string,
    title?: string
  ) => void;
  recentItems: any;
};

const AppHistory = createContext<AppHistoryType>({} as AppHistoryType);

type AppHistoryProps = {
  children: React.ReactNode;
};

export const AppHistoryProvider = ({ children }: AppHistoryProps) => {
  const [recentItems, setRecentItems] = useState<any>({});

  useEffect(() => {
    Object.keys(MenuItems).forEach((item: string) => {
      BrowserStorage.getItem((MenuItems as any)[item], (value: any) => {
        if (value) {
          setRecentItems({ [(MenuItems as any)[item]]: value });
        }
        BrowserStorage.setItem((MenuItems as any)[item], value);
      });
    });
  }, []);

  // let name = "";
  //     if (icon == 'View') {
  //         const params: any = queryString.parse(param);
  //         name = Object.values(params).join(', ');
  //     } else {
  //         name = (data.title || 'Anonymous');
  //     }

  const pushHistory = (menu: string, param: string, data: any) => {
    if (!recentItems[menu]) recentItems[menu] = [];
    const index = recentItems[menu].findIndex((m: any) => m.param == param);
    const icon = getIcon(param);
    const name =
      icon == 'View' ? param?.substring(1) : data.title || 'Anonymous';
    if (index === -1) {
      recentItems[menu].push({ icon, name, param });
    } else {
      recentItems[menu][index].name = name;
    }
    setRecentItems(recentItems);
    BrowserStorage.getItem(menu, (value: any) => {
      if (value && Array.isArray(value)) {
        const inx = value.findIndex((val) => val.param === param);
        if (inx === -1) {
          value.push({ name, param, data, icon });
        } else {
          value[inx].data = data;
        }
      } else {
        value = [{ name, param, data, icon }];
      }
      BrowserStorage.setItem(menu, value);
    });
  };

  const getIcon = (param: string) => {
    const isFilter = param.includes('?');
    const icon = isFilter ? 'View' : isNumeric(param) ? 'Add' : 'Edit';
    return icon;
  };

  const deleteHistory = (menu: string, param: string) => {
    if (!recentItems[menu]) return;
    const index = recentItems[menu].findIndex((m: any) => m.param == param);
    if (index != -1) {
      recentItems[menu].splice(index, 1);
      setRecentItems(recentItems);
      BrowserStorage.getItem(menu, (value: any) => {
        if (value && Array.isArray(value)) {
          const inx = value.findIndex((val) => val.param === param);
          if (inx != -1) {
            value.splice(inx, 1);
          }
          BrowserStorage.setItem(menu, value);
        }
      });
    }
  };

  const updateHistory = (
    menu: string,
    oldParam: string,
    newParam: string,
    title?: string
  ) => {
    if (!recentItems[menu]) return;
    const index = recentItems[menu].findIndex((m: any) => m.param == oldParam);
    if (index != -1) {
      const icon = getIcon(newParam);
      const name =
        icon == 'View' ? newParam?.substring(1) : title || 'Anonymous';
      recentItems[menu][index].param = newParam;
      recentItems[menu][index].name = name;
      recentItems[menu][index].icon = icon;
      setRecentItems(recentItems);
      BrowserStorage.getItem(menu, (value: any) => {
        if (value && Array.isArray(value)) {
          const inx = value.findIndex((val) => val.param === oldParam);
          if (inx != -1) {
            value[inx] = { param: newParam, name, icon };
          }
          BrowserStorage.setItem(menu, value);
        }
      });
    }
  };

  return (
    <AppHistory.Provider
      value={{ pushHistory, deleteHistory, updateHistory, recentItems }}
    >
      {children}
    </AppHistory.Provider>
  );
};

export const useAppHistory = () => useContext(AppHistory);
