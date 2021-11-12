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
  CountryModel,
} from '../models';
import {ChurchModelRepository} from '../repositories';

export class ChurchModelCountryModelController {
  constructor(
    @repository(ChurchModelRepository)
    public churchModelRepository: ChurchModelRepository,
  ) { }

  @get('/church-models/{id}/country-model', {
    responses: {
      '200': {
        description: 'CountryModel belonging to ChurchModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CountryModel)},
          },
        },
      },
    },
  })
  async getCountryModel(
    @param.path.string('id') id: typeof ChurchModel.prototype.id,
  ): Promise<CountryModel> {
    return this.churchModelRepository.country(id);
  }
}
