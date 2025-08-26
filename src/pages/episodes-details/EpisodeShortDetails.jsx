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
  console.log(episodeData);
  

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

  // Helper function to format the createdAt date
  const formatEpisodeDate = (dateString) => {
    if (!dateString) return "Date unavailable";
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      // Format as "Month Day, Year" - e.g., "August 26, 2025"
      const options = {
        month: 'long',    // "August"
        day: 'numeric',   // "26"
        year: 'numeric'   // "2025"
      };
      
      return date.toLocaleDateString('en-US', options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return "Date unavailable";
    }
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
 <div className="episode-details-card d-flex align-items-stretch p-0 rounded bgc-2 shadow-sm">   
  {/* Image Section - Takes up more space */}
  <div className="img-area p-3" style={{flex: '0 0 40%'}}>     
    <img        
      className="w-100 rounded"       
      style={{objectFit: 'cover', height: '100%'}}       
      src={episodeData.imageUrl || HostImg}       
      alt="episode image"       
      onError={(e) => {         
        e.target.src = HostImg; // Fallback to default image       
      }}     
    />   
  </div>      

  {/* Content Section */}
  <div className="episode-card small-card p-4 d-flex flex-column" style={{flex: '1'}}>     
    {/* Episode Info - Top */}
    <div className="d-flex flex-wrap flex-sm-nowrap align-items-center gap-lg-6 gap-4 mb-lg-4 mb-3">       
      <span className="tag-btn">         
        Episode {episodeData.episodeNo || id}       
      </span>       
      <HostName          
        icon={<i className="ti ti-microphone"></i>}         
        // link={episodeData[0].hostId ? `/host-details/${episodeData[0].hostId}` : "/host-details"}         
        hostName={episodeData.hostName || "Host Name"}       
      />       
      <PodcastTime          
        icon={<i className="ti ti-calendar"></i>}         
        time={formatEpisodeDate(episodeData.createdAt)}       
      />     
    </div>          
    
    {/* Title */}
    <Heading        
      HeadType="h3"       
      headText={episodeData.title || "Episode Title"}       
      headClass="fw-semibold mb-3"     
    />          
    
    {/* Description */}
    {/* <p className="fs-sm fw-normal mb-4">       
      {episodeData.description || episodeData.shortDescription || "Episode description not available"}     
    </p>           */}
    
    {/* Additional episode info */}     
    <div className="episode-stats d-flex gap-4 mb-4">       
      <span className="text-muted">         
        <i className="ti ti-heart"></i> {episodeData.totalLikes || 0} likes       
      </span>       
      <span className="text-muted">         
        <i className="ti ti-eye"></i> {episodeData.totalViews || 0} views       
      </span>       
      <span className="text-muted">         
        <i className="ti ti-message-circle"></i> {episodeData.totalComments || 0} comments       
      </span>     
    </div>          
    
    {/* Listen Now Button - Moved up and positioned at bottom of right section */}
    <div className="mt-auto">       
      <CircleBtn          
        type={"button"}         
        text={"Listen Now"}         
        onClick={() => {           
          const audioUrl = episodeData.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3";           
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