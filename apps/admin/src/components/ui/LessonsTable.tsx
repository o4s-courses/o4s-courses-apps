import React, { useRef, useState } from 'react';
import { DataTable, type DataTableRowEditCompleteEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown, type DropdownChangeEvent } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from "primereact/toast";

type Lesson = {
	id: number;
	name: string;
	pos: number;
	status: string;
};

type Props = {
	lessons: Lesson[];
};

const LessonsTable: React.FC<{
  lessons: Props;
}> = ({ lessons }) => {
	const toast = useRef<Toast>(null);
  const [statuses] = useState<string[]>(['published', 'draft']);

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
        let _lessons = [...lessons];
        let { newData, index } = e;

        _lessons[index] = newData;

        // setProducts(_lessons);
				toast.current?.show({severity:'success', summary: 'Success', detail: JSON.stringify(_lessons), life: 6000});
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

    return (
			<><Toast ref={toast} /><div className="card p-fluid">
				<DataTable value={lessons} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
					<Column field="id" header="#" style={{ width: '5%' }}></Column>
					<Column field="pos" header="Pos" style={{ width: '5%' }}></Column>
					<Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '50%' }}></Column>
					<Column field="status" header="Status" body={statusBodyTemplate} editor={(options) => statusEditor(options)} style={{ width: '20%' }}></Column>
					<Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
				</DataTable>
			</div>
			</>
    );
};

export default LessonsTable;