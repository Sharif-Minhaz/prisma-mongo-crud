import { getAllTodos } from "@/lib/actions/todos.actions";
import SingleTodo from "./SingleTodo";
import { ITodo } from "@/types";

export default async function TodosList({ as }: { as?: string }) {
	const todos = await getAllTodos();
	return (
		<div>
			{Array.isArray(todos) ? (
				<ul>
					{todos.map((todo: ITodo, index: number) => (
						<SingleTodo key={todo.id} index={index} todo={todo} as={as} />
					))}
				</ul>
			) : (
				<p>No todos available</p>
			)}
		</div>
	);
}
