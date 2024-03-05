import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GetUsersQuery } from './dto/get-users-query.dto';
import {
  getPaginationOffset,
  getTotalPages,
  getPageNumberByOffsetAndCount,
} from '../utils/pagination.utils';
import { getPaginationLinks } from '../utils/link.utils';
import { USER_REPOSITORY_DI_TOKEN } from '../constants/constants';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { ImagesService } from '../images/images.service';
import { ImageOwnerEntity } from '../images/image-owner-entity.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY_DI_TOKEN) private userRepository: Repository<User>,
    private imagesService: ImagesService,
  ) {}
  async create(createUserDto: CreateUserDto, photo: Express.Multer.File) {
    const userExistsWithPhoneOrEmail = await this.userRepository
      .createQueryBuilder()
      .where('phone = :phone', { phone: createUserDto.phone })
      .orWhere('email = :email', { email: createUserDto.email })
      .getExists();
    if (userExistsWithPhoneOrEmail)
      throw new BadRequestException(
        'User with this phone or email already exist',
      );
    const photoFileName = await this.imagesService.save(photo, {
      ownerEntity: ImageOwnerEntity.USER,
    });
    const user = this.userRepository.create({
      ...createUserDto,
      photo: photoFileName,
    });
    return this.userRepository.save(user);
  }

  async findAll(query: GetUsersQuery) {
    const count = query.count || 5;
    const page = query.page || 1;
    const offset = query.offset || getPaginationOffset(page, count);
    const [users, total_users] = await this.userRepository.findAndCount({
      relations: {
        position: true,
      },
      take: count,
      skip: offset,
    });
    const total_pages = getTotalPages(total_users, count);
    const currentPage =
      query.page || getPageNumberByOffsetAndCount(offset, count);
    return {
      page: currentPage,
      total_pages,
      total_users,
      count,
      links: getPaginationLinks('users', currentPage, total_pages, count),
      users: plainToInstance(UserResponseDto, users),
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);
    return user;
  }
}
