import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Comuna} from './comuna.model';
import {Departamento} from './departamento.model';
import {Pais} from './pais.model';
import {Region} from './region.model';
import {User} from './user.model';

@model()
export class Perfil extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  rut: string;

  @property({
    type: 'string',
  })
  dni: string;

  @property({
    type: 'string',
  })
  primerNombre?: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
  })
  primerApellido?: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
  })
  direccion?: string;

  @property({
    type: 'date',
  })
  fechaNaciomiento?: string;

  @property({
    type: 'boolean',
  })
  sexo?: boolean;

  @property({
    type: 'string',
  })
  telefono?: string;

  @property({
    type: 'string',
  })
  email?: string;





  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Departamento)
  departamentoId: string;

  @belongsTo(() => Pais)
  paisId: string;

  @belongsTo(() => Region)
  regionId: string;

  @belongsTo(() => Comuna)
  comunaId: string;

  constructor(data?: Partial<Perfil>) {
    super(data);
  }
}

export interface PerfilRelations {
  // describe navigational properties here
}

export type PerfilWithRelations = Perfil & PerfilRelations;
