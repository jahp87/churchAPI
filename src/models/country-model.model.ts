import {Entity, model, property} from '@loopback/repository';

@model()
export class CountryModel extends Entity {
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


  constructor(data?: Partial<CountryModel>) {
    super(data);
  }
}

export interface CountryModelRelations {
  // describe navigational properties here
}

export type CountryModelWithRelations = CountryModel & CountryModelRelations;
