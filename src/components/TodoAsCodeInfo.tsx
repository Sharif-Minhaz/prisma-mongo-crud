import { getSingleTodo } from "@/lib/actions/todos.actions";

export default async function TodoAsCodeInfo({ id }: { id: string }) {
	const singleTodo = await getSingleTodo(id);
	return (
		<div className="rounded-md bg-slate-950 p-4">
			<code className="text-white">{JSON.stringify(singleTodo, null, 2)}</code>
		</div>
	);
}
