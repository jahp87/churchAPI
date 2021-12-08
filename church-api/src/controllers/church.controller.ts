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
import {ChurchModel} from '../models';
import {ChurchModelRepository} from '../repositories';


export class ChurchController {
  constructor(
    @repository(ChurchModelRepository)
    public churchModelRepository: ChurchModelRepository,
  ) { }

  @post('/church')
  @response(200, {
    description: 'ChurchModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(ChurchModel)}},
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
          schema: getModelSchemaRef(ChurchModel, {
            title: 'NewChurchModel',
            exclude: ['id'],
          }),
        },
      },
    })
    churchModel: Omit<ChurchModel, 'id'>,
  ): Promise<ChurchModel> {
    return this.churchModelRepository.create(churchModel);
  }

  @get('/church/count')
  @response(200, {
    description: 'ChurchModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(
    @param.where(ChurchModel) where?: Where<ChurchModel>,
  ): Promise<Count> {
    return this.churchModelRepository.count(where);
  }

  @get('/church')
  @response(200, {
    description: 'Array of ChurchModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ChurchModel, {includeRelations: true}),
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
    @param.filter(ChurchModel) filter?: Filter<ChurchModel>,
  ): Promise<ChurchModel[]> {
    return this.churchModelRepository.find(filter);
  }

  @patch('/church')
  @response(200, {
    description: 'ChurchModel PATCH success count',
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
          schema: getModelSchemaRef(ChurchModel, {partial: true}),
        },
      },
    })
    churchModel: ChurchModel,
    @param.where(ChurchModel) where?: Where<ChurchModel>,
  ): Promise<Count> {
    return this.churchModelRepository.updateAll(churchModel, where);
  }

  @get('/church/{id}')
  @response(200, {
    description: 'ChurchModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ChurchModel, {includeRelations: true}),
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
    @param.filter(ChurchModel, {exclude: 'where'}) filter?: FilterExcludingWhere<ChurchModel>
  ): Promise<ChurchModel> {
    return this.churchModelRepository.findById(id, filter);
  }

  @patch('/church/{id}')
  @response(204, {
    description: 'ChurchModel PATCH success',
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
          schema: getModelSchemaRef(ChurchModel, {partial: true}),
        },
      },
    })
    churchModel: ChurchModel,
  ): Promise<void> {
    await this.churchModelRepository.updateById(id, churchModel);
  }

  @put('/church/{id}')
  @response(204, {
    description: 'ChurchModel PUT success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() churchModel: ChurchModel,
  ): Promise<void> {
    await this.churchModelRepository.replaceById(id, churchModel);
  }

  @del('/church/{id}')
  @response(204, {
    description: 'ChurchModel DELETE success',
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.churchModelRepository.deleteById(id);
  }

  @get('/selectchurch')
  @response(200, {
    description: 'Array of ChurchModel model instances for select',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ChurchModel, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async selectchurch(
    @param.filter(ChurchModel) filter?: Filter<ChurchModel>,
  ): Promise<ChurchModel[]> {
    return this.churchModelRepository.find(filter);
  }


}
