import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Filme } from './filmes.entity';

@Injectable()
export class FilmesService {
  constructor(
    @InjectRepository(Filme)
    private repo: Repository<Filme>,
  ) {}

  create(data: any) {
    return this.repo.save(data);
  }

  findAll(nome?: string) {
    return this.repo.find({
      where: nome ? { nome: Like(`%${nome}%`) } : {},
      relations: ['estiloRel'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { filme: id }, relations: ['estiloRel'] });
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
