import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarios: UsuariosService,
    private jwt: JwtService,
  ) {}

  async registrar(email: string, senha: string) {
    const hash = await bcrypt.hash(senha, 8);
    return this.usuarios.criar({ email, senha: hash });
  }

  async login(email: string, senha: string) {
    const user = await this.usuarios.buscarPorEmail(email);

    if (!user) throw new Error('Usuário não existe');

    const ok = await bcrypt.compare(senha, user.senha);

    if (!ok) throw new Error('Senha inválida');

    return {
      token: this.jwt.sign({ id: user.id }),
    };
  }
}