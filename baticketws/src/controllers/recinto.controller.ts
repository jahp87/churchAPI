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
import {Recinto} from '../models';
import {RecintoRepository} from '../repositories';

export class RecintoController {
  constructor(
    @repository(RecintoRepository)
    public recintoRepository: RecintoRepository,
  ) { }

  @post('/api/recintos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Recinto model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recinto)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recinto, {
            title: 'NewRecinto',
            exclude: ['id'],
          }),
        },
      },
    })
    recinto: Omit<Recinto, 'id'>,
  ): Promise<Recinto> {
    return this.recintoRepository.create(recinto);
  }

  @get('/api/recintos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Recinto model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recinto) where?: Where<Recinto>,
  ): Promise<Count> {
    return this.recintoRepository.count(where);
  }

  @get('/api/recintos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Recinto model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recinto, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recinto) filter?: Filter<Recinto>,
  ): Promise<Recinto[]> {
    return this.recintoRepository.find(filter);
  }

  @patch('/api/recintos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Recinto PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recinto, {partial: true}),
        },
      },
    })
    recinto: Recinto,
    @param.where(Recinto) where?: Where<Recinto>,
  ): Promise<Count> {
    return this.recintoRepository.updateAll(recinto, where);
  }

  @get('/api/recintos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Recinto model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recinto, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Recinto, {exclude: 'where'}) filter?: FilterExcludingWhere<Recinto>
  ): Promise<Recinto> {
    return this.recintoRepository.findById(id, filter);
  }

  @patch('/api/recintos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Recinto PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recinto, {partial: true}),
        },
      },
    })
    recinto: Recinto,
  ): Promise<void> {
    await this.recintoRepository.updateById(id, recinto);
  }

  @put('/api/recintos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Recinto PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recinto: Recinto,
  ): Promise<void> {
    await this.recintoRepository.replaceById(id, recinto);
  }

  @del('/api/recintos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Recinto DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recintoRepository.deleteById(id);
  }
}
