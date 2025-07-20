import { Router } from "express";
import { getUserById, getUsers } from "../handlers/users-handlers";
import { validateData } from "../middlewares/validate";
import { createUserSchema } from "../dto/usersDto/CreateUser.dto";

const router = Router();

// /api/users
router.get("/", getUsers);

// /api/users/:id
router.get("/:id", getUserById);


export default router;
