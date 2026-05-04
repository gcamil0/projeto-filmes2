import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './filmes/filmes.entity';
import { Usuario } from './usuarios/usuarios.entity';
import { FilmesModule } from './filmes/filmes.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'filmes_db',
      entities: [Filme, Usuario],
      synchronize: true,
    }),
    FilmesModule,
    AuthModule,
    UsuariosModule,
  ],
})
export class AppModule {}