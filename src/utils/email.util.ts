import type { Mail, SMTPSentMessageInfo } from "nodemailer";
import type { EmailInput } from "../validators/schemas/email.schema";

export async function sendEmail(
	emailTransporter: Mail<SMTPSentMessageInfo>,
	{ from, to, subject, html }: EmailInput,
) {
	await emailTransporter.sendMail({ from, to, subject, html });
}

export function interpolate(
	text: string,
	variables: Record<string, string>,
): string {
	return text.replace(/\{\{(\w+)\}\}/g, (match, key) =>
		String(variables[key] ?? match),
	);
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
