import { Outlet } from "react-router-dom";
import HeaderOne from "./header/HeaderOne";
import FooterTwo from "./footer/FooterTwo";
import FooterOne from "./footer/FooterOne";
import AudioPlayerModalLayoutTwo from "../components/Modal/AudioPlayerModalLayoutTwo";

const RootLayoutTwo = () => {
  return (
    <>
      <HeaderOne />
      <Outlet />
      <FooterOne />
      <AudioPlayerModalLayoutTwo />
    </>
  );
};

export default RootLayoutTwo;
