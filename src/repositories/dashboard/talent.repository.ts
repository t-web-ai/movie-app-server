import type { ClientSession, QueryFilter, Types } from "mongoose";
import {
	Talent,
	type TalentDocument,
	type TalentSchemaType,
} from "../../db/models/talent.model";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";
import type {
	TalentCreateInput,
	TalentUpdateInput,
} from "../../validators/schemas/talent.schema";

class TalentRepository {
	async getAllTalents(
		filter: QueryFilter<TalentSchemaType>,
		paginationInput: PaginationInput,
	) {
		const talents = await Talent.find(filter)
			.skip((paginationInput.page - 1) * paginationInput.limit)
			.limit(paginationInput.limit)
			.lean();
		return talents;
	}

	async getAllTalentsCount(filter: QueryFilter<TalentSchemaType>) {
		return await Talent.countDocuments(filter);
	}

	async getTalent(filter: QueryFilter<TalentDocument>) {
		return await Talent.findOne(filter);
	}

	async updateTalent(
		filter: QueryFilter<TalentDocument>,
		talentUpdateInput: TalentUpdateInput,
		session: ClientSession,
	) {
		const talent = await Talent.findOneAndUpdate(filter, talentUpdateInput, {
			session,
			returnDocument: "after",
		});

		return talent;
	}

	async deleteTalent(id: Types.ObjectId, session: ClientSession) {
		return await Talent.findOneAndDelete(id, { session });
	}

	async createTalent(
		talentCreateInput: TalentCreateInput,
		session: ClientSession,
	) {
		const talent = new Talent(talentCreateInput);
		await talent.save({ session });
		return talent;
	}

	async save(talent: TalentDocument, session: ClientSession) {
		return await talent.save({ session });
	}
}

export default TalentRepository;
