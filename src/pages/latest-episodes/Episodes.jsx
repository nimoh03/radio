import { useEffect, useState } from "react";
import EpisodeCardOne from "@/components/EpisodesCard/EpisodeCardOne";
import Pagination from "@/components/Shared/Pagination";
import FadeDown from "@/motion/FadeDown";
import FadeUp from "@/motion/FadeUp";

const Episodes = ({ searchKeyword, removeSearchHistory }) => {
  // Base URL for API and images
  const API_BASE_URL = 'https://api.technaija.fm';
  
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false
  });

  const fetchEpisodes = async (page = 1, size = 20, searchQuery = '') => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query parameters
      const params = new URLSearchParams({
        pageNumber: page.toString(),
        pageSize: size.toString(),
        sort: '1' // Default sort value
      });
      
      // Add search query if exists
      if (searchQuery) {
        params.append('q', searchQuery);
      }
      
      const response = await fetch(
        `${API_BASE_URL}/api/episode/all?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Helper function to construct full image URL
      const getFullImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('https://') || imagePath.startsWith('http://')) return imagePath; // Already full URL
        return `${API_BASE_URL}${imagePath}`; // Prepend base URL to relative path
      };

      // Helper function to format duration
      const formatDuration = (durationInSeconds) => {
        if (!durationInSeconds || durationInSeconds === "" || durationInSeconds === "0") return "Duration TBD";
        
        const totalSeconds = parseInt(durationInSeconds);
        if (isNaN(totalSeconds) || totalSeconds === 0) return "Duration TBD";
        
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        
        if (hours > 0) {
          return `${hours}hr ${minutes}min`;
        } else {
          return `${minutes}min`;
        }
      };

      // Helper function to format published date
      const formatPublishedDate = (dateString) => {
        if (!dateString) return null;
        try {
          const date = new Date(dateString);
          return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        } catch (error) {
          return dateString; // Return original if parsing fails
        }
      };

      // Transform API data to match your existing component structure
      const transformedEpisodes = data.items.map(item => ({
        id: item.id,
        title: item.title,
        shortDesc: item.shortDescription || item.description || item.title, // Use shortDescription first, then description, fallback to title
        description: item.description, // Full description
        link: `/episode-details/${item.slug}`,
        host: {
          name: item.hostName,
          link: "/host-details",
          id: item.hostId
        },
        guest: item.guestName ? {
          name: item.guestName,
          link: "/guest-details",
          id: item.guestId
        } : null,
        time: formatDuration(item.durationInSeconds),
        episode: `Episode ${item.episodeNo}`,
        img: getFullImageUrl(item.imageUrl),
        banner: getFullImageUrl(item.imageUrl),
        thumb: getFullImageUrl(item.imageUrl),
        publishedDate: formatPublishedDate(item.publishedDate),
        eventDateString: item.eventDateString, // New field
        totalViews: item.totalViews || 0,
        totalLikes: item.totalLikes || 0,
        category: item.category, // Can be null
        slug: item.slug,
        videoUrl: item.videoUrl, // New field
        isPublished: item.isPublished,
        durationInSeconds: item.durationInSeconds
      }));
      
      setEpisodes(transformedEpisodes);
      setPagination({
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalCount: data.totalCount,
        totalPages: data.totalPages,
        hasPreviousPage: data.hasPreviousPage,
        hasNextPage: data.hasNextPage
      });
      
    } catch (err) {
      setError(err.message);
    
    } finally {
      setLoading(false);
    }
  };

  // Fetch episodes on component mount and when search keywords change
  useEffect(() => {
    const searchQuery = searchKeyword?.length > 0 ? searchKeyword.join(' ') : ''; // Handle undefined searchKeyword
    fetchEpisodes(1, 20, searchQuery);
  }, [searchKeyword]);

  // Handle pagination
  const handlePageChange = (page) => {
    const searchQuery = searchKeyword?.length > 0 ? searchKeyword.join(' ') : '';
    fetchEpisodes(page, pagination.pageSize, searchQuery);
  };

  if (error) {
    return (
      <section className="latest-episodes-section pt-15 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <p className="text-danger">Error loading episodes: {error}</p>
            <button 
              className="btn btn-primary mt-3" 
              onClick={() => fetchEpisodes()}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="latest-episodes-section pt-15 pb-120 texture-bg-1">
      <div className="container">
        {searchKeyword?.length > 0 && (
          <FadeDown>
            <div className="d-between gap-2 flex-wrap align-items-center mb-lg-10 mb-sm-6 mb-4">
              <p>{pagination.totalCount} Episodes Available</p>
              <ul
                className={`search-tag-list d-flex justify-content-lg-end flex-wrap gap-3 tcp-1 ${
                  searchKeyword.length > 6 ? "small-tag-list" : ""
                }`}
              >
                {searchKeyword?.map((item, i) => (
                  <li key={i} className="d-flex align-items-center gap-2">
                    <span>{item}</span>
                    <button onClick={() => removeSearchHistory(item)}>
                      <i className="ti ti-x"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </FadeDown>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading episodes...</p>
          </div>
        ) : (
          <>
            <div className="row g-6">
              {episodes?.map((item, i) => (
                <div className="col-xxl-6" key={item.id}>
                  <FadeUp>
                    <EpisodeCardOne data={item} />
                  </FadeUp>
                </div>
              ))}
            </div>

            {episodes.length === 0 && !loading && (
              <div className="text-center py-5">
                <p>No episodes found.</p>
                {searchKeyword?.length > 0 && (
                  <p className="text-muted">Try adjusting your search terms or clear the search filters.</p>
                )}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.pageNumber}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
                hasPreviousPage={pagination.hasPreviousPage}
                hasNextPage={pagination.hasNextPage}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Episodes;