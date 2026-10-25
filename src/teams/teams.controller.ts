import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service.js';
import { CreateTeamDto } from './dto/create-team.dto.js';
import { UpdateTeamDto } from './dto/update-team.dto.js';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  // logger ?

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.teamsService.findOne(slug);
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(slug, updateTeamDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.teamsService.remove(slug);
  }
}
