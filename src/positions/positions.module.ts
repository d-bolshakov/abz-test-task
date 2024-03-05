import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { positionProviders } from './positions.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PositionsController],
  providers: [...positionProviders, PositionsService],
  exports: [PositionsService, ...positionProviders],
})
export class PositionsModule {}
