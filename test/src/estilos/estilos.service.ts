import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estilo } from './estilos.entity';

@Injectable()
export class EstilosService {
  constructor(
    @InjectRepository(Estilo)
    private repo: Repository<Estilo>,
  ) {}

  create(data: any) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ estilo: id });
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
