import { getUser, logout } from "@/lib/actions/auth.actions";
import Link from "next/link";

export default async function Navbar() {
	const user = await getUser();
	return (
		<header className="bg-gray-800 text-white w-full">
			<nav className="flex justify-between items-center p-4">
				<Link href="/">Home</Link>
				<div className="flex gap-4">
					{user ? (
						<>
							<Link href="/profile">{user.name}</Link>
							<form action={logout}>
								<button type="submit">Logout</button>
							</form>
						</>
					) : (
						<>
							<Link href="/auth/login">Login</Link>
							<Link href="/auth/register">Register</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
}
