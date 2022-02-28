import {Entity, model, property} from '@loopback/repository';

@model()
export class CategoriaEvento extends Entity {
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


  constructor(data?: Partial<CategoriaEvento>) {
    super(data);
  }
}

export interface CategoriaEventoRelations {
  // describe navigational properties here
}

export type CategoriaEventoWithRelations = CategoriaEvento & CategoriaEventoRelations;
