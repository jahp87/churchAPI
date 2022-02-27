import {Entity, model, property} from '@loopback/repository';

@model()
export class KeyAndPasswordModel extends Entity {
  @property({
    type: 'string',
  })
  resetKey: string;

  @property({
    type: 'string',
  })
  password: string;

  @property({
    type: 'string',
  })
  confirmPassword: string;


  constructor(data?: Partial<KeyAndPasswordModel>) {
    super(data);
  }
}

export interface KeyAndPasswordModelRelations {
  // describe navigational properties here
}

export type KeyAndPasswordModelWithRelations = KeyAndPasswordModel & KeyAndPasswordModelRelations;
