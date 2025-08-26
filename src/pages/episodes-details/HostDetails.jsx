import { Link } from "react-router-dom";
import SocialList from "@/components/Shared/SocialList";
import hostImg from "@/images/host-profile-2.png"; // Default fallback image

const HostDetails = ({ data }) => {
  // console.log(data);
  return (
    <div className="host-card-wrapper p-xxl-8 p-4 rounded bgc-1">
      <div className="host-thumb mx-auto position-relative mb-lg-6 mb-4">
        <img
          className="w-100 rounded-circle"
          src={data?.profile || hostImg}
          alt="host thumb"
          onError={(e) => {
            e.target.src = hostImg; // Fallback to default image on error
          }}
          style={{aspectRatio: '1/1', objectFit: 'cover'}}
        />
        <span className="online-active me-md-2 me-1 mb-md-2 mb-1"></span>
      </div>
      <div className="host-details mb-lg-6 mb-4">
        <span className="text-center d-block tcp-1 mb-2">Hosted by</span>
        <h4 className="text-center fw-semibold mb-2 link-text">
          <Link to={data?.link || "/host-details"}>
            {data?.name || "Host Name"}
          </Link>
        </h4>
        <span className="text-center d-block">
          {data?.category || data?.specialty || "Podcast Host"}
        </span>
      </div>
      {data?.socials && data.socials.length > 0 && (
        <SocialList socials={data.socials} className="justify-content-center" />
      )}
    </div>
  );
};

export default HostDetails;