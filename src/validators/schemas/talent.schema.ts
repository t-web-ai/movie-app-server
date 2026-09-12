import z from "zod";

export const TalentCreateSchema = z.object({
	name: z.string().trim().min(1),
});

export type TalentCreateInput = z.infer<typeof TalentCreateSchema>;

export const TalentUpdateSchema = TalentCreateSchema.partial();

export type TalentUpdateInput = z.infer<typeof TalentUpdateSchema>;
