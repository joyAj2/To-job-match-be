import { Request, Response } from "express";
import { hashPassword, comparePasswords } from "../utils/validatePassword";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  const newUser = req.validatedBody;
  try {
    const hashedPassword = await hashPassword(newUser.password);

    const user = await prisma.user.create({
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        username: newUser.username,
        password: hashedPassword,
        // You can also set role here if needed: role: newUser.role ?? "STUDENT"
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });

    res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create user" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }

    // Remove the password from the response for security
    const { password: _, ...userWithoutPassword } = user;

    return res.status(StatusCodes.OK).json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Something went wrong during login",
    });
  }
}
