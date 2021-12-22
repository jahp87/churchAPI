import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserProfileModel, UserProfileModelRelations, UserModel, ChurchModel} from '../models';
import {UserModelRepository} from './user-model.repository';
import {ChurchModelRepository} from './church-model.repository';

export class UserProfileModelRepository extends DefaultCrudRepository<
  UserProfileModel,
  typeof UserProfileModel.prototype.id,
  UserProfileModelRelations
> {

  public readonly user: BelongsToAccessor<UserModel, typeof UserProfileModel.prototype.id>;

  public readonly activeChurch: HasOneRepositoryFactory<ChurchModel, typeof UserProfileModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('UserModelRepository') protected userModelRepositoryGetter: Getter<UserModelRepository>, @repository.getter('ChurchModelRepository') protected churchModelRepositoryGetter: Getter<ChurchModelRepository>,
  ) {
    super(UserProfileModel, dataSource);
    this.activeChurch = this.createHasOneRepositoryFactoryFor('activeChurch', churchModelRepositoryGetter);
    this.registerInclusionResolver('activeChurch', this.activeChurch.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userModelRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
