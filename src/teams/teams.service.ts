import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';
import { DatabaseService } from '../database/database.service.js';
import * as bcrypt from 'bcrypt';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class TeamsService {
  private readonly SALT_ROUNDS = 10;
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createTeamDto: CreateTeamDto) {
    try {
      const baseSlug = `${createTeamDto.first_name}-${createTeamDto.last_name}`
        .toLowerCase()
        .replace(/\s+/g, '-');

      const hashedPw = await bcrypt.hash(
        createTeamDto.password,
        this.SALT_ROUNDS,
      );

      let slug = baseSlug;
      let isUnique = false;
      let counter = Math.floor(Math.random() * 10);

      while (!isUnique) {
        const existUser = await this.databaseService.users.findUnique({
          where: { slug },
        });

        if (!existUser) {
          isUnique = true;
        } else {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }
      }

      return await this.databaseService.users.create({
        data: { ...createTeamDto, password: hashedPw, slug },
        omit: {
          id: true,
          email: true,
          password: true,
          role: true,
          refreshToken: true,
        },
      });
    } catch (err) {
      throw new Error(`message: ${err}`);
    }
  }

  async findAll() {
    try {
      return await this.databaseService.users.findMany({
        omit: {
          id: true,
          email: true,
          password: true,
          role: true,
          refreshToken: true,
        },
      });
    } catch (err) {
      throw new Error(`message: ${err}`);
    }
  }

  async findOne(slug: string) {
    try {
      return await this.databaseService.users.findUniqueOrThrow({
        where: { slug },
        omit: {
          id: true,
          email: true,
          password: true,
          role: true,
          refreshToken: true,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`User with slug ${slug} not found!`);
      }
      throw new Error(`message: ${err}`);
    }
  }

  async update(slug: string, updateTeamDto: UpdateTeamDto) {
    try {
      return await this.databaseService.users.update({
        where: { slug },
        data: updateTeamDto,
        omit: {
          id: true,
          email: true,
          password: true,
          role: true,
          refreshToken: true,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException(`User with slug ${slug} not found!`);
        }
        if (err.code === 'P2002') {
          throw new ConflictException(
            `There is a unique constraint violation, cannot be created with this slug ${slug}`,
          );
        }
      }
      throw new Error(`message: ${err}`);
    }
  }

  async remove(slug: string) {
    try {
      await this.databaseService.users.delete({
        where: { slug },
      });

      return;
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        throw new NotFoundException(`User with slug ${slug} not found!`);
      }
      throw new Error(`message: ${err}`);
    }
  }
}
