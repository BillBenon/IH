import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useAppHistory } from 'context/appHistory';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { TrackFilter } from 'types';
import { isNumeric } from 'utils/commonutils';
import { MenuItems, Routes } from 'utils/constants';

import { getAllTracks } from './trackActions';
import { setPaginationFilter, setTrackInputFilter } from './trackSlice';

export const useTracks = () => {
  const history = useHistory();
  const { recentItems, pushHistory } = useAppHistory();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const { loading, tracks, totalTracks, filterRequest } = useSelector(
    (state: RootState) => state.track
  );
  const dispatch = useAppDispatch();
  const { expertId } = expert!;

  const fetchTracks = () => {
    dispatch(getAllTracks({ ...filterRequest, expertId }));
  };

  const setTrackFilter = (request: TrackFilter) => {
    const { title, description, detailsDescription } = request;
    dispatch(setTrackInputFilter({ title, description, detailsDescription }));
  };

  const setPaginationFilters = (skipCount: number) => {
    dispatch(setPaginationFilter({ skipCount }));
  };

  const routeToAddOrEditTrack = (
    isAdd?: boolean,
    trackId?: string,
    title?: string
  ) => {
    if (!trackId) {
      // trackId = selectedTrack?.trackId;
    }
    if (!isAdd && trackId) {
      pushHistory(MenuItems.tracks, trackId, { title });
      history.push(Routes[MenuItems.tracks] + `/${trackId}`);
    } else {
      history.push(
        Routes[MenuItems.tracks] +
          `/${
            (recentItems[MenuItems.tracks]?.filter((m: any) =>
              isNumeric(m.param)
            )?.length || 0) + 1
          }`
      );
    }
  };

  return [
    {
      routeToAddOrEditTrack,
      setTrackFilter,
      setPaginationFilters,
      fetchTracks,
      loading,
      tracks,
      totalTracks,
      filterRequest,
    },
  ];
};
