/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useRouter } from 'next/router'
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { type RouterOutputs } from '~/utils/api';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

type Lesson = RouterOutputs["lesson"]["getContent"];

const LessonHeader: React.FC<{
  lesson: Lesson;
}> = ({ lesson }) => {
	const router = useRouter();
	const toast = useRef<Toast>(null);

	const reject = () => {
		toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 6000 });
	}

	const confirm = (event) => {
    confirmDialog({
        trigger: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => onCourseDelete(),
        reject,
    });
	};

  return (
		<><Toast ref={toast} />
		<ConfirmDialog />
		<div className="surface-0">
			<ul className="list-none p-0 m-0 flex align-items-center font-medium mb-3">
				<li>
					<a onClick={() => { void router.push('/'); } } className="text-500 no-underline line-height-3 cursor-pointer">Courses</a>
				</li>
				<li className="px-2">
					<i className="pi pi-angle-right text-500 line-height-3"></i>
				</li>
				<li>
					<a onClick={() => { void router.push(`/courses/${lesson.course.id}`); } } className="text-500 no-underline line-height-3 cursor-pointer">{lesson.course.name}</a>
				</li>
				<li className="px-2">
					<i className="pi pi-angle-right text-500 line-height-3"></i>
				</li>
				<li>
					<span className="text-900 line-height-3">{lesson.name}</span>
				</li>
			</ul>
			<div className="flex align-items-start flex-column lg:justify-content-between lg:flex-row">
				<div>
					<div className="font-medium text-3xl text-900">{lesson.id} : {lesson.name}</div>
					<div className="flex align-items-center text-700 flex-wrap">
						<div className="mr-5 flex align-items-center mt-3">
							<i className="pi pi-users mr-2"></i>
							<span>332 Active Users</span>
						</div>
						<div className="mr-5 flex align-items-center mt-3">
							<i className="pi pi-globe mr-2"></i>
							<span>9402 Sessions</span>
						</div>
						<div className="flex align-items-center mt-3">
							<i className="pi pi-clock mr-2"></i>
							<span>2.32m Avg. Duration</span>
						</div>
					</div>
				</div>
				<div className="mt-3 lg:mt-0">
					<Button label="Add" className="p-button-outlined mr-2" icon="pi pi-user-plus" />
					<Button
						onClick={confirm}
						label="Delete"
						severity="danger"
						className="p-button-outlined mr-2"
						icon="pi pi-trash" />
					<Button label={lesson.status === 'draft' ? ("Publish") : ("Unpublish")} icon="pi pi-check" />
				</div>
			</div>
		</div>
		</>
  )
};

export default LessonHeader;