import Head from "next/head";
import FAQS from "../../components/ui/FAQS";
import Pricing from "../../components/ui/Pricing";
import GradientWrapper from "../../components/GradientWrapper";

export default function Ajuda() {
  return (
    <>
			<Head>
        <title>Ajuda / Perguntas Frequentes</title>
      </Head>
			<GradientWrapper>
        <section>
          <div className="custom-screen text-gray-600 sm:text-center">
            <div className="max-w-4xl space-y-5 sm:mx-auto">
              <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
								Ajuda / Perguntas Frequentes
              </h1>
							<p className="mx-auto max-w-lg text-lg text-gray-600 dark:text-gray-300">
								Se precisa de ajuda, por favor, leia a lista de perguntas mais
								frequentes. Contate-nos se ainda tiver dúvidas.
							</p>
            </div>
          </div>
        </section>
      </GradientWrapper>
      <FAQS />
      <Pricing />
    </>
  );
}
