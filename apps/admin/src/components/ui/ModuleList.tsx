import { api, type RouterOutputs } from "~/utils/api";
import Loading from "./Loading";
import LessonsTable from "./LessonsTable";
import CreateModuleForm from "../forms/CreateModuleForm";

type Modules = RouterOutputs["module"]["byCourse"];

const ModulesList: React.FC<{
	courseId: number;
  modules: Modules;
}> = ({ courseId, modules }) => {

	const deleteModuleMutation = api.module.delete.useMutation({
    onSettled: () => moduleQuery.refetch(),
  });

  return (
		<>
		<div className="p-3">
			<CreateModuleForm courseId={courseId} />
		</div>
		{modules ? (
			
      <div className="w-full">
        {modules.length === 0 ? (
          <span>There are no modules!</span>
        ) : (
					<LessonsTable modules={modules} />
        )}
      </div>
			
    ) : (
      <Loading />
    )}
		</>
  )
}

export default ModulesList;