import type { ClientSession, QueryFilter, Types } from "mongoose";
import { TALENT_FILE_PATH } from "../../common/constants";
import env from "../../config/env.config";
import type {
	TalentDocument,
	TalentSchemaType,
} from "../../db/models/talent.model";
import { BadRequestError } from "../../helpers/errors/badRequest.error";
import { NotFoundError } from "../../helpers/errors/notFound.error";
import type TalentRepository from "../../repositories/talent.repository";
import { deleteSingleFile, uploadSingleFile } from "../../utils/file.util";
import type { PaginationInput } from "../../validators/schemas/pagination.schema";
import type {
	TalentCreateInput,
	TalentUpdateInput,
} from "../../validators/schemas/talent.schema";

class TalentService {
	constructor(private readonly talentRepository: TalentRepository) {}
	async getAllTalents(
		filter: QueryFilter<TalentSchemaType>,
		paginationInput: PaginationInput,
	) {
		const [talents, totalCount] = await Promise.all([
			this.talentRepository.getAllTalents(filter, paginationInput),
			this.talentRepository.getAllTalentsCount(filter),
		]);

		const totalPages = Math.ceil(totalCount / paginationInput.limit);
		return {
			talents,
			pagination: {
				foundCount: talents.length,
				totalCount,
				totalPages,
				page: paginationInput.page,
				limit: paginationInput.limit,
				fileLocation: {
					talent: `${env.FILE_LOCATION}${TALENT_FILE_PATH}`,
				},
			},
		};
	}

	async updateTalent({
		filter,
		talentUpdateInput,
		file,
		session,
	}: {
		filter: QueryFilter<TalentDocument>;
		talentUpdateInput: TalentUpdateInput;
		file?: Express.Multer.File;
		session: ClientSession;
	}) {
		const talent = await this.talentRepository.updateTalent(
			filter,
			talentUpdateInput,
			session,
		);

		if (!talent) throw new BadRequestError("Failed to update talent");

		if (file) {
			const image = await uploadSingleFile({
				file,
				path: TALENT_FILE_PATH,
				fileId: talent.image?.fileId,
			});
			if (!image) throw new BadRequestError("Failed to upload image");

			talent.image = {
				file: image.name,
				fileId: image.fileId,
			};

			await this.talentRepository.save(talent, session);
		}

		return { talent };
	}

	async deleteTalent(id: Types.ObjectId, session: ClientSession) {
		const talent = await this.talentRepository.deleteTalent(id, session);
		if (!talent) throw new NotFoundError("No Talent");

		if (talent.image?.fileId) await deleteSingleFile(talent.image.fileId);
		return { talent };
	}

	async createTalent({
		talentCreateInput,
		file,
		session,
	}: {
		talentCreateInput: TalentCreateInput;
		file?: Express.Multer.File;
		session: ClientSession;
	}) {
		const talent = await this.talentRepository.createTalent(
			talentCreateInput,
			session,
		);

		if (!talent) throw new BadRequestError("Failed to create talent");

		if (file) {
			const image = await uploadSingleFile({ file, path: TALENT_FILE_PATH });
			if (!image) throw new BadRequestError("Faild to upload image");

			talent.image = {
				file: image.name,
				fileId: image.fileId,
			};

			await this.talentRepository.save(talent, session);
		}

		return { talent };
	}
}

export default TalentService;
