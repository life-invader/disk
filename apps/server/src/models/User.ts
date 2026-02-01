import { Schema, model } from 'mongoose';

/**
 * Схема пользователя для облачного хранилища
 */
const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  secondName: { type: String },
  diskSpace: { type: Number, default: 1024 ** 3 * 10 }, // 10 GB
  usedSpace: { type: Number, default: 0 },
  avatar: { type: String },
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
}, {
  timestamps: true, // Добавляет createdAt и updatedAt
  toJSON: {
    virtuals: true,
  },
});

export const UserModel = model('User', UserSchema);
