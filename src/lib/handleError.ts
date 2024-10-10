export const handleError = (error: unknown) => {
	if (error instanceof Error) {
		throw new Error(error.message);
	}
	console.error(error);
};
