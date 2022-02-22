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
  Pais,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilPaisController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/pais', {
    responses: {
      '200': {
        description: 'Pais belonging to Perfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pais)},
          },
        },
      },
    },
  })
  async getPais(
    @param.path.string('id') id: typeof Perfil.prototype.id,
  ): Promise<Pais> {
    return this.perfilRepository.pais(id);
  }
}
