import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserModel, UserModelRelations, UserCredentialsModel} from '../models';
import {UserCredentialsModelRepository} from './user-credentials-model.repository';

export class UserModelRepository extends DefaultCrudRepository<
  UserModel,
  typeof UserModel.prototype.id,
  UserModelRelations
> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentialsModel, typeof UserModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource, @repository.getter('UserCredentialsModelRepository') protected userCredentialsModelRepositoryGetter: Getter<UserCredentialsModelRepository>,
  ) {
    super(UserModel, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsModelRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }
}
