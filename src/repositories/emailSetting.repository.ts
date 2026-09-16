import type { ClientSession, QueryFilter } from "mongoose";
import { EmailSetting } from "../db/models";
import type { EmailSettingDocument } from "../db/models/emailSetting.model";
import type { EmailSettingUpdateInput } from "../validators/schemas/email.schema";

class EmailSettingRepository {
	async findOneEmailSetting(filter: QueryFilter<EmailSettingDocument>) {
		const emailSetting = await EmailSetting.findOne(filter).lean();
		return emailSetting;
	}

	async findEmailSettingAndUpdate(
		filter: QueryFilter<EmailSettingDocument>,
		emailSettingUpdateInput: EmailSettingUpdateInput,
		session: ClientSession,
	) {
		const emailSetting = await EmailSetting.findOneAndUpdate(
			filter,
			emailSettingUpdateInput,
			{
				session,
				returnDocument: "after",
			},
		).lean();

		return emailSetting;
	}
}

export default EmailSettingRepository;
