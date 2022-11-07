import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ContactInfoEntity } from './contact-info.entity';
import { TaskEntity } from './task.entity';
import { MeetingEntity } from './meeting.entity';

@Entity()
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  manager: EmployeeEntity; // self-referencing

  @OneToMany(() => EmployeeEntity, (employee) => employee.manager)
  directReports: EmployeeEntity[];

  @OneToOne(() => ContactInfoEntity, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfoEntity;

  @OneToMany(() => TaskEntity, (task) => task.employee, { eager: true })
  tasks: TaskEntity[];

  @ManyToMany(() => MeetingEntity, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: MeetingEntity[];
}
