import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { PositionsModule } from '../positions/positions.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PositionsModule, UsersModule],
  providers: [SeederService],
})
export class SeederModule {}
