import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserModel, UserProfileModel, UserProfileModelRelations} from '../models';
import {UserModelRepository} from './user-model.repository';

export class UserProfileModelRepository extends DefaultCrudRepository<
  UserProfileModel,
  typeof UserProfileModel.prototype.id,
  UserProfileModelRelations
> {

  public readonly user: BelongsToAccessor<UserModel, typeof UserModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
    @repository.getter('UserModelRepository') protected userModelRepositoryGetter: Getter<UserModelRepository>
  ) {
    super(UserProfileModel, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userModelRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
