import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/User.js";
import { registerSchema } from "@/validators/auth.js";
import type { Request, Response } from "express";
import type z from "zod";
import { env } from "@/config/env.js";

type RegisterBodyType = z.infer<typeof registerSchema>["body"];

export const register = async (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 5); // TODO: Хеширование пароля

    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export const login = async (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel
      .findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const { __v, _id, password: userPassword, ...dtoUser } = user.toJSON();

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token", token, { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "strict", maxAge: 3600000 });
    res.status(200).json({ message: "success", data: { user: dtoUser } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}