"use client";

import { updateTodo, deleteTodo, completeTodo } from "@/lib/actions/todos.actions";
import { ITodo } from "@/types";
import Link from "next/link";
import { useState } from "react";

export default function SingleTodo({
	index,
	todo,
	as,
}: {
	index: number;
	todo: ITodo;
	as?: string;
}) {
	const [isUpdate, setIsUpdate] = useState(false);
	const [updatedText, setUpdatedText] = useState(todo.title);

	const handleUpdate = async () => {
		if (isUpdate) {
			await updateTodo(todo.id, updatedText);
			setIsUpdate(false);
		} else {
			setIsUpdate(true);
		}
	};

	const handleDelete = async (id: string) => {
		await deleteTodo(id);
	};

	const handleComplete = async (id: string) => {
		await completeTodo(id);
	};

	return (
		<li className="border p-3 flex justify-between">
			{isUpdate ? (
				<>
					<input
						className="px-2 py-1 border w-full mr-3.5"
						value={updatedText}
						onChange={(e) => setUpdatedText(e.target.value)}
					/>
					<button className="mr-3" onClick={() => setIsUpdate(false)}>
						Close
					</button>
				</>
			) : (
				<Link href={`/${todo.id}`}>
					<span className={`${todo.isComplete ? "line-through" : ""}`}>
						{index + 1}. {todo.title}
					</span>
				</Link>
			)}
			{as !== "profile" ? (
				<div className="flex items-center gap-3">
					{!isUpdate && (
						<input
							className="mr-3 cursor-pointer"
							type="checkbox"
							defaultChecked={todo.isComplete}
							name=""
							id=""
							onChange={() => handleComplete(todo.id)}
						/>
					)}
					<button onClick={() => handleDelete(todo.id)} className="text-red-600">
						Delete
					</button>
					<button onClick={handleUpdate} className="text-blue-600">
						{isUpdate ? "Save" : "Update"}
					</button>
				</div>
			) : (
				<span>
					{new Date(todo.createdAt).toLocaleString("en-US", {
						year: "numeric",
						month: "numeric",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
					})}
				</span>
			)}
		</li>
	);
}
