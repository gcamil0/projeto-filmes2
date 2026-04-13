import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { FilmesService } from './filmes.service';

@Controller('filmes')
export class FilmesController {
  constructor(private service: FilmesService) {}

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

  @Put(':id')
  update(@Param('id') id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
