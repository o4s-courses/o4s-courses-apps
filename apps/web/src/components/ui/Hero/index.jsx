import Image from "next/image";

import heroThumbnail from "../../../public/hero-thumbnail.png";
import GradientWrapper from "../../GradientWrapper";
import NavLink from "../NavLink";

const Hero = () => {
  return (
    <GradientWrapper>
      <section>
        <div className="custom-screen flex flex-col items-center gap-12 text-gray-600 sm:justify-center sm:text-center xl:flex-row xl:text-left">
          <div className="max-w-4xl flex-none space-y-5 xl:max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
              Mastering computer science fundamentals
            </h1>
            <p className="max-w-xl text-gray-300 sm:mx-auto xl:mx-0">
              The IO Academy is an online learning platform that provides
              interactive courses and projects in Computer Science to high
              schoolers and adults of all backgrounds.
            </p>
            <div className="items-center gap-x-3 text-sm font-medium sm:flex sm:justify-center xl:justify-start">
              <NavLink
                href="#pricing"
                className="block bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700"
                scroll={false}
              >
                Get started
              </NavLink>
              <NavLink
                href="#cta"
                className="mt-3 block bg-gray-700 text-gray-100 hover:bg-gray-800 sm:mt-0"
                scroll={false}
              >
                Learn more
              </NavLink>
            </div>
          </div>
          <div className="w-full flex-1 sm:max-w-2xl xl:max-w-xl">
            <div className="relative">
              <Image
                src={heroThumbnail}
                className="w-full rounded-lg"
                alt="IO Academy"
              />
            </div>
          </div>
        </div>
      </section>
    </GradientWrapper>
  );
};

export default Hero;
