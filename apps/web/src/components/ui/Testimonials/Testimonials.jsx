import SectionWrapper from "../../SectionWrapper";

const Testimonials = () => {
  const testimonials = [
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "Cláudia Carvalho",
      title: "Introdução à Permacultura",
      quote:
        "Recomendaria a toda agente a frequência dos vossos cursos pois têm uma forma muito pessoal de sensibilizar para os problemas actuais do nosso planeta. Cada um aprende ao seu ritmo e adapta a aprendizagem aos seus hábitos,que por sua vez influenciam outras pessoas à sua volta e juntos somos mais fortes. Muitos parabéns pelo vosso trabalho!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "Sofia Torres",
      title: "Introdução à Agricultura Biodinâmica",
      quote:
        "Recomendo este curso pois estimula-nos, ao promover uma reflexão profunda acerca do que é ser-se SER vivo neste mundo, fazendo parte da sua natureza. Desafia-nos a ir na direcção de mudanças no dia-a-dia que nos permitam sustentar a nossa vida numa filosofia humanista e holística . Gostei muito desta troca de saberes!",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Karim ahmed",
      title: "Introdução à Permacultura",
      quote:
        "Este curso facultou-me mais conhecimento prático em como exercer (ou minimizar) a minha pegada ecológica; sensibilizou-me para o planeta como um todo, um Ser fervilhante de vida, e a compreensão do valor da simbiose que ocorre ou deveria ocorrer.",
    },
  ];

  return (
    <SectionWrapper
      id="testimonials"
      className="bg-gray-50 dark:my-0 dark:bg-gray-900 sm:my-16"
    >
      <div className="custom-screen text-gray-600 dark:text-gray-300">
        <div className="max-w-xl space-y-3">
          <h3 className="text-3xl font-semibold text-gray-800 dark:text-gray-50 sm:text-4xl">
            <strong>O que dizem os nossos estudantes</strong>
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est
            hendrerit, porta nunc vitae, gravida justo. Nunc fermentum magna
            lorem, euismod volutpat arcu volutpat et.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, idx) => (
              <li
                key={idx}
                className="rounded-xl bg-gray-200 p-4 dark:bg-gray-800"
              >
                <figure>
                  <div className="flex items-center gap-x-4">
                    <img src={item.avatar} className="h-16 w-16 rounded-full" />
                    <div>
                      <span className="block font-semibold text-gray-800 dark:text-gray-100">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-gray-600  dark:text-gray-300">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <blockquote>
                    <p className="mt-6 text-gray-700 dark:text-gray-400">
                      {item.quote}
                    </p>
                  </blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;
