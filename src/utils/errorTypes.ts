function unathorized(entity: string) {
	return { code: 401, message: `Invalid ${entity}.` };
}

function forbbiden(message?: string) {
	return { code: 403, message: message || "Permission denied!" };
}

function notFound(entity: string) {
	return { code: 404, message: `${entity} not found.` };
}

function conflict(entity: string) {
	return { code: 409, message: `${entity} already in use.` };
}

function unprocessableEntityError(error: { details: { message: String }[] }) {
	return { code: 422, message: error.details.map((detail) => detail.message) };
}

export const errorType = {
	unathorized,
	forbbiden,
	notFound,
	conflict,
	unprocessableEntityError,
};
