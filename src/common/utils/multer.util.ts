import { Request } from "express";
import { mkdirSync } from "fs";
import { extname, join } from "path";
import { BadRequestException } from "@nestjs/common";
import { diskStorage } from "multer";
import { ValidationMessage } from "src/modules/auth/enums/message.enum";

// Define Types
export type CallbackDestination = (
  error: Error | null,
  destination: string
) => void;

export type CallbackFilename = (error: Error | null, filename: string) => void;

export type MulterFile = Express.Multer.File;
// End Define Types

// Helper Functions
export function multerDestination(fieldName: string) {
  return function (
    req: Request,
    file: MulterFile,
    callback: CallbackDestination
  ): void {
    let path = join("public", "uploads", fieldName);
    mkdirSync(path, { recursive: true });
    callback(null, path);
  };
}
export function multerFilename(
  req: Request,
  file: MulterFile,
  callback: CallbackFilename
): void {
  const ext = extname(file.originalname).toLowerCase();

  if (!isValidImageFormat(ext)) {
    callback(
      new BadRequestException(ValidationMessage.InvalidImageForamt),
      null
    );
  } else {
    const filename = `${Date.now()}${ext}`;
    callback(null, filename);
  }
}

function isValidImageFormat(ext: string) {
  return [".png", ".jpg", ".jpeg"].includes(ext);
}

export function multerStorage(folderName: string) {
  return diskStorage({
    destination: multerDestination(folderName),
    filename: multerFilename,
  });
}
