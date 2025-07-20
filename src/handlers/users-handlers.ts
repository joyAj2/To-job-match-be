import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/validatePassword";

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response) {
  const findAllUsers = await prisma.user.findMany();
  res.json(findAllUsers);
}

export async function getUserById(req: Request, res: Response) {
  const userId = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `User with ID ${userId} not found` });
    }

    return res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to retrieve user" });
  }
}


