import {Entity, model, property} from '@loopback/repository';

@model()
export class EnvelopeModel extends Entity {
  @property({
    type: 'string',
  })
  from: string;

  @property({
    type: 'string',
  })
  to: string;


  constructor(data?: Partial<EnvelopeModel>) {
    super(data);
  }
}

export interface EnvelopeModelRelations {
  // describe navigational properties here
}

export type EnvelopeModelWithRelations = EnvelopeModel & EnvelopeModelRelations;
