// Import placeholder images for fallbacks
import img1 from "../images/shows-5.png";
import img2 from "../images/shows-6.png";
import img3 from "../images/shows-7.png";
import img4 from "../images/shows-8.png";
import icon1 from "../images/h-01.png";
import icon2 from "../images/h-02.png";
import icon3 from "../images/h-03.png";
import icon4 from "../images/h-04.png";
import icon5 from "../images/h-05.png";

import thumb1 from "../images/latest-episode-1.png";
import thumb2 from "../images/latest-episode-2.png";
import thumb3 from "../images/latest-episode-3.png";
import thumb4 from "../images/latest-episode-4.png";
import thumb5 from "../images/latest-episode-5.png";
import thumb6 from "../images/latest-episode-6.png";
import thumb7 from "../images/latest-episode-7.png";

import banner1 from "../images/favorite-show-1.png";
import banner2 from "../images/favorite-show-2.png";
import banner3 from "../images/favorite-show-3.png";
import banner4 from "../images/favorite-show-4.png";
import banner5 from "../images/favorite-show-5.png";
import banner6 from "../images/favorite-show-6.png";
import banner7 from "../images/favorite-show-7.png";
import banner8 from "../images/favorite-show-8.png";

// Fallback arrays for when API images are not available
const fallbackImages = [img1, img2, img3, img4];
const fallbackIcons = [icon1, icon2, icon3, icon4, icon5];
const fallbackThumbs = [thumb1, thumb2, thumb3, thumb4, thumb5, thumb6, thumb7];
const fallbackBanners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8];

// API service class
class EpisodesService {
  constructor() {
    this.baseUrl = 'https://api.technaija.fm/api/episode/all';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Generate cache key from params
  getCacheKey(params) {
    return JSON.stringify(params);
  }

  // Check if cache is valid
  isCacheValid(cacheEntry) {
    return Date.now() - cacheEntry.timestamp < this.cacheTimeout;
  }

  // Transform API data to match expected structure
  transformEpisodeData(apiEpisode, index) {
    const fallbackIndex = index % fallbackImages.length;
    
    return {
      id: apiEpisode.id,
      img: apiEpisode.imageUrl || fallbackImages[fallbackIndex],
      icon: fallbackIcons[index % fallbackIcons.length],
      thumb: apiEpisode.imageUrl || fallbackThumbs[index % fallbackThumbs.length],
      banner: apiEpisode.imageUrl || fallbackBanners[index % fallbackBanners.length],
      title: apiEpisode.title,
      shortDesc: apiEpisode.shortDescription || apiEpisode.description?.substring(0, 100) + '...' || 'No description available',
      link: `/episode-details/${apiEpisode.slug || apiEpisode.id}`,
      host: {
        name: apiEpisode.hostName || "TechNaija Host",
        link: `/host-details/${apiEpisode.hostId || 1}`,
      },
      guest: apiEpisode.guestName ? {
        name: apiEpisode.guestName,
        link: `/guest-details/${apiEpisode.guestId || 1}`,
      } : null,
      time: this.formatDuration(apiEpisode.durationInSeconds),
      episode: `Episode ${apiEpisode.episodeNo || apiEpisode.id}`,
      audio: apiEpisode.audioUrl || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(index % 10) + 1}.mp3`,
      video: apiEpisode.videoUrl || null,
      publishedDate: apiEpisode.publishedDate,
      eventDateString: apiEpisode.eventDateString,
      totalViews: apiEpisode.totalViews || 0,
      totalLikes: apiEpisode.totalLikes || 0,
      isPublished: apiEpisode.isPublished,
      category: apiEpisode.category,
      slug: apiEpisode.slug,
      description: apiEpisode.description
    };
  }

  // Format duration from seconds to readable format
  formatDuration(durationInSeconds) {
    if (!durationInSeconds || durationInSeconds === '') {
      return '4hr 12min'; // fallback duration
    }
    
    const seconds = parseInt(durationInSeconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}hr ${minutes}min`;
    } else {
      return `${minutes}min`;
    }
  }

  // Fetch episodes from API
  async fetchEpisodes(params = {}) {
    const defaultParams = {
      pageNumber: 1,
      pageSize: 20,
      ...params
    };

    const cacheKey = this.getCacheKey(defaultParams);
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cacheEntry = this.cache.get(cacheKey);
      if (this.isCacheValid(cacheEntry)) {
        return cacheEntry.data;
      }
    }

    try {
      const queryParams = new URLSearchParams(defaultParams).toString();
      const response = await fetch(`${this.baseUrl}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiData = await response.json();
      
      // Transform API data to match expected structure
      const transformedData = {
        items: apiData.items.map((episode, index) => this.transformEpisodeData(episode, index)),
        pagination: {
          totalCount: apiData.totalCount,
          pageNumber: apiData.pageNumber,
          pageSize: apiData.pageSize,
          totalPages: apiData.totalPages,
          hasPreviousPage: apiData.hasPreviousPage,
          hasNextPage: apiData.hasNextPage
        }
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: transformedData,
        timestamp: Date.now()
      });

      return transformedData;
    } catch (error) {
      console.error('Error fetching episodes:', error);
      
      // Return fallback data in case of error
      return {
        items: [],
        pagination: {
          totalCount: 0,
          pageNumber: 1,
          pageSize: 20,
          totalPages: 0,
          hasPreviousPage: false,
          hasNextPage: false
        },
        error: error.message
      };
    }
  }

  // Get single episode by ID
  async fetchEpisodeById(id) {
    try {
      // First try to get from cache
      for (const [key, cacheEntry] of this.cache.entries()) {
        if (this.isCacheValid(cacheEntry)) {
          const episode = cacheEntry.data.items.find(ep => ep.id === parseInt(id));
          if (episode) {
            return episode;
          }
        }
      }

      // If not in cache, fetch all episodes and find the one we need
      const data = await this.fetchEpisodes();
      return data.items.find(ep => ep.id === parseInt(id)) || null;
    } catch (error) {
      console.error('Error fetching episode by ID:', error);
      return null;
    }
  }

  // Search episodes
  async searchEpisodes(searchTerm, params = {}) {
    try {
      const data = await this.fetchEpisodes(params);
      const filteredItems = data.items.filter(episode =>
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        episode.host.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (episode.guest && episode.guest.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      return {
        ...data,
        items: filteredItems
      };
    } catch (error) {
      console.error('Error searching episodes:', error);
      return {
        items: [],
        pagination: {
          totalCount: 0,
          pageNumber: 1,
          pageSize: 20,
          totalPages: 0,
          hasPreviousPage: false,
          hasNextPage: false
        },
        error: error.message
      };
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

// Create singleton instance
const episodesService = new EpisodesService();

// For backward compatibility, export a function that returns the episodes
export const getEpisodesData = async (params = {}) => {
  const data = await episodesService.fetchEpisodes(params);
  return data.items; // Return just the items array for backward compatibility
};

// Export the service instance for more advanced usage
export { episodesService };

// Default export for backward compatibility
export default getEpisodesData;