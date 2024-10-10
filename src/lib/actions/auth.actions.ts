"use server";

import { prisma } from "@/db";
import { cookies } from "next/headers";
import z from "zod";
import { redirect } from "next/navigation";
import { handleError } from "../handleError";

const registerSchema = z.object({
	name: z
		.string({
			required_error: "Name is required",
			invalid_type_error: "Name should be string",
		})
		.min(1, { message: "Name cannot be empty" }),
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Name should be string",
		})
		.min(1, { message: "Email cannot be empty" })
		.email({ message: "Valid email is required" }),
	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password should be string",
		})
		.min(1, { message: "Password cannot be empty" }),
});

const loginSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
			invalid_type_error: "Name should be string",
		})
		.min(1, { message: "Email cannot be empty" })
		.email({ message: "Valid email is required" }),
	password: z
		.string({
			required_error: "Password is required",
			invalid_type_error: "Password should be string",
		})
		.min(1, { message: "Password cannot be empty" }),
});

export const register = async (prevState: any, data: FormData) => {
	const name = data?.get("name") as string;
	const email = data?.get("email") as string;
	const password = data?.get("password") as string;
	const validatedFields = registerSchema.safeParse({
		name,
		email,
		password,
	});

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return {
			message: "Error occurred",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const user = await prisma.user.create({
		data: {
			name,
			email,
			password,
		},
	});

	if (!user) {
		return {
			message: "Error occurred",
		};
	}

	redirect("/auth/login");
};

export const login = async (prevState: any, data: FormData) => {
	const email = data?.get("email") as string;
	const password = data?.get("password") as string;

	const validatedFields = loginSchema.safeParse({
		email,
		password,
	});

	// Return early if the form data is invalid
	if (!validatedFields.success) {
		return {
			message: "Error occurred",
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return {
			message: "Unauthorized",
		};
	}

	if (user.password !== password || user.email !== email) {
		return {
			message: "Invalid credentials",
		};
	}

	const cookieStore = cookies();
	const token = user.id;

	cookieStore.set("token", token, {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 1),
		httpOnly: true,
	});

	redirect("/");
};

export const getUser = async () => {
	try {
		const cookieStore = cookies();
		const token = cookieStore.get("token");

		if (!token) {
			return null;
		}

		const user = await prisma.user.findUnique({
			where: {
				id: token.value,
			},
		});

		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		// If cookies() is called outside a request context, return null
		if (
			error instanceof Error &&
			error.message.includes("cookies was called outside a request scope")
		) {
			return null;
		}
		throw error;
	}
};

export const logout = async () => {
	const cookieStore = cookies();
	cookieStore.delete("token");
	redirect("/auth/login");
};

export async function getUserByToken(token: string) {
	try {
		return await prisma.user.findUnique({
			where: {
				id: token,
			},
		});
	} catch (error: unknown) {
		handleError(error);
	}
}
