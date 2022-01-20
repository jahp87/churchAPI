import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ChurchModel} from './church-model.model';

@model()
export class Schedule extends Entity {
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
  name: string;

  @property({
    type: 'string',
  })
  weekDay?: string;

  @property({
    type: 'string',
  })
  hour?: string;

  @belongsTo(() => ChurchModel)
  churchId: string;

  constructor(data?: Partial<Schedule>) {
    super(data);
  }
}

export interface ScheduleRelations {
  // describe navigational properties here
}

export type ScheduleWithRelations = Schedule & ScheduleRelations;
