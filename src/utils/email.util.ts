import type { Mail, SMTPSentMessageInfo } from "nodemailer";
import type { EmailInput } from "../validators/schemas/email.schema";

export async function sendEmail(
	transporter: Mail<SMTPSentMessageInfo>,
	emailInput: EmailInput,
) {
	await transporter.sendMail({
		from: emailInput.from,
		to: emailInput.to,
		subject: emailInput.subject,
		html: emailInput.body,
	});
}
