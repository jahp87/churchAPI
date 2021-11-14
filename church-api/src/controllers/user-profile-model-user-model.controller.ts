import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  UserProfileModel,
  UserModel,
} from '../models';
import {UserProfileModelRepository} from '../repositories';

export class UserProfileModelUserModelController {
  constructor(
    @repository(UserProfileModelRepository)
    public userProfileModelRepository: UserProfileModelRepository,
  ) { }

  @get('/user-profile-models/{id}/user-model', {
    responses: {
      '200': {
        description: 'UserModel belonging to UserProfileModel',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserModel)},
          },
        },
      },
    },
  })
  async getUserModel(
    @param.path.string('id') id: typeof UserProfileModel.prototype.id,
  ): Promise<UserModel> {
    return this.userProfileModelRepository.user(id);
  }
}
