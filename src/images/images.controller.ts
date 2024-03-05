import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { OwnerEntityImageDirs } from './owner-entity-image-dirs.map';
import { ImagesService } from './images.service';
import type { Response } from 'express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Get('/:dirName/:fileName')
  async findOne(
    @Param('dirName') dirName: string,
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    if (!Object.values(OwnerEntityImageDirs).includes(dirName))
      throw new NotFoundException({ success: false, message: 'Not found' });
    try {
      const fileStream = await this.imagesService.getByFileNameAndDirName(
        fileName,
        dirName,
      );
      res.set({
        'Content-Type': 'image/jpeg',
      });
      fileStream.pipe(res);
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return { success: false, message: error.message };
      return { success: false, message: 'Internal server error occured' };
    }
  }
}
