import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TokensController } from './tokens.controller';
import { JwtModule } from '@nestjs/jwt';
import { tokenProviders } from './tokens.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET }),
  ],
  controllers: [TokensController],
  providers: [...tokenProviders, TokensService],
  exports: [TokensService, JwtModule],
})
export class TokensModule {}
