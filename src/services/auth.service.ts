import { HttpStatus } from "../config/http.config";
import { HttpError } from "../helpers/errors/http.error";
import AdminRepository from "../repositories/admin.repository";
import { verifyPassword } from "../utils/bcrypt.util";
import { generateToken } from "../utils/jwt.util";
import { AdminLoginInput } from "../validators/schemas/admin.schema";

class AuthService {
  constructor(private readonly adminRepository: AdminRepository) {}
  async login(adminLoginInput: AdminLoginInput) {
    const admin = await this.adminRepository.getAdmin({
      email: adminLoginInput.email,
    });
    if (!admin) throw new HttpError(HttpStatus.NOT_FOUND, "No admin");

    const verified = await verifyPassword(
      adminLoginInput.password,
      admin.password,
    );
    if (!verified)
      throw new HttpError(HttpStatus.BAD_REQUEST, "Invalid credentials");

    const token = generateToken({
      name: admin.name,
      email: admin.email,
    });

    return { token };
  }
}

export default AuthService;
