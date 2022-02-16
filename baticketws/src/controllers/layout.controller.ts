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
import {Layout} from '../models';
import {LayoutRepository} from '../repositories';

export class LayoutController {
  constructor(
    @repository(LayoutRepository)
    public layoutRepository: LayoutRepository,
  ) { }

  @post('/layouts')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Layout model instance',
    content: {'application/json': {schema: getModelSchemaRef(Layout)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Layout, {
            title: 'NewLayout',
            exclude: ['id'],
          }),
        },
      },
    })
    layout: Omit<Layout, 'id'>,
  ): Promise<Layout> {
    return this.layoutRepository.create(layout);
  }

  @get('/layouts/count')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Layout model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Layout) where?: Where<Layout>,
  ): Promise<Count> {
    return this.layoutRepository.count(where);
  }

  @get('/layouts')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Layout model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Layout, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Layout) filter?: Filter<Layout>,
  ): Promise<Layout[]> {
    return this.layoutRepository.find(filter);
  }

  @patch('/layouts')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Layout PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Layout, {partial: true}),
        },
      },
    })
    layout: Layout,
    @param.where(Layout) where?: Where<Layout>,
  ): Promise<Count> {
    return this.layoutRepository.updateAll(layout, where);
  }

  @get('/layouts/{id}')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Layout model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Layout, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Layout, {exclude: 'where'}) filter?: FilterExcludingWhere<Layout>
  ): Promise<Layout> {
    return this.layoutRepository.findById(id, filter);
  }

  @patch('/layouts/{id}')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Layout PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Layout, {partial: true}),
        },
      },
    })
    layout: Layout,
  ): Promise<void> {
    await this.layoutRepository.updateById(id, layout);
  }

  @put('/layouts/{id}')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Layout PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() layout: Layout,
  ): Promise<void> {
    await this.layoutRepository.replaceById(id, layout);
  }

  @del('/layouts/{id}')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Layout DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.layoutRepository.deleteById(id);
  }
}
