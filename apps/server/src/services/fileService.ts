import { env } from "@/config/env.js";
import { readFileSync, mkdirSync, existsSync } from "fs";
import path from "path";

class FileService {
  async createDir(file) {
    const promise = new Promise((resolve, reject) => {
      const filePath = `${env.FILE_PATH}\\${file.user}\\${file.path}`;

      try {
        const isExists = existsSync(filePath);

        if (!isExists) {
          mkdirSync(filePath);
          resolve({ message: "Файл создан" });
        } else {
          reject({ message: "Файл уже существует" })
        }
      } catch (error) {
        reject({ message: "Ошибка создания папки", error })
      }
    });

    return promise;
  }
}

export const fileService = new FileService();