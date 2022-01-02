import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Prayer extends Entity {
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
  prayerLink: string;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  preacherName?: string;

  @property({
    type: 'date',
  })
  createdDate?: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Prayer>) {
    super(data);
  }
}

export interface PrayerRelations {
  // describe navigational properties here
}

export type PrayerWithRelations = Prayer & PrayerRelations;
