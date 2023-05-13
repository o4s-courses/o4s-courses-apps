import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";

import Header from "~/components/ui/Header";
import Nav from "~/components/ui/Nav";
import SectionWrapper from "~/components/SectionWrapper";
import UsersHeader from "~/components/ui/UsersHeader";
import Loading from "~/components/ui/Loading";
import UsersList from "~/components/ui/UsersList";
import { Toast } from "primereact/toast";

const ManageUsers = () => {
	const router = useRouter();
	const toast = useRef<Toast>(null);
	const [currentFilter, changeFilter] = useState("ALL");
	const [filterError, setFilterError] = useState(false);

	//if (typeof courseId !== "string") {
	//  throw new Error("missing id");
	//}

	const userQuery = api.user.all.useQuery({ skip: 0, take: 50 });

	const filterUsers = api.user.byUserRole.useQuery({
		onSuccess() {
			setFilterError(false);
			toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Filter users successfully', life: 3000 });
		},
		onError: (error) => {
			console.error(error);
			setFilterError(true);
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Something went wrong', life: 3000 });
		},
	});

	return (
		<><Toast ref={toast} />
			{userQuery.data ? (
				<><Header title={'Manage Users'} />
					<Nav />
					<UsersHeader
						currentFilter={currentFilter} onUserFilter={(role: string) => filterUsers.refetch({ skip: 0, take: 50, role: role })} />
					<SectionWrapper className="mt-0">
						{currentFilter === "ALL" ? (
							<UsersList users={userQuery.data} />
						) : (
							<UsersList users={filterUsers.data.user} />
						)}
					</SectionWrapper>
				</>
			) : (
				<Loading />
			)}
		</>
	);

};

export default ManageUsers;