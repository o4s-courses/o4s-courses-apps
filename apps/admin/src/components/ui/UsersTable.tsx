/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { type RouterOutputs } from '~/utils/api';

type Users = RouterOutputs["user"]["all"];

const UsersTable: React.FC<{
	users: Users;
}> = ({ users }) => {
	const toast = useRef<Toast>(null);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
		name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
		email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
		date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
		role: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
	});
	const [globalFilterValue, setGlobalFilterValue] = useState('');
	const [roles] = useState(['admin', 'user', 'new', 'negotiation', 'renewal']);

	const getSeverity = (role) => {
		switch (role) {
			case 'admin':
				return 'danger';

			case 'user':
				return 'success';

			case 'new':
				return 'info';

			case 'negotiation':
				return 'warning';

			case 'renewal':
				return null;
		}
	};

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		const _filters = { ...filters };

		_filters['global'].value = value;

		setFilters(_filters);
		setGlobalFilterValue(value);
	};


	const formatDate = (value) => {
		return value.toLocaleDateString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	};

	const dateBodyTemplate = (rowData) => {
		return formatDate(rowData.emailVerified);
	};

	const dateFilterTemplate = (options) => {
		return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
	};

	const renderHeader = () => {
		return (
			<div className="flex flex-wrap gap-2 justify-content-between align-items-center">
				<h4 className="m-0">Users</h4>
				<span className="p-input-icon-left">
					<i className="pi pi-search" />
					<InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
				</span>
			</div>
		);
	};

	const imageBodyTemplate = (rowData) => {

		return (
			<div className="flex align-items-center gap-2">
				<img alt={rowData.name} src={rowData.image} width="32" />
			</div>
		);
	};

	const roleBodyTemplate = (rowData) => {
		return <Tag value={rowData.role} severity={getSeverity(rowData.role)} />;
	};

	const roleFilterTemplate = (options) => {
		return <Dropdown value={options.value} options={roles} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={roleItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
	};

	const actionBodyTemplate = () => {
		return <Button type="button" icon="pi pi-cog" rounded></Button>;
	};

	const roleItemTemplate = (option) => {
		return <Tag value={option} severity={getSeverity(option)} />;
	};

	const header = renderHeader();

	return (
		<><Toast ref={toast} />
			<div className="card">
				<DataTable value={users} paginator header={header} rows={10}
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
					filters={filters} filterDisplay="menu" globalFilterFields={['name', 'email', 'representative.name', 'balance', 'status']}
					emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
					<Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
					<Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
					<Column field="email" header="Email" sortable filter filterPlaceholder="Search by email" style={{ minWidth: '14rem' }} />
					<Column field="image" style={{ minWidth: '12rem' }} body={imageBodyTemplate} />
					<Column field="emailVerified" header="Date" sortable filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
					<Column field="role" header="Role" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={roleBodyTemplate} filter filterElement={roleFilterTemplate} />
					<Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
				</DataTable>
			</div>
		</>
	);

};

export default UsersTable;