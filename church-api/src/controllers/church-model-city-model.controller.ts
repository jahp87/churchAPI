import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ChurchModel,
  CityModel,
} from '../models';
import {ChurchModelRepository} from '../repositories';

export class ChurchModelCityModelController {
  constructor(
    @repository(ChurchModelRepository)
    public churchModelRepository: ChurchModelRepository,
  ) { }

  @get('/church-models/{id}/city-model', {
    responses: {
      '200': {
        description: 'CityModel belonging to ChurchModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CityModel)},
          },
        },
      },
    },
  })
  async getCityModel(
    @param.path.string('id') id: typeof ChurchModel.prototype.id,
  ): Promise<CityModel> {
    return this.churchModelRepository.city(id);
  }
}
