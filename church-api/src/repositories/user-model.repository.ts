import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasOneRepositoryFactory, repository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserCredentialsModel, UserModel, UserModelRelations} from '../models';
import {UserCredentialsModelRepository} from './user-credentials-model.repository';

export type Credentials = {
  email: string;
  password: string;
  role?: string
};

export class UserModelRepository extends DefaultCrudRepository<UserModel,
  typeof UserModel.prototype.id,
  UserModelRelations> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentialsModel, typeof UserModel.prototype.id>;

  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
    @repository.getter('UserCredentialsModelRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsModelRepository>,
  ) {
    super(UserModel, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
    this.registerInclusionResolver('userCredentials', this.userCredentials.inclusionResolver);
  }

  async findCredentials(
    userId: typeof UserModel.prototype.id,
  ): Promise<UserCredentialsModel | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
