import TodosList from "@/components/TodosList";
import { getUser } from "@/lib/actions/auth.actions";

export default async function ProfilePage() {
	const user = await getUser();
	return (
		<div>
			<h1 className="text-2xl mb-4">User profile information</h1>
			<p className="mb-2 text-gray-700">Name: {user?.name}</p>
			<p className="mb-2 text-gray-700">Email: {user?.email}</p>

			<h1 className="text-2xl mb-4">Your todos</h1>
			<TodosList as="profile" />
		</div>
	);
}
