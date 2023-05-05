/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import toast from "react-hot-toast";
import { api, type RouterOutputs } from "~/utils/api";
import Loading from "./Loading";

type Props = {
	courseId: number;
};

const CreateModuleForm: React.FC<{ courseId: number; }> = ({ courseId }) => {
  const utils = api.useContext();

  const [name, setName] = useState("");

  const { mutate, error } = api.module.create.useMutation({
    async onSuccess() {
      setName("");
			toast.success("Module created successfully");
      await utils.module.byCourse.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.error("Something went wrong");
		},
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded dark:bg-white/10 p-2 dark:text-white bg-black/10 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {error?.data?.zodError?.fieldErrors.name && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.name}
        </span>
      )}
      <button
        className="block w-full text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow px-4 py-2.5 font-bold text-sm text-center duration-150 rounded-lg"
        onClick={() => {
          mutate({
						courseId,
            name,
          });
        }}
      >
        Add new module
      </button>
    </div>
  );
};

const CreateLessonForm: React.FC<{
	courseId: number;
	moduleId: number
}> = ({ courseId, moduleId }) => {
  const utils = api.useContext();

  const [name, setName] = useState("");

  const { mutate, error } = api.lesson.create.useMutation({
    async onSuccess() {
      setName("");
			toast.success("Lesson created successfully");
      await utils.module.byCourse.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.error("Something went wrong");
		},
  });

  return (
    <div className="flex w-full max-w-2xl flex-col p-4">
      <input
        className="mb-2 rounded dark:bg-white/10 p-2 dark:text-white bg-black/10 text-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      {error?.data?.zodError?.fieldErrors.name && (
        <span className="mb-2 text-red-500">
          {error.data.zodError.fieldErrors.name}
        </span>
      )}
      <button
        className="block w-full text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow px-4 py-2.5 font-bold text-sm text-center duration-150 rounded-lg"
        onClick={() => {
          mutate({
						courseId,
						moduleId,
            name,
          });
        }}
      >
        Add new lesson
      </button>
    </div>
  );
};

const ModuleDisclosure: React.FC<{
  module: RouterOutputs["module"]["byCourse"][number];
  onModuleDelete?: () => void;
}> = ({ module, onModuleDelete }) => {
  return (
		<>
		<div className="w-full px-4">
      <div className="mx-auto w-full rounded-2xl bg-white p-2">
        <Disclosure as={Fragment} >
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>{module.name}</span>
								<div>
									<span
										className="cursor-pointer text-sm font-bold uppercase text-pink-400"
										onClick={onModuleDelete}
									>
										Delete
									</span>
								</div>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
							<Transition
								enter="transition duration-100 ease-out"
								enterFrom="transform scale-95 opacity-0"
								enterTo="transform scale-100 opacity-100"
								leave="transition duration-75 ease-out"
								leaveFrom="transform scale-100 opacity-100"
								leaveTo="transform scale-95 opacity-0"
							></Transition>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
							  <CreateLessonForm courseId={module.courseId} moduleId={module.id} />
								{module.lessons.length === 0 ? (
									<span>There are no lessons!</span>
								) : (
									<ul>
									{module.lessons?.map((l) => {
										return (
											<li key={l.id}>{l.name} - {l.status}</li>
										);
									})}
									</ul>
								)}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
		</>
  );
};

const ModulesList = ({ courseId }: Props) => {
	const moduleQuery = api.module.byCourse.useQuery({ id: courseId});

	const deleteModuleMutation = api.module.delete.useMutation({
    onSettled: () => moduleQuery.refetch(),
  });

  return (
		<>
		<CreateModuleForm courseId={courseId} />
		{moduleQuery.data ? (
      <div className="w-full">
        {moduleQuery.data?.length === 0 ? (
          <span>There are no modules!</span>
        ) : (
          <div className="flex justify-center overflow-y-scroll px-4 text-2xl">
            <div className="flex w-full flex-col gap-4">
              {moduleQuery.data?.map((p) => {
                return (
                  <ModuleDisclosure
                    key={p.id}
                    module={p}
                    onModuleDelete={() => deleteModuleMutation.mutate(p.id)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    ) : (
      <Loading />
    )}
		</>
  )
}

export default ModulesList;