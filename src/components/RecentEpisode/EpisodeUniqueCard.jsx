import HostName from "../Shared/HostName";
import PodcastTime from "../Shared/PodcastTime";
import AddToWishlist from "../Shared/AddToWishlist";
import SlideTrack from "../Shared/SlideTrack";
import trackImg from "../../images/record-2.png";
import { Link } from "react-router-dom";
import Heading from "../Shared/Heading";
import CircleBtn from "../Shared/CircleBtn";

const EpisodeUniqueCard = ({ cardData }) => {
  return (
    <div className="unique-episode-card d-flex flex-column flex-lg-row rounded-4 bcp-1-2">
      <div
        className="card-banner d-flex justify-content-center mb-4 mb-lg-0 px-4 px-lg-0"
        style={{ flex: "0 0 450px", maxWidth: "450px" }}
      >
        <img
          className="img-fluid rounded-3 shadow-sm mx-auto"
          src={cardData.img}
          alt={`${cardData.title} episode cover`}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Content Section */}
      <div className="card-content p-xxl-10 p-6 d-flex flex-column flex-grow-1">
        {/* Top Section: Host + Time + Track */}
        <div className="card-top d-between gap-xxl-6 gap-4 mb-6">
          <div className="d-flex align-items-center gap-sm-4 gap-2 flex-wrap flex-sm-nowrap text-dark text-decoration-none link-dark">
            <HostName
              // link={cardData.host.hostLink}
              icon={<i className="ti ti-microphone"></i>}
              iconColor="tcn-700"
              hostName={cardData.host.name}
              txtColor="tcn-700"
              hoverColor="link-text-2"
            />
            <PodcastTime
              time={cardData.eventDateString}
              icon={<i className="ti ti-clock"></i>}
              txtColor="tcn-700"
              iconColor="tcn-700"
            />
          </div>
          <SlideTrack
            visibility={"d-none d-sm-block"}
            trackImg={trackImg}
            trackHeight={"height-46"}
          />
        </div>

        {/* Title */}
        <span className="tcn-700 text-dark text-decoration-none link-dark">
          <Heading
            HeadType="h3"
            headText={cardData.title}
            charLimit={90}
            headClass="fw-semibold mb-4"
          />
        </span>

        {/* Short Description */}
        <p className="fs-sm tcn-700 flex-grow-1">{cardData.shortDescription}</p>

        {/* Actions */}
        {cardData.videoUrl || cardData.audioUrl ? (
          <a
            href={cardData.videoUrl || cardData.audioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="d-between flex-wrap flex-sm-nowrap gap-6 mt-8 text-dark text-decoration-none link-dark"
          >
            <CircleBtn
              type={"button"}
              text={"Play Episode"}
              icon={<i className="ti ti-player-play"></i>}
              altColor="alt-color"
            />
            <span className="tag-btn alt-color">{cardData.episode}</span>
          </a>
        ) : (
          <a
            href="https://www.youtube.com/@TECHNAIJA-Studio"
            target="_blank"
            rel="noopener noreferrer"
            className="d-between flex-wrap flex-sm-nowrap gap-6 mt-8 text-dark text-decoration-none link-dark"
          >
            <CircleBtn
              type={"button"}
              text={"Play Episode"}
              icon={<i className="ti ti-player-play"></i>}
              altColor="alt-color"
            />
            <span className="tag-btn alt-color">{cardData.episode}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default EpisodeUniqueCard;
