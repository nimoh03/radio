import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircleBtn from "@/components/Shared/CircleBtn";
import Heading from "@/components/Shared/Heading";
import HostName from "@/components/Shared/HostName";
import PodcastTime from "@/components/Shared/PodcastTime";
import HostImg from "@/images/ep-details.png";
import usePlayButtonClick from "@/hooks/useAudioPlayer/usePlayButtonClick";
import About from '@/images/about-us-banner.png'

const EpisodeShortDetails = () => {
  const { id } = useParams(); // Get the ID from URL
  const { handlePlayButtonClick } = usePlayButtonClick();
  
  const [episodeData, setEpisodeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch episode data when component mounts or ID changes
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
        console.error('Error fetching episode data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEpisodeData();
    }
  }, [id]);

  // Helper function to format duration
  const formatDuration = (durationInSeconds) => {
    if (!durationInSeconds || durationInSeconds === "") {
      return "Duration not available";
    }
    
    const totalMinutes = Math.floor(durationInSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
      return `${hours}hr ${minutes}min`;
    }
    return `${minutes}min`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="episode-details-card d-flex justify-content-center align-items-center p-8">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="episode-details-card d-flex justify-content-center align-items-center p-8">
        <div className="alert alert-danger" role="alert">
          Error loading episode: {error}
        </div>
      </div>
    );
  }

  // No data state
  if (!episodeData) {
    return (
      <div className="episode-details-card d-flex justify-content-center align-items-center p-8">
        <div className="alert alert-warning" role="alert">
          Episode not found
        </div>
      </div>
    );
  }

  return (
  <div className="episode-details-card d-flex flex-column align-items-stretch p-0 rounded bgc-2 shadow-sm">
  <div className="img-area p-3 pb-0">
    <img 
      className="w-100 rounded"
      style={{height: '350px', objectFit: 'cover'}}
      src={episodeData[0].imageUrl || HostImg}
      // src={About}
      alt="episode image"
      onError={(e) => {
        e.target.src = HostImg; // Fallback to default image
      }}
    />
  </div>
  
  <div className="episode-card small-card p-4">
    <div className="d-flex flex-wrap flex-sm-nowrap align-items-center gap-lg-6 gap-4 mb-lg-6 mb-4">
      <span className="tag-btn">
        Episode {episodeData[0].episodeNo || id}
      </span>
      <HostName 
        icon={<i className="ti ti-microphone"></i>}
        link={episodeData[0].hostId ? `/host-details/${episodeData[0].hostId}` : "/host-details"}
        hostName={episodeData[0].host?.name || "Host Name"}
      />
      <PodcastTime 
        icon={<i className="ti ti-clock"></i>}
        time={formatDuration(episodeData[0].durationInSeconds)}
      />
    </div>
    
    <Heading 
      HeadType="h3"
      headText={episodeData[0].title || "Episode Title"}
      headClass="fw-semibold mb-4"
    />
    
    <p className="fs-sm fw-normal">
      {episodeData[0].description || episodeData[0].shortDescription || "Episode description not available"}
    </p>
    
    {/* Additional episode info */}
    <div className="episode-stats d-flex gap-4 mb-4">
      <span className="text-muted">
        <i className="ti ti-heart"></i> {episodeData[0].totalLikes || 0} likes
      </span>
      <span className="text-muted">
        <i className="ti ti-eye"></i> {episodeData[0].totalViews || 0} views
      </span>
      <span className="text-muted">
        <i className="ti ti-message-circle"></i> {episodeData[0].totalComments || 0} comments
      </span>
    </div>
    
    <div className="mt-lg-8 mt-6">
      <CircleBtn 
        type={"button"}
        text={"Listen Now"}
        onClick={() => {
          const audioUrl = episodeData[0].audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3";
          handlePlayButtonClick(audioUrl);
        }}
        icon={<i className="ti ti-player-play"></i>}
        iconSize="fs-xl"
      />
    </div>
  </div>
</div>
  );
};

export default EpisodeShortDetails;