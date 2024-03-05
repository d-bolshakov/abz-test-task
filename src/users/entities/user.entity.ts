import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Position } from '../../positions/entities/position.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 13, nullable: false, unique: true })
  phone: string;

  @ManyToOne(() => Position, (position: Position) => position.users, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @Column({ type: 'integer', nullable: false })
  @RelationId((user: User) => user.position)
  position_id: number;

  @Column({
    type: 'bigint',
    nullable: false,
    transformer: {
      to: (entityValue: number) => entityValue,
      from: (dbValue: string) => Number(dbValue),
    },
  })
  registration_timestamp: number = Date.now();

  @Column({ type: 'varchar', length: 42, nullable: false })
  photo: string;
}
