import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Preach extends Entity {
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
  link: string;

  @property({
    type: 'string',
  })
  title: string;

  @property({
    type: 'string',
  })
  preacher: string;

  @property({
    type: 'date',
  })
  created: string;

  @property({
    type: 'string',
  })
  thumb: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Preach>) {
    super(data);
  }
}

export interface PreachRelations {
  // describe navigational properties here
}

export type PreachWithRelations = Preach & PreachRelations;
