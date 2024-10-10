import "server-only";

export async function getPrivateData() {
	const res = await fetch("https://external-service.com/data", {
		headers: {
			authorization: process.env.API_KEY || "",
		},
	});

	return await res.json();
}
