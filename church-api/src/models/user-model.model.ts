import {Entity, model, property, hasOne} from '@loopback/repository';
import {UserCredentialsModel} from './user-credentials-model.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class UserModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    defaultFn: 'uuidv4',
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    nullable: false,
  })
  role: string;

  @hasOne(() => UserCredentialsModel, {keyTo: 'userId'})
  userCredentials: UserCredentialsModel;

  constructor(data?: Partial<UserModel>) {
    super(data);
  }
}

export interface UserModelRelations {
  // describe navigational properties here
}


export type UserModelWithRelations = UserModel & UserModelRelations
