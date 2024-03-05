import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './users.providers';
import { TokensModule } from '../tokens/tokens.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [DatabaseModule, TokensModule, ImagesModule],
  controllers: [UsersController],
  providers: [...userProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
