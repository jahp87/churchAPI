import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Evento} from './evento.model';
import {Layout} from './layout.model';

@model()
export class EventoLayoutRelation extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  createdDate?: string;

  @belongsTo(() => Evento)
  eventoId: string;

  @belongsTo(() => Layout)
  layoutId: string;

  constructor(data?: Partial<EventoLayoutRelation>) {
    super(data);
  }
}

export interface EventoLayoutRelationRelations {
  // describe navigational properties here
}

export type EventoLayoutRelationWithRelations = EventoLayoutRelation & EventoLayoutRelationRelations;
