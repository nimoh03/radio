import HostName from "./../Shared/HostName";
import PodcastTime from "../Shared/PodcastTime";
import AddToWishlist from "../Shared/AddToWishlist";
import SlideTrack from "../Shared/SlideTrack";
import trackImg from "../../images/record.png";
import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";
import CircleBtn from "../Shared/CircleBtn";

const EpisodeCommonCard = ({ cardData }) => {
  console.log(cardData);
  
  return (
    <div className="common-episode-card p-xxl-10 p-6 bgc-2 rounded">
      <div className="card-top d-between gap-xxl-6 gap-4 mb-6">
        <div className="d-flex align-items-center gap-sm-4 gap-2 flex-wrap flex-sm-nowrap">
          <HostName
            link={cardData?.host?.hostLink}
            icon={<i className="ti ti-microphone"></i>}
            hostName={cardData.host?.name}
          />
          <PodcastTime
            time={cardData?.eventDateString}
            icon={<i className="ti ti-clock"></i>}
          />
        </div>
        <SlideTrack
          visibility={"d-none d-sm-block"}
          trackImg={trackImg}
          trackHeight={"height-46"}
        />
      </div>
      <span  className="link-text">
        <Heading
          HeadType="h3"
          headText={cardData?.title}
          charLimit={60}
          headClass="fw-semibold mb-4"
        />
      </span>
      <p className="fs-sm fw-normal">{cardData?.shortDescription}</p>
     <div className="d-between flex-wrap flex-sm-nowrap gap-6 mt-8">
  {/* Use the audio property instead of videoUrl */}
  <a href={cardData?.audio}>
    <CircleBtn
      type={"button"}
      text={"Play Episode"}
      icon={<i className="ti ti-player-play"></i>}
      iconSize="fs-xl"
    />
  </a>
  
  <span className="tag-btn">{cardData?.episode}</span>
</div>
    </div>
  );
};

export default EpisodeCommonCard;
