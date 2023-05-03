import { type NextPage } from "next/types";
import { signOut } from "next-auth/react";

const Unauthorized: NextPage = () => {
  return (
    <main>
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-lg space-y-3 text-center">
          <h3 className="m:text-5xl text-4xl font-semibold text-gray-800 dark:text-gray-400">
            Não autorizado
          </h3>
          <p className="text-gray-600 dark:text-gray-200">
            Desculpe, não tem autorização para utilizar este sistema.
          </p>
          <button
            onClick={() => void signOut()}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black dark:text-white no-underline transition hover:bg-white/20"
          >
            Sair
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;