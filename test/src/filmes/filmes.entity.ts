import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Estilo } from '../estilos/estilos.entity';

@Entity('filmes')
export class Filme {
  @PrimaryGeneratedColumn()
  filme: number;

  @Column()
  estilo: number;

  @ManyToOne(() => Estilo, (estilo) => estilo.filmes)
  @JoinColumn({ name: 'estilo' })
  estiloRel: Estilo;

  @Column()
  nome: string;

  @Column()
  ano: string;

  @Column()
  duracao: string;

  @Column()
  foto: string;

  @Column({ nullable: true })
  sinopse: string;

  @Column({ nullable: true })
  video: string;
}
