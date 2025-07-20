import { Router } from "express";
import { validateData } from "../middlewares/validate";
import { createUser, login } from "../handlers/auth-handler";
import { createUserSchema } from "../dto/usersDto/CreateUser.dto";
import { loginUserSchema } from "../dto/usersDto/LoginUser.dto";

const router = Router();

router.post("/", validateData(createUserSchema), createUser);
router.post("/login", validateData(loginUserSchema), login);

export default router;
