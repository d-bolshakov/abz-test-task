import { DataSource } from 'typeorm';
import { Position } from './entities/position.entity';
import {
  DATA_SOURCE_DI_TOKEN,
  POSITION_REPOSITORY_DI_TOKEN,
} from '../constants/constants';

export const positionProviders = [
  {
    provide: POSITION_REPOSITORY_DI_TOKEN,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Position),
    inject: [DATA_SOURCE_DI_TOKEN],
  },
];
