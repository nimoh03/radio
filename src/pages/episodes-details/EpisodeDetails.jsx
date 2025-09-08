import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EpisodeShortDetails from "./EpisodeShortDetails";
import HostDetails from "./HostDetails";
import SocialList from "@/components/Shared/SocialList";
import TagList from "@/components/Shared/TagList";
import faqsData from "@/data/faqs";
import Faqs from "@/components/Shared/Accordion";
import ListenOnBtns from "@/components/Shared/ListenOnBtns";
import GuestCard from "./GuestCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import FadeUp from "@/motion/FadeUp";

import guest1 from "@/images/ep-guest-1.png";
import guest2 from "@/images/ep-guest-2.png";
import hostImg from "@/images/host-profile-2.png";

const EpisodeDetails = () => {
  const { id } = useParams(); // Get the ID from URL
  
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
       
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEpisodeData();
    }
  }, [id]);

  const guestList = [
    {
      profile: guest1,
      name: "Darrell Steward",
      msg: "Captivating realm of musicianship, where creativity knows no bounds and emotions find their voice through the art of sound.",
      designation: "Musician",
      socials: [
        {
          icon: "ti ti-brand-facebook",
          link: "#",
        },
        {
          icon: "ti ti-brand-twitter",
          link: "#",
        },
        {
          icon: "ti ti-brand-linkedin",
          link: "#",
        },
        {
          icon: "ti ti-brand-youtube",
          link: "#",
        },
        {
          icon: "ti ti-brand-instagram",
          link: "#",
        },
      ],
    },
    {
      profile: guest2,
      name: "Janetta Rotolo",
      msg: "Steering projects to nurturing talent, managers are the unsung heroes who turn strategies into reality.   strategy into impactful campaigns.",
      designation: "Music Director",
      socials: [
        {
          icon: "ti ti-brand-facebook",
          link: "#",
        },
        {
          icon: "ti ti-brand-twitter",
          link: "#",
        },
        {
          icon: "ti ti-brand-linkedin",
          link: "#",
        },
        {
          icon: "ti ti-brand-youtube",
          link: "#",
        },
        {
          icon: "ti ti-brand-instagram",
          link: "#",
        },
      ],
    },
  ];

  const socials = [
    // {
    //   icon: "ti ti-brand-facebook",
    //   link: "#",
    // },
    // {
    //   icon: "ti ti-brand-twitter",
    //   link: "#",
    // },
    {
      icon: "ti ti-brand-linkedin",
      link: `${episodeData?.guest.linkedIn}`,
    },
   
    // {
    //   icon: "ti ti-brand-instagram",
    //   link: "#",
    // },
  ];
  
  // Dynamic host data from API or fallback to static data
  const host = episodeData ? {
    host: { // Create the nested structure that HostDetails expects
      name: episodeData.hostName || "RJ Jones Nicklose",
      profilePictureUrl: episodeData.hostProfilePicture || hostImg,
      bio: episodeData.hostBio || "",
      title: episodeData.hostTitle || "Podcast Host"
    },
    link: episodeData.hostId ? `/host-details/${episodeData.hostId}` : "/host-details",
    category: episodeData.category || episodeData.hostSpecialty || "Podcast Host",
    socials: [
      {
        icon: "ti ti-brand-facebook",
        link: episodeData.host?.facebook || "#",
      },
      {
        icon: "ti ti-brand-twitter", 
        link: episodeData.host?.twitter || "#",
      },
      {
        icon: "ti ti-brand-linkedin",
        link: episodeData.host?.linkedIn || "#",
      },
      {
        icon: "ti ti-brand-youtube",
        link: episodeData?.videoUrl,
      },
      {
        icon: "ti ti-brand-instagram",
        link: episodeData.host?.instagram || "#",
      },
    ],
  } : {
    host: {
      name: "RJ Jones Nicklose",
      profilePictureUrl: hostImg,
      bio: "",
      title: "Podcast Host"
    },
    link: "/host-details",
    category: "Podcast Host",
    socials: [
      {
        icon: "ti ti-brand-facebook",
        link: "#",
      },
      {
        icon: "ti ti-brand-twitter",
        link: "#",
      },
      {
        icon: "ti ti-brand-linkedin",
        link: "#",
      },
      {
        icon: "ti ti-brand-youtube",
        link: "#",
      },
      {
        icon: "ti ti-brand-instagram",
        link: "#",
      },
    ],
  };

  const tags = [
    {
      name: "Music",
      link: "#",
    },
    {
      name: "Storytelling",
      link: "#",
    },
    {
      name: "Ghosts",
      link: "#",
    },
  ];
  const tags2 = [
    {
      name: "Love Story",
      link: "#",
    },
    {
      name: "Romantic",
      link: "#",
    },
    {
      name: "New",
      link: "#",
    },
    {
      name: "Music",
      link: "#",
    },
    {
      name: "Storytelling",
      link: "#",
    },
    {
      name: "Ghosts",
      link: "#",
    },
  ];

  // Loading state
  if (loading) {
    return (
      <section className="episodes-details-section pb-120 texture-bg-1 overflow-visible">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center p-8">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="episodes-details-section pb-120 texture-bg-1 overflow-visible">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center p-8">
            <div className="alert alert-danger" role="alert">
              Error loading episode: {error}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (!episodeData) {
    return (
      <section className="episodes-details-section pb-120 texture-bg-1 overflow-visible">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center p-8">
            <div className="alert alert-warning" role="alert">
              Episode not found
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="episodes-details-section pb-120 texture-bg-1 overflow-visible">
      <div className="container">
        <div className="row gy-6 gy-xl-0">
          <div className="col-xl-8">
            <div className="episodes-details-content d-grid gap-6 p-xxl-6 p-3 rounded bgc-3">
              {/* <!-- episode Host details card  --> */}
              <FadeUp>
                <EpisodeShortDetails />
              </FadeUp>
              {/* <!-- episode details content --> */}
              <div className="episodes-details-content d-grid p-xxl-8 p-4 gap-xxl-8 gap-6 rounded bgc-2">
                <FadeUp>
                  <div>
                    <h3 className="fw-semibold mb-4">Episode Description</h3>
                    <p className="fw-normal tcn-20 lh-lg"  style={{textAlign: 'justify'}}>
                      {episodeData.description || episodeData.shortDescription || "Episode description not available"}
                    </p>
                  </div>
                </FadeUp>

                {/* Guest Section */}
                {episodeData.guest && (
                  <FadeUp>
                    <div className="guest-section">
                      <h3 className="fw-semibold mb-4">Featured Guest</h3>
                      <div className="guest-card p-4 rounded bgc-3 border">
                        <div className="row align-items-center">
                          <div className="col-md-3 col-sm-4 mb-3 mb-sm-0">
                            <img 
                              src={episodeData.guest.profilePictureUrl || episodeData.guest.headShotUrl || hostImg} 
                              alt={episodeData.guest.name}
                              className="w-100 rounded-circle"
                              style={{aspectRatio: '1/1', objectFit: 'cover'}}
                              onError={(e) => {
                                e.target.src = hostImg; // Fallback image
                              }}
                            />
                          </div>
                          <div className="col-md-9 col-sm-8">
                            <h4 className="fw-semibold mb-2">{episodeData.guest.name}</h4>
                            <p className="text-white fw-semibold mb-4 fs-sm">{episodeData.guest.title}</p>
                            <p className="fw-normal tcn-20 mb-3"  style={{textAlign: 'justify'}}>
                              {episodeData.guest.bio}
                            </p>
                            <div className="guest-socials d-flex gap-3">
                              
                              {episodeData.guest.gitHub && (
                                <a 
                                  href={episodeData.guest.gitHub} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="social-link"
                                >
                                  <i className="ti ti-brand-github"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeUp>
                )}
               
                <FadeUp>
                  <div className="d-between flex-wrap gap-md-3 gap-6 pt-lg-8 pt-sm-6 pt-4 border-dashed">
                    <div className="follow-us d-between gap-4">
                      <div className="d-flex align-items-center tcp-1 gap-1 d-none d-xxl-block">
                        <span className="fw-semibold">Follow</span>
                        <span className="lh-0">
                          <i className="ti ti-arrow-right"></i>
                        </span>
                      </div>
                      {<SocialList socials={socials} />}
                    </div>
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="episodes-details-sidebar d-grid gap-lg-6 gap-4 p-xxl-6 p-4 rounded bgc-3 position-sticky sticky-top sticky-top-position">
              <FadeUp>
                <div className="search-card-wrapper p-xxl-8 p-4 rounded bgc-1">
                  <h4 className="fw-semibold mb-4">Search</h4>
                  <SearchBar />
                </div>
              </FadeUp>
              <FadeUp>
                <HostDetails data={host} />
              </FadeUp>
              <FadeUp>
                <div className="listen-on-wrapper p-xxl-8 p-4 rounded bgc-1">
                  <h4 className="fw-semibold mb-lg-6 mb-4">Listen On</h4>
                  <span className="d-block border-dashed mb-lg-6 mb-4"></span>
                  <ListenOnBtns />
                </div>
              </FadeUp>
              {/* <FadeUp>
                <div className="tag-list-wrapper p-xxl-8 p-4 rounded bgc-1">
                  <h4 className="fw-semibold mb-lg-6 mb-4">Popular Tag</h4>
                  <span className="d-block border-dashed mb-lg-6 mb-4"></span>
                  <TagList tags={tags2} />
                </div>
              </FadeUp> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EpisodeDetails;