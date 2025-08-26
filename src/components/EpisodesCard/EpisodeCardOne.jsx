import HostName from "../Shared/HostName";
import PodcastTime from "../Shared/PodcastTime";
import AddToWishlist from "../Shared/AddToWishlist";
import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";
import CircleBtn from "../Shared/CircleBtn";
const EpisodeCardOne = ({ data }) => {

  
  return (
   <Link to={`/episode-details/${data?.id}`} className="text-decoration-none">
  <div className="episode-card d-flex flex-md-row flex-column align-items-center bgc-2 rounded-3">
    <div className="card-img p-3">
      <img className="w-100 h-100 rounded" src={data?.thumb} alt="image" />
    </div>
    <div className="card-content p-6">
      <div className="card-top d-between flex-wrap flex-sm-nowrap gap-xxl-6 gap-4 mb-lg-6 mb-4">
        <div className="d-flex align-items-center flex-wrap flex-sm-nowrap gap-xxl-6 gap-4">
          <HostName
            link={`/episode-details/${data?.id}`}
            icon={<i className="ti ti-microphone"></i>}
            hostName={data?.host?.name}
          />
          <PodcastTime
            time={data?.time}
            icon={<i className="ti ti-clock"></i>}
          />
        </div>
        <AddToWishlist />
      </div>
      <Heading
        HeadType="h3"
        headText={data?.title}
        charLimit={60}
        headClass="fw-semibold mb-4"
      />
      <p className="fs-sm">{data?.shortDesc}</p>
      <div className="d-between flex-wrap flex-sm-nowrap gap-lg-6 gap-4 mt-lg-8 mt-6">
        <CircleBtn
          type={"button"}
          text={"Listen Now"}
          icon={<i className="ti ti-player-play"></i>}
          iconSize="fs-xl"
          onClick={(e) => {
            e.preventDefault(); // Prevent link navigation
            e.stopPropagation(); // Stop event bubbling
            // Add your audio play logic here
            // handlePlayButtonClick(data?.audioUrl);
          }}
        />
        <span className="tag-btn">{data?.episode}</span>
      </div>
    </div>
  </div>
</Link>
  );
};

export default EpisodeCardOne;
