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
import {UserProfileModel} from '../models';
import {UserProfileModelRepository} from '../repositories';

export class ProfileController {
  constructor(
    @repository(UserProfileModelRepository)
    public userProfileModelRepository: UserProfileModelRepository,
  ) { }

  @post('/profile')
  @response(200, {
    description: 'UserProfileModel model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserProfileModel)}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin', 'user'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
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
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userProfileModelRepository.deleteById(id);
  }
}
