import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Comuna} from './comuna.model';
import {Departamento} from './departamento.model';
import {Pais} from './pais.model';
import {Region} from './region.model';
import {User} from './user.model';

@model()
export class Promotor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  rut: string;

  @property({
    type: 'string',
  })
  nombre: string;

  @property({
    type: 'string',
  })
  apellidoPaterno: string;

  @property({
    type: 'string',
  })
  apellidoMaterno: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  direccion: string;

  @property({
    type: 'string',
  })
  numero: string;

  @property({
    type: 'string',
  })
  telefono1: string;

  @property({
    type: 'string',
  })
  telefono2: string;

  @property({
    type: 'date',
  })
  fechaExpiracion?: string;

  @belongsTo(() => Pais)
  paisId: string;

  @belongsTo(() => Region)
  regionId: string;

  @belongsTo(() => Comuna)
  comunaId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Promotor>) {
    super(data);
  }
}

export interface PromotorRelations {
  // describe navigational properties here
}

export type PromotorWithRelations = Promotor & PromotorRelations;
