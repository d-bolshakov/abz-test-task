import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetUsersQuery {
  @IsOptional()
  @IsNumber({}, { message: 'page should be a number' })
  @Min(1, { message: 'page should be 1 or greater' })
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsNumber({}, { message: 'offset should be a number' })
  @Min(0, { message: 'offset should be 0 or greater' })
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsNumber({}, { message: 'count should be a number' })
  @Min(1, { message: 'count should be 1 or greater' })
  @Max(100, { message: 'count should not be greater than 100' })
  @Type(() => Number)
  count?: number;
}
