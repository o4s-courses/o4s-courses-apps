import { useRef, useState } from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Timeline } from 'primereact/timeline';
import { Toast } from "primereact/toast";
import { api, type RouterOutputs } from "~/utils/api";
import Loading from "./Loading";

type Props = {
	courseId: number;
};

type Modules = RouterOutputs["module"]["byCourse"];

const CreateModuleForm: React.FC<{ courseId: number; }> = ({ courseId }) => {
	const toast = useRef<Toast>(null);
  const utils = api.useContext();

  const [name, setName] = useState("");

  const { mutate, error } = api.module.create.useMutation({
    async onSuccess() {
      setName("");
			toast.current?.show({severity:'success', summary: 'Success', detail:'Module created successfully', life: 3000});
      await utils.module.byCourse.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 3000});
		},
  });

  return (
		<><Toast ref={toast} />
    <div className="flex items-center border-b border-teal-500 pb-2">
      <input
        className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none p-2 dark:text-gray-400 text-gray-700"
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
        className="block w-2/5 text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow px-4 py-2.5 font-bold text-sm text-center duration-150 rounded-lg"
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
		</>
  );
};

const CreateLessonForm: React.FC<{
	courseId: number;
	moduleId: number
}> = ({ courseId, moduleId }) => {
	const toast = useRef<Toast>(null);
  const utils = api.useContext();

  const [name, setName] = useState("");

  const { mutate, error } = api.lesson.create.useMutation({
    async onSuccess() {
      setName("");
			toast.current?.show({severity:'success', summary: 'Success', detail:'Lesson created successfully', life: 3000});
      await utils.module.byCourse.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 3000});
		},
  });

  return (
		<><Toast ref={toast} />
    <div className="flex items-center border-b border-teal-500 pb-2">
      <input
        className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none p-2 dark:text-gray-400 text-gray-700"
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
        className="block w-2/5 text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-500 dark:hover:bg-sky-600 ring-offset-2 ring-blue-600 dark:ring-sky-500 focus:ring shadow px-4 py-2.5 font-bold text-sm text-center duration-150 rounded-lg"
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
		</>
  );
};

const Modules: React.FC<{
  modules: Modules;
}> = ({ modules }) => {
	return (
			<div className="card">
				<Accordion multiple activeIndex={[0]}>
					{modules?.map((m) => {
						return (
							<AccordionTab key={m.id} header={m.name}>
								{m.lessons?.length === 0 ? (
									<p className="m-0">There are no modules!</p>
								) : (
									<><div className="card">
											<Timeline
												value={m.lessons}
												opposite={(item) => item.name}
												content={(item) => <small className="text-color-secondary">{item.status}</small>} />
										</div>
									</>
								)}
								<div className="card">
									<CreateLessonForm courseId={m.courseId} moduleId={m.id} />
								</div>
							</AccordionTab>
						)
					})}
				</Accordion>
			</div>
	)
};

const ModulesList = ({ courseId }: Props) => {
	const moduleQuery = api.module.byCourse.useQuery({ id: courseId});

	const deleteModuleMutation = api.module.delete.useMutation({
    onSettled: () => moduleQuery.refetch(),
  });

  return (
		<>
		<div className="px-6 pb-6">
			<CreateModuleForm courseId={courseId} />
		</div>
		{moduleQuery.data ? (
      <div className="w-full">
        {moduleQuery.data?.length === 0 ? (
          <span>There are no modules!</span>
        ) : (
					<Modules modules={moduleQuery.data} />
        )}
      </div>
    ) : (
      <Loading />
    )}
		</>
  )
}

export default ModulesList;