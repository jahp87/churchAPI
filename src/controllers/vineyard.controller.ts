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
import {Vineyard} from '../models';
import {VineyardRepository} from '../repositories';

export class VineyardController {
  constructor(
    @repository(VineyardRepository)
    public vineyardRepository: VineyardRepository,
  ) { }

  @post('/vineyards')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Vineyard model instance',
    content: {'application/json': {schema: getModelSchemaRef(Vineyard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vineyard, {
            title: 'NewVineyard',
            exclude: ['id'],
          }),
        },
      },
    })
    vineyard: Omit<Vineyard, 'id'>,
  ): Promise<Vineyard> {
    return this.vineyardRepository.create(vineyard);
  }

  @get('/vineyards/count')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Vineyard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Vineyard) where?: Where<Vineyard>,
  ): Promise<Count> {
    return this.vineyardRepository.count(where);
  }

  @get('/vineyards')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Array of Vineyard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vineyard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Vineyard) filter?: Filter<Vineyard>,
  ): Promise<Vineyard[]> {
    return this.vineyardRepository.find(filter);
  }

  @patch('/vineyards')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Vineyard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vineyard, {partial: true}),
        },
      },
    })
    vineyard: Vineyard,
    @param.where(Vineyard) where?: Where<Vineyard>,
  ): Promise<Count> {
    return this.vineyardRepository.updateAll(vineyard, where);
  }

  @get('/vineyards/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(200, {
    description: 'Vineyard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Vineyard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Vineyard, {exclude: 'where'}) filter?: FilterExcludingWhere<Vineyard>
  ): Promise<Vineyard> {
    return this.vineyardRepository.findById(id, filter);
  }

  @patch('/vineyards/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Vineyard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vineyard, {partial: true}),
        },
      },
    })
    vineyard: Vineyard,
  ): Promise<void> {
    await this.vineyardRepository.updateById(id, vineyard);
  }

  @put('/vineyards/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Vineyard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vineyard: Vineyard,
  ): Promise<void> {
    await this.vineyardRepository.replaceById(id, vineyard);
  }

  @del('/vineyards/{id}')
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  @response(204, {
    description: 'Vineyard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vineyardRepository.deleteById(id);
  }

  @get('/vineyards/getvineyardbychurch')
  @response(200, {
    description: 'Array of vineyard model instances',
    parameters: [{churchId: 'churchId', schema: {type: 'string'}, in: 'query'}],
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Vineyard, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user'],
    voters: [basicAuthorization],
  })
  async getVineyardByChurch(
    @param.query.string('churchId') churchId: string,
  ): Promise<Vineyard[]> {
    return this.vineyardRepository.getVineyardByChurch(churchId);
  }
}
