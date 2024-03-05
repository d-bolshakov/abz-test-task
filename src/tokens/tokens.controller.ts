import { Controller, Get, HttpException } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  async getToken() {
    try {
      const token = await this.tokensService.getToken();
      return {
        success: true,
        token,
      };
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException)
        return { success: false, message: error.message };
      return { success: false, message: 'Internal server error occured' };
    }
  }
}
