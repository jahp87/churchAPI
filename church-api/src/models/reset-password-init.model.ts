import {Model, model, property} from '@loopback/repository';

@model()
export class ResetPasswordInitModel extends Model {
  @property({
    type: 'string',
    required: true,
  })
  email: string;


  constructor(data?: Partial<ResetPasswordInitModel>) {
    super(data);
  }
}

export interface ResetPasswordInitModelRelations {
  // describe navigational properties here
}

export type ResetPasswordInitModelWithRelations = ResetPasswordInitModel & ResetPasswordInitModelRelations;
