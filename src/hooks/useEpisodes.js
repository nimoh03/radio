// hooks/useEpisodes.js
import { useState, useEffect } from 'react';

const useEpisodes = (pageNumber = 1, pageSize = 20) => {
  const [episodes, setEpisodes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.technaija.fm/api/episode/all?pageNumber=${pageNumber}&pageSize=${pageSize}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle the paginated response structure
        let episodesArray = [];
        let paginationInfo = {};
        
        if (data && data.items && Array.isArray(data.items)) {
          episodesArray = data.items;
          paginationInfo = {
            totalCount: data.totalCount,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalPages: data.totalPages,
            hasPreviousPage: data.hasPreviousPage,
            hasNextPage: data.hasNextPage
          };
        } else if (Array.isArray(data)) {
          episodesArray = data;
        } else {
          console.error('Unexpected API response structure:', data);
          throw new Error('API response is not in expected format');
        }
        
        // Transform API data to match your component's expected structure
        const transformedData = episodesArray.map((episode, index) => ({
          id: episode.id,
          img: episode.imageUrl,
          title: episode.title,
          host: {
            name: episode.hostName,
            link: "/host-details",
            guestName: episode.guestName,
          },
          episode: `Episode ${episode.episodeNo}`,
          audio: episode.videoUrl, // Using videoUrl as audio for now
          slug: episode.slug,
          publishedDate: episode.publishedDate,
          durationInSeconds: episode.durationInSeconds,
          totalViews: episode.totalViews,
          totalLikes: episode.totalLikes,
          isPublished: episode.isPublished,
          shortDescription : episode.shortDescription,
          eventDateString: episode.eventDateString,
          btnData: {
            btnText: "Watch on YouTube",
            btnLink: `/episode/${episode.slug}`,
          }
        }));
        
        setEpisodes(transformedData);
        setPagination(paginationInfo);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching episodes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [pageNumber, pageSize]);

  return { episodes, pagination, loading, error, refetch: () => fetchEpisodes() };
};

export default useEpisodes;