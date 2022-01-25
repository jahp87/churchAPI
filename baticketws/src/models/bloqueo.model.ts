import {Entity, model, property} from '@loopback/repository';

@model()
export class Bloqueo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  color: string;

  @property({
    type: 'boolean',
  })
  imprimirBloqueo: boolean;


  constructor(data: Partial<Bloqueo>) {
    super(data);
  }
}

export interface BloqueoRelations {
  // describe navigational properties here
}

export type BloqueoWithRelations = Bloqueo & BloqueoRelations;
