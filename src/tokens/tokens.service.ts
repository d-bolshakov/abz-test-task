import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { TOKEN_REPOSITORY_DI_TOKEN } from '../constants/constants';

@Injectable()
export class TokensService {
  constructor(
    @Inject(TOKEN_REPOSITORY_DI_TOKEN)
    private tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}
  async getToken() {
    const token = await this.jwtService.signAsync({});
    await this.tokenRepository.save({ token });
    return token;
  }

  async tokenExists(token: string) {
    return this.tokenRepository
      .createQueryBuilder()
      .where('token = :token', { token })
      .getExists();
  }

  async delete(token: string) {
    return this.tokenRepository.delete({ token });
  }
}
