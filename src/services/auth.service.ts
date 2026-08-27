import { UnauthenticatedError } from "../helpers/errors/auth.error";
import { NotFoundError } from "../helpers/errors/notFound.error";
import type AdminRepository from "../repositories/admin.repository";
import { verifyPassword } from "../utils/bcrypt.util";
import { generateToken } from "../utils/jwt.util";
import type { AdminLoginInput } from "../validators/schemas/admin.schema";

class AuthService {
	constructor(private readonly adminRepository: AdminRepository) {}
	async login(adminLoginInput: AdminLoginInput) {
		const admin = await this.adminRepository.getAdmin({
			email: adminLoginInput.email,
		});
		if (!admin) throw new NotFoundError("No Admin");

		const verified = await verifyPassword(
			adminLoginInput.password,
			admin.password,
		);
		if (!verified) throw new UnauthenticatedError("Invalid credentials");

		const token = generateToken({
			name: admin.name,
			email: admin.email,
		});

		return { token };
	}
}

export default AuthService;
