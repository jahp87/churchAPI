import {Model, model, property} from '@loopback/repository';
import {Envelope} from './envelope.model';

@model()
export class NodeMail extends Model {
  @property.array({
    type: 'string',
  })
  accepted: string[];

  @property.array({
    type: 'string',
    required: true,
  })
  rejected: string[];

  @property(() => Envelope)
  envelope: Envelope;

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


  constructor(data?: Partial<NodeMail>) {
    super(data);
  }
}

export interface NodeMailRelations {
  // describe navigational properties here
}

export type NodeMailWithRelations = NodeMail & NodeMailRelations;
