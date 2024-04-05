import crypto from "crypto";
import { Request } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

/* File service */

const BASE_PATH = "uploads";

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      const dest = BASE_PATH;
      fs.mkdir(dest, { recursive: true }, (err) => {
        if (err) {
          cb(err, dest);
        } else {
          cb(null, dest);
        }
      });
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const hash = crypto.createHash("sha256");
      cb(
        null,
        `${Date.now()}-${hash.digest("hex")}${path.extname(file.originalname)}`
      );
    },
  }),
});

/**
 * Delete a file.
 * @param filePath The file path.
 * @returns A promise that resolves when the file is deleted.
 */
export function deleteFile(filePath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Move a file.
 * @param oldPath The old file path.
 * @param newPath The new file path.
 * @returns A promise that resolves when the file is moved.
 */
export function moveFile(oldPath: string, newPath: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const filePath = path.join(BASE_PATH, newPath);
    const dir = path.dirname(filePath);

    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        fs.rename(oldPath, filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  });
}
