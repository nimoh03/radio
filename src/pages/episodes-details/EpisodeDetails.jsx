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
  ];
  const host = {
    name: "RJ Jones Nicklose",
    link: "/host-details",
    profile: hostImg,
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
                {/* <FadeUp>
                  <div>
                    <h3 className="fw-semibold mb-4">Episode Description</h3>
                    <p className="fw-normal tcn-20">
                      Explore the enchanting world of storytelling in Episode 12
                      - &quot;Stories Resonate: The Art of Storytelling.&quot;
                      In this episode, we unravel the power of narratives,
                      discussing how stories connect us, evoke emotions, and
                      leave a lasting impact. Join us for an insightful
                      conversation on the techniques, emotions, and magic that
                      make storytelling a timeless art form.
                    </p>
                  </div>
                </FadeUp> */}
              
               
               
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
                    {/* <div className="tag-list-wrapper d-between gap-4">
                      <div className="d-flex align-items-center tcp-1 gap-1 d-none d-xxl-block">
                        <span className="fw-semibold">Tag</span>
                        <span className="lh-0">
                          <i className="ti ti-arrow-right"></i>
                        </span>
                      </div>
                      {<TagList tags={tags} />}
                    </div> */}
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* <!-- episode faq  --> */}
         
          </div>
          {/* <div className="col-xl-4">
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
              <FadeUp>
                <div className="tag-list-wrapper p-xxl-8 p-4 rounded bgc-1">
                  <h4 className="fw-semibold mb-lg-6 mb-4">Popular Tag</h4>
                  <span className="d-block border-dashed mb-lg-6 mb-4"></span>
                  <TagList tags={tags2} />
                </div>
              </FadeUp>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default EpisodeDetails;
