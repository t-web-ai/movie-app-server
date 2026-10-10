import type { RequestHandler } from "express";
import { connectToDatabase } from "../config/db";

export const ensureDatabaseConnection: RequestHandler = async (
	_request,
	_response,
	next,
) => {
	await connectToDatabase();
	next();
};
