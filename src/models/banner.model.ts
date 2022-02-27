import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Banner extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  path?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @property({
    type: 'date',
  })
  createdDate?: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Banner>) {
    super(data);
  }
}

export interface BannerRelations {
  // describe navigational properties here
}

export type BannerWithRelations = Banner & BannerRelations;
