import SectionHeading from "@/components/Shared/SectionHeading";
import banner1 from "@/images/podcastbanner.png";
import FadeUp from "@/motion/FadeUp";
import { Link } from "react-router-dom";

const ElevateExperience = () => {
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
      desc: "Partnering with developer groups, universities, and tech hubs to inspire collaboration and knowledge-sharing.",
    },
    {
      icon: "ti ti-users",
      title: "🚀 Inspire the Next Generation",
      desc: "Making technology simple and relatable for students, aspiring entrepreneurs, and young professionals.",
    },
  ];
  return (
    <section className="elevate-your-experience pt-120 pb-120 texture-bg-1">
      <div className="container">
        <div className="row g-6 align-items-center justify-content-between">
          <div className="col-xxl-6 col-lg-7">
            <FadeUp>
              <SectionHeading
                subTxt="Elevate Your Experience"
                headTxt="Amplifying Africa’s Tech Voices"
                highlightWord="Tech Voices"
                highlightColor="tcp-1"
                icon={<i className="ti ti-rocket"></i>}
                headFs="display-four"
                fw="fw-bold"
                descText="TechNaija is a platform I founded to spotlight the builders, innovators, and visionaries shaping Africa’s digital future. More than a podcast, it is a knowledge hub where stories of innovation meet global audiences, bridging Africa with the wider world of technology."
                descClass="mt-lg-6 mt-4"
              />
              <div
                className="d-flex align-items-center flex-column flex-sm-row gap-xxl-15 gap-sm-6 gap-4 my-lg-10 my-sm-6 my-4"
                style={{ textAlign: "justify" }}
              >
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
            </FadeUp>
          </div>
          <div className="col-lg-5">
            <div className="elevate-experience-banner d-flex position-relative mt-10 mt-lg-0">
              <img className="w-100 rounded" src={banner1} alt="image" />
              <div className="banner-area-1">
                <div className="banner-1 ms-6 ms-sm-0"></div>
                {/* <div className="banner-1 ms-6 ms-sm-0">
                  <img className="w-100 rounded" src={banner1} alt="image" />
                </div> */}
                {/* <div className="banner-shape-1">
                  <img className="w-100" src={vactor1} alt="shape" />
                </div> */}
              </div>
              <div className="banner-area-2">
                {/* <div className="banner-2">
                  <img className="w-100 rounded" src={banner2} alt="image" />
                </div> */}
                {/* <div className="banner-shape-2">
                  <img className="w-100" src={vactor2} alt="shape" />
                </div> */}
              </div>
              {/* <div className="year-of-experience py-lg-5 py-3 px-lg-8 px-4 bcp-4 rounded">
                <div className="d-flex gap-5">
                  <div className="d-center tcn-900">
                    <span className="display-four text-nowrap">
                      <NumberCounter start={0} end={16} />
                    </span>
                    <span className="display-four">+</span>
                  </div>
                  <p className="fs-lg fw-medium tcn-900">Years of experience</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElevateExperience;
