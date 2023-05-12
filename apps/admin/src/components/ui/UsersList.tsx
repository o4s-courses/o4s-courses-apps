import { api, type RouterOutputs } from "~/utils/api";
import Loading from "./Loading";
import UsersTable from "./UsersTable";

type Users = RouterOutputs["user"]["all"];

const UsersList: React.FC<{
	users: Users;
}> = ({ users }) => {

	return (
		<>
			{users ? (

				<div className="w-full">
					{users.length === 0 ? (
						<span>There are no users!</span>
					) : (
						<UsersTable users={users} />
					)}
				</div>

			) : (
				<Loading />
			)}
		</>
	)
}

export default UsersList;