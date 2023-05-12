/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from 'react';
import Image from "next/image";
import { api, type RouterOutputs } from "~/utils/api";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { useRouter } from 'next/router';
import Loading from './Loading';

type Course = RouterOutputs["course"]["byAuthor"][number];

const CoursesList = () => {
	const router = useRouter();
	const [layout, setLayout] = useState('grid');

	const courses = api.course.byAuthor.useQuery();

	const getSeverity = (course: Course) => {
		switch (course.published) {
			case true:
				return 'success';

			case false:
				return 'danger';

			default:
				return null;
		}
	};

	const listItem = (course: Course) => {
		return (
			<div className="col-12">
				<div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
					<Image src={course.image} alt={course.name} width={205} height={201} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" />
					<div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
						<div className="flex flex-column align-items-center sm:align-items-start gap-3">
							<div className="text-2xl font-bold text-900">{course.name}</div>
							<div className="text-900">{course.description}</div>
						</div>
						<div className="flex align-items-center gap-3">
							<Tag value={course.published ? ("Published") : ("Draft")} severity={getSeverity(course)}></Tag>
						</div>
						<div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
							<span className="font-semibold">M: {course._count.modules}</span>
							<span className="font-semibold">L: {course._count.lessons}</span>
							<span className="font-semibold">S: {course._count.members}</span>
							<Button onClick={() => router.push(`/courses/${course.id}`)} icon="pi pi-arrow-right" className="p-button-rounded" ></Button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const gridItem = (course: Course) => {
		return (
			<div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
				<div className="p-4 border-1 surface-border surface-card border-round">
					<div className="flex flex-wrap align-items-center justify-content-between gap-2">
						<Tag value={course.published ? ("Published") : ("Draft")} severity={getSeverity(course)}></Tag>
					</div>
					<div className="flex flex-column align-items-center gap-3 py-5">
						<Image className="w-9 shadow-2 border-round" src={course.image} alt={course.name} width={205} height={201} />
						<div className="text-2xl font-bold">{course.name}</div>
						<div className="text-900">{course.description}</div>
					</div>
					<div className="flex align-items-center justify-content-between">
						<span className="font-semibold">M: {course._count.modules}</span>
						<span className="font-semibold">L: {course._count.lessons}</span>
						<span className="font-semibold">S: {course._count.members}</span>
						<Button onClick={() => router.push(`/courses/${course.id}`)} icon="pi pi-arrow-right" className="p-button-rounded" ></Button>
					</div>
				</div>
			</div>
		);
	};

	const itemTemplate = (course: Course, layout: string) => {
		if (!course) {
			return;
		}

		if (layout === 'list') return listItem(course);
		else if (layout === 'grid') return gridItem(course);
	};

	const header = () => {
		return (
			<div className="flex justify-content-end">
				<DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
			</div>
		);
	};

	return (
		<>
			{courses.data ? (
				<div className="card">
					<DataView value={courses.data} itemTemplate={itemTemplate} layout={layout} header={header()} />
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};

export default CoursesList;
