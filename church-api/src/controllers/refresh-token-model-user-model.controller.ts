import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RefreshTokenModel,
  UserModel,
} from '../models';
import {RefreshTokenModelRepository} from '../repositories';

export class RefreshTokenModelUserModelController {
  constructor(
    @repository(RefreshTokenModelRepository)
    public refreshTokenModelRepository: RefreshTokenModelRepository,
  ) { }

  @get('/refresh-token-models/{id}/user-model', {
    responses: {
      '200': {
        description: 'UserModel belonging to RefreshTokenModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserModel)},
          },
        },
      },
    },
  })
  async getUserModel(
    @param.path.string('id') id: typeof RefreshTokenModel.prototype.id,
  ): Promise<UserModel> {
    return this.refreshTokenModelRepository.user(id);
  }
}
