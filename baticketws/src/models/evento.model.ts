import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CategoriaEvento} from './categoria-evento.model';
import {Empresa} from './empresa.model';
import {Pais} from './pais.model';
import {Region} from './region.model';
import {Comuna} from './comuna.model';
import {Ciudad} from './ciudad.model';

@model()
export class Evento extends Entity {
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
    type: 'date',
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => CategoriaEvento)
  categoriaEventoId: string;

  @belongsTo(() => Empresa)
  empresaId: string;

  @belongsTo(() => Pais)
  paisId: string;

  @belongsTo(() => Region)
  regionId: string;

  @belongsTo(() => Comuna)
  comunaId: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
