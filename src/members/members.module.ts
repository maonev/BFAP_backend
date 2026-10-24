import { Module } from '@nestjs/common';
import { MembersService } from './members.service.js';
import { MembersController } from './members.controller.js';
import { DatabaseModule } from '../database/database.module.js';

@Module({
  imports: [DatabaseModule],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
