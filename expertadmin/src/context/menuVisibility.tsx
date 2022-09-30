import React, { useState } from 'react';
import { MenuWidth } from 'utils/constants';

type MenuVisibilityType = {
  menuWidthPx: number;
  setMenuWidthPx?: (value: number) => void;
};

const MenuVisibility = React.createContext<MenuVisibilityType>({
  menuWidthPx: MenuWidth,
});

type MenuVisibilityProps = {
  children: React.ReactNode;
};

export const MenuVisibilityProvider = ({ children }: MenuVisibilityProps) => {
  const [menuWidthPx, setMenuWidthPx] = useState<number>(MenuWidth);

  return (
    <MenuVisibility.Provider value={{ menuWidthPx, setMenuWidthPx }}>
      {children}
    </MenuVisibility.Provider>
  );
};

export const useMenuVisibility = () => React.useContext(MenuVisibility);
