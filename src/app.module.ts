import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PositionsModule } from './positions/positions.module';
import { DatabaseModule } from './database/database.module';
import { TokensModule } from './tokens/tokens.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    UsersModule,
    PositionsModule,
    DatabaseModule,
    TokensModule,
    ImagesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
