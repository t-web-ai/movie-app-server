import type { ClientSession, QueryFilter, Types } from "mongoose";
import {
	getEmailTemplate,
	getEmailTransporter,
} from "../../config/email.config";
import env from "../../config/env.config";
import type { AdminSchemaType } from "../../db/models/admin.model";
import type {
	account_deleted_confirmation_types,
	admin_signup_success_types,
} from "../../db/seeds/emailTemplate.seed";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type AdminRepository from "../../repositories/admin.repository";
import { renderEmailTemplate, sendEmail } from "../../utils/email.util";
import type {
	AdminCreateInput,
	AdminUpdateInput,
} from "../../validators/schemas/admin.schema";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";

class AdminService {
	constructor(private readonly adminRepository: AdminRepository) {}
	async getAllAdmin(
		filter: QueryFilter<AdminSchemaType>,
		paginationInput: PaginationInput,
	) {
		const [admins, totalCount] = await Promise.all([
			this.adminRepository.getAllAdmin(filter, paginationInput),
			this.adminRepository.getAllAdminCount(filter),
		]);
		const totalPages = Math.ceil(totalCount / paginationInput.limit);
		return {
			admins,
			pagination: {
				foundCount: admins.length,
				totalCount,
				totalPages,
				page: paginationInput.page,
				limit: paginationInput.limit,
			},
		};
	}

	async getSignleAdmin(id: Types.ObjectId) {
		const admin = await this.adminRepository.getAdmin({ _id: id }, true);
		if (!admin) throw new NotFoundError("No Admin");
		return { admin };
	}

	async updateAdmin(
		id: Types.ObjectId,
		data: AdminUpdateInput,
		session: ClientSession,
	) {
		const admin = await this.adminRepository.updateAdmin(
			{ _id: id },
			data,
			session,
		);
		if (!admin) throw new NotFoundError("No Admin");
		return { admin };
	}

	async deleteAdminById(id: Types.ObjectId, session: ClientSession) {
		const admin = await this.adminRepository.deleteAdmin(id, session);
		if (!admin) throw new NotFoundError("No Admin");

		const emailTransporter = await getEmailTransporter();
		const emailTemplate = await getEmailTemplate(
			"account_deleted_confirmation",
		);
		const emailInput = renderEmailTemplate<account_deleted_confirmation_types>(
			{
				to: admin.email,
				subject: emailTemplate.subject,
				html: emailTemplate.html,
			},
			{
				adminName: admin.name,
			},
		);

		if (emailTransporter) {
			await sendEmail(emailTransporter, emailInput);
		}

		return {
			admin: {
				name: admin.name,
				email: admin.email,
			},
		};
	}

	async createAdmin(
		adminCreateInput: AdminCreateInput,
		session: ClientSession,
	) {
		const adminWithNewEmail = await this.adminRepository.getAdmin({
			email: adminCreateInput.email,
		});
		if (adminWithNewEmail)
			throw new BadRequestError("Email is already registered");

		const admin = await this.adminRepository.createAdmin(
			adminCreateInput,
			session,
		);
		if (!admin) throw new BadRequestError("Faild to create admin");

		const emailTransporter = await getEmailTransporter();
		const emailTemplate = await getEmailTemplate("admin_signup_success");
		const emailInput = renderEmailTemplate<admin_signup_success_types>(
			{
				to: admin.email,
				subject: emailTemplate.subject,
				html: emailTemplate.html,
			},
			{
				appName: env.APP_NAME,
				adminName: admin.name,
				role: admin?.role?.name || "unknown",
				adminEmail: admin.email,
				tempPassword: adminCreateInput.password,
				portalUrl: env.APP_URL,
			},
		);

		if (emailTransporter) {
			await sendEmail(emailTransporter, emailInput);
		}

		return {
			admin: {
				name: admin.name,
				email: admin.email,
				role: admin?.role?.name,
				_id: admin._id,
			},
		};
	}
}

export default AdminService;
