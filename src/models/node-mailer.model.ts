import {Entity, model, property} from '@loopback/repository';
import {EnvelopeModel} from '.';

@model()
export class NodeMailerModel extends Entity {
  @property.array({
    type: 'string',
  })
  accepted: string[];

  @property.apply({
    type: 'string',
    required: true,
  })
  rejected: string[];

  @property({
    type: 'number',
  })
  envelopeTime?: number;

  @property({
    type: 'number',
  })
  messageTime?: number;

  @property({
    type: 'number',
  })
  messageSize?: number;

  @property({
    type: 'string',
  })
  response?: string;

  @property(() => EnvelopeModel)
  envelope?: EnvelopeModel;

  @property({
    type: 'string',
  })
  messageId?: string;

  constructor(data?: Partial<NodeMailerModel>) {
    super(data);
  }
}

export interface NodeMailerModelRelations {
  // describe navigational properties here
}

export type NodeMailerModelWithRelations = NodeMailerModel & NodeMailerModelRelations;
