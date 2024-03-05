import { Transform } from 'class-transformer';
import { getUserImageLink } from '../../utils/link.utils';

export class UserResponseDto {
  readonly id: number;

  readonly email: string;

  readonly phone: string;

  @Transform(({ obj }) => obj.position.name)
  readonly position: string;

  readonly position_id: number;

  readonly registration_timestamp: number;

  @Transform(({ value }) => getUserImageLink(value))
  readonly photo: string;
}
