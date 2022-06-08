import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Ad extends Entity {
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
  title: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  description?: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Ad>) {
    super(data);
  }
}

export interface AdRelations {
  // describe navigational properties here
}

export type AdWithRelations = Ad & AdRelations;
