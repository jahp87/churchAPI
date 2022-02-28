import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Perfil,
  Comuna,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilComunaController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/comuna', {
    responses: {
      '200': {
        description: 'Comuna belonging to Perfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comuna)},
          },
        },
      },
    },
  })
  async getComuna(
    @param.path.string('id') id: typeof Perfil.prototype.id,
  ): Promise<Comuna> {
    return this.perfilRepository.comuna(id);
  }
}
