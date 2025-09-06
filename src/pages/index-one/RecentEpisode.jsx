// components/RecentEpisode.jsx
import EpisodeCommonCard from "@/components/RecentEpisode/EpisodeCommonCard";
import EpisodeUniqueCard from "@/components/RecentEpisode/EpisodeUniqueCard";
import SectionHeading from "@/components/Shared/SectionHeading";
import FadeDown from "@/motion/FadeDown";
import FadeLeft from "@/motion/FadeLeft";
import FadeRight from "@/motion/FadeRight";
import FadeUp from "@/motion/FadeUp";
import useEpisodes from "@/hooks/useEpisodes";
import { Link } from "react-router-dom";

const RecentEpisode = ({ pageNumber = 1, pageSize = 5 }) => {
  const { episodes, loading, error } = useEpisodes(pageNumber, pageSize);

  // Loading state
  if (loading) {
    return (
      <section className="recent-episodes-section pt-120 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading recent episodes...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="recent-episodes-section pt-120 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Error Loading Episodes</h4>
              <p>Unable to load recent episodes: {error}</p>
              <button
                className="btn btn-outline-danger"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No episodes state
  if (!episodes || episodes.length === 0) {
    return (
      <section className="recent-episodes-section pt-120 pb-120 texture-bg-1">
        <div className="container">
          <div className="text-center">
            <h3>No Recent Episodes Available</h3>
            <p>Check back later for new episodes!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="recent-episodes-section pt-120 pb-120 texture-bg-1">
      <div className="container">
        <div className="row g-6 justify-content-between mb-lg-15 mb-sm-10 mb-8">
          <div className="col-lg-6">
            <FadeLeft>
              <div className="text-lg-start text-center">
                <SectionHeading
                  icon={<i className="ti ti-rocket"></i>}
                  subTxt="Recent Episode"
                  headTxt="Our Latest Conversations in Tech"
                  headFs="display-four"
                />
              </div>
            </FadeLeft>
          </div>
          <div className="col-lg-5">
            <div className="ps-xxl-10">
              <FadeRight>
                <div className="text-lg-start text-center">
                  <p className="mb-lg-10 mb-sm-6 mb-4 fw-normal">
                    Catch the latest episodes featuring innovators, founders,
                    and thought leaders shaping Africa’s technology landscape.
                  </p>
                  <Link to="/latest-episode" className="bttn-1">
                    <span className="text-nowrap fw-semibold">
                      View All Episodes
                    </span>
                    <span className="icon icon-right">
                      <i className="ti ti-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </FadeRight>
            </div>
          </div>
        </div>

        {/* Recent episodes area */}
        <div className="row g-6">
          <FadeUp>
            {episodes.slice(0, 1).map((item, index) => {
              return (
                <div key={item.id} className="col-12">
                  <Link
                    to={`/episode-details/${item.id}`}
                    className="text-decoration-none"
                  >
                    <EpisodeUniqueCard cardData={item} />
                  </Link>
                </div>
              );
            })}
          </FadeUp>

          {episodes.slice(1).map((item, index) => {
            return (
              <div key={item.id} className="col-lg-6">
                <FadeDown>
                  <Link
                    to={`/episode-details/${item.id}`}
                    className="text-decoration-none"
                  >
                    <EpisodeCommonCard cardData={item} />
                  </Link>
                </FadeDown>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentEpisode;
