import Image from "next/image";

import GradientWrapper from "../../GradientWrapper";
import NavLink from "../NavLink";

const Hero = () => {
  return (
    <GradientWrapper>
      <section>
        <div className="custom-screen flex flex-col items-center gap-12 text-gray-600 sm:justify-center sm:text-center xl:flex-row xl:text-left">
          <div className="max-w-4xl flex-none space-y-5 xl:max-w-2xl">
            <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
              <strong>Educação para a </strong>Sustentabilidade
            </h1>
            <p className="max-w-xl text-gray-300 sm:mx-auto xl:mx-0">
              <strong>Encorajamos</strong> uma aprendizagem ao longo da vida e{" "}
              <strong>partilhamos</strong> com o estudante a responsabilidade do
              seu percurso de educação.
            </p>
            <div className="items-center gap-x-3 text-sm font-medium sm:flex sm:justify-center xl:justify-start">
              <NavLink
                href="#pricing"
                className="block bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700"
                scroll={false}
              >
                Começar Agora
              </NavLink>
              <NavLink
                href="#cta"
                className="mt-3 block bg-gray-700 text-gray-100 hover:bg-gray-800 sm:mt-0"
                scroll={false}
              >
                Saber Mais
              </NavLink>
            </div>
          </div>
          <div className="w-full flex-1 sm:max-w-2xl xl:max-w-xl">
            <div className="relative">
              <Image
                src="/hero-thumbnail.png"
                className="w-full rounded-lg"
                alt="Cursos O4S"
                width={490}
                height={284}
              />
            </div>
          </div>
        </div>
      </section>
    </GradientWrapper>
  );
};

export default Hero;
