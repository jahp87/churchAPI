import {Entity, model, property} from '@loopback/repository';

@model()
export class StateModel extends Entity {
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


  constructor(data?: Partial<StateModel>) {
    super(data);
  }
}

export interface StateModelRelations {
  // describe navigational properties here
}

export type StateModelWithRelations = StateModel & StateModelRelations;
