import { useRef, useState } from "react";

import SectionWrapper from "../../SectionWrapper";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="mt-5 space-y-3 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="flex cursor-pointer items-center justify-between pb-5 text-lg font-medium text-gray-700 dark:text-gray-400">
        {faqsList.q}
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5 text-gray-500 dark:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5 text-gray-500 dark:text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div
          className="text-gray-500 dark:text-gray-200"
          dangerouslySetInnerHTML={{ __html: faqsList.a }}
        />
      </div>
    </div>
  );
};

const FAQS = () => {
  const faqsList = [
    {
      q: "O que é o MOOC O4S?",
      a: `<p>O MOOC O4S é uma plataforma online de aprendizagem para a sustentabilidade. É um espaço e uma ferramenta de aprendizagem que permite a qualquer pessoa, interessada na construção de um modo de vida alternativo e de um mundo mais equitativo e sustentável, aprofundar os seus conhecimentos nas cinco dimensões da sustentabilidade: Educação Holística, Social, Ecologia, Economia e Visão do Mundo.</p>`,
    },
    {
      q: "Que conhecimentos de informática necessito ter?",
      a: `<p>Você deve possuir conhecimentos de internet e informática na óptica do utilizador, ou seja, necessitas saber navegar na Internet, fazer downloads, abrir e utilizar ficheiros de texto, utilizar o correio eletrónico, etc.</p>`,
    },
    {
      q: "Como estão estruturados os módulos de aprendizagem?",
      a: `<p>Os módulos de aprendizagem estão estruturados por unidades de conhecimento de acordo com as temáticas chave. O material didático combina de forma atrativa e dinâmica textos, documentos, vídeos e atividades que visam a interiorização e assimilação dos diversos conceitos.</p>`,
    },
    {
      q: "Quais são os tipos de tarefas de aprendizagem?",
      a: `<p><strong>Dinámica individual</strong> – Cada estudante reflete sobre um tema em particular relacionado com o módulo ou responde a uma questão proposta pelo facilitador. Esta atividade está encaminhada para uma aplicação prática dos conteúdos.</p>
      <p><strong>Reflexão</strong> – O estudante reflete com mais profundidade sobre um tema proposto pelo facilitador.</p>
      <p><strong>Atividade de grupo</strong> – Os estudantes trabalham em grupos de 3 ou 4 pessoas, com os objetivos: 1. Aprender a colaborar; 2. Interagir entre eles e conhecer-se melhor; 3. Apreciar a diversidade de respostas segundo a formação e o lugar de proveniência de cada um.</p>
      <p><strong>Discussão</strong> – O facilitador escolhe o tema e apresenta um vídeo para abrir a discussão aos estudantes.</p>`,
    },
    {
      q: "Quais são os horários dos cursos?",
      a: `<p><strong>A nossa metodologia não prevê nenhuma atividade a horas especificas</strong> a menos que o estudante o solicite. Os conteúdos vão sendo desbloqueados, durante cerca de 3 semanas, e acedidos onde e quando o estudante quiser. Durante este tempo vão sendo propostas algumas tarefas que depois de entregues vai mereçer o comentário do facilitador. É nesta fase que se dá a maior interação com os facilitadores.</p>`,
    },
    {
      q: "Vou ter alguém a apoiar-me caso necessite de ajuda?",
      a: `<p>Você poderá sempre contar com o apoio do nosso suporte. Acreditamos que muito do nosso sucesso passa pela forma como proporcionamos boas experiências ao usuário. Trabalhamos para oferecer o melhor suporte.</p>`,
    },
    {
      q: "Quando posso subscrever os cursos?",
      a: `<p>Você podes subscrever em qualquer altura, começar de imediato e estudar ao seu ritmo.</p>`,
    },
    {
      q: "Quais são os tipos de pagamento aceites?",
      a: `<p>Nós processamos os pagamentos a partir do Brasil a partir da PagSeguro que aceita o pagamento atrav+es de cartão de crédito, boleto e transferências.</p>`,
    },
  ];
  return (
    <SectionWrapper id="faqs">
      <div className="custom-screen">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-50">
            Ajuda / Perguntas Frequentes
          </h1>
          <p className="mx-auto max-w-lg text-lg text-gray-600 dark:text-gray-300">
            Se precisa de ajuda, por favor, leia a lista de perguntas mais
            frequentes. Contate-nos se ainda tiver dúvidas.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-2xl">
          {faqsList.map((item, idx) => (
            <FaqsCard idx={idx} faqsList={item} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQS;
