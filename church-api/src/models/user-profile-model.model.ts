import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {UserModel} from './user-model.model';
import {ChurchModel} from './church-model.model';

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

  @hasOne(() => ChurchModel, {keyTo: 'profileId'})
  activeChurch: ChurchModel;

  constructor(data?: Partial<UserProfileModel>) {
    super(data);
  }
}

export interface UserProfileModelRelations {
  // describe navigational properties here
}

export type UserProfileModelWithRelations = UserProfileModel & UserProfileModelRelations;
