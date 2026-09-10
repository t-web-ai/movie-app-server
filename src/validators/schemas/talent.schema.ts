import z from "zod";

export const TalentCreateSchema = z.object({
	name: z.string().trim().min(1),
	image: z
		.object(
			{
				file: z.string().min(1),
				fileId: z.string().min(1),
			},
			{ message: "Image field cannot be empty" },
		)
		.optional(),
});

export type TalentCreateInput = z.infer<typeof TalentCreateSchema>;

export const TalentUpdateSchema = TalentCreateSchema.partial();

export type TalentUpdateInput = z.infer<typeof TalentUpdateSchema>;
