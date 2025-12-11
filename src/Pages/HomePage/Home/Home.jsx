import React from "react";
import BannerSlider from "../BannerSlider/BannerSlider";
import LatestBooks from "../LatestBooks/LatestBooks";
import Coverage from "../Coverage/Coverage";
import WhyChoose from "../WhyChoose/WhyChoose";
import HowItWorks from "../HowItWorks";
import Testimonials from "../Testimonials";

const Home = () => {
  return (
    <div>
      <BannerSlider />
      <LatestBooks />
      <Coverage />
      <WhyChoose />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default Home;
