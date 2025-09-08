import { useDispatch, useSelector } from "react-redux";
import { setCustomModal } from "../../redux/features/modalSlice";
import { setTrack } from "../../redux/features/trackSlice";

const usePlayButtonClick = () => {
  const dispatch = useDispatch();
  const audioTrack = useSelector((state) => state.track);

  const audio = audioTrack?.url;
  const isPlaying = audioTrack?.isPlaying;

  const handlePlayButtonClick = (audioLink) => {
    dispatch(setCustomModal(true));

    if (isPlaying) {
      if (audio === audioLink) {
        dispatch(setTrack({ url: audioLink, isPlaying: false }));
      } else {
        dispatch(setTrack({ url: audioLink, isPlaying: true }));
      }
    } else {
      dispatch(setTrack({ url: audioLink, isPlaying: true }));
    }
  };
  return { handlePlayButtonClick };
};

export default usePlayButtonClick;
