import { Link } from "react-router-dom";
import FadeRight from "@/motion/FadeRight";
import FadeUp from "@/motion/FadeUp";

const JoiningReason = () => {
  const JoiningReasonList = [
  {
    id: 1,
    icon: "ti ti-broadcast",
    title: "Authentic African Tech Stories",
    desc: "Conversations with founders, engineers, and community leaders driving real innovation across Africa.",
  },
  {
    id: 2,
    icon: "ti ti-microphone",
    title: "Curated, Credible Hosts",
    desc: "Well-prepared, research-driven interviews that bring clarity, depth, and relatable insights.",
  },
  {
    id: 3,
    icon: "ti ti-radio",
    title: "Engaging & Relevant Themes",
    desc: "Exploring fintech, AI, remittance, healthtech, education, and more—through stories that matter.",
  },
  {
    id: 4,
    icon: "ti ti-microphone-2",
    title: "Guest Voices that Matter",
    desc: "Featuring innovators, students, and community leaders whose stories inspire and inform audiences.",
  },
  {
    id: 5,
    icon: "ti ti-world",
    title: "Global Reach & Recognition",
    desc: "Connecting African innovation with international audiences, creating visibility across NG • UK • US.",
  },
  {
    id: 6,
    icon: "ti ti-music",
    title: "Actionable Insights & Resources",
    desc: "Practical lessons, career growth strategies, and startup insights that listeners can apply immediately.",
  },
];


  return (
    <section className="join-for-reason-section pt-120 pb-120 texture-bg-1">
      <div className="container">
        <div className="row g-6 justify-content-between align-items-center mb-lg-15 mb-sm-10 mb-6">
          <div className="col-lg-6 col-md-8">
            <FadeRight>
              <div className="text-center text-lg-start">
                <span className="subheading-border fw-medium mb-4 fs-xl">
                  <span className="fs-2xl">
                    <i className="ti ti-rocket"></i>
                  </span>
                 🔔 Stay Informed
                </span>
                <h4 className="display-four fw-bold mb-lg-10 mb-sm-6 mb-4">
                  Why Join TechNaija
                </h4>
              </div>
            </FadeRight>
          </div>
          <div className="col-lg-3 col-md-4">
            <div className="text-lg-end text-center">
              <Link
                to="#newsletter"
                className="bttn-1 bttn-outline alt-position text-nowrap"
              >
                Subscribe
                <span className=" icon d-center icon-right">
                  <i className="ti ti-arrow-narrow-right"></i>
                </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="row g-6">
  {JoiningReasonList.map((item) => (
    <div className="col-lg-4 col-sm-6 d-flex" key={item.id}>
      <FadeUp className="flex-grow-1">
        <div className="join-for-reason-card h-100 d-flex flex-column justify-between py-xxl-12 py-sm-6 py-4 px-xxl-8 px-sm-4 px-2 rounded">
          <div className="card-icon-wrapper d-between gap-4 mb-lg-8 mb-4">
            <div className="card-icon">
              <span className="fs-two">
                <i className={item?.icon}></i>
              </span>
            </div>
            <div className="record-img">
              <div className="record-img-animation d-flex">
                {/* your svg stays the same */}
              </div>
            </div>
          </div>

          <div className="content-area mt-auto">
            <h3 className="title fw-bold mb-lg-6 mb-4">{item?.title}</h3>
            <p className="description fw-normal">{item?.desc}</p>
          </div>
        </div>
      </FadeUp>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default JoiningReason;
