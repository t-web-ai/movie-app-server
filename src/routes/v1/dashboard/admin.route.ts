import { Router } from "express";
import AdminController from "../../../controllers/admin.controller";
import { controllerAsync } from "../../../middlewares/handlers/controllerAsync.handler";
import AdminRepository from "../../../repositories/admin.repository";
import AdminService from "../../../services/admin.service";
const router = Router();
const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

router
  .route("/")
  .get([
    controllerAsync((request, response) =>
      adminController.getAllAdmin(request, response),
    ),
  ]);

router
  .route("/:id")
  .get([
    controllerAsync((request, response) =>
      adminController.getSingleAdmin(request, response),
    ),
  ])
  .put([
    controllerAsync((request, response) =>
      adminController.updateAdmin(request, response),
    ),
  ])
  .delete([
    controllerAsync((request, response) =>
      adminController.deleteAdmin(request, response),
    ),
  ]);

export default router;
