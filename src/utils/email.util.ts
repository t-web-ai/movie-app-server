import { getEmailTransporter } from "../config/email.config";
import type { EmailInput } from "../validators/schemas/email.schema";
import logger from "./logger.util";

export async function sendEmail(emailInputs: EmailInput[]) {
	const emailTransporter = await getEmailTransporter();
	if (emailTransporter) {
		const promiseResults = await Promise.allSettled(
			emailInputs.map(({ from, to, subject, html }) =>
				emailTransporter.sendMail({ from, to, subject, html }),
			),
		);
		const failedPromises = promiseResults.filter(
			(promiseResult) => promiseResult.status === "rejected",
		);

		if (failedPromises.length) {
			throw new AggregateError(
				failedPromises.map((failedPromise) => failedPromise),
				`${failedPromises.length} email(s) failed to send`,
			);
		}
	}
}

export function sendEmailInBackground(emailInputs: EmailInput[]) {
	sendEmail(emailInputs).catch((error) => {
		logger.error(error, "failed to send");
	});
}

export function interpolate(
	text: string,
	variables: Record<string, string>,
): string {
	return text.replace(/\{\{(\w+)\}\}/g, (match, key) =>
		escapeHtml(String(variables[key] ?? match)),
	);
}

export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

export function renderEmailTemplate<T extends string>(
	{ from, to, subject, html }: EmailInput,
	variables: Record<T, string>,
): EmailInput {
	return {
		from,
		to,
		subject: interpolate(subject, variables),
		html: interpolate(html, variables),
	};
}
