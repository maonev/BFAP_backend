import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { DatabaseService } from '../database/database.service.js';

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTeamDto: CreateTeamDto) {
    return this.databaseService.users.create({
      data: createTeamDto
    });
  }

  async findAll() {
    return this.databaseService.users.findMany();
  }

  async findOne(slug: string) {
    const findUser = await this.databaseService.users.findUnique({
      where: { slug },
    });

    if (!findUser) {
      throw new NotFoundException(`User with slug ${slug} not found!`);
    }

    return findUser;
  }

  async update(slug: string, updateTeamDto: UpdateTeamDto) {
    const updateUser = await this.databaseService.users.update({
      where: { slug },
      data: updateTeamDto,
    });

    if (!updateUser) {
      throw new NotFoundException(`User with slug ${slug} not found!`);
    }

    return updateUser;
  }

  async remove(slug: string) {
    const deleteUser = await this.databaseService.users.delete({
      where: { slug },
    });

    if (!deleteUser) {
      throw new NotFoundException(`User with slug ${slug} not found!`);
    }

    return {
      message: `User with slug '${slug}' has been successfully deleted`,
    };
  }
}
