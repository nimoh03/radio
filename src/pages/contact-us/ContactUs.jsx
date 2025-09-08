import TopWave from "@/components/Shared/TopWave";
import SunShape from "@/components/ShapeAnimation/SunShape";
import SectionHeading from "@/components/Shared/SectionHeading";
import ContactForm from "@/components/Forms/ContactForm";
import FadeLeft from "@/motion/FadeLeft";
import FadeRight from "@/motion/FadeRight";

import user1 from "@/images/user-1.png";
import user2 from "@/images/user-2.png";
import user3 from "@/images/user-3.png";
import user4 from "@/images/user-4.png";
import user5 from "@/images/user-5.png";
const ContactUs = () => {
  const users = [user1, user2, user3, user4, user5];
  return (
    <section className="contact-us-form-section texture-bg-2">
      <TopWave />
      <SunShape position={"sun-shape-4"} visibility={"d-none d-lg-block"} />
      <SunShape position={"sun-shape-5"} visibility={"d-none d-lg-block"} />
      <div className="container pt-120 pb-120">
        <div className="row g-6 justify-content-between align-items-center">
          <div className="col-lg-6">
            <FadeLeft>
              <div className="contact-us-content-wrapper">
                <div className="content-area text-center text-lg-start mb-lg-10 mb-sm-6 mb-4">
                  <SectionHeading
                    subTxt={"Contact Us"}
                    icon={<i className="ti ti-rocket"></i>}
                    headTxt={"Have questions? don't hesitate to contact us"}
                    headFs={"display-four"}
                    fw={"fw-semibold"}
                    descText={
                      "Purpose of an introduction is to grab the audience's attention, their interest, provide a preview of the value or insights."
                    }
                    descClass={"mt-lg-6 mt-4"}
                  />
                </div>
              
              </div>
            </FadeLeft>
          </div>
          <div className="col-xl-5 col-lg-6">
            <FadeRight>
              <div className="contact-us-form-wrapper p-xl-6 p-lg-4 p-3 rounded bgc-3">
                <div className="contact-card-wrapper p-xl-6 p-4 rounded bgc-2">
                  <h4 className="fw-semibold mb-4">Get In Touch</h4>
                  <ContactForm />
                </div>
              </div>
            </FadeRight>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
