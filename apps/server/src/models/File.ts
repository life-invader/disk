import mongoose, { Schema, model } from 'mongoose';

/**
 * Схема пользователя для облачного хранилища
 */
const FileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  accessLink: { type: String },
  size: { type: Number, default: 0 },
  path: { type: String, default: "" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "File", default: null, },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
}, {
  timestamps: true, // Добавляет createdAt и updatedAt
  toJSON: {
    virtuals: true,
  },
});

export const FileModel = model('File', FileSchema);
