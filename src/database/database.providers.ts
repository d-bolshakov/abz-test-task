import { DataSource } from 'typeorm';
import { DATA_SOURCE_DI_TOKEN } from '../constants/constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_DI_TOKEN,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
