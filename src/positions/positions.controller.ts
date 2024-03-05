import { Controller, Get, HttpException } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  async findAll() {
    try {
      const positions = await this.positionsService.findAll();
      return {
        success: true,
        positions,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return { success: false, message: error.message };
      return { success: false, message: 'Internal server error occured' };
    }
  }
}
