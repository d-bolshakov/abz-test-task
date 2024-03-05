import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersQuery } from './dto/get-users-query.dto';
import { AuthGuard } from '../guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileResolutionValidator } from '../validators/file-resolution.validator';
import { FileCompressionPipe } from '../pipes/file-compression.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  @UseGuards(AuthGuard)
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 1000 * 5 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new FileResolutionValidator({
            message: 'photo resolution sholud be at least 70x70',
            minResolution: 70,
          }),
        ],
      }),
      new FileCompressionPipe({ targetResolution: 70 }),
    )
    photo: Express.Multer.File,
  ) {
    try {
      const created = await this.usersService.create(createUserDto, photo);
      return {
        success: true,
        message: 'User was created successfully',
        user_id: created.id,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll(@Query() getUsersQuery: GetUsersQuery) {
    try {
      const data = await this.usersService.findAll(getUsersQuery);
      return {
        success: true,
        ...data,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return { success: false, message: error.message };
      return { success: false, message: 'Internal server error occured' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.usersService.findOne(id);
      return {
        success: true,
        user,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return { success: false, message: error.message };
      return { success: false, message: 'Internal server error occured' };
    }
  }
}
