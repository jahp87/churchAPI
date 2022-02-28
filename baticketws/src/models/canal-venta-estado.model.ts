import {Entity, model, property} from '@loopback/repository';

@model()
export class CanalVentaEstado extends Entity {
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


  constructor(data?: Partial<CanalVentaEstado>) {
    super(data);
  }
}

export interface CanalVentaEstadoRelations {
  // describe navigational properties here
}

export type CanalVentaEstadoWithRelations = CanalVentaEstado & CanalVentaEstadoRelations;
