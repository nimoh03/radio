import CircleTextBtn from "@/components/Shared/CircleTextBtn";
import SectionHeading from "@/components/Shared/SectionHeading";
import banner3 from "@/images/about-us-banner-3.png";
import podcastbanner from "@/images/podcastbanner.png";
import playImg from "@/images/play.png";
import musicLine from "@/images/music-line.png";
import FadeRight from "@/motion/FadeRight";
import FadeLeft from "@/motion/FadeLeft";

const featureList = [
  {
    icon: "ti ti-broadcast",
    title: "🎙 Empower Innovators",
    desc: "Giving Africa’s founders, engineers, and creators a stage to share their journeys, challenges, and breakthroughs",
  },
  {
    icon: "ti ti-microphone",
    title: "🌍 Connect Africa to the World",
    desc: "Bridging local innovation with global conversations, ensuring Africa’s tech voices are heard internationally.",
  },
  {
    icon: "ti ti-users",
    title: "🤝 Build Community",
    desc: "Partnering with developer groups, universities, and tech hubs to inspire collaboration and knowledge-sharing."
  },
  {
    icon: "ti ti-users",
    title: "🚀 Inspire the Next Generation",
    desc: "Making technology simple and relatable for students, aspiring entrepreneurs, and young professionals.",
  },
];

const AboutUs = () => {
  return (
    <section className="about-us-section-3 pt-120 pb-120 texture-bg-1">
      <div className="container">
        <div className="row g-6 justify-content-between">
          <div className="col-lg-6">
            <div className="About-us-content">
              <FadeRight>
                <div className="text-center text-lg-start">
                  <SectionHeading
                    subTxt="About Us"
                    headTxt="Amplifying Africa’s Tech Voices"
                    icon={<i className="ti ti-rocket"></i>}
                    headFs="display-four mb-6 pe-xxl-2"
                    fw="fw-bold"
                    descText="TechNaija is a podcast platform created to spotlight the innovators, founders, and engineers driving Africa’s digital future. More than just conversations, it is a hub where stories of innovation meet global audiences — connecting Africa with the wider world of technology."
                  />
                </div>
              </FadeRight>
              <FadeLeft>
                <div className="our-feature-list-2 mt-lg-15 mt-sm-10 mt-8">
                  <ul className="d-grid gap-lg-8 gap-6">
                    {featureList?.map((item, index) => {
                      return (
                        <li key={index} className="d-flex gap-lg-6 gap-2">
                          <div className="d-grid gap-3">
                            <span className="fs-four fw-medium">
                              {item.title}
                            </span>
                            <span className="fw-normal">{item.desc}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </FadeLeft>
            </div>
          </div>
          <div className="col-xl-5 col-lg-6">
            <div className="d-flex align-items-end justify-content-center gap-6">
              {/* <!-- banner with rotate circle  --> */}
              <div className="d-grid gap-10">
                <div className="position-relative py-20">
                  <CircleTextBtn />
                </div>
                
              </div>
              {/* <!-- big banner  --> */}
              <div className="about-us-banner-4 position-relative">
                <img className="w-100" src={podcastbanner} alt="about us banner" />
                <div className="online-play position-absolute">
                  <img className="w-100" src={playImg} alt="play" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="music-line-shape position-absolute end-0 start-0 bottom-0 z-n1">
        <img src={musicLine} alt="music line" />
      </div>
    </section>
  );
};

export default AboutUs;
