import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CityModelWithRelations, CountryModelWithRelations, StateModelWithRelations} from '.';
import {CityModel} from './city-model.model';
import {CountryModel} from './country-model.model';
import {StateModel} from './state-model.model';

@model()
export class ChurchModel extends Entity {
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
    required: false,
  })
  logo: string;

  @property({
    type: 'string',
    required: false,
  })
  code: string;


  @belongsTo(() => CityModel, {name: 'city'})
  cityModelId: string;

  @belongsTo(() => CountryModel, {name: 'country'})
  countryModelId: string;

  @belongsTo(() => StateModel, {name: 'state'})
  stateModelId: string;


  constructor(data?: Partial<ChurchModel>) {
    super(data);
  }
}

export interface ChurchModelRelations {
  cityModelId?: CityModelWithRelations;
  stateModelId?: StateModelWithRelations;
  countryModelId?: CountryModelWithRelations;
}

export type ChurchModelWithRelations = ChurchModel & ChurchModelRelations;
