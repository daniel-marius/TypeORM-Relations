import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfoEntity } from './entities/contact-info.entity';
import { EmployeeEntity } from './entities/employee.entity';
import { MeetingEntity } from './entities/meeting.entity';
import { TaskEntity } from './entities/task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepo: Repository<EmployeeEntity>,
    @InjectRepository(ContactInfoEntity)
    private contactRepo: Repository<ContactInfoEntity>,
    @InjectRepository(MeetingEntity)
    private meetingRepo: Repository<MeetingEntity>,
    @InjectRepository(TaskEntity) private taskRepo: Repository<TaskEntity>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async seed() {
    const ceo = this.employeeRepo.create({ name: 'name1' });
    await this.employeeRepo.save(ceo);

    const ceoContactInfo = this.contactRepo.create({
      email: 'email@email.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactRepo.save(ceoContactInfo);

    const manager = this.employeeRepo.create({
      name: 'name',
      manager: ceo,
    });

    const task1 = this.taskRepo.create({ name: 'Hire people' });
    await this.taskRepo.save(task1);

    manager.tasks.push(task1);

    const meeting1 = this.meetingRepo.create({ zoomUrl: 'meeting1' });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings.push(meeting1);

    await this.employeeRepo.save(manager);
  }

  getEmployeeById(id: number) {
    // return this.employeeRepo.findOne({
    //   where: { id },
    //   relations: [
    //     'manager',
    //     'directReports',
    //     'tasks',
    //     'contactInfo',
    //     'meetings',
    //   ],
    // });
    return this.employeeRepo
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .where('employee.id = :employeeId', { employeeId: id })
      .getOne();
  }

  deleteEmployee(id: number) {
    return this.employeeRepo.delete(id);
  }
}
