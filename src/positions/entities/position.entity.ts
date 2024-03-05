import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '20', nullable: false })
  name: string;

  @OneToMany(() => User, (user: User) => user.position)
  users: User[];
}
