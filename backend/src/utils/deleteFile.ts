import { logger } from "@/logger/logger";
import fs from "fs";

export function deleteFile(file: Express.Multer.File) {
  if (fs.existsSync(file.path)) {
    fs.unlink(file.path, (unlinkError) => {
      if (unlinkError) {
        logger.error("error deleting file from uploadStorage", { error: unlinkError, path: file.path });
      }
    });
  }
}

export function deleteFiles(files: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }) {
  if (Array.isArray(files)) {
    // If files is already an array, directly process it
    files.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlink(file.path, (unlinkError) => {
          if (unlinkError) {
            logger.error("error deleting files from uploadStorage", { error: unlinkError, path: file.path });
          }
        });
      }
    });
  } else {
    // Otherwise, extract the array of files from the dictionary
    const fileArray = Object.values(files).flat();
    fileArray.forEach((file) => {
      if (fs.existsSync(file.path)) {
        fs.unlink(file.path, (unlinkError) => {
          if (unlinkError) {
            logger.error("error deleting files from uploadStorage", { error: unlinkError, path: file.path });
          }
        });
      }
    });
  }
}
