import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "@/models/User.js";
import { registerSchema } from "@/validators/auth.js";
import { env } from "@/config/env.js";
import type { Request, Response } from "express";
import type z from "zod";

type RegisterBodyType = z.infer<typeof registerSchema>["body"];

export const register = async (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
  try {
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 5); // TODO: Хеширование пароля

    const newUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser.id }, env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token", token, { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "strict", maxAge: 3600000 });

    await newUser.save();
    res.status(201).json({ isSuccess: true, data: { user: newUser } });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Ошибка сервера" });
  }
}

export const login = async (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel
      .findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Неверный пароль" });
    }

    const { __v, _id, password: userPassword, ...dtoUser } = user.toJSON();

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: "1h" })
    res.cookie("token", token, { httpOnly: true, secure: env.NODE_ENV === "production", sameSite: "strict", maxAge: 3600000 });
    res.status(200).json({ isSuccess: true, data: { user: dtoUser } });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Ошибка сервера", error });
  }
}

export const logout = async (_req: Request<{}, {}, {}>, res: Response) => {
  res.clearCookie('token');
  res.json({ isSuccess: true });
}

export const check = async (req: Request<{}, {}, RegisterBodyType>, res: Response) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ isSuccess: false, message: 'Не авторизован' });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ isSuccess: false, message: 'Пользователь не найден' });
    }

    res.status(200).json({ isSuccess: true, data: { user } });
  } catch (error) {
    res.status(500).json({ isSuccess: false, message: "Ошибка сервера", error });
  }
}
