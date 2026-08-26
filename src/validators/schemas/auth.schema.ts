import z from "zod";

export const AuthUserSchema = z.object({
	name: z.string(),
	email: z.email(),
});

export type AuthUserInput = z.infer<typeof AuthUserSchema>;
