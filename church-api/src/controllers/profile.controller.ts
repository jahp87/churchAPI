import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UserProfileModel} from '../models';
import {UserProfileModelRepository} from '../repositories';

export class ProfileController {
  constructor(
    @repository(UserProfileModelRepository)
    public userProfileModelRepository : UserProfileModelRepository,
  ) {}

  @post('/profile')
  @response(200, {
    description: 'UserProfileModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserProfileModel)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserProfileModel, {
            title: 'NewUserProfileModel',
            exclude: ['id'],
          }),
        },
      },
    })
    userProfileModel: Omit<UserProfileModel, 'id'>,
  ): Promise<UserProfileModel> {
    return this.userProfileModelRepository.create(userProfileModel);
  }

  @get('/profile/count')
  @response(200, {
    description: 'UserProfileModel model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserProfileModel) where?: Where<UserProfileModel>,
  ): Promise<Count> {
    return this.userProfileModelRepository.count(where);
  }

  @get('/profile')
  @response(200, {
    description: 'Array of UserProfileModel model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserProfileModel, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserProfileModel) filter?: Filter<UserProfileModel>,
  ): Promise<UserProfileModel[]> {
    return this.userProfileModelRepository.find(filter);
  }

  @patch('/profile')
  @response(200, {
    description: 'UserProfileModel PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserProfileModel, {partial: true}),
        },
      },
    })
    userProfileModel: UserProfileModel,
    @param.where(UserProfileModel) where?: Where<UserProfileModel>,
  ): Promise<Count> {
    return this.userProfileModelRepository.updateAll(userProfileModel, where);
  }

  @get('/profile/{id}')
  @response(200, {
    description: 'UserProfileModel model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserProfileModel, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserProfileModel, {exclude: 'where'}) filter?: FilterExcludingWhere<UserProfileModel>
  ): Promise<UserProfileModel> {
    return this.userProfileModelRepository.findById(id, filter);
  }

  @patch('/profile/{id}')
  @response(204, {
    description: 'UserProfileModel PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserProfileModel, {partial: true}),
        },
      },
    })
    userProfileModel: UserProfileModel,
  ): Promise<void> {
    await this.userProfileModelRepository.updateById(id, userProfileModel);
  }

  @put('/profile/{id}')
  @response(204, {
    description: 'UserProfileModel PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userProfileModel: UserProfileModel,
  ): Promise<void> {
    await this.userProfileModelRepository.replaceById(id, userProfileModel);
  }

  @del('/profile/{id}')
  @response(204, {
    description: 'UserProfileModel DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userProfileModelRepository.deleteById(id);
  }
}
