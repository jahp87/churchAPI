import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ChurchModel} from './church-model.model';
import {UserModel} from './user-model.model';

@model()
export class UserProfileModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  firstname?: string;

  @property({
    type: 'string',
  })
  lastname?: string;

  @belongsTo(() => UserModel)
  userId: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<UserProfileModel>) {
    super(data);
  }
}

export interface UserProfileModelRelations {
  // describe navigational properties here
}

export type UserProfileModelWithRelations = UserProfileModel & UserProfileModelRelations;
