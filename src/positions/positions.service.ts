import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { POSITION_REPOSITORY_DI_TOKEN } from '../constants/constants';

@Injectable()
export class PositionsService {
  constructor(
    @Inject(POSITION_REPOSITORY_DI_TOKEN)
    private positionRepository: Repository<Position>,
  ) {}
  async findAll() {
    const positions = await this.positionRepository.find();
    if (!positions.length)
      throw new UnprocessableEntityException('Positions not found');
    return positions;
  }
}
