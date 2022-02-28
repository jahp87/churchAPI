import {Entity, model, property} from '@loopback/repository';

@model()
export class EmailTemplate extends Entity {
  @property({
    type: 'string',
  })
  from = 'no_reply@baplicada.cl';

  @property({
    type: 'string',

  })
  to: string;

  @property({
    type: 'string',
    required: true

  })
  subject: string;


  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
  })
  html?: string;


  constructor(data?: Partial<EmailTemplate>) {
    super(data);
  }
}

export interface EmailTemplateRelations {
  // describe navigational properties here
}

export type EmailTemplateWithRelations = EmailTemplate & EmailTemplateRelations;
