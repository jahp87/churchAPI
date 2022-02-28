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
import {Promotor} from '../models';
import {PromotorRepository} from '../repositories';

export class PromotorController {
  constructor(
    @repository(PromotorRepository)
    public promotorRepository: PromotorRepository,
  ) { }

  @post('/api/promotores')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Promotor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Promotor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotor, {
            title: 'NewPromotor',
            exclude: ['id'],
          }),
        },
      },
    })
    promotor: Omit<Promotor, 'id'>,
  ): Promise<Promotor> {
    return this.promotorRepository.create(promotor);
  }

  @get('/api/promotores/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Promotor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Promotor) where?: Where<Promotor>,
  ): Promise<Count> {
    return this.promotorRepository.count(where);
  }

  @get('/api/promotores')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Promotor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Promotor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Promotor) filter?: Filter<Promotor>,
  ): Promise<Promotor[]> {
    return this.promotorRepository.find(filter);
  }

  @patch('/api/promotores')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Promotor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotor, {partial: true}),
        },
      },
    })
    promotor: Promotor,
    @param.where(Promotor) where?: Where<Promotor>,
  ): Promise<Count> {
    return this.promotorRepository.updateAll(promotor, where);
  }

  @get('/api/promotores/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Promotor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Promotor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Promotor, {exclude: 'where'}) filter?: FilterExcludingWhere<Promotor>
  ): Promise<Promotor> {
    return this.promotorRepository.findById(id, filter);
  }

  @patch('/api/promotores/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Promotor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Promotor, {partial: true}),
        },
      },
    })
    promotor: Promotor,
  ): Promise<void> {
    await this.promotorRepository.updateById(id, promotor);
  }

  @put('/api/promotores/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Promotor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() promotor: Promotor,
  ): Promise<void> {
    await this.promotorRepository.replaceById(id, promotor);
  }

  @del('/api/promotores/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Promotor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.promotorRepository.deleteById(id);
  }
}
