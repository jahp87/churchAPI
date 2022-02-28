import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {CategoriaEvento} from './categoria-evento.model';
import {Ciudad} from './ciudad.model';
import {Comuna} from './comuna.model';
import {Empresa} from './empresa.model';
import {Pais} from './pais.model';
import {Region} from './region.model';
import {Layout} from './layout.model';
import {EventoLayoutRelation} from './evento-layout-relation.model';

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
  titulo: string;

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

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imgPortada: string;

  @property({
    type: 'string',
    required: true,
  })
  imgSecundario: string;

  @property({
    type: 'string',
    required: true,
  })
  terminosEvento: string;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

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

  @hasMany(() => Layout, {through: {model: () => EventoLayoutRelation}})
  layouts: Layout[];

  constructor(data?: Partial<Evento>) {
    super(data);
  }
}

export interface EventoRelations {
  // describe navigational properties here
}

export type EventoWithRelations = Evento & EventoRelations;
