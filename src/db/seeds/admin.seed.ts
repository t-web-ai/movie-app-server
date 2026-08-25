import { hashPassword } from "../../utils/bcrypt.util";
import logger from "../../utils/logger.util";
import { AdminInput } from "../../validators/schemas/admin.schema";
import { Admin } from "../models/admin.model";

const admins: AdminInput[] = [
  {
    name: "Toee Thiha Kyaw",
    email: "toeethiha@cbs.com.mm",
    password: "12345678",
  },
  {
    name: "Admin",
    email: "admin@gmail.com",
    password: "87654321",
  },
];

export async function seedAdmin() {
  logger.info("seeding the admins data");
  await Admin.deleteMany({});
  const modifiedAdminsInPromise = admins.map(async (admin) => ({
    ...admin,
    password: await hashPassword(admin.password),
  }));
  const modifiedAdmins = await Promise.all(modifiedAdminsInPromise);
  await Admin.insertMany(modifiedAdmins);
  logger.info("the admins data are seeeded successfully");
}
