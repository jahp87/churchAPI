import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Vineyard extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Vineyard>) {
    super(data);
  }
}

export interface VineyardRelations {
  // describe navigational properties here
}

export type VineyardWithRelations = Vineyard & VineyardRelations;
