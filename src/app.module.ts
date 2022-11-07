import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfoEntity } from './entities/contact-info.entity';
import { EmployeeEntity } from './entities/employee.entity';
import { MeetingEntity } from './entities/meeting.entity';
import { TaskEntity } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      ContactInfoEntity,
      EmployeeEntity,
      MeetingEntity,
      TaskEntity,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
