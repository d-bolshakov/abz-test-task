import { DataSource } from 'typeorm';
import { Token } from './entities/token.entity';
import {
  DATA_SOURCE_DI_TOKEN,
  TOKEN_REPOSITORY_DI_TOKEN,
} from '../constants/constants';

export const tokenProviders = [
  {
    provide: TOKEN_REPOSITORY_DI_TOKEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: [DATA_SOURCE_DI_TOKEN],
  },
];
