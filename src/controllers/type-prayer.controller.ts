import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {TypePrayer} from '../models';
import {TypePrayerRepository} from '../repositories';

export class TypePrayerController {
  constructor(
    @repository(TypePrayerRepository)
    public typePrayerRepository : TypePrayerRepository,
  ) {}

  @post('/typeprayers')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypePrayer model instance',
    content: {'application/json': {schema: getModelSchemaRef(TypePrayer)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypePrayer, {
            title: 'NewTypePrayer',
            exclude: ['id'],
          }),
        },
      },
    })
    typePrayer: Omit<TypePrayer, 'id'>,
  ): Promise<TypePrayer> {
    return this.typePrayerRepository.create(typePrayer);
  }

  @get('/typeprayers/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypePrayer model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TypePrayer) where?: Where<TypePrayer>,
  ): Promise<Count> {
    return this.typePrayerRepository.count(where);
  }

  @get('/typeprayers')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of TypePrayer model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TypePrayer, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TypePrayer) filter?: Filter<TypePrayer>,
  ): Promise<TypePrayer[]> {
    return this.typePrayerRepository.find(filter);
  }

  @patch('/typeprayers')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypePrayer PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypePrayer, {partial: true}),
        },
      },
    })
    typePrayer: TypePrayer,
    @param.where(TypePrayer) where?: Where<TypePrayer>,
  ): Promise<Count> {
    return this.typePrayerRepository.updateAll(typePrayer, where);
  }

  @get('/typeprayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'TypePrayer model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TypePrayer, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TypePrayer, {exclude: 'where'}) filter?: FilterExcludingWhere<TypePrayer>
  ): Promise<TypePrayer> {
    return this.typePrayerRepository.findById(id, filter);
  }

  @patch('/typeprayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TypePrayer PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TypePrayer, {partial: true}),
        },
      },
    })
    typePrayer: TypePrayer,
  ): Promise<void> {
    await this.typePrayerRepository.updateById(id, typePrayer);
  }

  @put('/typeprayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TypePrayer PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() typePrayer: TypePrayer,
  ): Promise<void> {
    await this.typePrayerRepository.replaceById(id, typePrayer);
  }

  @del('/typeprayers/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'TypePrayer DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.typePrayerRepository.deleteById(id);
  }
}
