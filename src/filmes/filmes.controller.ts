import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('filmes')
export class FilmesController {
  constructor(private service: FilmesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get()
  findAll(@Query('nome') nome?: string) {
    return this.service.findAll(nome);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}