"use client";

import { addTodo } from "@/lib/actions/todos.actions";
import { useFormState } from "react-dom";

export default function AddTodo() {
	const initialState = { message: "" };
	const [state, formAction] = useFormState(addTodo, initialState);

	return (
		<>
			<form action={formAction} className="w-full flex gap-2 mb-2">
				<input
					type="text"
					className="px-3 py-2 w-full border"
					placeholder="Provide a todo name"
					name="title"
				/>
				<button className="border px-4 py-2">Add</button>
			</form>
			{state?.message && <p className="text-red-500">{state.message}</p>}
		</>
	);
}
