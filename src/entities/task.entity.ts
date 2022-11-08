import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.tasks, {
    onDelete: 'SET NULL',
  })
  employee: EmployeeEntity;
}
