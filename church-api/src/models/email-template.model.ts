import {Model, model, property} from '@loopback/repository';

@model()
export class EmailTemplateModel extends Model {
  @property({
    type: 'string',
    default: 'noreply@churchapp.net',
  })
  from: string;

  @property({
    type: 'string',
    required: true,
  })
  to: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  text: string;

  @property({
    type: 'string',
    required: true,
  })
  html: string;


  constructor(data?: Partial<EmailTemplateModel>) {
    super(data);
  }
}

export interface EmailTemplateModelRelations {
  // describe navigational properties here
}

export type EmailTemplateModelWithRelations = EmailTemplateModel & EmailTemplateModelRelations;
