import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {RefreshTokenModel, RefreshTokenModelRelations, UserModel} from '../models';
import {UserModelRepository} from './user-model.repository';

export class RefreshTokenModelRepository extends DefaultCrudRepository<
  RefreshTokenModel,
  typeof RefreshTokenModel.prototype.id,
  RefreshTokenModelRelations
> {

  public readonly user: BelongsToAccessor<UserModel, typeof RefreshTokenModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('UserModelRepository') protected userModelRepositoryGetter: Getter<UserModelRepository>,
  ) {
    super(RefreshTokenModel, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userModelRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
