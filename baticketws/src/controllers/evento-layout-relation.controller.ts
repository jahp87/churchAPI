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
import {EventoLayoutRelation} from '../models';
import {EventoLayoutRelationRepository} from '../repositories';

export class EventoLayoutRelationController {
  constructor(
    @repository(EventoLayoutRelationRepository)
    public eventoLayoutRelationRepository: EventoLayoutRelationRepository,
  ) { }

  @post('/evento-layout-relations')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EventoLayoutRelation model instance',
    content: {'application/json': {schema: getModelSchemaRef(EventoLayoutRelation)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventoLayoutRelation, {
            title: 'NewEventoLayoutRelation',
            exclude: ['id'],
          }),
        },
      },
    })
    eventoLayoutRelation: Omit<EventoLayoutRelation, 'id'>,
  ): Promise<EventoLayoutRelation> {
    return this.eventoLayoutRelationRepository.create(eventoLayoutRelation);
  }

  @get('/evento-layout-relations/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EventoLayoutRelation model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EventoLayoutRelation) where?: Where<EventoLayoutRelation>,
  ): Promise<Count> {
    return this.eventoLayoutRelationRepository.count(where);
  }

  @get('/evento-layout-relations')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of EventoLayoutRelation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EventoLayoutRelation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EventoLayoutRelation) filter?: Filter<EventoLayoutRelation>,
  ): Promise<EventoLayoutRelation[]> {
    return this.eventoLayoutRelationRepository.find(filter);
  }

  @patch('/evento-layout-relations')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EventoLayoutRelation PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventoLayoutRelation, {partial: true}),
        },
      },
    })
    eventoLayoutRelation: EventoLayoutRelation,
    @param.where(EventoLayoutRelation) where?: Where<EventoLayoutRelation>,
  ): Promise<Count> {
    return this.eventoLayoutRelationRepository.updateAll(eventoLayoutRelation, where);
  }

  @get('/evento-layout-relations/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'EventoLayoutRelation model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EventoLayoutRelation, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EventoLayoutRelation, {exclude: 'where'}) filter?: FilterExcludingWhere<EventoLayoutRelation>
  ): Promise<EventoLayoutRelation> {
    return this.eventoLayoutRelationRepository.findById(id, filter);
  }

  @patch('/evento-layout-relations/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'EventoLayoutRelation PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EventoLayoutRelation, {partial: true}),
        },
      },
    })
    eventoLayoutRelation: EventoLayoutRelation,
  ): Promise<void> {
    await this.eventoLayoutRelationRepository.updateById(id, eventoLayoutRelation);
  }

  @put('/evento-layout-relations/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'EventoLayoutRelation PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() eventoLayoutRelation: EventoLayoutRelation,
  ): Promise<void> {
    await this.eventoLayoutRelationRepository.replaceById(id, eventoLayoutRelation);
  }

  @del('/evento-layout-relations/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'EventoLayoutRelation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eventoLayoutRelationRepository.deleteById(id);
  }
}
