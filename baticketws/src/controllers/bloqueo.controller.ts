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
import {Bloqueo} from '../models';
import {BloqueoRepository} from '../repositories';

export class BloqueoController {
  constructor(
    @repository(BloqueoRepository)
    public bloqueoRepository: BloqueoRepository,
  ) { }

  @post('/bloqueos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Bloqueo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bloqueo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloqueo, {
            title: 'NewBloqueo',
            exclude: ['id'],
          }),
        },
      },
    })
    bloqueo: Omit<Bloqueo, 'id'>,
  ): Promise<Bloqueo> {
    return this.bloqueoRepository.create(bloqueo);
  }

  @get('/bloqueos/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Bloqueo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bloqueo) where?: Where<Bloqueo>,
  ): Promise<Count> {
    return this.bloqueoRepository.count(where);
  }

  @get('/bloqueos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Bloqueo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bloqueo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bloqueo) filter?: Filter<Bloqueo>,
  ): Promise<Bloqueo[]> {
    return this.bloqueoRepository.find(filter);
  }

  @patch('/bloqueos')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Bloqueo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloqueo, {partial: true}),
        },
      },
    })
    bloqueo: Bloqueo,
    @param.where(Bloqueo) where?: Where<Bloqueo>,
  ): Promise<Count> {
    return this.bloqueoRepository.updateAll(bloqueo, where);
  }

  @get('/bloqueos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Bloqueo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bloqueo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bloqueo, {exclude: 'where'}) filter?: FilterExcludingWhere<Bloqueo>
  ): Promise<Bloqueo> {
    return this.bloqueoRepository.findById(id, filter);
  }

  @patch('/bloqueos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })

  @response(204, {
    description: 'Bloqueo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloqueo, {partial: true}),
        },
      },
    })
    bloqueo: Bloqueo,
  ): Promise<void> {
    await this.bloqueoRepository.updateById(id, bloqueo);
  }

  @put('/bloqueos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Bloqueo PUT success',
  })

  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bloqueo: Bloqueo,
  ): Promise<void> {
    await this.bloqueoRepository.replaceById(id, bloqueo);
  }

  @del('/bloqueos/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })

  @response(204, {
    description: 'Bloqueo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bloqueoRepository.deleteById(id);
  }
}
