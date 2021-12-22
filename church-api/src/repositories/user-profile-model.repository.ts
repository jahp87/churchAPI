import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {ChurchModel, UserModel, UserProfileModel, UserProfileModelRelations} from '../models';
import {ChurchModelRepository} from './church-model.repository';
import {UserModelRepository} from './user-model.repository';

export class UserProfileModelRepository extends DefaultCrudRepository<
  UserProfileModel,
  typeof UserProfileModel.prototype.id,
  UserProfileModelRelations
> {

  public readonly user: BelongsToAccessor<UserModel, typeof UserProfileModel.prototype.id>;

  public readonly church: BelongsToAccessor<ChurchModel, typeof UserProfileModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('UserModelRepository') protected userModelRepositoryGetter: Getter<UserModelRepository>, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(UserProfileModel, dataSource);
    this.church = this.createBelongsToAccessorFor('church', churchModelRepositoryGetter);
    this.registerInclusionResolver('church', this.church.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userModelRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
