import {Model, model, property} from '@loopback/repository';
import {EnvelopeModel} from '.';

@model()
export class NodeMailerModel extends Model {
  @property({
    type: 'string',
  })
  accepted?: string;

  @property({
    type: 'string',
    required: true,
  })
  rejected: string;

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

  @property({
    type: 'string',
  })
  messageId?: string;

  @property(() => EnvelopeModel)
  envelope: EnvelopeModel;


  constructor(data?: Partial<NodeMailerModel>) {
    super(data);
  }
}

export interface NodeMailerModelRelations {
  // describe navigational properties here
}

export type NodeMailerModelWithRelations = NodeMailerModel & NodeMailerModelRelations;
