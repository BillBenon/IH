import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
import { OnboardingModal } from '../components/OnboardingModal';
import { RootState } from '../store';
import { post } from '../utilities';
import { API_URL_PREFIX, ConfigTypes, DEFAULT_TOKEN, MenuItems, RoleType, RouterMap } from '../utilities/constants';
import { UserRoleProvider } from "./userRoleProvider";

type MenuVisibilityContextType = {
  isMenuVisible: boolean;
  setMenuVisibility: (value: boolean) => void;
};

const MenuVisibilityContext = React.createContext<
  MenuVisibilityContextType | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
};

export const MenuVisibilityProvider = ({ children }: Props) => {
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);
  const { expertId } = user;
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);
  const [isMenuVisible, setMenuVisibility] = useState(true);

  useEffect(() => {
    setMenuVisibility(true);
  }, []);

  useEffect(() => {
    if (expertId) {
      getExpertOnboardingConfig();
    }
  }, [expertId])


  const getExpertOnboardingConfig = async () => {
    if (expertId) {
      const result = await post(API_URL_PREFIX + '/getExpertConfig', { token: DEFAULT_TOKEN, expertId, type: ConfigTypes.SAW_ON_BOARDING_VIDEO });
      setShowOnboardingModal(!result?.output?.configs?.value);
    }
  }

  const markAsDone = async () => {
    await post(API_URL_PREFIX + '/setExpertConfig', { token: DEFAULT_TOKEN, expertId: expertId, configs: [{ key: ConfigTypes.SAW_ON_BOARDING_VIDEO, value: true }] })
    setShowOnboardingModal(false);
  }

  const goToOnboardingVideo = () => {
    history.push(RouterMap[MenuItems.settings]);
    setShowOnboardingModal(false);
  }

  const isHiringManagerUser = user.roleType === RoleType.HIRING_MANAGER;

  return (
    <MenuVisibilityContext.Provider value={{ isMenuVisible, setMenuVisibility }}>
      <UserRoleProvider>
        {showOnboardingModal && !isHiringManagerUser && <OnboardingModal onMarkDone={markAsDone} goToVideo={goToOnboardingVideo}></OnboardingModal>}
        {children}
      </UserRoleProvider>
    </MenuVisibilityContext.Provider>
  );
};

export const useMenuVisibility = () => React.useContext(MenuVisibilityContext);
