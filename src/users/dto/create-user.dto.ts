import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'name should be a string' })
  @MinLength(2, { message: 'name should be longer than 2 characters' })
  @MaxLength(60, { message: 'name should be shorter than 60 characters' })
  readonly name: string;

  @Matches(
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    { message: 'email should be a valid email' },
  )
  @MinLength(2, { message: 'email should be longer than 2 characters' })
  @MaxLength(100, { message: 'email should be shorter than 60 characters' })
  readonly email: string;

  @Matches(/^[\+]{0,1}380([0-9]{9})$/, {
    message: 'phone should be a valid phone number starting with "+380"',
  })
  readonly phone: string;

  @IsNumber({}, { message: 'position_id should be a number' })
  @Min(1, { message: 'position_id should 1 or greater' })
  @Type(() => Number)
  readonly position_id: number;
}
