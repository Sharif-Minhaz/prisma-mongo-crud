import AddTodo from "@/components/AddTodo";
import TodosList from "@/components/TodosList";

export default function Home() {
	return (
		<main>
			<h1 className="text-2xl mb-4">Todos List</h1>
			<AddTodo />
			<TodosList />
		</main>
	);
}
