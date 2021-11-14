import {belongsTo, Entity, model, property} from '@loopback/repository';
import {UserModel} from './user-model.model';

@model({settings: {strict: false}})
export class RefreshTokenModel extends Entity {
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
  refreshToken: string;

  @belongsTo(() => UserModel)
  userId: string;

  constructor(data?: Partial<RefreshTokenModel>) {
    super(data);
  }
}

export interface RefreshTokenModelRelations {
  // describe navigational properties here
}

export type RefreshTokenModelWithRelations = RefreshTokenModel & RefreshTokenModelRelations;
