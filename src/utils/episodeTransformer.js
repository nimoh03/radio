// utils/episodeTransformer.js

/**
 * Transforms API episode data to match component structure
 * @param {Array} apiEpisodes - Raw episodes from API
 * @returns {Array} - Transformed episodes for components
 */
export const transformEpisodesForComponents = (apiEpisodes) => {
  if (!Array.isArray(apiEpisodes)) {
    console.warn('Expected array but got:', typeof apiEpisodes);
    return [];
  }

  return apiEpisodes.map((episode) => ({
    id: episode.id,
    img: episode.imageUrl,
    title: episode.title,
    host: {
      name: episode.hostName || episode.guestName || "Unknown Host",
      link: "/host-details",
    },
    episode: `Episode ${episode.episodeNo}`,
    audio: episode.videoUrl, // Using videoUrl as audio URL
    slug: episode.slug,
    publishedDate: episode.publishedDate,
    durationInSeconds: episode.durationInSeconds,
    totalViews: episode.totalViews,
    totalLikes: episode.totalLikes,
    isPublished: episode.isPublished,
    btnData: {
      btnText: "Listen Now",
      btnLink: `/episode/${episode.slug}`,
    }
  }));
};

/**
 * Formats episode duration from seconds to readable format
 * @param {string|number} durationInSeconds 
 * @returns {string} - Formatted duration (e.g., "1h 30m" or "45m")
 */
export const formatDuration = (durationInSeconds) => {
  if (!durationInSeconds || durationInSeconds === "") return "Duration N/A";
  
  const seconds = parseInt(durationInSeconds);
  if (isNaN(seconds)) return "Duration N/A";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Formats published date to readable format
 * @param {string} publishedDate - ISO date string
 * @returns {string} - Formatted date
 */
export const formatPublishedDate = (publishedDate) => {
  if (!publishedDate) return "Date N/A";
  
  try {
    const date = new Date(publishedDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.warn('Invalid date format:', publishedDate);
    return "Date N/A";
  }
};

/**
 * Formats view count to readable format
 * @param {number} views 
 * @returns {string} - Formatted view count (e.g., "1.2K", "1.5M")
 */
export const formatViewCount = (views) => {
  if (!views || views === 0) return "0 views";
  
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K views`;
  }
  return `${views} views`;
};