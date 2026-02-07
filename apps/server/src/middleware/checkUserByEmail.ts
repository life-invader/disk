import type { Request, Response, NextFunction } from 'express'
import { UserModel } from '../models/User.js'

export const checkUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Email is required',
      })
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        isSuccess: false,
        message: 'Пользователь с таким email уже существует',
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}
