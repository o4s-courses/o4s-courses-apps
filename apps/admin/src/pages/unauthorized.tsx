import { type NextPage } from "next/types";
import { api } from "~/utils/api";

const Unauthorized: NextPage = () => {
	api.auth.deleteSession.useMutation();
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
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;