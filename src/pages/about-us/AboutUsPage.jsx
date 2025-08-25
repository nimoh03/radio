import PageHero from "@/components/PageHero/PageHero";
import CounterUp from "./CounterUp";
import JoiningReason from "./JoiningReason";
import Testimonial from "../index-one/Testimonial";
import CallToAction from "@/components/Shared/CallToAction";
import NewsLetterForm2 from "@/components/Shared/NewsLetterForm2";
import ElevateExperience from "../index-three/ElevateExperience";
import WhyChooseUS from "../index-one/WhyChooseUS";
const AboutUsPage = () => {
  return (
    <>
      <PageHero
        pageTitle="About TechNaija"
        highlightWord=""
        highlightColor="tcp-1"
        pb={"pb-lg-15 pb-10"}
      />

      <ElevateExperience />
     
      <WhyChooseUS />
      <CounterUp />
      <JoiningReason />
      <Testimonial />
      <CallToAction bg="texture-bg-1 cta-alt-bg" />
      <NewsLetterForm2 />
    </>
  );
};

export default AboutUsPage;
