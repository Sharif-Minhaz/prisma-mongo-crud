"use client";

import { login } from "@/lib/actions/auth.actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Login() {
	const [state, formAction] = useFormState(login, {
		message: "",
		errors: {
			email: undefined,
			password: undefined,
		},
	});
	const { pending } = useFormStatus();

	return (
		<form action={formAction} className="flex flex-col gap-3">
			<h1>Login now</h1>
			<div>
				<input
					disabled={pending}
					className="border px-2 py-1"
					placeholder="email"
					type="email"
					name="email"
				/>
				<p className="text-red-500 mt-1">{state?.errors?.email?.join(". ")}</p>
			</div>

			<div>
				<input
					disabled={pending}
					className="border px-2 py-1"
					placeholder="password"
					type="password"
					name="password"
					id=""
				/>
				<p className="text-red-500 mt-1">{state?.errors?.password}</p>
			</div>

			<p className="text-red-500 mt-1">{state?.message}</p>

			<button
				disabled={pending}
				className="disabled:bg-slate-400 max-w-[100px] bg-green-500 px-3 py-1 rounded"
				type="submit"
			>
				Log in
			</button>
		</form>
	);
}
