import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Region} from './region.model';

@model()
export class Comuna extends Entity {
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

  @belongsTo(() => Region)
  regionId: string;

  constructor(data?: Partial<Comuna>) {
    super(data);
  }
}

export interface ComunaRelations {
  // describe navigational properties here
}

export type ComunaWithRelations = Comuna & ComunaRelations;
