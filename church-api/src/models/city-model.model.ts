import {Entity, model, property} from '@loopback/repository';

@model()
export class CityModel extends Entity {
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


  constructor(data?: Partial<CityModel>) {
    super(data);
  }
}

export interface CityModelRelations {
  // describe navigational properties here
}

export type CityModelWithRelations = CityModel & CityModelRelations;
