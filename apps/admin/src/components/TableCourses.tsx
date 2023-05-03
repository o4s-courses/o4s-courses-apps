
type Props = {
  courses: {
    id: number;
		name: string;
		description: string;
		published: boolean;
  }[];
};

export const TableCourses = ({ courses }: Props) => {

	return (
			<div className="max-w-screen-xl mx-auto px-4 md:px-8">
					<div className="items-start justify-between md:flex">
							<div className="max-w-lg">
									<h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
											Todos os cursos
									</h3>
									<p className="text-gray-600 mt-2">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry.
									</p>
							</div>
							<div className="mt-3 md:mt-0">
									<a
											href="javascript:void(0)"
											className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
									>
											Adicionar curso
									</a>
							</div>
					</div>
					<div className="mt-12 relative h-max overflow-auto">
							<table className="w-full table-auto text-sm text-left">
									<thead className="text-gray-600 font-medium border-b">
											<tr>
													<th className="py-3 pr-5">ID</th>
													<th className="py-3 pr-5">Nome</th>
													<th className="py-3 pr-5">Descrição</th>
													<th className="py-3 pr-5">Estado</th>
													<th className="py-3 pr-5"></th>
											</tr>
									</thead>
									<tbody className="text-gray-600 divide-y">
											{
													courses.map((item, idx) => (
															<tr key={idx}>
																	<td className="pr-5 py-4 whitespace-nowrap">{item.id}</td>
																	<td className="pr-5 py-4 whitespace-nowrap">{item.name}</td>
																	<td className="pr-5 py-4 whitespace-nowrap">
																			<span className={`px-3 py-2 rounded-full font-semibold text-xs ${item.published ? "text-green-600 bg-green-50" : "text-blue-600 bg-blue-50"}`}>
																					{item.published ? "S" : "N"}
																			</span>
																	</td>
																	<td className="pr-5 py-4 whitespace-nowrap">{item.description}</td>
																	<td className="text-right whitespace-nowrap">
																			<a href="javascript:void()" className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
																					Gerir
																			</a>
																	</td>
															</tr>
													))
											}
									</tbody>
							</table>
					</div>
			</div>
	)
}