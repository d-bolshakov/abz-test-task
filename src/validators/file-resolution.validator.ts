import { FileValidator } from '@nestjs/common';
import sharp from 'sharp';

export interface FileResolutionValidationOptions {
  message: string;
  minResolution: number;
}

export class FileResolutionValidator extends FileValidator {
  constructor(
    protected readonly validationOptions: FileResolutionValidationOptions,
  ) {
    super(validationOptions);
  }
  async isValid(file?: Express.Multer.File): Promise<boolean> {
    const metadata = await sharp(file.buffer).metadata();
    const height = metadata.height;
    const width = metadata.width;
    if (
      height < this.validationOptions.minResolution ||
      width < this.validationOptions.minResolution
    )
      return false;
    return true;
  }
  buildErrorMessage(file: Express.Multer.File): string {
    return this.validationOptions.message;
  }
}
