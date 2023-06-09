import React from 'react';
import { useRouter } from "next/router";
import { Menubar } from 'primereact/menubar';
// import { InputText } from 'primereact/inputtext';
import { useSession, signOut } from "next-auth/react";

import Brand from "./Brand";
import UserAvatar from './Avatar';

export default function Nav() {
	const { data: session } = useSession();
	const router = useRouter();
	if (!session) {
		void router.push("/api/auth/signin");
	};

	const items = [
		{
			label: 'Home',
			icon: 'pi pi-fw pi-home',
			command: () => { void router.push('/'); },
		},
		{
			label: 'Courses',
			icon: 'pi pi-fw pi-file',
			items: [
				{
					label: 'New',
					icon: 'pi pi-fw pi-plus',
					command: () => { void router.push("/courses/new"); },

				},
				{
					label: 'Delete',
					icon: 'pi pi-fw pi-trash'
				},
				{
					separator: true
				},
				{
					label: 'Export',
					icon: 'pi pi-fw pi-external-link'
				}
			]
		},
		{
			label: 'Products',
			icon: 'pi pi-fw pi-shopping-cart',
			items: [
				{
					label: 'List',
					icon: 'pi pi-fw pi-align-left',
					command: () => { void router.push("/products"); },
				},
				{
					label: 'Payments',
					icon: 'pi pi-fw pi-align-right',
					command: () => { void router.push("/products/payments"); },
				},
				{
					label: 'Refunds',
					icon: 'pi pi-fw pi-align-center',
					command: () => { void router.push("/products/refunds"); },
				},

			]
		},
		{
			label: 'Users',
			icon: 'pi pi-fw pi-user',
			items: [
				{
					icon: 'pi pi-fw pi-bars',
					label: 'List',
					command: () => { void router.push("/users"); },
				},
				{
					label: 'Invite',
					icon: 'pi pi-fw pi-user-plus',
					command: () => { void router.push("/users/invite"); },
				},
				{
					label: 'Search',
					icon: 'pi pi-fw pi-users',
					items: [
						{
							label: 'Filter',
							icon: 'pi pi-fw pi-filter',
							items: [
								{
									label: 'Teachers',
									icon: 'pi pi-fw pi-users',
									command: () => { void router.push("/users/teachers"); },
								},
								{
									label: 'Students',
									icon: 'pi pi-fw pi-users',
									command: () => { void router.push("/users/students"); },
								},
								{
									label: 'Observators',
									icon: 'pi pi-fw pi-users',
									command: () => { void router.push("/users/observators"); },
								},
								{
									label: 'Administrators',
									icon: 'pi pi-fw pi-users',
									command: () => { void router.push("/users/administrators"); },
								},
							]
						}
					]
				}
			]
		},
		{
			label: 'Events',
			icon: 'pi pi-fw pi-calendar',
			items: [
				{
					label: 'Edit',
					icon: 'pi pi-fw pi-pencil',
					items: [
						{
							label: 'Save',
							icon: 'pi pi-fw pi-calendar-plus'
						},
						{
							label: 'Delete',
							icon: 'pi pi-fw pi-calendar-minus'
						}
					]
				},
				{
					label: 'Archive',
					icon: 'pi pi-fw pi-calendar-times',
					items: [
						{
							label: 'Remove',
							icon: 'pi pi-fw pi-calendar-minus'
						}
					]
				}
			]
		},
		{
			label: 'Quit',
			icon: 'pi pi-fw pi-power-off',
			command: () => { void signOut(); },
		}
	];

	const start = <Brand className="mr-2"></Brand>;
	// const end = <InputText placeholder="Search" type="text" className="w-full" />;
	const end = <UserAvatar image={session?.user.image} />;

	return (
		<header>
			<div className="card">
				<Menubar model={items} start={start} end={end} />
			</div>
		</header>
	)
}