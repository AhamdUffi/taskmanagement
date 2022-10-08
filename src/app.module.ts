import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task } from './taskmanagenet/dto/task.entity';
import { TaskmanagenetModule } from './taskmanagenet/taskmanagenet.module';

@Module({
  imports: [
    TaskmanagenetModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 6464,
      username: 'postgres',
      password: 'postgres',
      entities: [Task],
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
