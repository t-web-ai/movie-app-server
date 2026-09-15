import type { ClientSession, QueryFilter } from "mongoose";
import { EmailSetting } from "../db/models";
import type { EmailSettingDocument } from "../db/models/emailSetting.model";
import type { EmailSettingUpdateInput } from "../validators/schemas/email.schema";

class EmailSettingRepository {
	async findOneEmail(filter: QueryFilter<EmailSettingDocument>) {
		const email = await EmailSetting.findOne(filter).lean();
		return email;
	}

	async findEmailAndUpdate(
		filter: QueryFilter<EmailSettingDocument>,
		emailSettingUpdateInput: EmailSettingUpdateInput,
		session: ClientSession,
	) {
		const email = await EmailSetting.findOneAndUpdate(
			filter,
			emailSettingUpdateInput,
			{
				session,
				returnDocument: "after",
			},
		);

		return email;
	}
}

export default EmailSettingRepository;
