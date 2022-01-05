import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Departamento} from './departamento.model';

@model()
export class Perfil extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'string',
  })
  rut: string;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  imprimePuntoVenta?: number;

  @property({
    type: 'boolean',
  })
  imprimirMasivo?: boolean;

  @property({
    type: 'boolean',
  })

  apellidos?: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
