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
import { Toolbar } from 'primereact/toolbar';
import { Tag } from 'primereact/tag';
import { Toast } from "primereact/toast";
import { type RouterOutputs, api } from '~/utils/api';
import { Button } from 'primereact/button';
import CreateLessonForm from '../forms/CreateLessonForm';
import { Dialog } from 'primereact/dialog';

type Module = RouterOutputs["module"]["byCourse"][number];
type Modules = RouterOutputs["module"]["byCourse"];

type ModuleDTO = {
	id: 0;
	courseId: number;
	name: string;
};

type LessonDTO = {
	id: 0;
	courseId: number;
	moduleId: number;
	name: string;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
};

const LessonsTable: React.FC<{
  modules: Modules;
}> = ({ modules }) => {
	let emptyModule: ModuleDTO = {
		id: 0,
		courseId: modules[0].courseId,
		name: '',
	};

	let emptyLesson: LessonDTO = {
		id: 0,
		courseId: modules[0].courseId,
		moduleId: 0,
    name: '',
  };

	const toast = useRef<Toast>(null);
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>(null);
	const [deleteModuleDialog, setDeleteModuleDialog] = useState<boolean>(false);
	const [module, setModule] = useState<ModuleDTO>(emptyModule);
	const [moduleDialog, setModuleDialog] = useState<boolean>(false);
	const [submittedModule, setModuleSubmitted] = useState<boolean>(false);
	const [lesson, setLesson] = useState<LessonDTO>(emptyLesson);
	const [lessonDialog, setLessonDialog] = useState<boolean>(false);
	const [submittedLesson, setLessonSubmitted] = useState<boolean>(false);
  const [statuses] = useState<string[]>(['published', 'draft']);

	const utils = api.useContext();

	/** Add a module */

	const hideModuleDialog = () => {
		setModuleSubmitted(false);
		setModuleDialog(false);
	};

	const leftModuleToolbarTemplate = () => {
		return (
				<div className="flex flex-wrap gap-2">
						<Button label="Module" icon="pi pi-plus" severity="success" onClick={openNewModule} />
				</div>
		);
	};

	const rightModuleToolbarTemplate = () => {
		return (
			<div className="flex flex-wrap justify-content-end gap-2">
				<Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
				<Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
			</div>
		)
	};

	const saveModule = () => {
		setModuleSubmitted(true);

		if (module.name.trim()) {
				let _module = { ...module };

				setModuleDialog(false);
				setModule(emptyModule);
				createModule.mutate({
					courseId: _module.courseId,
					name: _module.name,
				});

		}
	};

	const moduleDialogFooter = (
		<React.Fragment>
				<Button label="Cancel" icon="pi pi-times" outlined onClick={hideModuleDialog} />
				<Button label="Save" icon="pi pi-check" onClick={saveModule} />
		</React.Fragment>
	);

	const openNewModule = () => {
		setModule(emptyModule);
		setModuleSubmitted(false);
		setModuleDialog(true);
	};

	const createModule = api.module.create.useMutation({
    async onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Module created successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 3000});
		},
  });

	const onModuleInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const val = (e.target && e.target.value) || '';
		let _module = { ...module };

		_module[`${name}`] = val;

		setModule(_module);
	};

	/** End add a module */

	/** Delete a module */

	const confirmDeleteModule = (id: number, name: string) => {
		let _module = { ...module };

		_module[`${id}`] = id;
		_module[`${name}`] = name;

		setModule(_module);
		setDeleteModuleDialog(true);
	};

	const deleteModuleBodyTemplate = (rowData) => {
		return <Button
							onClick={() => confirmDeleteModule(rowData.id, rowData.name)}
							icon="pi pi-trash" rounded text
							severity="danger" 
							className="hover:bg-gray-200" aria-label="Delete" />;
	};

	const hideDeleteModuleDialog = () => {
		setDeleteModuleDialog(false);
	};

	const confirmedDeleteModule = () => {

		setDeleteModuleDialog(false);
		setModule(emptyModule);
		deleteModule.mutate(module.id);
	};

	const deleteModuleDialogFooter = (
		<React.Fragment>
				<Button label="No" icon="pi pi-times" outlined onClick={hideDeleteModuleDialog} />
				<Button label="Yes" icon="pi pi-check" severity="danger" onClick={confirmedDeleteModule} />
		</React.Fragment>
	);

	const deleteModule = api.module.delete.useMutation({
    async onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Lesson deleted successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError: (error) => {
			console.error(error);
			toast.current?.show({severity:'error', summary: 'Error', detail:`${error}`, life: 6000});
		},
  });

	/** End delete a module */

	/** Add a lesson */
	const hideLessonDialog = () => {
		setLessonSubmitted(false);
		setLessonDialog(false);
	};

	const addLessonBodyTemplate = (rowData) => {
		return <Button
							onClick={() => openNewLesson(rowData.moduleId)}
							icon="pi pi-plus" rounded text
							severity="warning" 
							className="hover:bg-gray-200" aria-label="Add" />;
	};

	const openNewLesson = (moduleId: number) => {
		setLesson(emptyLesson);
		let _lesson = { ...lesson };
		_lesson[`${moduleId}`] = moduleId;
		setLesson(_lesson);
		setLessonSubmitted(false);
		setLessonDialog(true);
	};

	const onLessonInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		const val = (e.target && e.target.value) || '';
		let _lesson = { ...lesson };

		_lesson[`${name}`] = val;

		setLesson(_lesson);
	};

	const saveLesson = () => {
		setLessonSubmitted(true);

		if (lesson.name.trim()) {
				let _lesson = { ...lesson };

				setLessonDialog(false);
				setLesson(emptyLesson);
				createLesson.mutate({
					courseId: _lesson.courseId,
					moduleId: _lesson.moduleId,
					name: _lesson.name,
				});

		}
	};

	const lessonDialogFooter = (
		<React.Fragment>
				<Button label="Cancel" icon="pi pi-times" outlined onClick={hideLessonDialog} />
				<Button label="Save" icon="pi pi-check" onClick={saveLesson} />
		</React.Fragment>
	);

	const leftLessonToolbarTemplate = () => {
		return (
				<div className="flex flex-wrap gap-2">
						<Button label="New" icon="pi pi-plus" severity="success" onClick={openNewLesson} />
				</div>
		);
	};

	const rightLessonToolbarTemplate = () => {
			return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
	};

	const createLesson = api.lesson.create.useMutation({
    async onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Lesson created successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Something went wrong', life: 3000});
		},
  });

	/** End add lesson */

	const exportCSV = () => {
		dt.current.exportCSV();
	};

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

	const updateModule = api.module.update.useMutation({
    async onSuccess() {
			toast.current?.show({severity:'success', summary: 'Success', detail:'Module updated successfully', life: 3000});
      await utils.course.byId.invalidate();
    },
		onError(error) {
			console.error(error);
      toast.current?.show({severity:'error', summary: 'Error', detail: 'Something went wrong', life: 6000});
		},
  });

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

  const onLessonRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    const { newData, index } = e;

		updateLesson.mutate({
			id: newData.id,
			name: newData.name,
			status: newData.status,
		});
  };

	const onModuleRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
		const { newData, index } = e;

		updateModule.mutate({
			id: newData.id,
			name: newData.name,
		});
	};

  const textEditor = (options) => {
    return <InputText className="w-full" type="text" value={options.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback(e.target.value)} />;
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

	const rowExpansionTemplate = (data: Module) => {
		return (
				<div className="p-1">
					<h5>Lessons for {data.name}</h5>
					<DataTable
							value={data.lessons}
							editMode="row"
							dataKey="id"
							onRowEditComplete={onLessonRowEditComplete}
							tableStyle={{ minWidth: '50rem' }}
						>
						<Column field="id" header="#" style={{ width: '5%' }}></Column>
						<Column field="pos" header="Pos" sortable style={{ width: '5%' }}></Column>
						<Column field="name" header="Lesson" editor={(options) => textEditor(options)} style={{ width: '45%' }}></Column>
						<Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '10%' }}></Column>
						<Column rowEditor headerStyle={{ width: '10%', minWidth: '6rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
						<Column style={{ width: '5%', minWidth: '3rem' }} body={htmlBodyTemplate} bodyStyle={{ textAlign: 'center' }}/>
						<Column style={{ width: '5%', minWidth: '3rem' }} body={addLessonBodyTemplate} bodyStyle={{ textAlign: 'center' }}/>
						<Column style={{ width: '5%', minWidth: '3rem' }} body={deleteBodyTemplate} bodyStyle={{ textAlign: 'center' }}/>
					</DataTable>
					<Toolbar className="mb-4" left={leftLessonToolbarTemplate} right={rightLessonToolbarTemplate}></Toolbar>
					<Dialog visible={lessonDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Create lesson" modal className="p-fluid" footer={lessonDialogFooter} onHide={hideLessonDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={lesson.name} onChange={(e) => onLessonInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submittedLesson && !lesson.name })} />
                    {submittedLesson && !lesson.name && <small className="p-error">Name is required.</small>}
                </div>
          </Dialog>

				</div>
		);
	};

  return (
		<><Toast ref={toast} />
		<div className="card">
			<Toolbar className="mb-4" left={leftModuleToolbarTemplate} right={rightModuleToolbarTemplate}></Toolbar>
			<DataTable value={modules}
									editMode="row"
									onRowEditComplete={onModuleRowEditComplete}
									expandedRows={expandedRows}
									onRowToggle={(e) => setExpandedRows(e.data)}
									rowExpansionTemplate={rowExpansionTemplate}
                 	dataKey="id" tableStyle={{ minWidth: '60rem' }}>
        <Column expander={allowExpansion} style={{ width: '5rem' }} />
				<Column field="id" header="#" style={{ width: '10%' }} />
				<Column field="pos" header="Pos" style={{ width: '10%' }} />
        <Column field="name" header="Module" editor={(options) => textEditor(options)} style={{ width: '65%' }} />
				<Column rowEditor headerStyle={{ width: '10%', minWidth: '6rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
				<Column style={{ width: '5%', minWidth: '3rem' }} body={deleteModuleBodyTemplate} bodyStyle={{ textAlign: 'center' }}/>
      </DataTable>
			<Dialog visible={deleteModuleDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteModuleDialogFooter} onHide={hideDeleteModuleDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {module && (
              <span>
                Are you sure you want to delete <b>{module.id} : {module.name}</b>?
              </span>
            )}
        </div>
      </Dialog>
			<Dialog visible={moduleDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Create module" modal className="p-fluid" footer={moduleDialogFooter} onHide={hideModuleDialog}>
        <div className="field">
          <label htmlFor="name" className="font-bold">
            Module name
          </label>
          <InputText id="name" value={module.name} onChange={(e) => onModuleInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submittedModule && !module.name })} />
          {submittedModule && !module.name && <small className="p-error">Name is required.</small>}
        </div>
      </Dialog>
		</div>
		</>
  );
};

export default LessonsTable;