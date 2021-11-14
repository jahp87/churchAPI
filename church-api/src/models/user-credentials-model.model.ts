import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserCredentialsModel extends Entity {
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
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;


  constructor(data?: Partial<UserCredentialsModel>) {
    super(data);
  }
}

export interface UserCredentialsModelRelations {
  // describe navigational properties here
}

export type UserCredentialsModelWithRelations = UserCredentialsModel & UserCredentialsModelRelations;
