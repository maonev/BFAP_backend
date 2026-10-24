import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
  // logger?

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.membersService.create(createMemberDto);
  }

  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.membersService.findOne(slug);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.membersService.update(slug, updateMemberDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.membersService.remove(slug);
  }
}
