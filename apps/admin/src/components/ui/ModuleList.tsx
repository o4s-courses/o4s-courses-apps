import { api, type RouterOutputs } from "~/utils/api";
import Loading from "./Loading";
import LessonsTable from "./LessonsTable";

type Modules = RouterOutputs["module"]["byCourse"];

const ModulesList: React.FC<{
	modules: Modules;
}> = ({ modules }) => {

	const deleteModuleMutation = api.module.delete.useMutation({
		onSettled: () => moduleQuery.refetch(),
	});

	return (
		<>
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