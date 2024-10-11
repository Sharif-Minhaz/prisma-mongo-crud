"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/db";
import { getUser } from "./auth.actions";

const schema = z.object({
	title: z
		.string({
			required_error: "Title is required",
			invalid_type_error: "Title should be string",
		})
		.min(1, { message: "Title cannot be empty" }),
});

export const getAllTodos = async () => {
	const user = await getUser();
	if (!user) {
		return {
			message: "User not found",
		};
	}
	const todos = await prisma.todo.findMany({
		where: { authorId: user.id },
		include: {
			author: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return todos;
};

export const getSingleTodo = async (id: string) => {
	const user = await getUser();
	if (!user) {
		return {
			message: "User not found",
		};
	}
	const todos = await prisma.todo.findUnique({
		where: { id, authorId: user.id },
	});
	return todos;
};

export const addTodo = async (prevState: any, data: FormData) => {
	const title = data?.get("title") as string;

	const validatedFields = schema.safeParse({ title });

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Error occurred",
		};
	}

	const user = await getUser();
	if (!user) {
		return {
			message: "User not found",
		};
	}
	await prisma.todo.create({
		data: { title, authorId: user.id },
	});

	revalidatePath("/");
	return { success: true };
};

export const updateTodo = async (id: string, title: string) => {
	const validatedFields = schema.safeParse({ title });
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: "Error occurred",
		};
	}
	await prisma.todo.update({
		where: { id },
		data: { title },
	});
	revalidatePath("/");
};

export const completeTodo = async (id: string) => {
	const todo = await prisma.todo.findUnique({
		where: { id },
		select: { isComplete: true },
	});

	if (!todo) {
		throw new Error("Todo not found");
	}

	await prisma.todo.update({
		where: { id },
		data: { isComplete: !todo.isComplete },
	});

	revalidatePath("/");
};

export const deleteTodo = async (id: string) => {
	const user = await getUser();
	if (!user) {
		return {
			message: "User not found",
		};
	}
	await prisma.todo.delete({
		where: { id, authorId: user.id },
	});
	revalidatePath("/");
};
