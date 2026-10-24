import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class MembersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createMemberDto: CreateMemberDto) {
    return this.databaseService.users.create({
      data: createMemberDto,
    });
  }

  async findAll() {
    return this.databaseService.users.findMany();
  }

  async findOne(slug: string) {
    return this.databaseService.users.findUnique({
      where: { slug },
    });
  }

  async update(slug: string, updateMemberDto: UpdateMemberDto) {
    return this.databaseService.users.update({
      where: { slug },
      data: updateMemberDto,
    });
  }

  async remove(slug: string) {
    return this.databaseService.users.delete({
      where: { slug },
    });
  }
}
