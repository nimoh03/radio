// components/FeaturedShows.jsx
import SectionHeading from "@/components/Shared/SectionHeading";
import FeaturedSliderOne from "@/components/Shared/Slider/FeaturedSliderOne";
import SliderNavigatorBtn from "@/components/Shared/Slider/SliderNavigatorBtn";
import SliderPaginationBtn from "@/components/Shared/Slider/SliderPaginationBtn";
import FadeUp from "@/motion/FadeUp";
import FadeDown from "@/motion/FadeDown";
import useEpisodes from "@/hooks/useEpisodes";

const FeaturedShows = ({ pageNumber = 1, pageSize = 6 }) => {
  const { episodes, loading, error } = useEpisodes(pageNumber, pageSize);

  // Loading state
  if (loading) {
    return (
      <div className="featured-shows pt-120 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading featured shows...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="featured-shows pt-120 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error Loading Shows</h4>
              <p>Unable to load featured shows: {error}</p>
              <button 
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No episodes state
  if (!episodes || episodes.length === 0) {
    return (
      <div className="featured-shows pt-120 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <h3>No Episodes Available</h3>
            <p>Check back later for new episodes!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-shows pt-120 pb-120 texture-bg-1">
      <div className="container mb-lg-15 mb-sm-10 mb-8">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <FadeDown>
              <div className="text-center text-lg-start">
                <SectionHeading
                  subTxt="Featured Shows"
                  icon={<i className="ti ti-rocket"></i>}
                  headTxt="Top Listens Now"
                  headFs="display-four"
                />
              </div>
            </FadeDown>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <FadeUp>
              <SliderNavigatorBtn
                nextBtn={"top-listens-next"}
                prevBtn={"top-listens-prev"}
              />
            </FadeUp>
          </div>
        </div>
      </div>
      <FadeUp>
        <div className="container-fluid">
          <FeaturedSliderOne
            nextEl={".top-listens-next"}
            prevEl={".top-listens-prev"}
            sliderData={episodes}
            paginationEl={".top-listens-swiper-pagination"}
          />
          <div className="mt-lg-10 mt-8 text-center">
            <div className="d-none d-lg-block">
              <SliderPaginationBtn
                paginationEl={"top-listens-swiper-pagination"}
              />
            </div>
            <div className="d-lg-none d-block">
              <SliderNavigatorBtn
                justify="justify-content-center"
                nextBtn={"top-listens-next"}
                prevBtn={"top-listens-prev"}
              />
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
};

export default FeaturedShows;