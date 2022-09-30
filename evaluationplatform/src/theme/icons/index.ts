import {
  VerticalTrackCardLeftImage,
  VerticalTrackCardMiddleImage,
  VerticalTrackCardRightImage,
  WebDevelopmentIcon,
  BulbIcon,
  HumanHeadIcon,
} from '../../assets';
import ListIcon from './sidebar/listIcon';
import HomeIcon from './sidebar/homeIcon';
import SettingsIcon from './sidebar/settingsIcon';
import YoutubeIcon from './sidebar/youtubeIcon';
import MeetingIcon from './sidebar/meetingIcon';

interface IIconsAndColor {
  [key: string]: { icon: string; image: string };
}

export const CARD_ICON_AND_IMAGE: IIconsAndColor = {
  SDE: {
    icon: WebDevelopmentIcon,
    image: VerticalTrackCardLeftImage,
  },
  SDM: {
    icon: BulbIcon,
    image: VerticalTrackCardMiddleImage,
  },
  TPM: {
    icon: HumanHeadIcon,
    image: VerticalTrackCardRightImage,
  },
};

export { ListIcon, HomeIcon, SettingsIcon, YoutubeIcon, MeetingIcon };
