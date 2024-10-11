import AddTodo from "@/components/AddTodo";
import TodosList from "@/components/TodosList";
import { getUser } from "@/lib/actions/auth.actions";
import { IUser } from "@/types";

export default async function Home() {
	const user = await getUser();

	return (
		<main>
			<h1 className="text-2xl mb-4">Todos List</h1>
			<AddTodo user={user as IUser} />
			<TodosList />
		</main>
	);
}
