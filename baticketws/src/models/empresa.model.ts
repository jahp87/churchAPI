import {Entity, model, property} from '@loopback/repository';

@model()
export class Empresa extends Entity {
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
  rutEmpresa: string;

  @property({
    type: 'string',
    required: true,
  })
  razonSocial: string;

  @property({
    type: 'string',
    required: true,
  })
  rutFacturacion: string;

  @property({
    type: 'string',
  })
  direccion: string;

  @property({
    type: 'string',
  })
  telefono: string;

  @property({
    type: 'string',
  })
  giro: string;

  @property({
    type: 'boolean',
  })
  activo: boolean;


  constructor(data?: Partial<Empresa>) {
    super(data);
  }
}

export interface EmpresaRelations {
  // describe navigational properties here
}

export type EmpresaWithRelations = Empresa & EmpresaRelations;
