import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TypePrayer} from './type-prayer.model';

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
  name: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @belongsTo(() => TypePrayer)
  typePrayerId: string;

  constructor(data?: Partial<Prayer>) {
    super(data);
  }
}

export interface PrayerRelations {
  // describe navigational properties here
}

export type PrayerWithRelations = Prayer & PrayerRelations;
