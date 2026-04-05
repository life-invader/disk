import { FileModel } from "@/models/File.js";
import { fileService } from "@/services/fileService.js";

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;

      const file = new FileModel({ name, type, user: req.user.id, parent });

      if (parent) {
        file.parent = parent;
      }

      const parentFile = parent
        ? await FileModel.findOne({ _id: parent })
        : null;

      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileService.createDir(file);
        parentFile.children.push(file._id);
        await parentFile.save();
      }

      await file.save()
      return res.json({
        isSuccess: true,
        data: {
          file,
        },
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({ isSuccess: false, message: "Не удалось создать папку", error })
    }
  }

  async getFiles(req, res) {
    const parent = req.query.parent;

    try {
      const query = { user: req.user.id };

      if (parent) {
        query.parent = parent;
      }

      const files = await FileModel.find(query)
      res.json({
        isSuccess: true,
        data: {
          files,
        },
      })
    } catch (error) {
      res.status(500).json({ isSuccess: false, message: "Не удалось получить файлы", error })
    }
  }
}

export const fileController = new FileController();