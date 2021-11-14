import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  UserModel,
  UserCredentialsModel,
} from '../models';
import {UserModelRepository} from '../repositories';

export class UserModelUserCredentialsModelController {
  constructor(
    @repository(UserModelRepository) protected userModelRepository: UserModelRepository,
  ) { }

  @get('/user-models/{id}/user-credentials-model', {
    responses: {
      '200': {
        description: 'UserModel has one UserCredentialsModel',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserCredentialsModel),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<UserCredentialsModel>,
  ): Promise<UserCredentialsModel> {
    return this.userModelRepository.userCredentials(id).get(filter);
  }

  @post('/user-models/{id}/user-credentials-model', {
    responses: {
      '200': {
        description: 'UserModel model instance',
        content: {'application/json': {schema: getModelSchemaRef(UserCredentialsModel)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof UserModel.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentialsModel, {
            title: 'NewUserCredentialsModelInUserModel',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) userCredentialsModel: Omit<UserCredentialsModel, 'id'>,
  ): Promise<UserCredentialsModel> {
    return this.userModelRepository.userCredentials(id).create(userCredentialsModel);
  }

  @patch('/user-models/{id}/user-credentials-model', {
    responses: {
      '200': {
        description: 'UserModel.UserCredentialsModel PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserCredentialsModel, {partial: true}),
        },
      },
    })
    userCredentialsModel: Partial<UserCredentialsModel>,
    @param.query.object('where', getWhereSchemaFor(UserCredentialsModel)) where?: Where<UserCredentialsModel>,
  ): Promise<Count> {
    return this.userModelRepository.userCredentials(id).patch(userCredentialsModel, where);
  }

  @del('/user-models/{id}/user-credentials-model', {
    responses: {
      '200': {
        description: 'UserModel.UserCredentialsModel DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(UserCredentialsModel)) where?: Where<UserCredentialsModel>,
  ): Promise<Count> {
    return this.userModelRepository.userCredentials(id).delete(where);
  }
}
