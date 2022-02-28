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
  Region,
} from '../models';
import {PerfilRepository} from '../repositories';

export class PerfilRegionController {
  constructor(
    @repository(PerfilRepository)
    public perfilRepository: PerfilRepository,
  ) { }

  @get('/perfils/{id}/region', {
    responses: {
      '200': {
        description: 'Region belonging to Perfil',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Region)},
          },
        },
      },
    },
  })
  async getRegion(
    @param.path.string('id') id: typeof Perfil.prototype.id,
  ): Promise<Region> {
    return this.perfilRepository.region(id);
  }
}
