import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => EmployeeEntity, (employee) => employee.tasks, {
    onDelete: 'SET NULL',
  })
  employee: EmployeeEntity;
}
