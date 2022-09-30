import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { RoleType } from "utilities/constants";

type Props = {
    children: React.ReactNode;
};

type UserRoleProviderContextType = {
    isHiringManagerUser: boolean | undefined;
}

const UserRoleProviderContext = React.createContext<UserRoleProviderContextType>({ isHiringManagerUser: undefined });


export const UserRoleProvider = ({ children }: Props) => {
    const { roleType } = useSelector((state: RootState) => state.auth.user);
    const isHiringManagerUserRole = roleType ? roleType === RoleType.HIRING_MANAGER : undefined;
    return (
        <UserRoleProviderContext.Provider value={{ isHiringManagerUser: isHiringManagerUserRole }}>
            {children}
        </UserRoleProviderContext.Provider>
    );
};

export const useRoleProvider = () => React.useContext(UserRoleProviderContext);