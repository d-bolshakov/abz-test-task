import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import {
  DATA_SOURCE_DI_TOKEN,
  USER_REPOSITORY_DI_TOKEN,
} from '../constants/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY_DI_TOKEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE_DI_TOKEN],
  },
];
