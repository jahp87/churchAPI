import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDatasourceDataSource} from '../datasources';
import {UserCredentialsModel, UserCredentialsModelRelations} from '../models';

export class UserCredentialsModelRepository extends DefaultCrudRepository<
  UserCredentialsModel,
  typeof UserCredentialsModel.prototype.id,
  UserCredentialsModelRelations
> {
  constructor(
    @inject('datasources.mongodbDatasource') dataSource: MongodbDatasourceDataSource,
  ) {
    super(UserCredentialsModel, dataSource);
  }
}
