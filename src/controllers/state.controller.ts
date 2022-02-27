import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {StateModel} from '../models';
import {StateModelRepository} from '../repositories';

export class StateController {
  constructor(
    @repository(StateModelRepository)
    public stateModelRepository : StateModelRepository,
  ) {}

  @post('/states')
  @response(200, {
    description: 'StateModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(StateModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StateModel, {
            title: 'NewStateModel',
            exclude: ['id'],
          }),
        },
      },
    })
    stateModel: Omit<StateModel, 'id'>,
  ): Promise<StateModel> {
    return this.stateModelRepository.create(stateModel);
  }

  @get('/states/count')
  @response(200, {
    description: 'StateModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(StateModel) where?: Where<StateModel>,
  ): Promise<Count> {
    return this.stateModelRepository.count(where);
  }

  @get('/states')
  @response(200, {
    description: 'Array of StateModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(StateModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(StateModel) filter?: Filter<StateModel>,
  ): Promise<StateModel[]> {
    return this.stateModelRepository.find(filter);
  }

  @patch('/states')
  @response(200, {
    description: 'StateModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StateModel, {partial: true}),
        },
      },
    })
    stateModel: StateModel,
    @param.where(StateModel) where?: Where<StateModel>,
  ): Promise<Count> {
    return this.stateModelRepository.updateAll(stateModel, where);
  }

  @get('/states/{id}')
  @response(200, {
    description: 'StateModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(StateModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(StateModel, {exclude: 'where'}) filter?: FilterExcludingWhere<StateModel>
  ): Promise<StateModel> {
    return this.stateModelRepository.findById(id, filter);
  }

  @patch('/states/{id}')
  @response(204, {
    description: 'StateModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(StateModel, {partial: true}),
        },
      },
    })
    stateModel: StateModel,
  ): Promise<void> {
    await this.stateModelRepository.updateById(id, stateModel);
  }

  @put('/states/{id}')
  @response(204, {
    description: 'StateModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() stateModel: StateModel,
  ): Promise<void> {
    await this.stateModelRepository.replaceById(id, stateModel);
  }

  @del('/states/{id}')
  @response(204, {
    description: 'StateModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.stateModelRepository.deleteById(id);
  }
}
