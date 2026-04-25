import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private repo: Repository<Usuario>,
  ) {}

  criar(data) {
    return this.repo.save(this.repo.create(data));
  }

  buscarPorEmail(email: string) {
    return this.repo.findOneBy({ email });
  }
}