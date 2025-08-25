// hooks/useTestimonies.js
import { useState, useEffect } from 'react';

const useTestimonies = () => {
  const [testimonies, setTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.technaija.fm/api/testimonies/all`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Handle the paginated response structure
        let testimoniesArray = [];
        if (data) {
          testimoniesArray = data;
        } else if (Array.isArray(data)) {
          testimoniesArray = data;
        } else {
          console.error('Unexpected API response structure:', data);
          throw new Error('API response is not in expected format');
        }
        // Transform API data to match your component's expected structure
        const transformedData = testimoniesArray.map((testimonies, index) => ({
          img: testimonies.picture,
          role: testimonies.role,
          name: testimonies.name,
          content: testimonies.content,
        }));
        
        setTestimonies(transformedData);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching episodes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonies();
  });

  return { testimonies, loading, error, refetch: () => fetchTestimonies() };
};

export default useTestimonies;