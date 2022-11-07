import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity()
export class MeetingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zoomUrl: string;

  @ManyToMany(() => EmployeeEntity, (employee) => employee.meetings)
  attendees: EmployeeEntity[];
}
