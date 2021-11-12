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
  StateModel,
} from '../models';
import {ChurchModelRepository} from '../repositories';

export class ChurchModelStateModelController {
  constructor(
    @repository(ChurchModelRepository)
    public churchModelRepository: ChurchModelRepository,
  ) { }

  @get('/church-models/{id}/state-model', {
    responses: {
      '200': {
        description: 'StateModel belonging to ChurchModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(StateModel)},
          },
        },
      },
    },
  })
  async getStateModel(
    @param.path.string('id') id: typeof ChurchModel.prototype.id,
  ): Promise<StateModel> {
    return this.churchModelRepository.state(id);
  }
}
