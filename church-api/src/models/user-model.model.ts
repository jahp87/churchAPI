import {Entity, hasOne, model, property} from '@loopback/repository';
import {UserCredentialsModel} from './user-credentials-model.model';

@model({settings: {strict: false}})
export class UserModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  username?: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'boolean',
  })
  emailVerified?: boolean;

  @property({
    type: 'string',
  })
  verificationToken?: string;

  @hasOne(() => UserCredentialsModel, {keyTo: 'userId'})
  userCredentials: UserCredentialsModel;

  constructor(data?: Partial<UserModel>) {
    super(data);
  }
}

export interface UserModelRelations {
  // describe navigational properties here
}

export type UserModelWithRelations = UserModel & UserModelRelations;
