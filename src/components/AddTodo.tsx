"use client";

import { addTodo } from "@/lib/actions/todos.actions";
import { useFormState } from "react-dom";
import { useOptimistic, useRef } from "react";
import { ITodo, IUser } from "@/types";
import SingleTodo from "./SingleTodo";

interface TodoState {
	message?: string;
	success?: boolean;
	errors?: {
		title?: string[];
	};
}

const initialState: TodoState = { message: "" };

export default function AddTodo({ user }: { user: IUser }) {
	const [state, formAction] = useFormState(addTodo, initialState);
	const inputRef = useRef<HTMLInputElement>(null);
	const [optimisticTodos, addOptimisticTodo] = useOptimistic<ITodo[], ITodo>(
		[],
		(state, newTodo) => [newTodo, ...state]
	);

	const handleSubmit = async (formData: FormData) => {
		const title = formData.get("title") as string;
		const optimisticTodo: ITodo = {
			id: Date.now().toString(),
			title,
			isComplete: false,
			createdAt: new Date(),
			updatedAt: new Date(),
			author: user,
		};

		addOptimisticTodo(optimisticTodo);

		try {
			await formAction(formData);
			if (inputRef.current) {
				inputRef.current.value = "";
			}
		} catch (err) {
			console.log(err);
			addOptimisticTodo((currentTodos: ITodo[]) =>
				currentTodos.filter((todo: ITodo) => todo.id !== optimisticTodo.id)
			);
		}
	};

	return (
		<>
			<form action={handleSubmit} className="w-full flex gap-2 mb-2">
				<input
					ref={inputRef}
					type="text"
					className="px-3 py-2 w-full border"
					placeholder="Provide a todo name"
					name="title"
				/>
				<button className="border px-4 py-2">Add</button>
			</form>
			{state?.message && <p className="text-red-500">{state.message}</p>}
			{optimisticTodos.length > 0 && (
				<ul>
					{optimisticTodos.map((todo) => (
						<SingleTodo key={todo.id} index={-1} todo={todo} />
					))}
				</ul>
			)}
		</>
	);
}
