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
import {CountryModel} from '../models';
import {CountryModelRepository} from '../repositories';

export class CountryController {
  constructor(
    @repository(CountryModelRepository)
    public countryModelRepository : CountryModelRepository,
  ) {}

  @post('/countries')
  @response(200, {
    description: 'CountryModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(CountryModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryModel, {
            title: 'NewCountryModel',
            exclude: ['id'],
          }),
        },
      },
    })
    countryModel: Omit<CountryModel, 'id'>,
  ): Promise<CountryModel> {
    return this.countryModelRepository.create(countryModel);
  }

  @get('/countries/count')
  @response(200, {
    description: 'CountryModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CountryModel) where?: Where<CountryModel>,
  ): Promise<Count> {
    return this.countryModelRepository.count(where);
  }

  @get('/countries')
  @response(200, {
    description: 'Array of CountryModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CountryModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CountryModel) filter?: Filter<CountryModel>,
  ): Promise<CountryModel[]> {
    return this.countryModelRepository.find(filter);
  }

  @patch('/countries')
  @response(200, {
    description: 'CountryModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryModel, {partial: true}),
        },
      },
    })
    countryModel: CountryModel,
    @param.where(CountryModel) where?: Where<CountryModel>,
  ): Promise<Count> {
    return this.countryModelRepository.updateAll(countryModel, where);
  }

  @get('/countries/{id}')
  @response(200, {
    description: 'CountryModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CountryModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CountryModel, {exclude: 'where'}) filter?: FilterExcludingWhere<CountryModel>
  ): Promise<CountryModel> {
    return this.countryModelRepository.findById(id, filter);
  }

  @patch('/countries/{id}')
  @response(204, {
    description: 'CountryModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CountryModel, {partial: true}),
        },
      },
    })
    countryModel: CountryModel,
  ): Promise<void> {
    await this.countryModelRepository.updateById(id, countryModel);
  }

  @put('/countries/{id}')
  @response(204, {
    description: 'CountryModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() countryModel: CountryModel,
  ): Promise<void> {
    await this.countryModelRepository.replaceById(id, countryModel);
  }

  @del('/countries/{id}')
  @response(204, {
    description: 'CountryModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.countryModelRepository.deleteById(id);
  }
}
