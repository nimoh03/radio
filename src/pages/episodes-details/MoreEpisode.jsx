import { useState, useEffect } from "react";
import SectionHeading from "@/components/Shared/SectionHeading";
import EpisodesSlider from "@/components/Shared/Slider/EpisodesSlider";
import SliderNavigatorBtn from "@/components/Shared/Slider/SliderNavigatorBtn";
import SliderPaginationBtn from "@/components/Shared/Slider/SliderPaginationBtn";
import { episodesService } from "@/data/EpisodesData"; // Import the service instead
import FadeRight from "@/motion/FadeRight";
import FadeUp from "@/motion/FadeUp";

const MoreEpisode = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch episodes with pagination
        const data = await episodesService.fetchEpisodes({
          pageNumber: 1,
          pageSize: 10 // Adjust based on how many you want to show
        });
        
        setEpisodes(data.items);
      } catch (err) {
        console.error('Error fetching episodes:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="more-episodes-section pt-120 pb-120 texture-bg-2">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading episodes...</span>
              </div>
              <p className="mt-3">Loading episodes...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="more-episodes-section pt-120 pb-120 texture-bg-2">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="alert alert-danger" role="alert">
                <h4 className="alert-heading">Error Loading Episodes</h4>
                <p>There was an error loading the episodes: {error}</p>
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (!episodes || episodes.length === 0) {
    return (
      <section className="more-episodes-section pt-120 pb-120 texture-bg-2">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h3>No Episodes Available</h3>
              <p>There are currently no episodes to display.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="more-episodes-section pt-120 pb-120 texture-bg-2">
      <div className="container">
        <div className="row align-items-center g-4 mb-lg-15 mb-sm-10 mb-6">
          <div className="col-lg-8">
            <FadeRight>
              <div className="text-center text-lg-start">
                <SectionHeading
                  subTxt={"More Episode"}
                  HeadingType="h4"
                  headTxt={"More Related Episodes"}
                  icon={<i className="ti ti-rocket"></i>}
                  headFs="display-four"
                  fw="fw-bold"
                />
              </div>
            </FadeRight>
          </div>
          <div className="col-lg-4 d-none d-lg-block">
            <SliderNavigatorBtn
              nextBtn={"more-episodes-next"}
              prevBtn={"more-episodes-prev"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <FadeUp>
              <EpisodesSlider 
                sliderData={episodes}
                paginationEl={".more-episodes-pagination"}
                nextEl={".more-episodes-next"}
                prevEl={".more-episodes-prev"}
              />
              <div className="mt-lg-10 mt-8 text-center">
                <SliderPaginationBtn
                  paginationEl={"more-episodes-pagination"}
                />
                <div className="d-lg-none">
                  <SliderNavigatorBtn
                    nextBtn={"more-episodes-next"}
                    prevBtn={"more-episodes-prev"}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreEpisode;