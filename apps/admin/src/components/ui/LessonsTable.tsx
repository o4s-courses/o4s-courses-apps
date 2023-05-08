/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useRef, useState } from 'react';
import { DataTable, type DataTableExpandedRows, type DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Tag } from 'primereact/tag';
import { Toast } from "primereact/toast";
import { type RouterOutputs, api } from '~/utils/api';
import { Button } from 'primereact/button';
import CreateLessonForm from '../forms/CreateLessonForm';

type Module = RouterOutputs["module"]["byCourse"][number];
type Modules = RouterOutputs["module"]["byCourse"];

const LessonsTable: React.FC<{
  modules: Modules;
}> = ({ modules }) => {
	const toast = useRef<Toast>(null);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>(null);
  const [statuses] = useState<string[]>(['published', 'draft']);
	const utils = api.useContext();

	const reject = () => {
		toast.current?.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
	};

	const confirm = (event) => {
    confirmDialog({
        trigger: event.currentTarget,
        message: `Are you sure you want to proceed? ${event}`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteLesson.mutate(event),
        reject,
    });
	};

	const updateLesson = api.lesson.update.useMutation({
    async onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Lesson updated successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 6000});
		},
  });

	const deleteLesson = api.course.delete.useMutation({
    async onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Lesson deleted successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError: (error) => {
			console.error(error);
			toast.current?.show({severity:'error', summary: 'Error', detail:`${error}`, life: 6000});
		},
  });

	const openInNewTab = (url: string) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow) newWindow.opener = null
	}

    const getSeverity = (value: string) => {
        switch (value) {
            case 'published':
                return 'success';

            case 'draft':
                return 'danger';

            default:
                return null;
        }
    };

    const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
        const { newData, index } = e;

				updateLesson.mutate({
					id: newData.id,
					name: newData.name,
					status: newData.status,
				});
    };

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
    };

    const statusEditor = (options) => {
        return (
            <Dropdown
                value={options.value}
                options={statuses}
                onChange={(e: DropdownChangeEvent) => options.editorCallback(e.value)}
                placeholder="Select a Status"
                itemTemplate={(option) => {
                    return <Tag value={option} severity={getSeverity(option)}></Tag>;
                }}
            />
        );
    };

  const statusBodyTemplate = (rowData) => {
    return <Tag value={rowData.status} severity={getSeverity(rowData.status)}></Tag>;
  };

	const htmlBodyTemplate = (rowData) => {
		return <Button
							onClick={() => openInNewTab(`/courses/${rowData.courseId}/lessons/${rowData.id}`)}
							icon="pi pi-file-edit" rounded text
							severity="success"
							className="hover:bg-gray-200" aria-label="Delete" />;
	};

	const deleteBodyTemplate = (rowData) => {
		return <Button
							onClick={() => confirm(rowData.id)}
							icon="pi pi-trash" rounded text
							severity="danger" 
							className="hover:bg-gray-200" aria-label="Delete" />;
	};

	const expandAll = () => {
		let _expandedRows: DataTableExpandedRows = {};

		modules.forEach((p) => (_expandedRows[`${p.id}`] = true));

		setExpandedRows(_expandedRows);
	};

	const collapseAll = () => {
			setExpandedRows(null);
	};

	const allowExpansion = (rowData: Module) => {
		return true;
		// return rowData.lessons.length > 0;
	};

	const header = (
		<div className="flex flex-wrap justify-content-end gap-2">
				<Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
				<Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
		</div>
	);

	const footer = (rowData: Module) => {
		return (
			<div className="p-3">
				<CreateLessonForm courseId={rowData.courseId} moduleId={rowData.id} />
			</div>
		)
	};


	const rowExpansionTemplate = (data: Module) => {
		return (
				<div className="p-1">
					<h5>Lessons for {data.name}</h5>
					<DataTable
							value={data.lessons}
							editMode="row"
							dataKey="id"
							onRowEditComplete={onRowEditComplete}
							footer={footer}
							tableStyle={{ minWidth: '50rem' }}
						>
						<Column field="id" header="#" style={{ width: '5%' }}></Column>
						<Column field="pos" header="Pos" sortable style={{ width: '5%' }}></Column>
						<Column field="name" header="Lesson" editor={(options) => textEditor(options)} style={{ width: '50%' }}></Column>
						<Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '10%' }}></Column>
						<Column rowEditor headerStyle={{ width: '10%', minWidth: '6rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
						<Column style={{ width: '5%', minWidth: '3rem' }} body={htmlBodyTemplate} bodyStyle={{ textAlign: 'center' }}/>
						<Column style={{ width: '5%', minWidth: '3rem' }} body={deleteBodyTemplate} bodyStyle={{ textAlign: 'center' }}/>
					</DataTable>
				</div>
		);
	};

  return (
		<><Toast ref={toast} />
		<div className="card">
			<ConfirmDialog />
			<DataTable value={modules}
									expandedRows={expandedRows}
									onRowToggle={(e) => setExpandedRows(e.data)}
									rowExpansionTemplate={rowExpansionTemplate}
                 	dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}>
        <Column expander={allowExpansion} style={{ width: '5rem' }} />
				<Column field="id" header="#" style={{ width: '10%' }} />
				<Column field="pos" header="Pos" style={{ width: '10%' }} />
        <Column field="name" header="Module" style={{ width: '90%' }} />
      </DataTable>
		</div>
		</>
  );
};

export default LessonsTable;