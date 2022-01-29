import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CanalVentaEstado} from './canal-venta-estado.model';

@model({settings: {strict: false}})
export class CanalVenta extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'boolean',
  })
  predeterminado?: boolean;

  @property({
    type: 'date',
  })
  fechaCreacion?: string;

  @property({
    type: 'string',
  })
  fechaModificacion?: string;

  @belongsTo(() => CanalVentaEstado)
  estadoId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CanalVenta>) {
    super(data);
  }
}

export interface CanalVentaRelations {
  // describe navigational properties here
}

export type CanalVentaWithRelations = CanalVenta & CanalVentaRelations;
