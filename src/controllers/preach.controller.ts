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
import {Preach} from '../models';
import {PreachRepository} from '../repositories';

export class PreachController {
  constructor(
    @repository(PreachRepository)
    public preachRepository: PreachRepository,
  ) { }

  @post('/preachs')
  @response(200, {
    description: 'Preach model instance',
    content: {'application/json': {schema: getModelSchemaRef(Preach)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preach, {
            title: 'NewPreach',
            exclude: ['id'],
          }),
        },
      },
    })
    preach: Omit<Preach, 'id'>,
  ): Promise<Preach> {
    return this.preachRepository.create(preach);
  }

  @get('/preachs/count')
  @response(200, {
    description: 'Preach model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Preach) where?: Where<Preach>,
  ): Promise<Count> {
    return this.preachRepository.count(where);
  }

  @get('/preachs')
  @response(200, {
    description: 'Array of Preach model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preach, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Preach) filter?: Filter<Preach>,
  ): Promise<Preach[]> {
    return this.preachRepository.find(filter);
  }

  @patch('/preachs')
  @response(200, {
    description: 'Preach PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preach, {partial: true}),
        },
      },
    })
    prayer: Preach,
    @param.where(Preach) where?: Where<Preach>,
  ): Promise<Count> {
    return this.preachRepository.updateAll(prayer, where);
  }

  @get('/preachs/{id}')
  @response(200, {
    description: 'Preach model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Preach, {includeRelations: true}),
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Preach, {exclude: 'where'}) filter?: FilterExcludingWhere<Preach>
  ): Promise<Preach> {
    return this.preachRepository.findById(id, filter);
  }

  @patch('/preachs/{id}')
  @response(204, {
    description: 'Preach PATCH success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Preach, {partial: true}),
        },
      },
    })
    preach: Preach,
  ): Promise<void> {
    await this.preachRepository.updateById(id, preach);
  }

  @put('/preachs/{id}')
  @response(204, {
    description: 'Prayer PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() prayer: Preach,
  ): Promise<void> {
    await this.preachRepository.replaceById(id, prayer);
  }

  @del('/preachs/{id}')
  @response(204, {
    description: 'Preach DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.preachRepository.deleteById(id);
  }

  @get('/preachs/getpreachbychurch')
  @response(200, {
    description: 'Array of preach model instances',
    parameters: [{churchId: 'churchId', schema: {type: 'string'}, in: 'query'}],
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Preach, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
  })
  async getPreachByChurch(
    @param.query.string('churchId') churchId: string,
  ): Promise<Preach[]> {
    return this.preachRepository.getPreachByChurch(churchId);
  }
}
