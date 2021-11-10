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
import {CityModel} from '../models';
import {CityModelRepository} from '../repositories';

export class CityController {
  constructor(
    @repository(CityModelRepository)
    public cityModelRepository : CityModelRepository,
  ) {}

  @post('/cities')
  @response(200, {
    description: 'CityModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(CityModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CityModel, {
            title: 'NewCityModel',
            exclude: ['id'],
          }),
        },
      },
    })
    cityModel: Omit<CityModel, 'id'>,
  ): Promise<CityModel> {
    return this.cityModelRepository.create(cityModel);
  }

  @get('/cities/count')
  @response(200, {
    description: 'CityModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CityModel) where?: Where<CityModel>,
  ): Promise<Count> {
    return this.cityModelRepository.count(where);
  }

  @get('/cities')
  @response(200, {
    description: 'Array of CityModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CityModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CityModel) filter?: Filter<CityModel>,
  ): Promise<CityModel[]> {
    return this.cityModelRepository.find(filter);
  }

  @patch('/cities')
  @response(200, {
    description: 'CityModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CityModel, {partial: true}),
        },
      },
    })
    cityModel: CityModel,
    @param.where(CityModel) where?: Where<CityModel>,
  ): Promise<Count> {
    return this.cityModelRepository.updateAll(cityModel, where);
  }

  @get('/cities/{id}')
  @response(200, {
    description: 'CityModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CityModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CityModel, {exclude: 'where'}) filter?: FilterExcludingWhere<CityModel>
  ): Promise<CityModel> {
    return this.cityModelRepository.findById(id, filter);
  }

  @patch('/cities/{id}')
  @response(204, {
    description: 'CityModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CityModel, {partial: true}),
        },
      },
    })
    cityModel: CityModel,
  ): Promise<void> {
    await this.cityModelRepository.updateById(id, cityModel);
  }

  @put('/cities/{id}')
  @response(204, {
    description: 'CityModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cityModel: CityModel,
  ): Promise<void> {
    await this.cityModelRepository.replaceById(id, cityModel);
  }

  @del('/cities/{id}')
  @response(204, {
    description: 'CityModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cityModelRepository.deleteById(id);
  }
}
