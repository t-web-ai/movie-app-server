import type { ClientSession, QueryFilter } from "mongoose";
import { OTP } from "../db/models";
import type { OTPDocument, OTPSchemaType } from "../db/models/otp.model";
import type {
	OTPCreateInput,
	OTPUpdateInput,
} from "../validators/schemas/otp.schema";

class OTPRepository {
	async createOTP(
		otpCreateInput: OTPCreateInput,
		code: string,
		session: ClientSession,
	) {
		const otp = new OTP({
			email: otpCreateInput.email,
			code,
		});
		await otp.save({ session });
		return otp;
	}

	async findOneOTP(filter: QueryFilter<OTPSchemaType>) {
		const otp = await OTP.findOne(filter).lean();

		return otp;
	}

	async updateOTP(
		filter: QueryFilter<OTPDocument>,
		otpUpdateInput: OTPUpdateInput,
		session: ClientSession,
	) {
		const otp = await OTP.findOneAndUpdate(filter, otpUpdateInput, {
			session,
			returnDocument: "after",
		}).lean();

		return otp;
	}

	async deleteOTP(filter: QueryFilter<OTPDocument>, session: ClientSession) {
		return await OTP.findOneAndDelete(filter, { session });
	}
}

export default OTPRepository;
