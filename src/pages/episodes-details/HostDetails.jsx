import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SocialList from "@/components/Shared/SocialList";
import hostImg from "@/images/host-profile-2.png"; // Default fallback image

const HostDetails = ({ data }) => {
    const [episodeData, setEpisodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const { id } = useParams(); // Get the ID from URL
  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.technaija.fm/api/episode/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setEpisodeData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
       
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEpisodeData();
    }
  }, [id]);


  
 

  

  return (
    <div className="host-card-wrapper p-xxl-8 p-4 rounded bgc-1">
      <div className="host-thumb mx-auto position-relative mb-lg-6 mb-4">
        <img
          className="w-100 rounded-circle"
          src={episodeData?.host?.profilePictureUrl || hostImg}
          alt="host picture"
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
            {episodeData?.host?.name || "Host Name"}
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