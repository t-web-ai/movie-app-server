import type { NextFunction, Request, RequestHandler, Response } from "express";
import mongoose, { type ClientSession } from "mongoose";

export function controllerAsync(
	callback: (req: Request, res: Response) => Promise<unknown>,
): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await callback(req, res);
		} catch (error) {
			next(error);
		}
	};
}

export function controllerAsyncWithTransaction(
	callback: (
		req: Request,
		res: Response,
		session: ClientSession,
	) => Promise<unknown>,
): RequestHandler {
	return async (req: Request, res: Response, next: NextFunction) => {
		const session = await mongoose.startSession();
		try {
			session.startTransaction();
			await callback(req, res, session);
			await session.commitTransaction();
		} catch (error) {
			if (session.inTransaction()) {
				await session.abortTransaction();
			}
			next(error);
		} finally {
			session.endSession();
		}
	};
}
