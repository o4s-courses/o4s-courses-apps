import GradientWrapper from "../../GradientWrapper";
import Button from "../Button";

const Pricing = () => {
    return (
        <GradientWrapper id="pricing" className="overflow-hidden dark:overflow-visible dark:my-0 sm:my-16">
            <div className="custom-screen gap-12 justify-between md:flex">
                <div className='relative max-w-2xl text-gray-300'>
                    <h2 className='text-gray-50 text-3xl font-semibold sm:text-4xl'>
                        Inicia a tua jornada
                    </h2>
                    <p>
											O desafio é criar uma sociedade sustentável, justa e pacífica, em harmonia com toda a terra e vida. Implica uma sensibilidade ecológica e um profundo respeito, tanto pelas culturas indígenas como pelas modernas, e também para com a diversidade das formas vidas na Terra.
                    </p>
                </div>
                <div className="mt-12 bg-white dark:bg-gray-900/50 rounded-xl shadow-lg md:mt-0">
                    <div className="h-full p-6 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-2xl text-gray-800 dark:text-gray-50 font-semibold">
                                Preços desde
                            </span>
                            <div className="text-2xl text-gray-800 dark:text-gray-50 font-semibold">
                                €35
                            </div>
                        </div>
                        <p className="max-w-sm text-gray-600 dark:text-gray-300">
													Integra uma vasta gama de ferramentas online de aprendizagem.
                        </p>
                        <Button className="block w-full text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow">
                            Começa agora!
                        </Button>
                    </div>
                </div>
            </div>
        </GradientWrapper>
    )
};

export default Pricing;