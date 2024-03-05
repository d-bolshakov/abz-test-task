import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { POSITION_REPOSITORY_DI_TOKEN } from '../constants/constants';
import { Position } from '../positions/entities/position.entity';
import { Repository } from 'typeorm';
import { UserFactory } from './user.factory';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class SeederService implements OnModuleInit {
  private readonly logger = new Logger(SeederService.name);
  constructor(
    @Inject(POSITION_REPOSITORY_DI_TOKEN)
    private positionsRepository: Repository<Position>,
    private usersService: UsersService,
  ) {}
  async onModuleInit() {
    this.logger.log('Starting seeding the database');
    const positions = await this.seedPositions();
    const users = await this.seedUsers(positions);
    this.logger.log('Finished seeding the database');
  }

  async seedPositions() {
    this.logger.log('Seeding positions:');
    this.logger.log('Checking if positions table is empty');
    const positions = await this.positionsRepository.find();
    if (positions.length) {
      this.logger.log(
        'Positions table is not empty. Skipping seeding positions.',
      );
      return positions;
    }
    const positionSeeds = [
      { name: 'Security' },
      { name: 'Designer' },
      { name: 'Content manager' },
      { name: 'Lawyer' },
    ];
    const created = await this.positionsRepository.save(positionSeeds);
    this.logger.log(`Inserted ${created.length} positions`);
    return created;
  }

  async seedUsers(positions: Position[]) {
    this.logger.log('Seeding users:');
    this.logger.log('Checking if users table is empty');
    const { users } = await this.usersService.findAll({});
    if (users.length) {
      this.logger.log('Users table is not empty. Skipping seeding users.');
      return users;
    }
    const seededUsers = [];
    const userFactory = new UserFactory(positions);
    for (let i = 1; i <= 45; i++) {
      const [user, photo] = await userFactory.create();
      const created = await this.usersService.create(
        user as CreateUserDto,
        photo as Express.Multer.File,
      );
      seededUsers.push(created);
    }
    this.logger.log(`Inserted ${seededUsers.length} users`);
    return seededUsers;
  }
}
