import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Filme } from '../filmes/filmes.entity';

@Entity('estilos')
export class Estilo {
  @PrimaryGeneratedColumn()
  estilo: number;

  @Column()
  nome: string;

  @OneToMany(() => Filme, (filme) => filme.estiloRel)
  filmes: Filme[];
}
