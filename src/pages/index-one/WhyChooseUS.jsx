import SunShape from "@/components/ShapeAnimation/SunShape";
import SectionHeading from "@/components/Shared/SectionHeading";
import ModalVideo from "react-modal-video";
import CircleBtn from "@/components/Shared/CircleBtn";
import { useState } from "react";
import FadeLeft from "@/motion/FadeLeft";
import { Link } from "react-router-dom";
import banner from "@/images/record-mic.png";

const WhyChooseList = [
  "✅ African Innovation",
  "🌍 Global Voices", 
  "🚀 Ecosystem Impact",
  "🎧 Relatable Tech Stories",
  "🏆 Recognised Platform",
  "🎙 Authentic Conversations"
];

const WhyChooseUS = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <section className="why-choose-us-section pt-120 pb-120 texture-bg-2">
        <SunShape position={"sun-shape-4"} visibility={"d-none d-md-block"} />
        <SunShape position={"sun-shape-5"} visibility={"d-none d-md-block"} />
        <div className="container">
          <div className="row align-items-center g-6">
            <div className="col-lg-6 order-lg-first order-last">
              <div className="why-choose-banner d-flex gap-6 position-relative justify-content-sm-start justify-content-center scrollAnimation">
               <img className="w-100 rounded" src={banner} alt="banner" />
              </div>
            </div>
            <div className="col-lg-6">
              <FadeLeft>
                <div className="why-choose-content">
                  <div className="text-center text-lg-start">
                    <SectionHeading
                      subTxt="What makes us different ?"
                      headTxt="Why TechNaija Stands Out"
                      icon={<i className="ti ti-rocket"></i>}
                      headFs="display-four mb-6 pe-xxl-2"
                      descText="At TechNaija, we don't just talk about technology — we amplify the innovators building Africa's digital future and connect their voices with the world."
                    />
                  </div>
                  <div className="our-feature-list mt-lg-10 mt-sm-8 mt-6">
                    <div className="row g-3">
                      {WhyChooseList.map((item, index) => {
                        return (
                          <div key={index} className="col-lg-6 col-md-6">
                            <div className="d-flex align-items-center gap-xxl-4 gap-2">
                              <span className="fs-xl fw-medium">{item}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <span className="d-block mt-lg-8 mt-sm-6 mt-4 mb-lg-10 mb-sm-8 mb-6 border-dashed"></span>
                  <div className="why-choose-btns d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start gap-sm-6 gap-4 btn-area">
                    <Link to="/about" className="bttn-1">
                      <span className="text-nowrap fw-semibold">
                       About Us
                      </span>
                      <span className="icon icon-right">
                        <i className="ti ti-arrow-right"></i>
                      </span>
                    </Link>
                                      
                  </div>
                </div>
              </FadeLeft>
            </div>
          </div>
        </div>
      </section>
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 0 }}
        isOpen={isOpen}
        videoId="w7j_K_hE5kU"
        onClose={() => setOpen(false)}
        zIndex={1000}
      />
    </>
  );
};

export default WhyChooseUS;