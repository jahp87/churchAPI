import {Entity, model, property} from '@loopback/repository';

@model()
export class TypePrayer extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  name?: string;


  constructor(data?: Partial<TypePrayer>) {
    super(data);
  }
}

export interface TypePrayerRelations {
  // describe navigational properties here
}

export type TypePrayerWithRelations = TypePrayer & TypePrayerRelations;
