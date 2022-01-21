import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Pais} from './pais.model';
import {Region} from './region.model';
import {Comuna} from './comuna.model';
import {Ciudad} from './ciudad.model';
import {Empresa} from './empresa.model';

@model()
export class Recinto extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
  })
  direccion: string;

  @property({
    type: 'string',
  })
  telefono: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  horario: string;

  @property({
    type: 'number',
  })
  aforoMaximo: number;

  @property({
    type: 'string',
  })
  logo: string;

  @property({
    type: 'string',
  })
  imagenFondo: string;

  @belongsTo(() => Pais)
  paisId: string;

  @belongsTo(() => Region)
  regionId: string;

  @belongsTo(() => Comuna)
  comunaId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  constructor(data?: Partial<Recinto>) {
    super(data);
  }
}

export interface RecintoRelations {
  // describe navigational properties here
}

export type RecintoWithRelations = Recinto & RecintoRelations;
