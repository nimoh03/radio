import Pagination from "@/components/Shared/Pagination";
import hostImg from "@/images/host.png";
import BeMyGuestForm from "@/components/Forms/BeMyGuestForm";
import SectionHeading from "@/components/Shared/SectionHeading";
import FadeUp from "@/motion/FadeUp";
import FadeDown from "@/motion/FadeDown";
import PageHero from "@/components/PageHero/PageHero";


const HostDetails = () => {
 const featureList = [
  {
    icon: "ti ti-broadcast",
    title: "🎙 Amplify Your Voice",
    desc: "Share your story and innovations with a wider audience",
  },
  {
    icon: "ti ti-microphone",
    title: "🌍 Global Reach",
    desc: "Connect with listeners in Africa, the UK, the US, and beyond.",
  },
  {
    icon: "ti ti-users",
    title: "🚀 Inspire the Future",
    desc: "Motivate students, professionals, and upcoming founders with your journey."
  }
];
  return (
    <>
      <PageHero
        pageTitle="Be a Guest on"
        highlightWord="TechNaija"
        highlightColor="tcp-1"
        pb={"pb-lg-15 pb-10"}
      />
     
      <section className="elevate-your-experience pt-120 pb-120 texture-bg-1">
      <div className="container">
        <div className="row g-6 align-items-center justify-content-between">
          <div className="col-xxl-6 col-lg-7">
            <FadeUp>
              <SectionHeading
                subTxt="Amplifying Africa’s Tech Voices"
                headTxt="Why Join as a Guest on TechNaija"
                highlightWord=""
                highlightColor="tcp-1"
                icon={<i className="ti ti-rocket"></i>}
                headFs="display-four"
                fw="fw-bold"
                descText="TechNaija gives innovators, founders, and thought leaders a stage to share their journeys and ideas with a cross-border audience. As a guest, you’ll amplify your voice, connect with global listeners, and inspire the next generation of Africa’s digital builders."
                descClass="mt-lg-6 mt-4"
              />
              <div className="d-flex align-items-center flex-column flex-sm-row gap-xxl-15 gap-sm-6 gap-4 my-lg-10 my-sm-6 my-4">
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
          <div className="col-lg-6">
           <div className="host-details-content d-grid gap-6 p-xxl-6 p-lg-4 p-3 rounded bgc-3">
           
            <div className="popular-episode d-grid p-xxl-8 p-lg-4 p-3 gap-xxl-8 gap-lg-6 gap-4 rounded bgc-2">

              <div className="contact-form-section">
                <FadeUp>
                  <h4 className="fw-semibold mb-4">Guest Application Form</h4>
                  <BeMyGuestForm />
                </FadeUp>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    </>
   
  );
};

export default HostDetails;
