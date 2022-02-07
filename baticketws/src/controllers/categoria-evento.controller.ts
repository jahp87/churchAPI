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
import {CategoriaEvento} from '../models';
import {CategoriaEventoRepository} from '../repositories';

export class CategoriaEventoController {
  constructor(
    @repository(CategoriaEventoRepository)
    public categoriaEventoRepository: CategoriaEventoRepository,
  ) { }

  @post('/categoriaevento')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CategoriaEvento model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriaEvento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaEvento, {
            title: 'NewCategoriaEvento',
            exclude: ['id'],
          }),
        },
      },
    })
    categoriaEvento: Omit<CategoriaEvento, 'id'>,
  ): Promise<CategoriaEvento> {
    return this.categoriaEventoRepository.create(categoriaEvento);
  }

  @get('/categoriaevento/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CategoriaEvento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CategoriaEvento) where?: Where<CategoriaEvento>,
  ): Promise<Count> {
    return this.categoriaEventoRepository.count(where);
  }

  @get('/categoriaevento')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of CategoriaEvento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriaEvento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CategoriaEvento) filter?: Filter<CategoriaEvento>,
  ): Promise<CategoriaEvento[]> {
    return this.categoriaEventoRepository.find(filter);
  }

  @patch('/categoriaevento')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CategoriaEvento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaEvento, {partial: true}),
        },
      },
    })
    categoriaEvento: CategoriaEvento,
    @param.where(CategoriaEvento) where?: Where<CategoriaEvento>,
  ): Promise<Count> {
    return this.categoriaEventoRepository.updateAll(categoriaEvento, where);
  }

  @get('/categoriaevento/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'CategoriaEvento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriaEvento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CategoriaEvento, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriaEvento>
  ): Promise<CategoriaEvento> {
    return this.categoriaEventoRepository.findById(id, filter);
  }

  @patch('/categoriaevento/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'CategoriaEvento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriaEvento, {partial: true}),
        },
      },
    })
    categoriaEvento: CategoriaEvento,
  ): Promise<void> {
    await this.categoriaEventoRepository.updateById(id, categoriaEvento);
  }

  @put('/categoriaevento/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'CategoriaEvento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoriaEvento: CategoriaEvento,
  ): Promise<void> {
    await this.categoriaEventoRepository.replaceById(id, categoriaEvento);
  }

  @del('/categoriaevento/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'CategoriaEvento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriaEventoRepository.deleteById(id);
  }
}
