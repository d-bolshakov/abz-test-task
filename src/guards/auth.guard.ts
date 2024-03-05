import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokensService } from '../tokens/tokens.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TokensService) private tokenService: TokensService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(token);
    } catch {
      throw new UnauthorizedException({
        success: false,
        message: 'Token expired',
      });
    }
    const existsInDB = await this.tokenService.tokenExists(token);
    if (!existsInDB)
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid token',
      });
    await this.tokenService.delete(token);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization;
  }
}
