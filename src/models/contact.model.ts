import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Contact extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
  })
  facebook?: string;

  @property({
    type: 'string',
  })
  instagram?: string;

  @property({
    type: 'string',
  })
  twitter?: string;

  @property({
    type: 'string',
  })
  youtube?: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Contact>) {
    super(data);
  }
}

export interface ContactRelations {
  // describe navigational properties here
}

export type ContactWithRelations = Contact & ContactRelations;
