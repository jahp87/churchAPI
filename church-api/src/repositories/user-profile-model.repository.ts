import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserProfileModel, UserProfileModelRelations, UserModel} from '../models';
import {UserModelRepository} from './user-model.repository';

export class UserProfileModelRepository extends DefaultCrudRepository<
  UserProfileModel,
  typeof UserProfileModel.prototype.id,
  UserProfileModelRelations
> {

  public readonly user: BelongsToAccessor<UserModel, typeof UserProfileModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('UserModelRepository') protected userModelRepositoryGetter: Getter<UserModelRepository>,
  ) {
    super(UserProfileModel, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userModelRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
