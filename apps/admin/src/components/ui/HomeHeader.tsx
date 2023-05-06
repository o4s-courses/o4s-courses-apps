const HomeHeader = () => {
	return (
			<div className="max-w-screen-xl mx-auto px-4 md:px-8">
					<div className="items-start justify-between py-4 md:flex">
							<div className="max-w-lg">
									<h3 className="text-gray-800 dark:text-gray-500 text-2xl font-bold">
											Your courses
									</h3>
							</div>
							<div className="mt-6 md:mt-0">
									<a
											href="/courses/new"
											className="block px-4 py-2 text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
									>
											New course
									</a>
							</div>
					</div>
			</div>
	);
};

export default HomeHeader;