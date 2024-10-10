import { NextRequest, NextResponse } from "next/server";
import { getUserByToken } from "./lib/actions/auth.actions";

// Define protected and auth routes
const protectedRoutes = ["/", "/profile"];
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
	const { nextUrl } = req;
	const token = req.cookies.get("token");

	const isLoggedIn = !!token;

	if (isLoggedIn) {
		const user = await getUserByToken(token.value);

		if (!user) {
			// Invalid token, redirect to login
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}

		// Logged in users can't access auth routes
		if (authRoutes.includes(nextUrl.pathname)) {
			return NextResponse.redirect(new URL("/", req.url));
		}
	} else {
		// Non-logged in users can't access protected routes
		if (protectedRoutes.includes(nextUrl.pathname)) {
			return NextResponse.redirect(new URL("/auth/login", req.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/profile", "/auth/login", "/auth/register"],
};
