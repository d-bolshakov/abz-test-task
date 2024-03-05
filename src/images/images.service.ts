import { NotFoundException, Injectable } from '@nestjs/common';
import { ImageOwnerEntity } from './image-owner-entity.enum';
import * as path from 'path';
import { OwnerEntityImageDirs } from './owner-entity-image-dirs.map';
import { access, writeFile, open } from 'fs/promises';
import {
  checkDirAccessOrCreate,
  generateUniqueFileName,
} from './utils/file.utils';

interface ImageSaveOptions {
  ownerEntity: ImageOwnerEntity;
}

@Injectable()
export class ImagesService {
  private basePath: string;
  constructor() {
    this.basePath = path.resolve(__dirname, '..', '..', 'uploads', 'images');
  }
  async save(file: Express.Multer.File, options: ImageSaveOptions) {
    const basePath = this.buildPathByOwnerEntity(options.ownerEntity);
    await checkDirAccessOrCreate(basePath);
    const newFileName = generateUniqueFileName(file.originalname);
    const filePath = path.resolve(basePath, newFileName);
    await writeFile(filePath, file.buffer);
    return newFileName;
  }

  async getByFileNameAndDirName(fileName: string, dirName: string) {
    const filePath = path.resolve(this.basePath, dirName, fileName);
    try {
      await access(filePath);
      const fd = await open(filePath);
      return fd.createReadStream();
    } catch (error) {
      if (error.code === 'ENOENT')
        throw new NotFoundException(`file ${fileName} does not exist`);
      else throw error;
    }
  }

  private buildPathByOwnerEntity(owner: ImageOwnerEntity) {
    return path.resolve(this.basePath, OwnerEntityImageDirs[owner]);
  }
}
